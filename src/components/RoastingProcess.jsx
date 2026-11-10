import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const RoastingProcess = () => {
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
      // Text reveal
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

      // Image clip-path reveal
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
      id="roasting"
      ref={sectionRef}
      className="relative min-h-screen bg-[#0d0d0d] text-white py-20 sm:py-28 lg:py-36 overflow-hidden border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Alternating Layout: Strong Image on Left, Editorial Text on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: One Strong Relevant Image (Artisanal Drum Roaster) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div
              ref={imageContainerRef}
              className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#151515] aspect-[16/10] sm:aspect-[4/3] lg:aspect-[4/5] shadow-2xl group"
            >
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?q=85&w=1400&auto=format&fit=crop"
                alt="Cast-iron drum roaster with freshly roasted coffee beans"
                className="w-full h-[115%] -top-[7%] relative object-cover object-center filter brightness-90 contrast-110 group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/90 via-transparent to-black/20 pointer-events-none" />

              {/* Minimal Image Tag */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F5C518] mb-1">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Micro-Batch Thermodynamics</span>
                  </div>
                  <p className="font-syne font-bold text-base sm:text-lg text-white">
                    Custom Cast-Iron Drum Roaster
                  </p>
                  <p className="text-[11px] sm:text-xs text-white/60 font-mono mt-0.5">
                    Continuous RoR Probe Tracking • 90s Rapid Cool
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text Content */}
          <div ref={textRef} className="lg:col-span-6 space-y-6 sm:space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#F5C518]">
                02 // ROASTING CRAFT
              </span>
            </div>

            <h2 className="font-syne font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[0.95]">
              THE ART OF THE <span className="text-[#F5C518]">PERFECT ROAST.</span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-white/80 font-sans-custom font-light leading-relaxed">
              Roasting is precision thermodynamics. We roast exclusively in 12kg micro-batches, logging Rate of Rise (RoR) within 0.1°C to guide green seeds through the drying, browning, and cracking phases, unlocking over 800 distinct aromatic flavor compounds.
            </p>

            <div className="space-y-5 sm:space-y-6 pt-4 border-t border-white/10">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-syne font-bold text-base sm:text-lg text-white">Light Roast (198°C — 202°C)</h3>
                  <span className="text-xs font-mono text-[#F5C518]">Bright & Floral</span>
                </div>
                <p className="text-xs sm:text-sm text-white/70 font-sans-custom font-light leading-relaxed">
                  Dropped right after First Crack. Preserves delicate jasmine, white peach, and sparkling citric acidity. Perfect for pour-over and single-origins.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-syne font-bold text-base sm:text-lg text-white">Medium Roast (206°C — 210°C)</h3>
                  <span className="text-xs font-mono text-[#F5C518]">Caramel & Balanced</span>
                </div>
                <p className="text-xs sm:text-sm text-white/70 font-sans-custom font-light leading-relaxed">
                  The harmonic apex where sugars caramelize smoothly against origin acidity. Rich milk chocolate, toasted hazelnut, and deep honey body.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-syne font-bold text-base sm:text-lg text-white">Dark Roast (214°C — 218°C)</h3>
                  <span className="text-xs font-mono text-[#F5C518]">Velvety & Bold</span>
                </div>
                <p className="text-xs sm:text-sm text-white/70 font-sans-custom font-light leading-relaxed">
                  Extended development into second crack. Intense dark cacao, molasses, and toasted pecan oils with a dense, syrupy mouthfeel and low acidity.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#brewing"
                className="group inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-[#F5C518] hover:text-white transition-colors cursor-pointer min-h-[44px]"
              >
                <span>EXPLORE BREWING STANDARDS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
