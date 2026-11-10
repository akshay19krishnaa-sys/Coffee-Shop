import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ShieldCheck, Compass, ArrowRight } from 'lucide-react';
import { ParallaxImage } from './ParallaxImage';

gsap.registerPlugin(ScrollTrigger);

export const AboutCafe = () => {
  const sectionRef = useRef(null);
  const textContentRef = useRef(null);
  const quoteLineRef = useRef(null);
  const quoteMarkRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // ── HEADING KINETIC REVEAL ──────────────────────────────────────
      const words = headingRef.current?.querySelectorAll('.about-word');
      if (words?.length) {
        gsap.from(words, {
          y: '110%',
          rotateX: -40,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // ── DRAW QUOTE VERTICAL LINE ────────────────────────────────────
      if (quoteLineRef.current) {
        gsap.fromTo(
          quoteLineRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: quoteLineRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // ── ROTATE QUOTE MARK ───────────────────────────────────────────
      if (quoteMarkRef.current) {
        gsap.from(quoteMarkRef.current, {
          scale: 0.3,
          rotate: -45,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteMarkRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // ── PHILOSOPHY PILL CARDS REVEAL ────────────────────────────────
      const pills = textContentRef.current?.querySelectorAll('.philosophy-pill');
      if (pills?.length) {
        gsap.from(pills, {
          opacity: 0,
          y: 30,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pills[0],
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about-cafe"
      ref={sectionRef}
      className="relative min-h-screen bg-[#101010] text-white py-28 sm:py-36 overflow-hidden border-b border-[#F5C518]/12"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#F5C518]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ── ASYMMETRIC IMAGES WITH PARALLAX & CLIP-REVEAL ───────── */}
          <div className="lg:col-span-6 relative">
            {/* Primary main image — reveals from bottom with parallax */}
            <div className="relative z-10 w-[85%] aspect-[4/5] rounded-2xl overflow-hidden border border-[#F5C518]/30 shadow-2xl bg-[#0a0a0a]">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=85&w=1400&auto=format&fit=crop"
                alt="Aura Noir Roastery Architecture"
                className="w-full h-full"
                intensity={0.4}
                clipReveal={true}
                clipFrom="bottom"
                scale={true}
                corners={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 z-20">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#F5C518] px-2.5 py-1 bg-[#101010]/90 rounded border border-[#F5C518]/30 backdrop-blur-sm">
                  FLAGSHIP SANCTUARY // TRIBECA
                </span>
                <p className="font-syne text-sm font-bold text-white mt-1.5">
                  Basalt Monolith & Brass Acoustics
                </p>
              </div>
            </div>

            {/* Overlapping secondary image — reveals from top with reverse parallax */}
            <div className="absolute -bottom-10 -right-2 sm:right-4 w-[60%] aspect-[3/4] rounded-xl overflow-hidden border border-white/20 shadow-2xl z-20 bg-[#121212]">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=85&w=1000&auto=format&fit=crop"
                alt="Artisan Barista Extraction"
                className="w-full h-full"
                intensity={-0.3}
                clipReveal={true}
                clipFrom="top"
                scale={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="text-[9px] font-mono text-[#F5C518] uppercase tracking-wider">
                  MASTER BARISTA EXTRACTION
                </span>
              </div>
            </div>

            {/* Outer gold decorative bracket */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#F5C518]/30 pointer-events-none" />
          </div>

          {/* ── EDITORIAL CONTENT RIGHT ─────────────────────────────── */}
          <div ref={textContentRef} className="lg:col-span-6 space-y-7 pt-10 lg:pt-0">
            {/* Section Tag */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F5C518]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-[#F5C518]">
                ABOUT THE ROASTERY // EST. 2021
              </span>
            </div>

            {/* Kinetic Heading */}
            <div ref={headingRef} className="overflow-hidden" style={{ perspective: '800px' }}>
              <h2 className="font-syne font-black text-3xl sm:text-5xl md:text-5xl uppercase leading-[1.0] tracking-tight">
                {['WHERE', 'BRUTALIST', 'DESIGN'].map((w) => (
                  <span key={w} className="overflow-hidden inline-block mr-2.5">
                    <span className="about-word inline-block">{w}</span>
                  </span>
                ))}
                <span className="overflow-hidden inline-block mr-2.5">
                  <span className="about-word inline-block">MEETS</span>
                </span>
                <span className="overflow-hidden inline-block">
                  <span className="about-word inline-block text-[#F5C518]">SENSORY ALCHEMY</span>
                </span>
              </h2>
            </div>

            {/* Editorial Luxury Quote with drawing vertical line */}
            <div className="relative flex items-start gap-5 py-2">
              <div ref={quoteLineRef} className="w-[2px] self-stretch bg-[#F5C518] shrink-0" />
              <div>
                <span
                  ref={quoteMarkRef}
                  className="font-editorial text-4xl text-[#F5C518]/30 leading-none select-none block -mb-3"
                >
                  "
                </span>
                <blockquote className="font-editorial italic text-lg sm:text-xl text-white/90 leading-relaxed">
                  We strip away the noise of fast-casual cafes to create an acoustic sanctuary where coffee extraction is revered as high design.
                </blockquote>
              </div>
            </div>

            {/* Story Paragraph */}
            <p className="text-sm text-white/65 font-sans-custom leading-relaxed font-light">
              Founded on the belief that peak coffee requires both agronomic obsession and architectural stillness. Every detail of BREW.—from our vibration-dampened basalt stone brewing counters to our custom-engineered flame roasting curves—serves one purpose: presenting the pure unadulterated soul of the coffee seed.
            </p>

            {/* 3 Interactive Philosophy Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="philosophy-pill p-4 rounded-xl bg-[#141414] border border-white/8 hover:border-[#F5C518]/45 transition-colors group">
                <Compass className="w-5 h-5 text-[#F5C518] mb-2 group-hover:rotate-45 transition-transform duration-300" />
                <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-white">
                  Direct Origin
                </h4>
                <p className="text-[11px] text-white/50 mt-1 leading-snug">
                  Purchased +350% above Fair Trade minimums.
                </p>
              </div>

              <div className="philosophy-pill p-4 rounded-xl bg-[#141414] border border-white/8 hover:border-[#F5C518]/45 transition-colors group">
                <ShieldCheck className="w-5 h-5 text-[#F5C518] mb-2 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-white">
                  Volcanic Water
                </h4>
                <p className="text-[11px] text-white/50 mt-1 leading-snug">
                  Calibrated weekly to exact 135 PPM mineral balance.
                </p>
              </div>

              <div className="philosophy-pill p-4 rounded-xl bg-[#141414] border border-white/8 hover:border-[#F5C518]/45 transition-colors group">
                <Award className="w-5 h-5 text-[#F5C518] mb-2 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-white">
                  Micro-Batches
                </h4>
                <p className="text-[11px] text-white/50 mt-1 leading-snug">
                  12kg cast-iron drum roasted weekly on demand.
                </p>
              </div>
            </div>

            {/* Link to Experience */}
            <div className="pt-2">
              <a
                href="#cafe-experience"
                className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F5C518] hover:text-white transition-colors"
              >
                <span>Tour Our Flagship Interior</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
