import { useState, useRef } from 'react';
import { TESTIMONIALS } from '../data/coffeeData';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRef = useRef(null);
  const sectionRef = useRef(null);

  const current = TESTIMONIALS[activeIndex];

  const handleNext = () => {
    animateTransition((activeIndex + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    animateTransition((activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const animateTransition = (newIdx) => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setActiveIndex(newIdx);
          gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
          );
        }
      });
    } else {
      setActiveIndex(newIdx);
    }
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative min-h-[70vh] flex items-center bg-[#101010] text-white py-16 sm:py-24 overflow-hidden border-b border-white/5"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F5C518]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] border border-[#F5C518]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#F5C518]">
              05 // DEMO CUSTOMER REVIEWS
            </span>
          </div>
          <h2 className="font-syne font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
            TESTED BY THE <span className="text-[#F5C518]">PALATE ELITE</span>
          </h2>
          <p className="text-xs font-mono text-white/50 uppercase tracking-widest">
            Representative Demo Reviews for Showcase
          </p>
        </div>

        {/* Testimonial Card */}
        <div
          ref={cardRef}
          className="relative p-6 sm:p-10 md:p-14 rounded-3xl bg-[#141414] border border-[#F5C518]/30 shadow-2xl overflow-hidden"
        >
          {/* Subtle Quote icon */}
          <Quote className="absolute top-6 right-6 sm:top-8 sm:right-8 w-12 sm:w-16 h-12 sm:h-16 text-[#F5C518]/10 pointer-events-none" />

          {/* Star rating & verified badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
            <div className="flex items-center gap-1.5 text-[#F5C518]">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#F5C518] text-[#F5C518]" />
              ))}
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#101010] border border-[#F5C518]/30 text-[#F5C518] text-[10px] sm:text-[11px] font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Tasting // {current.accent}</span>
            </div>
          </div>

          {/* Testimonial Quote Text */}
          <blockquote className="font-editorial italic text-lg sm:text-2xl md:text-3xl text-white leading-relaxed mb-8 sm:mb-10 font-normal">
            "{current.quote}"
          </blockquote>

          {/* Author Details and Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
            <div>
              <h4 className="font-syne font-bold text-base sm:text-lg text-white">
                {current.author}
              </h4>
              <p className="text-xs text-[#F5C518] font-mono mt-0.5">
                {current.role}
              </p>
              <p className="text-[11px] text-white/40 font-mono">
                {current.location}
              </p>
            </div>

            {/* Carousel navigation controls with 44px touch targets */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <div className="flex items-center gap-1.5 mr-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => animateTransition(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`min-h-[24px] flex items-center cursor-pointer`}
                  >
                    <span className={`block h-1.5 rounded-full transition-all duration-300 ${
                      activeIndex === i ? 'w-6 bg-[#F5C518]' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`} />
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Testimonial"
                  className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border border-white/15 bg-[#101010] flex items-center justify-center text-white/80 hover:text-[#F5C518] hover:border-[#F5C518] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Next Testimonial"
                  className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border border-white/15 bg-[#101010] flex items-center justify-center text-white/80 hover:text-[#F5C518] hover:border-[#F5C518] transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
