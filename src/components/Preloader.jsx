import { useEffect, useState } from 'react';

export const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              onComplete?.();
            }, 600);
          }, 200);
          return 100;
        }
        // Smooth logarithmic increments
        const jump = Math.max(1, Math.floor((100 - prev) * 0.2) + Math.floor(Math.random() * 6));
        return Math.min(100, prev + jump);
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0d0d0d] flex flex-col justify-between p-8 sm:p-12 transition-opacity duration-700 pointer-events-none ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Top Branding Pill */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F5C518] animate-ping" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#F5C518]">
            CALIBRATING EXTRACTION
          </span>
        </div>
        <span className="text-[11px] font-mono text-white/40 tracking-widest">
          HARVEST 2026 // EST. TRIBECA
        </span>
      </div>

      {/* Center Wordmark */}
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="font-syne font-black text-6xl sm:text-8xl tracking-[0.15em] text-white">
          BREW<span className="text-[#F5C518]">.</span>
        </h1>
        <p className="font-mono text-xs sm:text-sm text-[#F5C518] uppercase tracking-[0.4em] font-semibold">
          COFFEE • CRAFTED • CULTURE
        </p>
      </div>

      {/* Bottom Progress Bar & Percentage */}
      <div className="max-w-md w-full mx-auto space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-white/60">
          <span className="tracking-widest uppercase text-[10px]">9.2 Bar Pressure Ready</span>
          <span className="text-[#F5C518] font-bold">{progress}%</span>
        </div>

        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#F5C518] transition-all duration-75 ease-out rounded-full shadow-[0_0_12px_#F5C518]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

