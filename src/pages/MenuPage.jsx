import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Check, ShoppingBag } from 'lucide-react';
import {
  FILM_CHAPTERS,
  getExperienceCategoryQueryAlias,
} from '../data/menuExperienceData';
import {
  preloadFrameSequence,
  loadFrameImage,
  buildMenuFrameUrl,
} from '../utils/menuFrames';
import { ScrollCoffeeStage } from '../components/ScrollCoffeeStage';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

const ChapterFilmSection = ({
  chapter,
  chapterIndex,
  chapterRef,
  selectedSizeIndex,
  onSelectSize,
  onAddToCart,
  onOpenCustomizer,
  onAddCompanion,
  isJustAdded,
  justAddedCompanionId,
}) => {
  const mobileStageTriggerRef = useRef(null);
  const mobileFrameRef = useRef(chapter.startFrame);

  const { product, companions } = chapter;
  const activeSize = product.sizes?.[selectedSizeIndex] || product.sizes?.[0];
  const displayPrice = activeSize?.price ?? product.price;

  // Mobile & Small Tablet (<768px) vertical scroll scrubbing per chapter
  useEffect(() => {
    const el = mobileStageTriggerRef.current;
    if (!el) return undefined;

    const mm = gsap.matchMedia();
    mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        end: 'bottom 20%',
        scrub: 0.65,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const span = chapter.endFrame - chapter.startFrame;
          mobileFrameRef.current = chapter.startFrame + self.progress * span;
        },
      });
    });

    return () => mm.revert();
  }, [chapter.startFrame, chapter.endFrame]);

  const subtleToneBg =
    chapterIndex % 2 === 1 ? 'bg-[#141414]/70' : 'bg-transparent';

  return (
    <article
      id={`chapter-${chapter.categoryId}`}
      ref={chapterRef}
      className={`story-chapter relative z-20 ${subtleToneBg} transition-colors duration-700`}
    >
      <div className="max-w-7xl mx-auto px-4 min-[375px]:px-5 sm:px-8 lg:px-12 xl:px-14 py-14 min-[375px]:py-16 sm:py-24 md:py-28 lg:py-36">
        {/* Right-aligned editorial storytelling column on >=768px; centered single column below */}
        <div className="md:ml-[45%] lg:ml-[44%] xl:ml-[45%] md:max-w-[520px] lg:max-w-[560px] xl:max-w-[600px]">
          {/* Mobile & Small Tablet (<768px) Centered Touch-Ready Vessel Stage */}
          <div ref={mobileStageTriggerRef} className="md:hidden mb-8 sm:mb-10">
            <ScrollCoffeeStage
              frameNumberRef={mobileFrameRef}
              fallbackFrame={chapter.startFrame}
              frameRange={{ start: chapter.startFrame, end: chapter.endFrame }}
              enableTouchScrub
              className="w-[74vw] max-w-[250px] min-[375px]:max-w-[300px] sm:max-w-[360px] max-h-[42vh] mx-auto"
            />
          </div>

          {/* BEAT 1: PRODUCT INTRODUCTION */}
          <div className="beat-intro space-y-4 sm:space-y-6 pb-12 sm:pb-20 md:pb-28 lg:pb-32">
            <div className="reveal-line flex items-center gap-3 sm:gap-4">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.32em] text-[#F5C518]">
                {chapter.chapterNumber}
              </span>
              <span className="h-px w-6 sm:w-8 bg-[#F5C518]/50" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.26em] text-white/55">
                {chapter.categoryLabel}
              </span>
            </div>

            <div className="overflow-hidden">
              <h2 className="reveal-title font-syne font-black uppercase tracking-tight leading-[0.92] text-[clamp(1.75rem,7.2vw,2.65rem)] md:text-[clamp(1.85rem,3.6vw,3.1rem)] lg:text-[clamp(2.35rem,4.2vw,4.35rem)] text-white break-words">
                {product.name}
              </h2>
            </div>

            <p className="reveal-line text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.22em] text-white/45">
              {product.origin} &nbsp;·&nbsp; {product.roast}
            </p>

            <p className="reveal-copy text-sm min-[375px]:text-base sm:text-lg text-white/78 font-sans-custom font-light leading-relaxed max-w-xl pt-1 sm:pt-2">
              {product.description}
            </p>
          </div>

          {/* Balanced 2-col layout ONLY on small tablet (576px-767px) for concise specs */}
          <div className="sm:grid sm:grid-cols-2 sm:gap-8 md:block">
            {/* BEAT 2: FLAVOUR EXPERIENCE */}
            <div className="beat-flavour relative py-10 sm:py-12 md:py-24 border-t border-white/[0.08] space-y-6 sm:space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="reveal-flavour text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em] text-[#F5C518]">
                  Flavour Profile
                </span>
                <span className="reveal-flavour text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-white/35">
                  {product.elevation}
                </span>
              </div>

              <div className="space-y-2.5 sm:space-y-3.5">
                {product.flavourNotes.map((note, idx) => (
                  <div key={note} className="reveal-flavour flex items-baseline gap-3 sm:gap-4">
                    <span className="text-[10px] sm:text-[11px] font-mono text-[#F5C518]/75 tabular-nums">
                      0{idx + 1}
                    </span>
                    <p className="font-editorial italic text-xl min-[375px]:text-2xl sm:text-2xl lg:text-4xl text-white/95 tracking-tight">
                      {note}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-white/40">
                {product.ingredientsList.slice(0, 3).map((label) => (
                  <span key={label} className="reveal-flavour">
                    · {label}
                  </span>
                ))}
              </div>
            </div>

            {/* BEAT 3A (Mobile/Tablet Grouped): INGREDIENTS LIST */}
            <div className="beat-order-ingredients pt-10 sm:pt-12 md:pt-20 pb-8 border-t border-white/[0.08] space-y-4">
              <span className="reveal-ingredient block text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em] text-white/45">
                Crafted From
              </span>
              <ul className="space-y-2.5">
                {product.ingredientsList.map((ingredient, idx) => (
                  <li
                    key={ingredient}
                    className="reveal-ingredient flex items-start sm:items-center gap-3 sm:gap-4 text-sm sm:text-base font-sans-custom font-light text-white/85"
                  >
                    <span className="text-[10px] sm:text-[11px] font-mono text-[#F5C518]/80 tabular-nums shrink-0 mt-0.5 sm:mt-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* BEAT 3B: SIZES, PRICE & TOUCH-FRIENDLY ORDER ACTION */}
          <div className="beat-order pt-8 sm:pt-10 pb-4 border-t border-white/[0.08] space-y-7 sm:space-y-8">
            <div className="reveal-purchase space-y-6">
              {product.sizes?.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-5 sm:gap-x-6 gap-y-2">
                  {product.sizes.map((sizeObj, idx) => {
                    const active = idx === selectedSizeIndex;
                    return (
                      <button
                        key={sizeObj.name}
                        type="button"
                        onClick={() => onSelectSize(product.id, idx)}
                        className={`relative min-h-[44px] py-2 text-left transition-colors cursor-pointer ${
                          active ? 'text-white' : 'text-white/50 hover:text-white/85'
                        }`}
                      >
                        <span className="block text-[11px] sm:text-xs font-mono uppercase tracking-[0.16em]">
                          {sizeObj.name}
                        </span>
                        <span
                          className={`block h-[1.5px] mt-1 transition-all duration-300 ${
                            active ? 'w-full bg-[#F5C518]' : 'w-0 bg-transparent'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6">
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-[0.28em] text-white/40 mb-1">
                    Serve Price
                  </span>
                  <span className="font-syne font-black text-3xl min-[375px]:text-4xl lg:text-5xl text-white tabular-nums">
                    <span className="text-[#F5C518]">$</span>
                    {displayPrice.toFixed(2)}
                  </span>
                </div>

                {/* Touch-friendly full-width mobile Add To Cart */}
                <div className="flex flex-col min-[375px]:flex-row items-stretch min-[375px]:items-center gap-3 min-[375px]:gap-5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() =>
                      onAddToCart(product, {
                        size: activeSize?.name || 'Standard',
                        price: displayPrice,
                      })
                    }
                    className={`group w-full sm:w-auto min-h-[48px] px-7 py-3.5 rounded-full font-syne font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer active:scale-95 ${
                      isJustAdded
                        ? 'bg-emerald-500 text-white'
                        : 'bg-[#F5C518] text-[#101010] hover:bg-[#FFDF40] hover:shadow-[0_0_28px_rgba(245,197,24,0.32)]'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
                        <span>Add To Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenCustomizer(product)}
                    className="min-h-[44px] px-2 text-xs font-mono uppercase tracking-[0.2em] text-white/55 hover:text-[#F5C518] underline underline-offset-4 transition-colors cursor-pointer text-center"
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>

            {companions.length > 0 && (
              <div className="reveal-purchase pt-6 border-t border-white/[0.06] space-y-2.5">
                <span className="block text-[10px] font-mono uppercase tracking-[0.24em] text-white/35">
                  Also Extracted in {chapter.categoryLabel}
                </span>
                <div className="space-y-2">
                  {companions.map((comp) => {
                    const compAdded = justAddedCompanionId === comp.id;
                    return (
                      <div
                        key={comp.id}
                        className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-white/70"
                      >
                        <span>
                          {comp.name}{' '}
                          <span className="text-[#F5C518]/85 ml-1.5">
                            ${comp.price.toFixed(2)}
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => onAddCompanion(comp)}
                          className="min-h-[40px] px-2 text-[11px] uppercase tracking-[0.16em] text-white/55 hover:text-[#F5C518] transition-colors cursor-pointer"
                        >
                          {compAdded ? 'Added ✓' : '+ Quick Add'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export const MenuPage = () => {
  const [searchParams] = useSearchParams();
  const [sizeSelections, setSizeSelections] = useState({});
  const [addedProductId, setAddedProductId] = useState(null);
  const [addedCompanionId, setAddedCompanionId] = useState(null);

  const { addToCart, openCustomizer, openDrawer, cartCount } = useCart();

  const pageRef = useRef(null);
  const introSectionRef = useRef(null);
  const introTitleRef = useRef(null);
  const desktopStageOverlayRef = useRef(null);
  const desktopCupMoverRef = useRef(null);
  const desktopCupInnerRef = useRef(null);
  const epilogueRef = useRef(null);
  const chapterRefs = useRef([]);
  const desktopFrameRef = useRef(1);
  const addTimerRef = useRef(null);
  const companionTimerRef = useRef(null);

  const scrollToChapter = (categoryId) => {
    const idx = FILM_CHAPTERS.findIndex((c) => c.categoryId === categoryId);
    if (idx < 0) return;
    preloadFrameSequence(FILM_CHAPTERS[idx].frames);
    chapterRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Initial lazy preload & deep-link support (?category=)
  useEffect(() => {
    loadFrameImage(buildMenuFrameUrl(1));
    if (FILM_CHAPTERS[0]) {
      preloadFrameSequence(FILM_CHAPTERS[0].frames);
    }

    const requestedCategory = searchParams.get('category');
    if (requestedCategory) {
      const normalized = getExperienceCategoryQueryAlias(requestedCategory);
      const chapterIdx = FILM_CHAPTERS.findIndex((c) => c.categoryId === normalized);
      if (chapterIdx >= 0) {
        preloadFrameSequence(FILM_CHAPTERS[chapterIdx].frames);
        const scrollTimer = setTimeout(() => {
          chapterRefs.current[chapterIdx]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 180);
        return () => clearTimeout(scrollTimer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    return () => {
      if (addTimerRef.current) clearTimeout(addTimerRef.current);
      if (companionTimerRef.current) clearTimeout(companionTimerRef.current);
    };
  }, [searchParams]);

  // Recalculate ScrollTrigger geometry cleanly on resize / orientation switch
  useEffect(() => {
    let timer = null;
    const handleResize = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 180);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Responsive GSAP ScrollTrigger Choreography
  useEffect(() => {
    const mm = gsap.matchMedia();

    // Shared lazy frame loading + responsive text storytelling distances
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const isCompact = window.innerWidth < 768;

      FILM_CHAPTERS.forEach((chapter, idx) => {
        const chapterEl = chapterRefs.current[idx];
        if (!chapterEl) return;

        ScrollTrigger.create({
          trigger: chapterEl,
          start: isCompact ? 'top 125%' : 'top 150%',
          once: true,
          onEnter: () => {
            preloadFrameSequence(chapter.frames);
            // Only prefetch next chapter eagerly on tablet/desktop where memory budget allows
            if (!isCompact && FILM_CHAPTERS[idx + 1]) {
              preloadFrameSequence(FILM_CHAPTERS[idx + 1].frames);
            }
          },
        });
      });

      if (introTitleRef.current) {
        gsap.from(introTitleRef.current.children, {
          y: isCompact ? 18 : 34,
          opacity: 0,
          stagger: isCompact ? 0.08 : 0.14,
          duration: isCompact ? 0.65 : 1.0,
          ease: 'power3.out',
          clearProps: 'transform',
        });
      }

      FILM_CHAPTERS.forEach((_, idx) => {
        const chapterEl = chapterRefs.current[idx];
        if (!chapterEl) return;

        const titleEl = chapterEl.querySelector('.reveal-title');
        const introLines = chapterEl.querySelectorAll('.reveal-line, .reveal-copy');
        const flavourEls = chapterEl.querySelectorAll('.reveal-flavour');
        const ingredientEls = chapterEl.querySelectorAll('.reveal-ingredient');
        const purchaseEls = chapterEl.querySelectorAll('.reveal-purchase');

        const dist = isCompact ? 14 : 26;
        const dur = isCompact ? 0.55 : 0.85;

        if (titleEl) {
          gsap.from(titleEl, {
            yPercent: isCompact ? 35 : 100,
            opacity: isCompact ? 0 : 1,
            duration: isCompact ? 0.6 : 0.95,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: titleEl,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        if (introLines.length > 0) {
          gsap.from(introLines, {
            y: dist,
            opacity: 0,
            stagger: isCompact ? 0.06 : 0.1,
            duration: dur,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: introLines[0],
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        if (flavourEls.length > 0) {
          gsap.from(flavourEls, {
            y: dist,
            opacity: 0,
            stagger: isCompact ? 0.07 : 0.12,
            duration: dur,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: chapterEl.querySelector('.beat-flavour'),
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        if (ingredientEls.length > 0) {
          gsap.from(ingredientEls, {
            x: isCompact ? 0 : -16,
            y: isCompact ? 10 : 0,
            opacity: 0,
            stagger: isCompact ? 0.05 : 0.09,
            duration: isCompact ? 0.5 : 0.75,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: chapterEl.querySelector('.beat-order-ingredients'),
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        if (purchaseEls.length > 0) {
          gsap.from(purchaseEls, {
            y: dist,
            opacity: 0,
            stagger: isCompact ? 0.06 : 0.1,
            duration: dur,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: purchaseEls[0],
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });
    });

    // Tablet (>=768px), Laptop (992px+) & Desktop (1200px+) continuous floating vessel tracking
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const mover = desktopCupMoverRef.current;
      const inner = desktopCupInnerRef.current;
      const overlay = desktopStageOverlayRef.current;
      const introEl = introSectionRef.current;

      if (!mover || !inner || !overlay || !introEl) return undefined;

      gsap.set(mover, { x: 0, y: 42, scale: 1.0, opacity: 1 });
      gsap.set(inner, { rotation: 0 });
      gsap.set(overlay, { opacity: 1, y: 0 });

      // Smooth responsive horizontal glide LEFT based on current viewport band
      gsap.to(mover, {
        x: () => {
          const vw = window.innerWidth;
          if (vw < 992) return -Math.round(vw * 0.25); // Tablet 768..991
          if (vw < 1200) return -Math.round(vw * 0.245); // Laptop 992..1199
          return -Math.min(Math.round(vw * 0.235), 320); // Desktop 1200+
        },
        y: 0,
        scale: () => (window.innerWidth < 992 ? 0.92 : 0.95),
        ease: 'none',
        scrollTrigger: {
          trigger: introEl,
          start: 'top top',
          end: 'bottom 20%',
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      });

      if (introTitleRef.current) {
        gsap.to(introTitleRef.current, {
          y: -50,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: introEl,
            start: '12% top',
            end: '75% top',
            scrub: 0.8,
          },
        });
      }

      ScrollTrigger.create({
        trigger: introEl,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
        onUpdate: (self) => {
          desktopFrameRef.current = 1 + self.progress * 11;
        },
      });

      FILM_CHAPTERS.forEach((chapter, idx) => {
        const chapterEl = chapterRefs.current[idx];
        if (!chapterEl) return;

        const baseStart =
          idx === 0 ? Math.max(12, chapter.startFrame) : chapter.startFrame;

        ScrollTrigger.create({
          trigger: chapterEl,
          start: 'top 65%',
          end: 'bottom 45%',
          scrub: 0.75,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            desktopFrameRef.current = baseStart + p * (chapter.endFrame - baseStart);
            const angle = Math.sin(p * Math.PI * 1.5) * 2.2;
            gsap.set(inner, {
              rotation: angle,
              scale: 1 + Math.sin(p * Math.PI) * 0.03,
            });
          },
        });
      });

      if (epilogueRef.current) {
        gsap.to(overlay, {
          opacity: 0,
          y: -55,
          ease: 'none',
          scrollTrigger: {
            trigger: epilogueRef.current,
            start: 'top 92%',
            end: 'top 42%',
            scrub: 0.8,
          },
        });
      }

      return undefined;
    });

    return () => mm.revert();
  }, []);

  const handleSelectSize = (productId, sizeIdx) => {
    setSizeSelections((prev) => ({ ...prev, [productId]: sizeIdx }));
  };

  const handleAddToCart = (product, { size, price }) => {
    addToCart(product, { size, price, quantity: 1 });
    setAddedProductId(product.id);
    if (addTimerRef.current) clearTimeout(addTimerRef.current);
    addTimerRef.current = setTimeout(() => setAddedProductId(null), 1800);
  };

  const handleAddCompanion = (comp) => {
    addToCart(comp, {
      size: comp.sizes?.[0]?.name || 'Standard',
      price: comp.price,
      quantity: 1,
    });
    setAddedCompanionId(comp.id);
    if (companionTimerRef.current) clearTimeout(companionTimerRef.current);
    companionTimerRef.current = setTimeout(() => setAddedCompanionId(null), 1600);
  };

  return (
    <main
      ref={pageRef}
      className="relative bg-[#101010] text-white overflow-x-clip selection:bg-[#F5C518] selection:text-[#101010]"
    >
      {/* TABLET/LAPTOP/DESKTOP FIXED CHOREOGRAPHED CUP LAYER (>=768px) */}
      <div
        ref={desktopStageOverlayRef}
        className="hidden md:flex fixed inset-0 pointer-events-none z-10 items-center justify-center"
        aria-hidden="true"
      >
        <div ref={desktopCupMoverRef} className="will-change-transform">
          <div ref={desktopCupInnerRef} className="will-change-transform">
            <ScrollCoffeeStage
              frameNumberRef={desktopFrameRef}
              fallbackFrame={1}
              className="w-[35vw] max-w-[290px] lg:w-[38vw] lg:max-w-[440px] xl:w-[40vw] xl:max-w-[540px]"
            />
          </div>
        </div>
      </div>

      {/* 1. INTRO SECTION */}
      <section
        ref={introSectionRef}
        className="relative z-30 min-h-[100svh] flex flex-col justify-between items-center text-center max-w-6xl mx-auto px-4 min-[375px]:px-5 sm:px-8 pt-24 sm:pt-28 pb-8 sm:pb-10"
      >
        <div ref={introTitleRef} className="max-w-4xl mx-auto space-y-3 sm:space-y-4 pointer-events-none">
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] sm:tracking-[0.36em] text-[#F5C518]/90">
            COFFEE. CRAFTED. CULTURE.
          </p>

          <h1 className="font-syne font-black uppercase tracking-tight leading-[0.88] text-[clamp(2rem,8vw,5.4rem)] text-white">
            A BETTER KIND OF{' '}
            <span className="inline-block">
              COFFEE<span className="text-[#F5C518]">.</span>
            </span>
          </h1>
        </div>

        {/* Mobile & Small Tablet (<768px) Centered Opening Vessel */}
        <div className="md:hidden my-auto py-3 w-full">
          <ScrollCoffeeStage
            fallbackFrame={1}
            className="w-[72vw] max-w-[240px] min-[375px]:max-w-[295px] sm:max-w-[355px] max-h-[42vh] mx-auto"
          />
        </div>

        {/* Compact Quick Chapter Index + Whisper Scroll Prompt (Accessible & zero overlap) */}
        <div className="w-full flex flex-col items-center gap-4 sm:gap-5">
          <nav
            aria-label="Jump to coffee chapter"
            className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-1 max-w-full"
          >
            {FILM_CHAPTERS.map((chap) => (
              <button
                key={chap.categoryId}
                type="button"
                onClick={() => scrollToChapter(chap.categoryId)}
                className="min-h-[44px] px-1.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] sm:tracking-[0.22em] text-white/55 hover:text-[#F5C518] transition-colors cursor-pointer"
              >
                <span className="text-[#F5C518]/80 mr-1.5">{chap.chapterNumber}</span>
                {chap.categoryLabel}
              </button>
            ))}
          </nav>

          <div className="pointer-events-none flex flex-col items-center gap-2 opacity-60">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/75">
              Scroll To Pour
            </span>
            <span className="w-px h-6 sm:h-8 bg-gradient-to-b from-[#F5C518] to-transparent" />
          </div>
        </div>
      </section>

      {/* 2..5. CONTINUOUS COFFEE STORYTELLING CHAPTERS */}
      <section aria-label="Coffee Menu Film Chapters" className="relative">
        {FILM_CHAPTERS.map((chapter, idx) => (
          <ChapterFilmSection
            key={chapter.categoryId}
            chapter={chapter}
            chapterIndex={idx}
            chapterRef={(el) => {
              chapterRefs.current[idx] = el;
            }}
            selectedSizeIndex={sizeSelections[chapter.product.id] ?? 0}
            onSelectSize={handleSelectSize}
            onAddToCart={handleAddToCart}
            onOpenCustomizer={openCustomizer}
            onAddCompanion={handleAddCompanion}
            isJustAdded={addedProductId === chapter.product.id}
            justAddedCompanionId={addedCompanionId}
          />
        ))}
      </section>

      {/* QUIET EPILOGUE SECTION */}
      <section
        ref={epilogueRef}
        className="relative z-20 max-w-5xl mx-auto px-4 min-[375px]:px-5 sm:px-8 py-20 sm:py-28 lg:py-32 text-center border-t border-white/[0.08]"
      >
        <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.32em] text-[#F5C518] mb-3 sm:mb-4">
          Brewed Fresh To Order
        </p>
        <h2 className="font-syne font-black uppercase tracking-tight leading-[0.92] text-[clamp(1.85rem,6vw,3.8rem)] text-white mb-7 sm:mb-8">
          YOUR RITUAL, READY.
        </h2>

        <button
          type="button"
          onClick={openDrawer}
          className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#1B1B1B] hover:bg-[#F5C518] text-white hover:text-[#101010] border border-white/15 hover:border-[#F5C518] text-xs font-mono font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Review Order ({cartCount})</span>
        </button>
      </section>

      {/* Minimal Floating Mobile Quick Bag Pill (Only renders when items added & on <768px) */}
      {cartCount > 0 && (
        <button
          type="button"
          onClick={openDrawer}
          aria-label="Open order bag"
          className="md:hidden fixed bottom-5 right-4 z-30 min-h-[44px] px-4 py-2.5 rounded-full bg-[#F5C518] text-[#101010] font-syne font-black text-xs uppercase tracking-widest shadow-[0_8px_24px_rgba(245,197,24,0.38)] inline-flex items-center gap-2 active:scale-95 transition-transform"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Bag ({cartCount})</span>
        </button>
      )}
    </main>
  );
};
