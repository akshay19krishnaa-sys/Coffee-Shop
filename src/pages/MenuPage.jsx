import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Check, ShoppingBag } from 'lucide-react';
import {
  FILM_CHAPTERS,
  getExperienceCategoryQueryAlias,
} from '../data/menuExperienceData';
import { preloadFrameSequence, loadFrameImage, buildMenuFrameUrl } from '../utils/menuFrames';
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

  // Mobile-only continuous frame scrubbing per chapter (Desktop uses the unified floating vessel)
  useEffect(() => {
    const el = mobileStageTriggerRef.current;
    if (!el) return undefined;

    const mm = gsap.matchMedia();
    mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        end: 'bottom 25%',
        scrub: 0.7,
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
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 py-20 sm:py-28 md:py-36">
        {/* Right-aligned editorial storytelling column on desktop (leaves left half clear for moving cup) */}
        <div className="md:ml-[46%] lg:ml-[44%] md:max-w-[560px] lg:max-w-[600px]">
          {/* Mobile-Only Centered Vessel Stage */}
          <div ref={mobileStageTriggerRef} className="md:hidden mb-10">
            <ScrollCoffeeStage
              frameNumberRef={mobileFrameRef}
              fallbackFrame={chapter.startFrame}
              className="w-full max-w-[290px] sm:max-w-[350px] mx-auto"
            />
          </div>

          {/* BEAT 1: PRODUCT INTRODUCTION */}
          <div className="beat-intro space-y-6 pb-20 sm:pb-28 md:pb-36">
            <div className="reveal-line flex items-center gap-4">
              <span className="text-xs font-mono uppercase tracking-[0.34em] text-[#F5C518]">
                {chapter.chapterNumber}
              </span>
              <span className="h-px w-8 bg-[#F5C518]/50" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/55">
                {chapter.categoryLabel}
              </span>
            </div>

            <div className="overflow-hidden">
              <h2 className="reveal-title font-syne font-black uppercase tracking-tight leading-[0.9] text-[clamp(2.25rem,5.2vw,4.5rem)] text-white">
                {product.name}
              </h2>
            </div>

            <p className="reveal-line text-xs font-mono uppercase tracking-[0.22em] text-white/45">
              {product.origin} &nbsp;·&nbsp; {product.roast}
            </p>

            <p className="reveal-copy text-base sm:text-lg text-white/78 font-sans-custom font-light leading-relaxed max-w-xl pt-2">
              {product.description}
            </p>
          </div>

          {/* BEAT 2: FLAVOUR EXPERIENCE */}
          <div className="beat-flavour relative py-16 sm:py-24 md:py-32 border-t border-white/[0.08] space-y-8">
            <div className="flex items-center justify-between gap-4">
              <span className="reveal-flavour text-[11px] font-mono uppercase tracking-[0.3em] text-[#F5C518]">
                Flavour Profile
              </span>
              <span className="reveal-flavour text-[11px] font-mono uppercase tracking-[0.24em] text-white/35">
                {product.elevation}
              </span>
            </div>

            {/* Minimal staggered editorial flavour statements (no separate boxes/cards) */}
            <div className="space-y-3 sm:space-y-4">
              {product.flavourNotes.map((note, idx) => (
                <div
                  key={note}
                  className="reveal-flavour flex items-baseline gap-4"
                >
                  <span className="text-[11px] font-mono text-[#F5C518]/75 tabular-nums">
                    0{idx + 1}
                  </span>
                  <p className="font-editorial italic text-2xl sm:text-3xl lg:text-4xl text-white/95 tracking-tight">
                    {note}
                  </p>
                </div>
              ))}
            </div>

            {/* Subtle minimal floating ingredient whispers around the composition */}
            <div className="pt-4 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-mono uppercase tracking-[0.22em] text-white/40">
              {product.ingredientsList.slice(0, 3).map((label) => (
                <span key={label} className="reveal-flavour">
                  · {label}
                </span>
              ))}
            </div>
          </div>

          {/* BEAT 3: INGREDIENTS, SIZES, PRICE & ORDER ACTION */}
          <div className="beat-order pt-16 sm:pt-24 pb-6 border-t border-white/[0.08] space-y-10">
            {/* Progressive Ingredient Composition */}
            <div className="space-y-4">
              <span className="reveal-ingredient block text-[11px] font-mono uppercase tracking-[0.3em] text-white/45">
                Crafted From
              </span>
              <ul className="space-y-2.5">
                {product.ingredientsList.map((ingredient, idx) => (
                  <li
                    key={ingredient}
                    className="reveal-ingredient flex items-center gap-4 text-sm sm:text-base font-sans-custom font-light text-white/85"
                  >
                    <span className="text-[11px] font-mono text-[#F5C518]/80 tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sizes + Price Readout */}
            <div className="reveal-purchase space-y-6 pt-6 border-t border-white/[0.08]">
              {product.sizes?.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {product.sizes.map((sizeObj, idx) => {
                    const active = idx === selectedSizeIndex;
                    return (
                      <button
                        key={sizeObj.name}
                        type="button"
                        onClick={() => onSelectSize(product.id, idx)}
                        className={`relative pb-1.5 text-left transition-colors cursor-pointer ${active
                            ? 'text-white'
                            : 'text-white/45 hover:text-white/80'
                          }`}
                      >
                        <span className="block text-xs font-mono uppercase tracking-[0.18em]">
                          {sizeObj.name}
                        </span>
                        <span
                          className={`block h-[1.5px] mt-1 transition-all duration-300 ${active ? 'w-full bg-[#F5C518]' : 'w-0 bg-transparent'
                            }`}
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-[0.28em] text-white/40 mb-1">
                    Serve Price
                  </span>
                  <span className="font-syne font-black text-4xl sm:text-5xl text-white tabular-nums">
                    <span className="text-[#F5C518]">$</span>
                    {displayPrice.toFixed(2)}
                  </span>
                </div>

                {/* Add to Cart reveals seamlessly alongside product specs */}
                <div className="flex items-center gap-5">
                  <button
                    type="button"
                    onClick={() =>
                      onAddToCart(product, {
                        size: activeSize?.name || 'Standard',
                        price: displayPrice,
                      })
                    }
                    className={`group min-h-[48px] px-7 py-3.5 rounded-full font-syne font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2.5 cursor-pointer active:scale-95 ${isJustAdded
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
                    className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 hover:text-[#F5C518] underline underline-offset-4 transition-colors cursor-pointer"
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>

            {/* Quiet typographic companion pours preserving full menu data cleanly without a grid */}
            {companions.length > 0 && (
              <div className="reveal-purchase pt-6 border-t border-white/[0.06] space-y-2.5">
                <span className="block text-[10px] font-mono uppercase tracking-[0.26em] text-white/35">
                  Also Extracted in {chapter.categoryLabel}
                </span>
                <div className="space-y-2">
                  {companions.map((comp) => {
                    const compAdded = justAddedCompanionId === comp.id;
                    return (
                      <div
                        key={comp.id}
                        className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-white/65"
                      >
                        <span>
                          {comp.name}{' '}
                          <span className="text-[#F5C518]/80 ml-1.5">
                            ${comp.price.toFixed(2)}
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => onAddCompanion(comp)}
                          className="text-[11px] uppercase tracking-[0.18em] text-white/50 hover:text-[#F5C518] transition-colors cursor-pointer"
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

  // Cleanly preload opening Chapter 01 frames on mount & handle ?category= deep-links
  useEffect(() => {
    loadFrameImage(buildMenuFrameUrl(1));
    if (FILM_CHAPTERS[0]) {
      preloadFrameSequence(FILM_CHAPTERS[0].frames, { concurrency: 6 });
    }

    const requestedCategory = searchParams.get('category');
    if (requestedCategory) {
      const normalized = getExperienceCategoryQueryAlias(requestedCategory);
      const chapterIdx = FILM_CHAPTERS.findIndex((c) => c.categoryId === normalized);
      if (chapterIdx >= 0) {
        preloadFrameSequence(FILM_CHAPTERS[chapterIdx].frames, { concurrency: 6 });
        const scrollTimer = setTimeout(() => {
          chapterRefs.current[chapterIdx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  // Master Scroll Choreography (Desktop continuous vessel motion + per-beat reveals across all breakpoints)
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Lazy-load upcoming chapter frames cleanly as visitor approaches each chapter
      FILM_CHAPTERS.forEach((chapter, idx) => {
        const chapterEl = chapterRefs.current[idx];
        if (!chapterEl) return;

        ScrollTrigger.create({
          trigger: chapterEl,
          start: 'top 150%',
          once: true,
          onEnter: () => {
            preloadFrameSequence(chapter.frames, { concurrency: 5 });
            if (FILM_CHAPTERS[idx + 1]) {
              preloadFrameSequence(FILM_CHAPTERS[idx + 1].frames, { concurrency: 4 });
            }
          },
        });
      });

      // Intro Heading Entrance
      if (introTitleRef.current) {
        gsap.from(introTitleRef.current.children, {
          y: 36,
          opacity: 0,
          stagger: 0.14,
          duration: 1.05,
          ease: 'power3.out',
          clearProps: 'transform',
        });
      }

      // Per-Chapter Text Storytelling Reveals (all devices, natural vertical scroll)
      FILM_CHAPTERS.forEach((_, idx) => {
        const chapterEl = chapterRefs.current[idx];
        if (!chapterEl) return;

        const titleEl = chapterEl.querySelector('.reveal-title');
        const introLines = chapterEl.querySelectorAll('.reveal-line, .reveal-copy');
        const flavourEls = chapterEl.querySelectorAll('.reveal-flavour');
        const ingredientEls = chapterEl.querySelectorAll('.reveal-ingredient');
        const purchaseEls = chapterEl.querySelectorAll('.reveal-purchase');

        if (titleEl) {
          gsap.from(titleEl, {
            yPercent: 105,
            duration: 0.95,
            ease: 'power4.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: titleEl,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        if (introLines.length > 0) {
          gsap.from(introLines, {
            y: 26,
            opacity: 0,
            stagger: 0.1,
            duration: 0.85,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: introLines[0],
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        if (flavourEls.length > 0) {
          gsap.from(flavourEls, {
            y: 28,
            opacity: 0,
            stagger: 0.12,
            duration: 0.85,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: chapterEl.querySelector('.beat-flavour'),
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        if (ingredientEls.length > 0) {
          gsap.from(ingredientEls, {
            x: -16,
            opacity: 0,
            stagger: 0.09,
            duration: 0.75,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: chapterEl.querySelector('.beat-order'),
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          });
        }

        if (purchaseEls.length > 0) {
          gsap.from(purchaseEls, {
            y: 24,
            opacity: 0,
            stagger: 0.1,
            duration: 0.85,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: purchaseEls[0],
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });
    });

    // Desktop Continuous Choreographed Vessel Movement & Frame Synchronization
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const mover = desktopCupMoverRef.current;
      const inner = desktopCupInnerRef.current;
      const overlay = desktopStageOverlayRef.current;
      const introEl = introSectionRef.current;
      const firstChapter = chapterRefs.current[0];

      if (!mover || !inner || !overlay || !introEl || !firstChapter) return undefined;

      // Start centered at Intro opening slightly below heading for balanced framing
      gsap.set(mover, { x: 0, y: 46, scale: 1.02, opacity: 1 });
      gsap.set(inner, { rotation: 0 });
      gsap.set(overlay, { opacity: 1 });

      // Smooth glide LEFT as Intro transitions into Chapter 01
      gsap.to(mover, {
        x: () => -Math.min(window.innerWidth * 0.24, 310),
        y: 0,
        scale: 0.94,
        ease: 'none',
        scrollTrigger: {
          trigger: introEl,
          start: 'top top',
          end: 'bottom 20%',
          scrub: 0.9,
        },
      });

      // Gently lift Intro heading upward as visitor begins scrolling
      if (introTitleRef.current) {
        gsap.to(introTitleRef.current, {
          y: -55,
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

      // Opening Hero subtle cup progression across frames 1 -> 12 as Intro exits
      ScrollTrigger.create({
        trigger: introEl,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
        onUpdate: (self) => {
          desktopFrameRef.current = 1 + self.progress * 11;
        },
      });

      // Continuous chapter-by-chapter frame advancement + organic subtle sway
      FILM_CHAPTERS.forEach((chapter, idx) => {
        const chapterEl = chapterRefs.current[idx];
        if (!chapterEl) return;

        const baseStart = idx === 0 ? Math.max(12, chapter.startFrame) : chapter.startFrame;

        ScrollTrigger.create({
          trigger: chapterEl,
          start: 'top 65%',
          end: 'bottom 45%',
          scrub: 0.75,
          onUpdate: (self) => {
            const p = self.progress;
            desktopFrameRef.current = baseStart + p * (chapter.endFrame - baseStart);
            // Smooth sinusoidal gentle tilt & slight horizontal poise modulation without jarring jumps
            const angle = Math.sin(p * Math.PI * 1.5) * 2.4;
            gsap.set(inner, {
              rotation: angle,
              scale: 1 + Math.sin(p * Math.PI) * 0.035,
            });
          },
        });
      });

      // Graceful fade & drift upward before reaching Footer
      if (epilogueRef.current) {
        gsap.to(overlay, {
          opacity: 0,
          y: -60,
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
      {/* DESKTOP FIXED CHOREOGRAPHED CUP LAYER (Glides center -> left & scrubs 001..181 with scroll) */}
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
              className="w-[42vw] max-w-[430px] lg:max-w-[500px] xl:max-w-[540px]"
            />
          </div>
        </div>
      </div>

      {/* 1. INTRO SECTION */}
      <section
        ref={introSectionRef}
        className="relative z-30 min-h-[100svh] flex flex-col justify-between items-center text-center max-w-6xl mx-auto px-5 sm:px-8 pt-24 sm:pt-28 pb-10 pointer-events-none"
      >
        <div ref={introTitleRef} className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.36em] text-[#F5C518]/90">
            COFFEE. CRAFTED. CULTURE.
          </p>

          <h1 className="font-syne font-black uppercase tracking-tight leading-[0.88] text-[clamp(2.35rem,6vw,5.4rem)] text-white">
            A BETTER KIND OF{' '}
            <span className="inline-block">
              COFFEE<span className="text-[#F5C518]">.</span>
            </span>
          </h1>
        </div>

        {/* Mobile Intro Centered Cup (Desktop renders centered unified floating vessel right behind/below title) */}
        <div className="md:hidden my-auto py-4 w-full">
          <ScrollCoffeeStage
            fallbackFrame={1}
            className="w-full max-w-[300px] sm:max-w-[360px] mx-auto"
          />
        </div>

        {/* Subtle minimal scroll whisper at bottom of intro */}
        <div className="flex flex-col items-center gap-2 opacity-60">
          <span className="text-[10px] font-mono uppercase tracking-[0.34em] text-white/75">
            Scroll To Pour
          </span>
          <span className="w-px h-8 bg-gradient-to-b from-[#F5C518] to-transparent" />
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

      {/* QUIET EPILOGUE SECTION & ORDER BAG ACCESS (Clean separation before Footer) */}
      <section
        ref={epilogueRef}
        className="relative z-20 max-w-5xl mx-auto px-5 sm:px-8 py-24 sm:py-32 text-center border-t border-white/[0.08]"
      >
        <p className="text-[11px] font-mono uppercase tracking-[0.34em] text-[#F5C518] mb-4">
          Brewed Fresh To Order
        </p>
        <h2 className="font-syne font-black uppercase tracking-tight leading-[0.92] text-[clamp(2rem,5vw,3.8rem)] text-white mb-8">
          YOUR RITUAL, READY.
        </h2>

        <button
          type="button"
          onClick={openDrawer}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1B1B1B] hover:bg-[#F5C518] text-white hover:text-[#101010] border border-white/15 hover:border-[#F5C518] text-xs font-mono font-bold uppercase tracking-[0.22em] transition-all duration-300 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Review Order ({cartCount})</span>
        </button>
      </section>
    </main>
  );
};
