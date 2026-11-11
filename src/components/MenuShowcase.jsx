import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { SHOWCASE_PRODUCTS } from '../data/coffeeData';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

export const MenuShowcase = () => {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart, openCustomizer } = useCart();

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const floatWrapperRef = useRef(null);
  const shadowRef = useRef(null);
  const tiltContainerRef = useRef(null);
  const stageImageRef = useRef(null);
  const leftDetailsRef = useRef(null);
  const rightDetailsRef = useRef(null);

  const floatTweenRef = useRef(null);
  const shadowTweenRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const shouldAnimateInRef = useRef(false);

  const activeProduct = SHOWCASE_PRODUCTS[displayIndex];
  const activeSize =
    activeProduct.sizes?.[selectedSizeIdx] || activeProduct.sizes?.[0];
  const effectivePrice = activeSize ? activeSize.price : activeProduct.price;

  // Initial GSAP ScrollTrigger & Continuous Float setup
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Progressive scroll-triggered section entrance (never locks scrolling)
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          opacity: 0,
          y: 28,
          stagger: 0.1,
          duration: 0.85,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Subtle continuous floating animation on vessel
      if (floatWrapperRef.current) {
        floatTweenRef.current = gsap.to(floatWrapperRef.current, {
          y: -12,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Synchronized breathing shadow underneath vessel
      if (shadowRef.current) {
        shadowTweenRef.current = gsap.to(shadowRef.current, {
          scaleX: 0.88,
          opacity: 0.45,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Initial entrance stagger for first product
      const detailEls = [
        ...(leftDetailsRef.current?.querySelectorAll('.detail-animate') || []),
        ...(rightDetailsRef.current?.querySelectorAll('.detail-animate') || []),
      ];

      if (stageImageRef.current) {
        gsap.fromTo(
          stageImageRef.current,
          { opacity: 0, scale: 0.94, y: 24, filter: 'blur(8px)' },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
            clearProps: 'filter',
          }
        );
      }

      if (detailEls.length) {
        gsap.fromTo(
          detailEls,
          { opacity: 0, y: 24, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.055,
            duration: 0.7,
            ease: 'power3.out',
            clearProps: 'filter,transform',
          }
        );
      }
    }, sectionEl);

    return () => {
      floatTweenRef.current?.kill();
      shadowTweenRef.current?.kill();
      ctx.revert();
    };
  }, []);

  // Enter animation synchronized after product state swaps
  useLayoutEffect(() => {
    if (!shouldAnimateInRef.current) return;
    shouldAnimateInRef.current = false;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const detailEls = [
      ...(leftDetailsRef.current?.querySelectorAll('.detail-animate') || []),
      ...(rightDetailsRef.current?.querySelectorAll('.detail-animate') || []),
    ];

    if (prefersReducedMotion) {
      gsap.set([stageImageRef.current, ...detailEls].filter(Boolean), {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'none',
      });
      isTransitioningRef.current = false;
      return;
    }

    const enterTl = gsap.timeline({
      onComplete: () => {
        isTransitioningRef.current = false;
      },
    });

    if (stageImageRef.current) {
      enterTl.fromTo(
        stageImageRef.current,
        { opacity: 0, scale: 0.92, y: 22, filter: 'blur(8px)' },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'filter',
        },
        0
      );
    }

    if (detailEls.length) {
      enterTl.fromTo(
        detailEls,
        { opacity: 0, y: 24, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.055,
          duration: 0.55,
          ease: 'power3.out',
          clearProps: 'filter,transform',
        },
        0.06
      );
    }

    return () => {
      enterTl.kill();
    };
  }, [displayIndex]);

  // Switch product with synchronized out -> swap -> in transition
  const switchProduct = useCallback(
    (nextIndex) => {
      if (nextIndex === displayIndex || isTransitioningRef.current) return;

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      setIsAdded(false);

      if (prefersReducedMotion) {
        setSelectedSizeIdx(0);
        setDisplayIndex(nextIndex);
        return;
      }

      isTransitioningRef.current = true;

      const detailEls = [
        ...(leftDetailsRef.current?.querySelectorAll('.detail-animate') || []),
        ...(rightDetailsRef.current?.querySelectorAll('.detail-animate') || []),
      ];

      const exitTl = gsap.timeline({
        onComplete: () => {
          shouldAnimateInRef.current = true;
          setSelectedSizeIdx(0);
          setDisplayIndex(nextIndex);
        },
      });

      if (stageImageRef.current) {
        exitTl.to(
          stageImageRef.current,
          {
            opacity: 0,
            scale: 0.92,
            y: -16,
            filter: 'blur(8px)',
            duration: 0.28,
            ease: 'power2.in',
          },
          0
        );
      }

      if (detailEls.length) {
        exitTl.to(
          detailEls,
          {
            opacity: 0,
            y: -14,
            filter: 'blur(6px)',
            stagger: 0.02,
            duration: 0.22,
            ease: 'power2.in',
          },
          0
        );
      }
    },
    [displayIndex]
  );

  const handlePrev = useCallback(() => {
    const prevIdx =
      (displayIndex - 1 + SHOWCASE_PRODUCTS.length) % SHOWCASE_PRODUCTS.length;
    switchProduct(prevIdx);
  }, [displayIndex, switchProduct]);

  const handleNext = useCallback(() => {
    const nextIdx = (displayIndex + 1) % SHOWCASE_PRODUCTS.length;
    switchProduct(nextIdx);
  }, [displayIndex, switchProduct]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Smooth Mouse-Follow 3D Tilt & Float Pause on Interaction
  const handleStageMouseEnter = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    floatTweenRef.current?.pause();
    shadowTweenRef.current?.pause();

    if (tiltContainerRef.current) {
      gsap.to(tiltContainerRef.current, {
        scale: 1.04,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const handleStageMouseMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    if (tiltContainerRef.current) {
      gsap.to(tiltContainerRef.current, {
        rotateY: x * 11,
        rotateX: -y * 11,
        transformPerspective: 1000,
        duration: 0.45,
        ease: 'power2.out',
      });
    }
  };

  const handleStageMouseLeave = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (tiltContainerRef.current) {
      gsap.to(tiltContainerRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.65,
        ease: 'power3.out',
      });
    }

    floatTweenRef.current?.resume();
    shadowTweenRef.current?.resume();
  };

  const handleAddToCart = () => {
    addToCart(
      {
        id: activeProduct.id,
        name: activeProduct.name,
        price: effectivePrice,
        image: activeProduct.image,
        origin: activeProduct.origin,
        elevation: activeProduct.elevation,
        roast: activeProduct.subtitle,
      },
      {
        size: activeSize ? activeSize.name : 'Standard',
        price: effectivePrice,
        quantity: 1,
      }
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleCustomize = () => {
    openCustomizer({
      id: activeProduct.id,
      name: activeProduct.name,
      price: effectivePrice,
      image: activeProduct.image,
      origin: activeProduct.origin,
      roast: activeProduct.subtitle,
    });
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Interactive Coffee Product Showcase"
      className="relative bg-[#101010] text-white pt-10 sm:pt-14 pb-16 sm:pb-24 overflow-hidden border-b border-white/10"
    >
      {/* Subtle Ambient Yellow Stage Radial Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[580px] h-[320px] sm:h-[580px] bg-[#F5C518]/[0.07] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Showcase Header */}
        <div
          ref={headerRef}
          className="flex flex-wrap items-center justify-between gap-4 mb-10 sm:mb-14 pb-5 border-b border-white/10"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#F5C518] shadow-[0_0_8px_#F5C518]" />
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#F5C518]">
              INTERACTIVE SIGNATURE STAGE
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B1B1B] border border-white/10 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white/75">
            <Sparkles className="w-3.5 h-3.5 text-[#F5C518]" />
            <span>Demo Pricing • Select Product 01–04</span>
          </div>
        </div>

        {/* ── 3-ZONE RESPONSIVE EDITORIAL SHOWCASE GRID ── */}
        {/* Mobile: Image First (order-1), Details Follow (order-2 & order-3) */}
        {/* Desktop: Left Title/Desc (col-span-4), Center Floating Vessel (col-span-4), Right Specs/CTA (col-span-4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
          {/* ZONE A (Left on Desktop, 2nd on Mobile): Number, Category, Giant Name & Tagline */}
          <div
            ref={leftDetailsRef}
            className="lg:col-span-4 order-2 lg:order-1 space-y-4 sm:space-y-5 text-center lg:text-left"
          >
            {/* 1. Product Number */}
            <div className="detail-animate flex items-center justify-center lg:justify-start gap-3">
              <span className="font-syne font-black text-4xl sm:text-5xl text-[#F5C518] leading-none">
                {activeProduct.number}
              </span>
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                / 0{SHOWCASE_PRODUCTS.length}
              </span>
            </div>

            {/* 2. Product Category */}
            <div className="detail-animate">
              <span className="inline-block text-[11px] font-mono uppercase tracking-[0.25em] px-3 py-1 rounded-full bg-[#1B1B1B] border border-[#F5C518]/30 text-[#F5C518]">
                {activeProduct.category}
              </span>
            </div>

            {/* 3. Oversized Bold Product Name */}
            <h2 className="detail-animate font-syne font-black text-[clamp(2.25rem,5vw,4.25rem)] uppercase tracking-tight text-white leading-[0.92] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
              {activeProduct.name}
            </h2>

            {/* Subtitle & Short Description */}
            <p className="detail-animate text-xs font-mono uppercase tracking-[0.2em] text-[#F5C518]/90">
              {activeProduct.subtitle}
            </p>

            <p className="detail-animate text-sm sm:text-base text-white/80 font-sans-custom font-light leading-relaxed max-w-md mx-auto lg:mx-0">
              {activeProduct.tagline}
            </p>
          </div>

          {/* ZONE B (Center on Desktop, 1st on Mobile): Prominent Floating 3D Product Image */}
          <div className="lg:col-span-4 order-1 lg:order-2 flex flex-col items-center">
            <div
              onMouseEnter={handleStageMouseEnter}
              onMouseMove={handleStageMouseMove}
              onMouseLeave={handleStageMouseLeave}
              className="relative w-full max-w-[290px] sm:max-w-[360px] lg:max-w-[400px] mx-auto cursor-grab active:cursor-grabbing py-4 [perspective:1200px]"
            >
              {/* Floating Motion Wrapper */}
              <div ref={floatWrapperRef} className="will-change-transform">
                {/* 3D Mouse Tilt Container */}
                <div
                  ref={tiltContainerRef}
                  className="will-change-transform [transform-style:preserve-3d]"
                >
                  {/* Clean Studio Framing: Explicit 1:1 aspect-square + object-contain guarantees ZERO crop/stretch/distortion */}
                  <div
                    ref={stageImageRef}
                    className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#d8d8d8] border border-[#F5C518]/35 shadow-[0_28px_60px_rgba(0,0,0,0.85),0_0_45px_rgba(245,197,24,0.14)]"
                  >
                    <img
                      src={activeProduct.image}
                      alt={`${activeProduct.name} — BREW. signature cup`}
                      className="w-full h-full object-contain select-none pointer-events-none"
                    />
                    {/* Subtle editorial inner vignette frame */}
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/15 rounded-3xl pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Realistic Ground Shadow */}
              <div
                ref={shadowRef}
                aria-hidden="true"
                className="w-3/4 h-6 mx-auto mt-5 rounded-full bg-black/85 blur-xl pointer-events-none"
              />
            </div>

            {/* Product Switcher Controls Directly Under Centered Stage */}
            <div className="mt-4 sm:mt-6 flex flex-col items-center gap-4 w-full">
              {/* Prev / Active Indicator / Next */}
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous coffee product"
                  className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-[#1B1B1B] border border-white/15 hover:border-[#F5C518] text-white/80 hover:text-[#F5C518] transition-all flex items-center justify-center cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Active Product Dot Indicators */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#1B1B1B] border border-white/10">
                  {SHOWCASE_PRODUCTS.map((prod, idx) => {
                    const isCurrent = idx === displayIndex;
                    return (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => switchProduct(idx)}
                        aria-label={`Select ${prod.number} ${prod.name}`}
                        aria-pressed={isCurrent}
                        className="min-w-[28px] min-h-[28px] flex items-center justify-center cursor-pointer"
                      >
                        <span
                          className={`block h-2 rounded-full transition-all duration-300 ${
                            isCurrent
                              ? 'w-7 bg-[#F5C518] shadow-[0_0_10px_rgba(245,197,24,0.6)]'
                              : 'w-2 bg-white/25 hover:bg-white/55'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next coffee product"
                  className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-[#1B1B1B] border border-white/15 hover:border-[#F5C518] text-white/80 hover:text-[#F5C518] transition-all flex items-center justify-center cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Named Product Pills (01 Espresso .. 04 Mocha) */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {SHOWCASE_PRODUCTS.map((prod, idx) => {
                  const isCurrent = idx === displayIndex;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => switchProduct(idx)}
                      className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                        isCurrent
                          ? 'bg-[#F5C518] text-[#101010] font-bold shadow-[0_0_16px_rgba(245,197,24,0.3)]'
                          : 'bg-[#1B1B1B] text-white/70 border border-white/10 hover:border-[#F5C518]/50 hover:text-white'
                      }`}
                    >
                      <span>{prod.number}</span>
                      <span>{prod.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ZONE C (Right on Desktop, 3rd on Mobile): Ingredients, Notes, Sizes, Price & Add to Cart */}
          <div
            ref={rightDetailsRef}
            className="lg:col-span-4 order-3 space-y-5 bg-[#1B1B1B]/75 backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-7"
          >
            {/* 5. Ingredients */}
            <div className="detail-animate space-y-1.5 pb-4 border-b border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F5C518]">
                INGREDIENTS
              </span>
              <p className="text-xs sm:text-sm text-white/85 font-sans-custom font-light leading-relaxed">
                {activeProduct.ingredients}
              </p>
            </div>

            {/* 6. Flavour Notes */}
            <div className="detail-animate space-y-2 pb-4 border-b border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F5C518]">
                FLAVOUR NOTES
              </span>
              <div className="flex flex-wrap gap-2">
                {activeProduct.notes.map((note) => (
                  <span
                    key={note}
                    className="text-xs font-mono px-3 py-1 rounded-full bg-[#101010] text-white/85 border border-white/10"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* 7. Product Size Options */}
            <div className="detail-animate space-y-2 pb-4 border-b border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F5C518]">
                SELECT SIZE
              </span>
              <div className="flex flex-wrap gap-2">
                {activeProduct.sizes.map((size, sIdx) => {
                  const isSelected = sIdx === selectedSizeIdx;
                  return (
                    <button
                      key={size.name}
                      type="button"
                      onClick={() => setSelectedSizeIdx(sIdx)}
                      className={`min-h-[40px] px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#F5C518]/15 border-[#F5C518] text-[#F5C518] font-bold'
                          : 'bg-[#101010] border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {size.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 8. Price Readout */}
            <div className="detail-animate flex items-baseline justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 block">
                  DEMO PRICE
                </span>
                <span className="font-syne font-black text-3xl sm:text-4xl text-[#F5C518]">
                  ${effectivePrice.toFixed(2)}
                </span>
                <span className="text-xs font-mono text-white/50 ml-1.5">USD</span>
              </div>
              <div className="text-right text-[11px] font-mono text-white/55">
                <div>{activeProduct.origin}</div>
                <div className="text-[#F5C518]">{activeProduct.elevation}</div>
              </div>
            </div>

            {/* 9. Add to Cart & Customize Buttons */}
            <div className="detail-animate flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleCustomize}
                className="min-h-[48px] px-4 py-3 rounded-xl border border-white/15 hover:border-[#F5C518] text-white/85 hover:text-[#F5C518] text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                aria-label={`Customize ${activeProduct.name}`}
              >
                <Sliders className="w-4 h-4" />
                <span>Customize</span>
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 min-h-[48px] px-6 py-3 rounded-xl text-xs font-syne font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                  isAdded
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[#F5C518] text-[#101010] hover:bg-[#FFDF40] hover:shadow-[0_0_24px_rgba(245,197,24,0.45)]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>ADD TO CART</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
