import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Droplet } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ArtOfBrewing = () => {
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
      id="brewing"
      ref={sectionRef}
      className="relative min-h-screen bg-[#101010] text-white py-20 sm:py-28 lg:py-36 overflow-hidden border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Alternating Layout: Editorial Text on Left, Strong Relevant Image on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Text Content */}
          <div ref={textRef} className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#F5C518]">
                03 // BREWING EXTRACTION
              </span>
            </div>

            <h2 className="font-syne font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[0.95]">
              PRECISION IN <span className="text-[#F5C518]">EVERY POUR.</span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-white/80 font-sans-custom font-light leading-relaxed">
              Brewing is where physics meets the palate. By calibrating water mineral density (135 PPM volcanic reverse osmosis), temperature stability (±0.2°C PID), and saturated group pressure, we reveal the unique personality locked within each roast.
            </p>

            <div className="space-y-5 sm:space-y-6 pt-4 border-t border-white/10">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-syne font-bold text-base sm:text-lg text-white">9.2-Bar Saturated Espresso</h3>
                  <span className="text-xs font-mono text-[#F5C518]">28s Extraction</span>
                </div>
                <p className="text-xs sm:text-sm text-white/70 font-sans-custom font-light leading-relaxed">
                  High saturated pressure emulsifies insoluble coffee lipids into micro-bubbles, generating dense amber tiger crema and a velvety, syrupy dark chocolate body.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-syne font-bold text-base sm:text-lg text-white">V60 Precision Pour-Over</h3>
                  <span className="text-xs font-mono text-[#F5C518]">Gravity Filtration</span>
                </div>
                <p className="text-xs sm:text-sm text-white/70 font-sans-custom font-light leading-relaxed">
                  Concentric spiral pours through pleated filter paper highlight origin florals, Meyer lemon acidity, and tea-like clarity with zero sediment.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-syne font-bold text-base sm:text-lg text-white">Kyoto Slow Cold Drip</h3>
                  <span className="text-xs font-mono text-[#F5C518]">18-Hour Drop-By-Drop</span>
                </div>
                <p className="text-xs sm:text-sm text-white/70 font-sans-custom font-light leading-relaxed">
                  Extracted drop-by-drop through hand-blown Japanese glass towers. Cold water gently draws sweet sugars with near-zero bitterness and a smooth, liquor-like finish.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#menu"
                className="group inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-[#F5C518] hover:text-white transition-colors cursor-pointer min-h-[44px]"
              >
                <span>VIEW OUR SIGNATURE MENU</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: One Strong Relevant Image (Artisanal Pour-Over / Extraction) */}
          <div className="lg:col-span-6">
            <div
              ref={imageContainerRef}
              className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#151515] aspect-[16/10] sm:aspect-[4/3] lg:aspect-[4/5] shadow-2xl group"
            >
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=85&w=1400&auto=format&fit=crop"
                alt="Precision barista pour-over coffee extraction"
                className="w-full h-[115%] -top-[7%] relative object-cover object-center filter brightness-95 contrast-110 group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/90 via-transparent to-black/20 pointer-events-none" />

              {/* Minimal Image Tag */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F5C518] mb-1">
                    <Droplet className="w-3.5 h-3.5" />
                    <span>Single-Origin Extraction Lab</span>
                  </div>
                  <p className="font-syne font-bold text-lg text-white">
                    V60 Hand Drip & 9.2 Bar Modbar Taps
                  </p>
                  <p className="text-xs text-white/60 font-mono mt-0.5">
                    135 PPM Volcanic Water • Daily Dial Calibration
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
