import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  buildMenuFrameUrl,
  getCachedFrameImage,
  loadFrameImage,
  MENU_FRAME_TOTAL,
} from '../utils/menuFrames';

/**
 * Pure scroll-synchronized <canvas> coffee vessel stage.
 * Renders decoded extracted frames at native aspect ratio (object-contain)
 * with radial vignette edge feathering, ambient rim light, and subtle rising steam wisps.
 * On mobile, optional touch-scrubbing updates frames cleanly via horizontal swipe without hijacking vertical scroll.
 */
export const ScrollCoffeeStage = ({
  frameNumberRef,
  fallbackFrame = 1,
  frameRange = null,
  enableTouchScrub = false,
  showSteam = true,
  className = '',
}) => {
  const wrapRef = useRef(null);
  const floatRef = useRef(null);
  const canvasRef = useRef(null);
  const lastDrawnUrlRef = useRef('');
  const lastCanvasSizeRef = useRef({ width: 0, height: 0 });
  const touchStateRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    axisLocked: null,
  });

  // Subtle floating motion scaled comfortably down for smaller viewports
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !floatRef.current) return undefined;

    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.to(floatRef.current, {
        y: isMobile ? -6 : -10,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, floatRef);

    return () => ctx.revert();
  }, []);

  // Main requestAnimationFrame canvas draw synced cleanly to scroll / touch frameNumberRef
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Strict aspect-ratio containment: never stretches, distorts, or crops cup or liquid splash
      const scale = Math.min(
        canvas.width / resolved.img.naturalWidth,
        canvas.height / resolved.img.naturalHeight
      );
      const drawW = resolved.img.naturalWidth * scale;
      const drawH = resolved.img.naturalHeight * scale;
      const drawX = (canvas.width - drawW) / 2;
      const drawY = (canvas.height - drawH) / 2;

      ctx.drawImage(resolved.img, drawX, drawY, drawW, drawH);
    };

    rafId = requestAnimationFrame(drawLoop);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [frameNumberRef, fallbackFrame]);

  // Smooth horizontal touch scrubbing for mobile chapter visuals (never locks vertical scroll)
  const handleTouchStart = (e) => {
    if (!enableTouchScrub || !frameNumberRef || !frameRange) return;
    const touch = e.touches[0];
    if (!touch) return;
    touchStateRef.current = {
      active: true,
      startX: touch.clientX,
      startY: touch.clientY,
      lastX: touch.clientX,
      axisLocked: null,
    };
  };

  const handleTouchMove = (e) => {
    const state = touchStateRef.current;
    if (!state.active || !enableTouchScrub || !frameNumberRef || !frameRange) return;
    const touch = e.touches[0];
    if (!touch) return;

    const totalDx = touch.clientX - state.startX;
    const totalDy = touch.clientY - state.startY;

    if (!state.axisLocked) {
      if (Math.abs(totalDx) < 6 && Math.abs(totalDy) < 6) return;
      if (Math.abs(totalDy) > Math.abs(totalDx) * 1.15) {
        state.axisLocked = 'y';
        state.active = false;
        return;
      }
      state.axisLocked = 'x';
    }

    if (state.axisLocked !== 'x') return;

    const dx = touch.clientX - state.lastX;
    state.lastX = touch.clientX;
    const span = Math.max(1, frameRange.end - frameRange.start);
    const width = wrapRef.current?.clientWidth || 300;
    const next = frameNumberRef.current + (dx / Math.max(width * 0.7, 180)) * span;
    frameNumberRef.current = Math.max(frameRange.start, Math.min(frameRange.end, next));
  };

  const handleTouchEnd = () => {
    touchStateRef.current.active = false;
    touchStateRef.current.axisLocked = null;
  };

  return (
    <div
      ref={wrapRef}
      onTouchStart={enableTouchScrub ? handleTouchStart : undefined}
      onTouchMove={enableTouchScrub ? handleTouchMove : undefined}
      onTouchEnd={enableTouchScrub ? handleTouchEnd : undefined}
      onTouchCancel={enableTouchScrub ? handleTouchEnd : undefined}
      style={enableTouchScrub ? { touchAction: 'pan-y' } : undefined}
      className={`relative aspect-square select-none ${className}`}
    >
      <div ref={floatRef} className="relative w-full h-full">
        {/* Subtle Warm Yellow Rim Glow Behind Vessel */}
        <div
          className="pointer-events-none absolute inset-[14%] rounded-full bg-[#F5C518]/[0.08] blur-[68px]"
          aria-hidden="true"
        />

        {/* Delicate Organic Steam Wisps */}
        {showSteam && (
          <div
            className="pointer-events-none motion-reduce:hidden absolute -top-[4%] left-1/2 -translate-x-1/2 w-[38%] h-[34%] z-20 flex justify-center gap-3 opacity-35"
            aria-hidden="true"
          >
            <div className="w-7 sm:w-8 h-20 sm:h-24 rounded-full bg-gradient-to-t from-white/15 via-white/10 to-transparent blur-xl animate-[pulse_4.5s_ease-in-out_infinite]" />
            <div className="w-9 sm:w-10 h-24 sm:h-28 rounded-full bg-gradient-to-t from-[#F5C518]/15 via-white/10 to-transparent blur-2xl animate-[pulse_5.5s_ease-in-out_1.2s_infinite]" />
            <div className="w-6 sm:w-7 h-16 sm:h-20 rounded-full bg-gradient-to-t from-white/12 via-white/5 to-transparent blur-xl animate-[pulse_4s_ease-in-out_2s_infinite]" />
          </div>
        )}

        {/* Extracted Frame Sequence Canvas */}
        <canvas ref={canvasRef} className="relative z-10 w-full h-full block" />

        {/* Soft Studio Radial Feathering blending #1B1B1B edge seamlessly into #101010 */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              'radial-gradient(circle at center, rgba(16,16,16,0) 50%, rgba(16,16,16,0.55) 74%, rgba(16,16,16,1) 96%)',
          }}
        />
      </div>
    </div>
  );
};
