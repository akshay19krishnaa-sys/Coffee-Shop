import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { SIGNATURE_COFFEES } from '../data/coffeeData';
import { CoffeeCard } from './CoffeeCard';

gsap.registerPlugin(ScrollTrigger);

export const FeaturedCoffees = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const featuredItems = SIGNATURE_COFFEES.filter((c) => c.featured).slice(0, 3);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.featured-card');
      if (cards?.length) {
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          stagger: 0.14,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="featured"
      ref={sectionRef}
      className="relative bg-[#101010] text-white py-20 sm:py-28 lg:py-32 overflow-hidden border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#F5C518]">
                01 // BEST SELLING COFFEES
              </span>
            </div>
            <h2 className="font-syne font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[0.95]">
              FEATURED <span className="text-[#F5C518]">POURS.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="max-w-sm text-xs sm:text-sm text-white/70 font-sans-custom font-light leading-relaxed">
              Our most ordered single-origin espressos, 24-hour Kyoto drips, and signature house drinks — pulled fresh to order.
            </p>
            <Link
              to="/menu"
              className="group min-h-[44px] px-5 py-2.5 rounded border border-[#F5C518]/50 text-[#F5C518] hover:bg-[#F5C518] hover:text-[#101010] font-syne font-bold text-xs uppercase tracking-widest transition-all inline-flex items-center justify-center gap-2 shrink-0"
            >
              <span>FULL MENU</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Best Sellers Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredItems.map((coffee) => (
            <div key={coffee.id} className="featured-card">
              <CoffeeCard coffee={coffee} className="h-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

