import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CoffeeOrigin = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Progressive text entrance
      gsap.from(textRef.current?.children, {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
      });

      // Progressive image reveal
      if (imageContainerRef.current) {
        gsap.fromTo(
          imageContainerRef.current,
          { clipPath: 'inset(12% 0% 12% 0%)', opacity: 0.7 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Parallax on image inside container
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative min-h-screen bg-[#101010] text-white py-20 sm:py-28 lg:py-36 overflow-hidden border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Alternating Layout: Text on Left, One Strong Relevant Image on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Text Content */}
          <div ref={textRef} className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#F5C518]">
                01 // OUR STORY
              </span>
            </div>

            <h2 className="font-syne font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[0.95]">
              IT STARTS WITH <span className="text-[#F5C518]">THE BEAN.</span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-white/80 font-sans-custom font-light leading-relaxed">
              Exceptional coffee is born in volcanic mountain soils, steep elevations, and the disciplined hands of generational farmers. We source our beans exclusively from world-renowned terroirs in Huila (Colombia), Yirgacheffe (Ethiopia), and Boquete (Panama).
            </p>

            <div className="space-y-5 sm:space-y-6 pt-4 border-t border-white/10">
              <div>
                <h3 className="font-syne font-bold text-base sm:text-lg text-white mb-1.5">
                  High-Altitude Terroir
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-sans-custom font-light leading-relaxed">
                  Cultivated between 1,800 and 2,350 meters above sea level, cold mountain nights slow cherry maturation, concentrating complex organic sugars and floral aromatics within every seed.
                </p>
              </div>

              <div>
                <h3 className="font-syne font-bold text-base sm:text-lg text-white mb-1.5">
                  Meticulous Hand Selection
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-sans-custom font-light leading-relaxed">
                  Zero machine stripping. Every cherry is handpicked at peak ripeness (22° Brix optical sugar density) and density-sorted so only the top 3% flawless specialty beans reach our roastery.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#roasting"
                className="group inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-[#F5C518] hover:text-white transition-colors cursor-pointer min-h-[44px]"
              >
                <span>DISCOVER OUR ROASTING CRAFT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: One Strong Relevant Image (Lush Origin Photography) */}
          <div className="lg:col-span-6">
            <div
              ref={imageContainerRef}
              className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#151515] aspect-[16/10] sm:aspect-[4/3] lg:aspect-[4/5] shadow-2xl group"
            >
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=85&w=1400&auto=format&fit=crop"
                alt="Highland specialty coffee harvest and beans"
                className="w-full h-[115%] -top-[7%] relative object-cover object-center filter brightness-95 contrast-105 group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/90 via-transparent to-black/20 pointer-events-none" />

              {/* Minimal Editorial Image Caption */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F5C518] mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Huila Highland Estate, Colombia</span>
                  </div>
                  <p className="font-syne font-bold text-lg text-white">
                    Pink Bourbon & Caturra Microlot
                  </p>
                  <p className="text-xs text-white/60 font-mono mt-0.5">
                    Elevation: 2,100 MASL • Anaerobic Natural
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
