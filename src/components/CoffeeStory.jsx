import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COFFEE_STORY_STEPS } from '../data/coffeeData';

gsap.registerPlugin(ScrollTrigger);

export const CoffeeStory = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const imagesRef = useRef([]);
  const textsRef = useRef([]);
  const numbersRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const sections = sectionsRef.current.filter(Boolean);
      const images = imagesRef.current.filter(Boolean);

      // For each section, create a stacked pinned scroll experience
      sections.forEach((section, i) => {
        if (!section) return;

        const img = images[i];
        const textEl = textsRef.current[i];
        const numberEl = numbersRef.current[i];

        // ── PINNED SECTION ────────────────────────────────────────────
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: i < sections.length - 1,
          anticipatePin: 1,
        });

        // ── TEXT LINE REVEALS ─────────────────────────────────────────
        const lines = textEl?.querySelectorAll('.story-line');
        if (lines?.length) {
          gsap.from(lines, {
            y: '110%',
            duration: 1.0,
            ease: 'power4.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: section,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        // ── BIG NUMBER REVEAL ─────────────────────────────────────────
        if (numberEl) {
          gsap.from(numberEl, {
            x: -60,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        // ── IMAGE SCALE/BLUR TRANSITION FOR EACH SECTION ─────────────
        if (i < sections.length - 1 && img) {
          gsap.to(img, {
            scale: 1.08,
            filter: 'brightness(0.4) blur(4px)',
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: section,
              start: '80% top',
              end: '100% top',
              scrub: 0.5,
            },
          });
        }

        // ── NEXT SECTION SLIDE IN (clip-path from bottom) ─────────────
        if (i > 0) {
          gsap.fromTo(
            section,
            { clipPath: 'inset(100% 0 0 0)' },
            {
              clipPath: 'inset(0% 0 0 0)',
              ease: 'power4.inOut',
              duration: 1,
              scrollTrigger: {
                trigger: sections[i - 1],
                start: '70% top',
                end: '100% top',
                scrub: 0.6,
              },
            }
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const bgImages = [
    'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?q=80&w=1600&auto=format&fit=crop',
  ];

  return (
    <div id="story" ref={containerRef} className="relative">
      {COFFEE_STORY_STEPS.map((step, i) => (
        <section
          key={step.step}
          ref={(el) => (sectionsRef.current[i] = el)}
          className="relative h-screen min-h-[700px] w-full overflow-hidden bg-[#101010] flex items-center"
          style={{
            zIndex: 10 + i,
            clipPath: i === 0 ? 'none' : 'inset(100% 0 0 0)',
          }}
        >
          {/* Full-bleed background image */}
          <div className="absolute inset-0">
            <img
              ref={(el) => (imagesRef.current[i] = el)}
              src={bgImages[i]}
              alt={step.title}
              className="w-full h-full object-cover will-change-transform"
              style={{
                filter: 'brightness(0.3) saturate(0.8)',
                transformOrigin: 'center center',
              }}
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#101010] via-[#101010]/70 to-[#101010]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/80 to-transparent" />
            {/* Yellow tint overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(245,197,24,0.06)_0%,transparent_60%)]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left — big chapter number */}
            <div className="lg:col-span-4 flex items-center justify-start">
              <div
                ref={(el) => (numbersRef.current[i] = el)}
                className="relative select-none"
              >
                {/* Large decorative number */}
                <span
                  className="font-syne font-black text-[160px] sm:text-[200px] leading-none text-transparent select-none"
                  style={{
                    WebkitTextStroke: '1px rgba(245,197,24,0.15)',
                    letterSpacing: '-0.05em',
                  }}
                >
                  {step.step}
                </span>

                {/* Yellow accent line */}
                <div className="absolute -bottom-2 left-0 w-16 h-[2px] bg-[#F5C518]" />
              </div>
            </div>

            {/* Right — story content */}
            <div
              ref={(el) => (textsRef.current[i] = el)}
              className="lg:col-span-8 space-y-6 overflow-hidden"
            >
              {/* Chapter badge */}
              <div className="story-line overflow-hidden">
                <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-[#F5C518] border border-[#F5C518]/30 px-3 py-1 rounded-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
                  {step.badge}
                </span>
              </div>

              {/* Main heading */}
              <div className="story-line overflow-hidden" style={{ perspective: '800px' }}>
                <h2
                  className="font-syne font-black text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight leading-[0.9]"
                >
                  {step.title}
                </h2>
              </div>

              {/* Italic subtitle */}
              <div className="story-line overflow-hidden">
                <p className="font-editorial italic text-lg sm:text-xl text-[#F5C518]/90">
                  {step.subtitle}
                </p>
              </div>

              {/* Description */}
              <div className="story-line overflow-hidden">
                <p className="text-sm sm:text-base text-white/65 leading-relaxed max-w-xl font-light font-sans-custom">
                  {step.description}
                </p>
              </div>

              {/* Highlight note */}
              <div className="story-line overflow-hidden">
                <div className="flex items-start gap-3 pt-4 border-t border-white/10">
                  {/* Yellow vertical line */}
                  <div className="w-[2px] h-8 bg-[#F5C518] mt-0.5 shrink-0" />
                  <p className="text-xs font-mono text-[#F5C518] uppercase tracking-wider leading-relaxed">
                    {step.highlight}
                  </p>
                </div>
              </div>

              {/* Progress dots */}
              <div className="story-line flex items-center gap-3 pt-2">
                {COFFEE_STORY_STEPS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-[2px] rounded-full transition-all duration-500 ${idx === i ? 'w-10 bg-[#F5C518]' : 'w-3 bg-white/20'
                      }`}
                  />
                ))}
                <span className="text-[10px] font-mono text-white/40 ml-2 uppercase tracking-wider">
                  {String(i + 1).padStart(2, '0')} / {String(COFFEE_STORY_STEPS.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Section label - top right corner */}
          <div className="absolute top-8 right-8 text-right hidden sm:block">
            <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-white/30">
              BREW. // ROAST ARCHIVE
            </p>
            <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#F5C518]/60 mt-0.5">
              {step.badge.split('//')[0].trim()}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
};
