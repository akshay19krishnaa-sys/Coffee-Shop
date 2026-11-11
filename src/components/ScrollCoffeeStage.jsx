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
 * Zero chrome, zero buttons, zero telemetry widgets — renders decoded extracted frames
 * with subtle radial edge feathering, ambient rim light, and delicate rising steam wisps.
 */
export const ScrollCoffeeStage = ({
  frameNumberRef,
  fallbackFrame = 1,
  showSteam = true,
  className = '',
}) => {
  const wrapRef = useRef(null);
  const floatRef = useRef(null);
  const canvasRef = useRef(null);
  const lastDrawnUrlRef = useRef('');
  const lastCanvasSizeRef = useRef({ width: 0, height: 0 });

  // Gentle organic floating breath (pauses cleanly when prefers-reduced-motion is set)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !floatRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.to(floatRef.current, {
        y: -10,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, floatRef);

    return () => ctx.revert();
  }, []);

  // Main requestAnimationFrame canvas draw synced cleanly to scroll frameNumberRef
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

    // Seed initial opening frame immediately
    const initialUrl = buildMenuFrameUrl(
      Math.max(1, Math.min(MENU_FRAME_TOTAL, Math.round(fallbackFrame)))
    );
    loadFrameImage(initialUrl);

    const findNearestDecodedFrame = (targetNumber) => {
      const clamped = Math.max(1, Math.min(MENU_FRAME_TOTAL, Math.round(targetNumber)));
      const targetUrl = buildMenuFrameUrl(clamped);
      const exact = getCachedFrameImage(targetUrl);
      if (exact) return { img: exact, url: targetUrl };

      // Trigger priority decode for requested frame if not yet in flight
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

      // Strict aspect-ratio containment (never stretches or crops cup or liquid splash)
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

  return (
    <div ref={wrapRef} className={`relative aspect-square select-none ${className}`}>
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
            <div className="w-8 h-24 rounded-full bg-gradient-to-t from-white/15 via-white/10 to-transparent blur-xl animate-[pulse_4.5s_ease-in-out_infinite]" />
            <div className="w-10 h-28 rounded-full bg-gradient-to-t from-[#F5C518]/15 via-white/10 to-transparent blur-2xl animate-[pulse_5.5s_ease-in-out_1.2s_infinite]" />
            <div className="w-7 h-20 rounded-full bg-gradient-to-t from-white/12 via-white/5 to-transparent blur-xl animate-[pulse_4s_ease-in-out_2s_infinite]" />
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

