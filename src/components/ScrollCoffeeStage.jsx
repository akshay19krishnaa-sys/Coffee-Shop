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
  className = '',
}) => {
  const wrapRef = useRef(null);
  const floatRef = useRef(null);
  const canvasRef = useRef(null);
  const lastDrawnUrlRef = useRef('');
  const lastCanvasSizeRef = useRef({ width: 0, height: 0 });

  // Subtle organic floating motion adapted via gsap.matchMedia
  useEffect(() => {
    if (!floatRef.current) return undefined;

    const mm = gsap.matchMedia();

    mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.to(floatRef.current, {
        y: -7,
        duration: 3.2,
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

  // Main requestAnimationFrame canvas compositing loop
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

      const rawTarget = frameNumberRef?.current ?? fallbackFrame;
      const resolved = findNearestDecodedFrame(rawTarget);
      if (!resolved) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      const targetW = Math.max(1, Math.round(rect.width * dpr));
      const targetH = Math.max(1, Math.round(rect.height * dpr));

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
    };
  }, [frameNumberRef, fallbackFrame]);

  return (
    <div ref={wrapRef} className={`relative aspect-square select-none ${className}`}>
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
  );
};
