import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GALLERY_ITEMS } from '../data/coffeeData';
import { Maximize2, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CafeExperience = () => {
  const sectionRef = useRef(null);
  const galleryGridRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = galleryGridRef.current?.querySelectorAll('.gallery-item');
      if (items) {
        gsap.from(items, {
          opacity: 0,
          y: 40,
          scale: 0.96,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: galleryGridRef.current,
            start: 'top 80%',
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen bg-[#101010] text-white py-20 sm:py-28 lg:py-36 overflow-hidden border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#F5C518]">
                05 // CAFE EXPERIENCE & GALLERY
              </span>
            </div>
            <h2 className="font-syne font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[0.95]">
              THE BREW. <span className="text-[#F5C518]">EXPERIENCE</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-xs sm:text-sm text-white/70 font-sans-custom leading-relaxed">
              Step inside our sanctuary of tactile basalt stone, ambient acoustics, and precision extraction. A calm space designed for mindful coffee rituals. Tap any image to inspect details.
            </p>
          </div>
        </div>

        {/* 4 Experience Pillars: Responsive 1 col on mobile, 2 col on tablet, 4 col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
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

        {/* Asymmetric Gallery Masonry Grid - 1 Col on Mobile, Multi-col on Tablet & Desktop */}
        <div
          ref={galleryGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 sm:gap-6 auto-rows-[240px] sm:auto-rows-[280px] md:auto-rows-[320px]"
        >
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className={`gallery-item col-span-1 ${item.span} relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#F5C518] group cursor-pointer transition-all duration-300 bg-[#0d0d0d]`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 filter brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Top Tag & Zoom Icon */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-[#101010]/80 border border-white/15 text-[#F5C518] backdrop-blur-sm">
                  {item.category}
                </span>
                <div className="min-w-[36px] min-h-[36px] w-9 h-9 rounded-full bg-[#101010]/80 border border-white/20 flex items-center justify-center text-white/80 group-hover:border-[#F5C518] group-hover:text-[#F5C518] transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 z-10 transform group-hover:-translate-y-1 transition-transform">
                <h3 className="font-syne font-bold text-base sm:text-lg text-white group-hover:text-[#F5C518] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-white/60 font-sans-custom mt-0.5 line-clamp-1">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Lightbox Modal with Responsive Layout & Touch Targets */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[92vh] overflow-y-auto bg-[#141414] border border-[#F5C518]/40 rounded-2xl shadow-2xl flex flex-col md:flex-row no-scrollbar"
          >
            <div className="md:w-3/5 relative aspect-[4/3] sm:aspect-auto sm:min-h-[320px] md:min-h-[440px]">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#101010] text-[#F5C518] border border-[#F5C518]/30">
                  {selectedImage.category}
                </span>
              </div>
            </div>

            <div className="md:w-2/5 p-5 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#F5C518]">
                    BREW. PERSPECTIVE
                  </span>
                  <button
                    onClick={() => setSelectedImage(null)}
                    aria-label="Close Lightbox"
                    className="min-w-[44px] min-h-[44px] -mr-2 p-2 rounded text-white/60 hover:text-white cursor-pointer flex items-center justify-center"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="font-syne font-bold text-xl sm:text-2xl text-white mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-sans-custom leading-relaxed mb-4 font-light">
                  {selectedImage.caption}
                </p>

                <div className="space-y-1.5 text-xs font-mono text-white/50 border-t border-white/10 pt-3">
                  <p>LOCATION: Flagship Tribeca Roastery</p>
                  <p>ATMOSPHERE: Acoustic Damped Basalt</p>
                  <p>EXTRACTION: 9.2 Bar Saturated</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedImage(null)}
                className="mt-6 w-full min-h-[44px] py-3 rounded bg-[#F5C518] text-[#101010] font-syne font-bold text-xs uppercase tracking-wider hover:bg-[#FFDF40] transition-colors cursor-pointer flex items-center justify-center"
              >
                Close Perspective
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
