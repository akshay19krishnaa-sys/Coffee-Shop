import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAFE_STATS } from '../data/coffeeData';
import { Thermometer, Sparkles, Scale, RefreshCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);
  const statCardsRef = useRef([]);
  const cardsRef = useRef([]);
  const linesRef = useRef([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // ── STATS CARDS CLIP-PATH REVEAL ────────────────────────────────
      statCardsRef.current.forEach((card, idx) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          {
            clipPath: 'inset(0 0% 0 0)',
            opacity: 1,
            duration: 1.1,
            ease: 'power4.out',
            delay: idx * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── ANIMATED NUMBERS COUNTER ────────────────────────────────────
      statsRef.current.forEach((statEl, index) => {
        if (!statEl) return;
        const targetVal = parseFloat(CAFE_STATS[index].value.replace(/,/g, ''));
        const isDecimal = CAFE_STATS[index].value.includes('.');

        gsap.fromTo(
          statEl,
          { innerText: 0 },
          {
            innerText: targetVal,
            duration: 2.4,
            ease: 'power3.out',
            snap: { innerText: isDecimal ? 0.1 : 1 },
            scrollTrigger: {
              trigger: statEl,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            onUpdate: function () {
              if (isDecimal) {
                statEl.innerText = Number(this.targets()[0].innerText).toFixed(1);
              } else if (targetVal > 999) {
                statEl.innerText = Number(this.targets()[0].innerText).toLocaleString();
              }
            },
          }
        );
      });

      // ── FEATURE CARDS ENTRANCE + LINE DRAW ──────────────────────────
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const line = linesRef.current[idx];

        // Card fade up
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        // Top border line draws from left to right
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 1.2,
              ease: 'power4.out',
              delay: 0.2,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Thermometer className="w-6 h-6 text-[#F5C518]" />,
      title: 'PID Dual Boiler Thermal Control',
      desc: 'Extraction water temperature calibrated to ±0.2°C stability, extracting delicate floral notes without burning organic lipids.'
    },
    {
      icon: <Scale className="w-6 h-6 text-[#F5C518]" />,
      title: 'Cryogenic Burr Grinding',
      desc: 'Beans are cryogenically conditioned prior to grinding on 98mm titanium flat burrs, eliminating friction heat degradation.'
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-[#F5C518]" />,
      title: 'Nitrogen-Flushed Aging Lab',
      desc: 'Reserve lots undergo 14 days of pressurized resting in nitrogen-purged tanks to allow trapped CO2 to stabilize completely.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#F5C518]" />,
      title: 'Q-Grader Sensory Verification',
      desc: 'Every roasted drum is sampled across 5 cupping bowls to score aroma, body, acidity, and aftertaste before packaging.'
    }
  ];

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative min-h-screen bg-[#101010] text-white py-20 sm:py-28 lg:py-32 overflow-hidden border-b border-[#F5C518]/12"
    >
      {/* Background dot grid */}
      <div className="absolute inset-0 bg-grid-dots opacity-30 pointer-events-none" />

      {/* Yellow ambient glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#F5C518]/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181818] border border-[#F5C518]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#F5C518]">
              03 // WHY CHOOSE BREW.
            </span>
          </div>

          <h2 className="font-syne font-black text-[clamp(1.75rem,6.5vw,4.5rem)] uppercase tracking-tight leading-[0.92]">
            WHY THE CONNOISSEUR <span className="text-[#F5C518]">CHOOSES US</span>
          </h2>

          <p className="text-sm sm:text-base text-white/60 font-sans-custom font-light max-w-xl mx-auto">
            We abandon mass-market shortcuts in pursuit of the ultimate espresso cup. Our engineering standards leave zero variables to chance.
          </p>
        </div>

        {/* ── 4 STATS CARDS WITH CLIP-PATH REVEAL & LARGE DECORATIVE NUMBERS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14 sm:mb-20">
          {CAFE_STATS.map((stat, idx) => (
            <div
              key={stat.label}
              ref={(el) => (statCardsRef.current[idx] = el)}
              className="relative p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/8 hover:border-[#F5C518]/50 transition-all duration-500 text-center group hover:-translate-y-1 overflow-hidden"
            >
              {/* Large decorative index number in background */}
              <span
                className="absolute top-2 right-3 font-syne font-black text-6xl text-white/[0.04] group-hover:text-[#F5C518]/10 transition-colors select-none pointer-events-none"
              >
                0{idx + 1}
              </span>

              {/* Number + Unit */}
              <div className="relative z-10 flex items-baseline justify-center gap-1 font-syne font-black text-4xl sm:text-5xl md:text-6xl text-white group-hover:text-[#F5C518] transition-colors">
                <span ref={(el) => (statsRef.current[idx] = el)}>0</span>
                <span className="text-[#F5C518] text-xl sm:text-2xl font-mono">{stat.unit}</span>
              </div>

              {/* Label */}
              <h4 className="relative z-10 font-syne font-bold text-xs sm:text-sm text-white mt-3 uppercase tracking-wider">
                {stat.label}
              </h4>

              {/* Description */}
              <p className="relative z-10 text-[11px] text-white/50 font-sans-custom mt-1 leading-snug">
                {stat.desc}
              </p>

              {/* Subtle yellow bottom line on hover */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F5C518] group-hover:w-full transition-all duration-500 ease-out" />
            </div>
          ))}
        </div>

        {/* ── 4 FEATURE ENGINEERING CARDS WITH DRAWING ACCENT LINES ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat, idx) => (
            <div
              key={feat.title}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="relative p-8 rounded-2xl bg-[#141414] border border-white/8 hover:border-[#F5C518]/50 transition-all duration-500 flex flex-col sm:flex-row gap-5 group overflow-hidden"
            >
              {/* Drawing top accent line */}
              <div
                ref={(el) => (linesRef.current[idx] = el)}
                className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#F5C518] via-[#FFDF40] to-transparent"
              />

              {/* Icon Container */}
              <div className="w-14 h-14 rounded-xl bg-[#101010] border border-[#F5C518]/30 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-[#F5C518] transition-all duration-300">
                {feat.icon}
              </div>

              {/* Content */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-syne font-bold text-lg text-white group-hover:text-[#F5C518] transition-colors">
                    {feat.title}
                  </h3>
                  <span className="text-xs font-mono text-white/20">0{idx + 1}</span>
                </div>
                <p className="text-sm text-white/60 font-sans-custom font-light leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
