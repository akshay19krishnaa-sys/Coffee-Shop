import { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ShoppingBag, Sparkles } from 'lucide-react';
import { MENU_CATEGORIES, SIGNATURE_COFFEES } from '../data/coffeeData';
import { CoffeeCard } from '../components/CoffeeCard';
import { MenuShowcase } from '../components/MenuShowcase';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

export const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawCategory = searchParams.get('category') || 'all';
  const activeCategory = MENU_CATEGORIES.some((c) => c.id === rawCategory) ? rawCategory : 'all';

  const { cartCount, cartSubtotal, openDrawer } = useCart();
  const bannerRef = useRef(null);
  const gridRef = useRef(null);

  const filteredCoffees =
    activeCategory === 'all'
      ? SIGNATURE_COFFEES
      : SIGNATURE_COFFEES.filter((coffee) => coffee.category === activeCategory);

  const handleCategoryChange = (categoryId) => {
    if (categoryId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  // Banner initial reveal
  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.banner-reveal'), {
        opacity: 0,
        y: 28,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Card stagger animation on category change
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll('.menu-card-item');
      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 24, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.06,
            duration: 0.55,
            ease: 'power3.out',
            clearProps: 'transform',
          }
        );
      }
    }, grid);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#101010] text-white pt-20 sm:pt-24">
      {/* ── 1. EDITORIAL MENU HEADER BANNER ── */}
      <section
        ref={bannerRef}
        className="relative overflow-hidden border-b border-white/10 bg-[#0d0d0d] py-8 sm:py-12"
      >
        {/* Crisp Coffee Background Visual */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=85&w=2000&auto=format&fit=crop"
            alt="Specialty coffee beans and craft brewing background"
            className="w-full h-full object-cover object-center opacity-25 filter contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#101010]/85 via-[#101010]/65 to-[#0d0d0d]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb & Demo Pricing Pill */}
          <div className="banner-reveal flex flex-wrap items-center justify-between gap-4 mb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-white/70 hover:text-[#F5C518] transition-colors min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151515]/90 border border-[#F5C518]/30 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-[#F5C518]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demo Menu &amp; Sample Pricing</span>
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div className="space-y-3 max-w-2xl">
              <div className="banner-reveal inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#F5C518]">
                  CURATED COFFEE OFFERINGS
                </span>
              </div>

              <h1 className="banner-reveal font-syne font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[0.92]">
                THE <span className="text-[#F5C518]">MENU.</span>
              </h1>

              <p className="banner-reveal text-sm sm:text-base text-white/80 font-sans-custom font-light leading-relaxed">
                Explore our signature flagship pours on the interactive stage below, or filter our full collection by roast and extraction craft.
              </p>
            </div>

            {/* Active Bag Summary CTA */}
            <div className="banner-reveal">
              <button
                type="button"
                onClick={openDrawer}
                className="w-full sm:w-auto min-h-[48px] px-6 py-3.5 rounded-xl bg-[#161616]/90 border border-[#F5C518]/40 hover:border-[#F5C518] text-white hover:text-[#F5C518] transition-all flex items-center justify-between sm:justify-center gap-4 cursor-pointer shadow-xl"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-[#F5C518]" />
                  <span className="font-syne font-bold text-xs uppercase tracking-widest">
                    Review Bag ({cartCount})
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-[#F5C518] pl-3 border-l border-white/15">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. INTERACTIVE ANIMATED COFFEE PRODUCT SHOWCASE (4 Uploaded Studio Photos) ── */}
      <MenuShowcase />

      {/* ── 3. CATEGORY FILTERS & FULL MENU CATALOG ── */}
      <section className="py-14 sm:py-20 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#F5C518]">
              COMPLETE COLLECTION
            </span>
            <h2 className="font-syne font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
              BROWSE BY <span className="text-[#F5C518]">CATEGORY.</span>
            </h2>
          </div>

          {/* Wrapped Category Filters (Zero forced horizontal scrolling on mobile) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-10 border-b border-white/10">
            <div
              className="flex flex-wrap items-center gap-2.5"
              role="tablist"
              aria-label="Coffee Categories"
            >
              {MENU_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`min-h-[44px] px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center ${
                      isActive
                        ? 'bg-[#F5C518] text-[#101010] font-bold shadow-md shadow-[#F5C518]/25'
                        : 'bg-[#161616] text-white/75 border border-white/10 hover:border-[#F5C518]/50 hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            <p className="text-xs font-mono text-white/50 uppercase tracking-widest">
              Showing {filteredCoffees.length} {filteredCoffees.length === 1 ? 'Coffee' : 'Coffees'}
            </p>
          </div>

          {/* Responsive Product Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredCoffees.map((coffee) => (
              <div key={coffee.id} className="menu-card-item">
                <CoffeeCard coffee={coffee} className="h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

