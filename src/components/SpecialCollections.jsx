import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { SPECIAL_COLLECTIONS } from '../data/coffeeData';

gsap.registerPlugin(ScrollTrigger);

export const SpecialCollections = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.collection-card');
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { clipPath: 'inset(10% 0% 10% 0%)', opacity: 0, y: 30 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            y: 0,
            stagger: 0.14,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="relative bg-[#0d0d0d] text-white py-20 sm:py-28 lg:py-32 overflow-hidden border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#F5C518]">
                02 // CURATED ROASTS
              </span>
            </div>
            <h2 className="font-syne font-black text-[clamp(1.75rem,6vw,3.75rem)] uppercase tracking-tight text-white leading-[0.95]">
              SPECIAL <span className="text-[#F5C518]">COLLECTIONS.</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-white/70 font-sans-custom font-light leading-relaxed">
            Explore our three dedicated craft families — each roasted in micro-batches and brewed to highlight distinct origin profiles.
          </p>
        </div>

        {/* 3 Collection Cards: 1-col mobile, 2-col tablet, 3-col laptop/desktop */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SPECIAL_COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              to={`/menu?category=${col.id}`}
              className="collection-card group relative rounded-3xl overflow-hidden border border-white/10 hover:border-[#F5C518]/60 bg-[#141414] aspect-[4/5] sm:aspect-[3/4] flex flex-col justify-end p-6 sm:p-8 shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Background Image with Hover Zoom */}
              <img
                src={col.image}
                alt={col.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-75 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/60 to-transparent pointer-events-none" />

              {/* Top Badge */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full bg-[#101010]/85 border border-white/15 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-[#F5C518]">
                  {col.badge}
                </span>
                <span className="text-[11px] font-mono text-white/80 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  {col.itemCount}
                </span>
              </div>

              {/* Card Copy */}
              <div className="relative z-10 space-y-2.5">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#F5C518]">
                  {col.subtitle}
                </p>
                <h3 className="font-syne font-black text-2xl sm:text-3xl text-white uppercase tracking-tight group-hover:text-[#F5C518] transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/75 font-sans-custom font-light leading-relaxed">
                  {col.description}
                </p>

                <div className="pt-3 inline-flex items-center gap-2 text-xs font-syne font-bold uppercase tracking-widest text-[#F5C518]">
                  <span>Browse Collection</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

