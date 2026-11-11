import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CafeExperience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-[#101010] text-white py-16 sm:py-20 lg:py-24 my-0 overflow-hidden border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#F5C518]">
                04 // CAFE ATMOSPHERE &amp; EXPERIENCE
              </span>
            </div>
            <h2 className="font-syne font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[0.95]">
              THE BREW. <span className="text-[#F5C518]">EXPERIENCE</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-xs sm:text-sm text-white/70 font-sans-custom leading-relaxed">
              Step inside our sanctuary of tactile basalt stone, ambient acoustics, and precision extraction. A calm space designed for mindful coffee rituals.
            </p>
          </div>
        </div>

        {/* 4 Experience Pillars: Responsive 1 col on mobile, 2 col on tablet, 4 col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-0">
          <div className="p-5 sm:p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#F5C518]">01 // ATMOSPHERE</span>
            <h3 className="font-syne font-bold text-base text-white">Acoustic Sanctuary</h3>
            <p className="text-xs text-white/60 font-sans-custom leading-relaxed">
              Engineered with sound-dampening basalt stone and ambient warm resonance to escape urban noise.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#F5C518]">02 // INTERIOR</span>
            <h3 className="font-syne font-bold text-base text-white">Monolithic Architecture</h3>
            <p className="text-xs text-white/60 font-sans-custom leading-relaxed">
              Minimalist solid walnut seating, under-counter Modbar espresso taps, and warm natural morning light.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#F5C518]">03 // PREPARATION</span>
            <h3 className="font-syne font-bold text-base text-white">Master Craftsmanship</h3>
            <p className="text-xs text-white/60 font-sans-custom leading-relaxed">
              Every morning each single-origin is re-dialed by certified baristas for grind size and water density.
            </p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#F5C518]">04 // HOSPITALITY</span>
            <h3 className="font-syne font-bold text-base text-white">Mindful Ritual</h3>
            <p className="text-xs text-white/60 font-sans-custom leading-relaxed">
              Complimentary tasting notes cards, bespoke cupping flights, and an unhurried sensory experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
