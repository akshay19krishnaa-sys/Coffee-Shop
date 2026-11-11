import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  buildMenuFrameUrl,
  getCachedFrameImage,
  loadFrameImage,
  MENU_FRAME_TOTAL,
} from '../utils/menuFrames';

/**
 * Scroll-synchronized <canvas> coffee vessel renderer.
 * Preserves full 1:1 image containment (zero stretching or center cropping),
 * aligns studio black floor cleanly with #101010, and feathers outer boundaries
 * with two-axis destination-in alpha masks so no rectangular box edges appear.
 */
export const ScrollCoffeeStage = ({
  frameNumberRef,
  fallbackFrame = 1,
  interactive = false,
  className = '',
}) => {
  const wrapRef = useRef(null);
  const floatRef = useRef(null);
  const tiltRef = useRef(null);
  const canvasRef = useRef(null);
  const lastDrawnUrlRef = useRef('');
  const lastCanvasSizeRef = useRef({ width: 0, height: 0 });
  const dragFrameOffsetRef = useRef(0);
  const dragStateRef = useRef({ active: false, startX: 0, baseOffset: 0 });

  // Subtle organic floating motion adapted via gsap.matchMedia (stays active on mobile & desktop)
  useEffect(() => {
    if (!floatRef.current) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(max-width: 767px)', () => {
      gsap.to(floatRef.current, {
        y: -7,
        duration: 3.1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.to(floatRef.current, {
        y: -10,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => mm.revert();
  }, []);

  // Interactive 3D touch/pointer tilt & horizontal frame drag scrubbing (used on mobile <768px stages)
  useEffect(() => {
    if (!interactive) return undefined;
    const wrapEl = wrapRef.current;
    const tiltEl = tiltRef.current;
    if (!wrapEl || !tiltEl) return undefined;

    const handlePointerDown = (e) => {
      dragStateRef.current = {
        active: true,
        startX: e.clientX,
        baseOffset: dragFrameOffsetRef.current,
      };
    };

    const handlePointerMove = (e) => {
      const rect = wrapEl.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(tiltEl, {
        rotateY: Math.max(-14, Math.min(14, relX * 26)),
        rotateX: Math.max(-10, Math.min(10, -relY * 18)),
        scale: dragStateRef.current.active ? 1.04 : 1.02,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      if (dragStateRef.current.active) {
        const deltaX = e.clientX - dragStateRef.current.startX;
        dragFrameOffsetRef.current = dragStateRef.current.baseOffset + deltaX * 0.14;
      }
    };

    const resetTilt = () => {
      dragStateRef.current.active = false;
      gsap.to(tiltEl, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.65,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    wrapEl.addEventListener('pointerdown', handlePointerDown, { passive: true });
    wrapEl.addEventListener('pointermove', handlePointerMove, { passive: true });
    wrapEl.addEventListener('pointerup', resetTilt, { passive: true });
    wrapEl.addEventListener('pointercancel', resetTilt, { passive: true });
    wrapEl.addEventListener('pointerleave', resetTilt, { passive: true });

    return () => {
      wrapEl.removeEventListener('pointerdown', handlePointerDown);
      wrapEl.removeEventListener('pointermove', handlePointerMove);
      wrapEl.removeEventListener('pointerup', resetTilt);
      wrapEl.removeEventListener('pointercancel', resetTilt);
      wrapEl.removeEventListener('pointerleave', resetTilt);
    };
  }, [interactive]);

  // Main requestAnimationFrame canvas compositing loop + ResizeObserver layout resilience
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = wrapRef.current;
    if (!canvas || !container) return undefined;

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            lastDrawnUrlRef.current = '';
          })
        : null;
    resizeObserver?.observe(container);

    const ctx = canvas.getContext('2d', { alpha: true });
    let rafId = 0;

    const initialUrl = buildMenuFrameUrl(
      Math.max(1, Math.min(MENU_FRAME_TOTAL, Math.round(fallbackFrame)))
    );
    loadFrameImage(initialUrl);

    const findNearestDecodedFrame = (targetNumber) => {
      const clamped = Math.max(1, Math.min(MENU_FRAME_TOTAL, Math.round(targetNumber)));
      const targetUrl = buildMenuFrameUrl(clamped);
      const exact = getCachedFrameImage(targetUrl);
      if (exact) return { img: exact, url: targetUrl };

      loadFrameImage(targetUrl);

      for (let offset = 1; offset <= 35; offset += 1) {
        const backward = clamped - offset;
        if (backward >= 1) {
          const backUrl = buildMenuFrameUrl(backward);
          const backImg = getCachedFrameImage(backUrl);
          if (backImg) return { img: backImg, url: backUrl };
        }
        const forward = clamped + offset;
        if (forward <= MENU_FRAME_TOTAL) {
          const fwdUrl = buildMenuFrameUrl(forward);
          const fwdImg = getCachedFrameImage(fwdUrl);
          if (fwdImg) return { img: fwdImg, url: fwdUrl };
        }
      }
      return null;
    };

    const drawLoop = () => {
      rafId = requestAnimationFrame(drawLoop);
      if (!isVisible) return;

      const rect = container.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;

      const rawBase = frameNumberRef?.current ?? fallbackFrame;
      const rawTarget = rawBase + dragFrameOffsetRef.current;
      const wrappedTarget =
        ((((Math.round(rawTarget) - 1) % MENU_FRAME_TOTAL) + MENU_FRAME_TOTAL) %
          MENU_FRAME_TOTAL) +
        1;
      const resolved = findNearestDecodedFrame(wrappedTarget);
      if (!resolved) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);

      const sizeChanged =
        lastCanvasSizeRef.current.width !== targetW ||
        lastCanvasSizeRef.current.height !== targetH;

      if (sizeChanged) {
        canvas.width = targetW;
        canvas.height = targetH;
        lastCanvasSizeRef.current = { width: targetW, height: targetH };
      }

      if (!sizeChanged && lastDrawnUrlRef.current === resolved.url) {
        return;
      }

      lastDrawnUrlRef.current = resolved.url;

      const cw = canvas.width;
      const ch = canvas.height;

      ctx.save();
      ctx.clearRect(0, 0, cw, ch);

      // Contain the entire native 560x560 frame with breathing space inside the canvas perimeter
      const paddingRatio = 0.03;
      const availW = cw * (1 - paddingRatio * 2);
      const availH = ch * (1 - paddingRatio * 2);
      const scale = Math.min(
        availW / resolved.img.naturalWidth,
        availH / resolved.img.naturalHeight
      );
      const drawW = resolved.img.naturalWidth * scale;
      const drawH = resolved.img.naturalHeight * scale;
      const drawX = (cw - drawW) / 2;
      const drawY = (ch - drawH) / 2;

      // Draw native frame with crisp containment (CSS filter handles cross-browser GPU black-level match)
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(resolved.img, drawX, drawY, drawW, drawH);

      // Two-axis true alpha feathering strictly in the outer ~10% perimeter so zero cup/splash details are clipped
      ctx.globalCompositeOperation = 'destination-in';

      const horizGrad = ctx.createLinearGradient(drawX, 0, drawX + drawW, 0);
      horizGrad.addColorStop(0, 'rgba(0,0,0,0)');
      horizGrad.addColorStop(0.11, 'rgba(0,0,0,1)');
      horizGrad.addColorStop(0.89, 'rgba(0,0,0,1)');
      horizGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = horizGrad;
      ctx.fillRect(0, 0, cw, ch);

      const vertGrad = ctx.createLinearGradient(0, drawY, 0, drawY + drawH);
      vertGrad.addColorStop(0, 'rgba(0,0,0,0)');
      vertGrad.addColorStop(0.09, 'rgba(0,0,0,1)');
      vertGrad.addColorStop(0.85, 'rgba(0,0,0,1)');
      vertGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = vertGrad;
      ctx.fillRect(0, 0, cw, ch);

      ctx.restore();
    };

    rafId = requestAnimationFrame(drawLoop);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      resizeObserver?.disconnect();
    };
  }, [frameNumberRef, fallbackFrame]);

  return (
    <div
      ref={wrapRef}
      style={interactive ? { perspective: '800px' } : undefined}
      className={`relative aspect-square select-none ${
        interactive ? 'touch-pan-y cursor-grab active:cursor-grabbing' : ''
      } ${className}`}
    >
      <div
        ref={tiltRef}
        style={interactive ? { transformStyle: 'preserve-3d' } : undefined}
        className="relative w-full h-full will-change-transform"
      >
        <div ref={floatRef} className="relative w-full h-full">
          {/* Subtle Warm Radial Atmospheric Depth Behind Vessel (No visible border or box) */}
          <div
            className="pointer-events-none absolute -inset-[10%] rounded-full"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(circle at 50% 54%, rgba(245,197,24,0.09) 0%, rgba(245,197,24,0.025) 38%, rgba(16,16,16,0) 70%)',
            }}
          />

          {/* Alpha-Feathered Seamless Coffee Frame Canvas (hardware-accelerated black-floor alignment) */}
          <canvas
            ref={canvasRef}
            className="relative z-10 w-full h-full block brightness-[0.92] contrast-[1.12]"
          />
        </div>
      </div>
    </div>
  );
};
