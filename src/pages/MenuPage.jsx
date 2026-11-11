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
  const { product, companions } = chapter;
  const activeSize = product.sizes?.[selectedSizeIndex] || product.sizes?.[0];
  const displayPrice = activeSize?.price ?? product.price;

  const subtleToneBg =
    chapterIndex % 2 === 1
      ? 'bg-gradient-to-b from-transparent via-[#151515]/55 to-transparent'
      : 'bg-transparent';

  return (
    <article
      id={`chapter-${chapter.categoryId}`}
      ref={chapterRef}
      className={`story-chapter product-section relative z-10 pointer-events-auto scroll-mt-20 md:scroll-mt-0 ${subtleToneBg} transition-colors duration-700`}
    >
      <div className="max-w-7xl mx-auto px-4 min-[375px]:px-5 sm:px-8 lg:px-12 xl:px-14 py-16 sm:py-22 md:pt-28 md:pb-28 lg:py-36">
        <div className="relative z-10 pointer-events-auto flex flex-col gap-5 md:block md:ml-[45%] lg:ml-[44%] xl:ml-[45%] md:max-w-[520px] lg:max-w-[560px] xl:max-w-[600px]">
          {/* BEAT 1: PRODUCT INTRODUCTION */}
          <div className="beat-intro space-y-4 sm:space-y-6 pb-16 sm:pb-22 md:pb-28 lg:pb-32">
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
              <h2 className="reveal-title font-syne font-black uppercase tracking-tight leading-[0.92] text-[clamp(1.85rem,7.6vw,2.7rem)] md:text-[clamp(1.85rem,3.6vw,3.1rem)] lg:text-[clamp(2.35rem,4.2vw,4.35rem)] text-white break-words">
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

          {/* BEAT 2: FLAVOUR EXPERIENCE */}
          <div className="beat-flavour relative py-14 sm:py-20 md:py-24 border-t border-white/[0.08] space-y-6 sm:space-y-8">
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
                  <p className="font-editorial italic text-xl min-[375px]:text-2xl sm:text-3xl lg:text-4xl text-white/95 tracking-tight">
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

          {/* BEAT 3: INGREDIENTS, SIZES, PRICE & ORDER ACTION */}
          <div className="beat-order pt-14 sm:pt-18 md:pt-20 pb-24 sm:pb-28 md:pb-6 border-t border-white/[0.08] space-y-8 sm:space-y-10">
            <div className="beat-order-ingredients space-y-4">
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

            <div className="reveal-purchase space-y-6 pt-6 border-t border-white/[0.08]">
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
  const stageOverlayRef = useRef(null);
  const cupMoverRef = useRef(null);
  const cupInnerRef = useRef(null);
  const epilogueRef = useRef(null);
  const chapterRefs = useRef([]);
  const globalFrameRef = useRef(1);
  const lastViewportWidthRef = useRef(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const addTimerRef = useRef(null);
  const companionTimerRef = useRef(null);

  const scrollToChapter = (categoryId) => {
    const idx = FILM_CHAPTERS.findIndex((c) => c.categoryId === categoryId);
    if (idx < 0) return;
    preloadFrameSequence(FILM_CHAPTERS[idx].frames);
    chapterRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Initial preload, multi-stage ScrollTrigger layout refresh (100dvh + fonts + images), & ?category= deep-linking
  useEffect(() => {
    const refreshLayout = () => {
      ScrollTrigger.refresh();
    };

    loadFrameImage(buildMenuFrameUrl(1)).then(refreshLayout);
    if (FILM_CHAPTERS[0]) {
      preloadFrameSequence(FILM_CHAPTERS[0].frames);
    }

    document.fonts?.ready?.then(refreshLayout);
    window.addEventListener('load', refreshLayout, { once: true });
    const settleTimer = setTimeout(refreshLayout, 220);

    let deepLinkTimer = null;
    const requestedCategory = searchParams.get('category');
    if (requestedCategory) {
      const normalized = getExperienceCategoryQueryAlias(requestedCategory);
      const chapterIdx = FILM_CHAPTERS.findIndex((c) => c.categoryId === normalized);
      if (chapterIdx >= 0) {
        preloadFrameSequence(FILM_CHAPTERS[chapterIdx].frames);
        deepLinkTimer = setTimeout(() => {
          chapterRefs.current[chapterIdx]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          ScrollTrigger.refresh();
        }, 180);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    return () => {
      window.removeEventListener('load', refreshLayout);
      clearTimeout(settleTimer);
      if (deepLinkTimer) clearTimeout(deepLinkTimer);
      if (addTimerRef.current) clearTimeout(addTimerRef.current);
      if (companionTimerRef.current) clearTimeout(companionTimerRef.current);
    };
  }, [searchParams]);

  // Refresh ScrollTrigger ONLY on real width or orientation changes (ignores mobile address bar height toggles)
  useEffect(() => {
    let timer = null;
    const handleViewportChange = (isOrientation = false) => {
      const currentW = window.innerWidth;
      if (!isOrientation && currentW === lastViewportWidthRef.current) return;
      lastViewportWidthRef.current = currentW;

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };

    const onResize = () => handleViewportChange(false);
    const onOrientation = () => handleViewportChange(true);

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onOrientation, { passive: true });
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onOrientation);
    };
  }, []);

  // Unified Single-Vessel ScrollTrigger Master Timeline (Mobile & Desktop share ONE persistent canvas)
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: '(max-width: 767px)',
        isTabletDesktop: '(min-width: 768px)',
      },
      (context) => {
        const { isMobile } = context.conditions;

        const mainEl = pageRef.current;
        const mover = cupMoverRef.current;
        const inner = cupInnerRef.current;
        const overlay = stageOverlayRef.current;
        const introEl = introSectionRef.current;

        // 1. Lazy preloading per chapter
        FILM_CHAPTERS.forEach((chapter, idx) => {
          const chapterEl = chapterRefs.current[idx];
          if (!chapterEl) return;

          ScrollTrigger.create({
            trigger: chapterEl,
            start: isMobile ? 'top 140%' : 'top 150%',
            once: true,
            onEnter: () => {
              preloadFrameSequence(chapter.frames);
              if (FILM_CHAPTERS[idx + 1]) {
                preloadFrameSequence(FILM_CHAPTERS[idx + 1].frames);
              }
            },
          });
        });

        // 2. Intro Heading Entrance
        if (introTitleRef.current) {
          gsap.from(introTitleRef.current.children, {
            y: isMobile ? 22 : 34,
            opacity: 0,
            stagger: 0.12,
            duration: isMobile ? 0.8 : 1.0,
            ease: 'power3.out',
            clearProps: 'transform',
          });
        }

        // 3. Single Persistent Vessel Master Timeline Across Entire <main> (trigger: "main", scrub: 1)
        if (mainEl && mover && inner && overlay) {
          const desktopLeftX = () => {
            const vw = window.innerWidth;
            if (vw < 992) return -Math.round(vw * 0.25);
            if (vw < 1200) return -Math.round(vw * 0.245);
            return -Math.min(Math.round(vw * 0.235), 320);
          };

          const frameState = { frame: 1 };
          globalFrameRef.current = 1;

          gsap.set(overlay, { opacity: 1, y: 0 });
          gsap.set(mover, {
            x: 0,
            y: isMobile ? -8 : 42,
            scale: isMobile ? 0.94 : 1.0,
            opacity: isMobile ? 0.88 : 1,
          });
          gsap.set(inner, {
            x: 0,
            rotation: 0,
            rotateY: 0,
            scale: 1,
            transformPerspective: isMobile ? 850 : 950,
          });

          const totalSections = document.querySelectorAll('.product-section');
          const sectionCount = Math.max(1, totalSections.length);
          const scrollRoot = document.getElementById('main-wrapper') || mainEl;
          const totalScrollDist = Math.max(1, scrollRoot.scrollHeight - window.innerHeight);

          const firstChapterFrac = totalSections[0]
            ? Math.max(0.08, Math.min(0.18, (totalSections[0].getBoundingClientRect().top + window.scrollY) / totalScrollDist))
            : 0.13;
          const epilogueFrac = epilogueRef.current
            ? Math.max(0.84, Math.min(0.95, (epilogueRef.current.getBoundingClientRect().top + window.scrollY) / totalScrollDist))
            : 0.94;
          const chapterSpan = (epilogueFrac - firstChapterFrac) / sectionCount;
          const fadeDur = Math.max(0.05, 1 - epilogueFrac);

          const masterTl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: '#main-wrapper',
              start: 'top top',
              end: () => 'bottom bottom',
              scrub: 1.8,
              invalidateOnRefresh: true,
            },
          });

          // Segment 0 -> 1: Intro -> Chapter 01 Entry (0 -> firstChapterFrac)
          if (introTitleRef.current && introEl) {
            masterTl.to(
              introTitleRef.current,
              {
                y: isMobile ? -28 : -50,
                opacity: isMobile ? 0.2 : 0,
                ease: 'none',
                duration: firstChapterFrac * 0.8,
              },
              0.01
            );
          }

          masterTl
            .to(
              mover,
              {
                x: () => (isMobile ? 26 : desktopLeftX()),
                y: () => (isMobile ? -Math.round(window.innerHeight * 0.14) : 0),
                scale: () => (isMobile ? 0.8 : window.innerWidth < 992 ? 0.92 : 0.95),
                opacity: isMobile ? 0.42 : 1,
                ease: 'none',
                duration: firstChapterFrac,
              },
              0
            )
            .to(
              frameState,
              {
                frame: 12,
                ease: 'none',
                duration: firstChapterFrac,
                onUpdate: () => {
                  globalFrameRef.current = frameState.frame;
                },
              },
              0
            );

          // Segments 1..N: Continuous Smooth Vessel Morph & 3D Movement Synchronized Strictly Across ALL Product Sections -> Page End
          const chapterTimelineCoords = isMobile
            ? [
                { mx: -24, my: -0.12, mScale: 0.84, r: 3.5, ry: 12, s: 1.04 },
                { mx: 26, my: -0.14, mScale: 0.86, r: -3.2, ry: -14, s: 1.05 },
                { mx: -22, my: -0.11, mScale: 0.84, r: 3.8, ry: 14, s: 1.04 },
                { mx: 0, my: -0.12, mScale: 0.87, r: -2.4, ry: -10, s: 1.03 },
              ]
            : [
                { ix: 0, r: 2.2, ry: 6, s: 1.032 },
                { ix: -10, r: -2.4, ry: -7, s: 1.035 },
                { ix: 8, r: 2.5, ry: 8, s: 1.04 },
                { ix: 0, r: -1.8, ry: -5, s: 1.025 },
              ];

          FILM_CHAPTERS.forEach((chapter, idx) => {
            const segStart = firstChapterFrac + idx * chapterSpan;
            const halfDur = chapterSpan * 0.5;
            const targetEndFrame = chapter.endFrame;
            const pose = chapterTimelineCoords[idx % chapterTimelineCoords.length];

            // Morph video frames seamlessly across exact section scroll range
            masterTl.to(
              frameState,
              {
                frame: targetEndFrame,
                ease: 'none',
                duration: chapterSpan,
                onUpdate: () => {
                  globalFrameRef.current = frameState.frame;
                },
              },
              segStart
            );

            if (isMobile) {
              masterTl
                .to(
                  mover,
                  {
                    x: pose.mx,
                    y: () => Math.round(window.innerHeight * pose.my),
                    scale: pose.mScale,
                    opacity: 0.45,
                    ease: 'none',
                    duration: halfDur,
                  },
                  segStart
                )
                .to(
                  inner,
                  {
                    rotation: pose.r,
                    rotateY: pose.ry,
                    scale: pose.s,
                    ease: 'none',
                    duration: halfDur,
                  },
                  segStart
                )
                .to(
                  inner,
                  {
                    rotation: -pose.r * 0.65,
                    rotateY: -pose.ry * 0.7,
                    scale: 0.99,
                    ease: 'none',
                    duration: halfDur,
                  },
                  segStart + halfDur
                );
            } else {
              masterTl
                .to(
                  inner,
                  {
                    x: pose.ix,
                    rotation: pose.r,
                    rotateY: pose.ry,
                    scale: pose.s,
                    ease: 'none',
                    duration: halfDur,
                  },
                  segStart
                )
                .to(
                  inner,
                  {
                    x: 0,
                    rotation: idx === sectionCount - 1 ? pose.r * 0.35 : -pose.r * 0.7,
                    rotateY: idx === sectionCount - 1 ? pose.ry * 0.35 : -pose.ry * 0.65,
                    scale: 1,
                    ease: 'none',
                    duration: halfDur,
                  },
                  segStart + halfDur
                );
            }
          });

          // Final Segment: Epilogue -> Bottom of #main-wrapper (strictly terminates at 1.00 when page bottom hits viewport bottom)
          masterTl.to(
            overlay,
            {
              opacity: 0,
              y: isMobile ? -36 : -55,
              ease: 'none',
              duration: fadeDur,
            },
            epilogueFrac
          );
        }

        // 4. Staggered Typography & Control Reveals Across Mobile & Desktop
        FILM_CHAPTERS.forEach((_, idx) => {
          const chapterEl = chapterRefs.current[idx];
          if (!chapterEl) return;

          const titleEl = chapterEl.querySelector('.reveal-title');
          const introLines = chapterEl.querySelectorAll('.reveal-line, .reveal-copy');
          const flavourEls = chapterEl.querySelectorAll('.reveal-flavour');
          const ingredientEls = chapterEl.querySelectorAll('.reveal-ingredient');
          const purchaseEls = chapterEl.querySelectorAll('.reveal-purchase');

          const dist = isMobile ? 22 : 28;
          const dur = isMobile ? 0.75 : 0.85;

          if (titleEl) {
            gsap.from(titleEl, {
              yPercent: 100,
              duration: isMobile ? 0.85 : 0.95,
              ease: 'power4.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: titleEl,
                start: isMobile ? 'top 92%' : 'top 86%',
                toggleActions: 'play none none reverse',
              },
            });
          }

          if (introLines.length > 0) {
            gsap.from(introLines, {
              y: dist,
              opacity: 0,
              stagger: 0.1,
              duration: dur,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: introLines[0],
                start: isMobile ? 'top 90%' : 'top 85%',
                toggleActions: 'play none none reverse',
              },
            });
          }

          if (flavourEls.length > 0) {
            gsap.from(flavourEls, {
              y: dist,
              opacity: 0,
              stagger: 0.12,
              duration: dur,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: chapterEl.querySelector('.beat-flavour'),
                start: isMobile ? 'top 90%' : 'top 84%',
                toggleActions: 'play none none reverse',
              },
            });
          }

          if (ingredientEls.length > 0) {
            gsap.from(ingredientEls, {
              x: isMobile ? -12 : -16,
              opacity: 0,
              stagger: 0.09,
              duration: isMobile ? 0.65 : 0.75,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: chapterEl.querySelector('.beat-order-ingredients'),
                start: isMobile ? 'top 90%' : 'top 85%',
                toggleActions: 'play none none reverse',
              },
            });
          }

          if (purchaseEls.length > 0) {
            gsap.from(purchaseEls, {
              y: dist,
              opacity: 0,
              stagger: 0.1,
              duration: dur,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: purchaseEls[0],
                start: isMobile ? 'top 92%' : 'top 88%',
                toggleActions: 'play none none reverse',
              },
            });
          }
        });

        return undefined;
      }
    );

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
    <div
      ref={pageRef}
      className="relative bg-[#101010] text-white overflow-x-clip pb-28 sm:pb-32 md:pb-0 selection:bg-[#F5C518] selection:text-[#101010]"
    >
      {/* SINGLE GLOBAL PERSISTENT VIEWPORT STAGE (ONLY ONE canvas across the entire Menu Page, fixed z-0 behind z-10/z-20 typography) */}
      <div
        ref={stageOverlayRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div ref={cupMoverRef} className="will-change-transform pointer-events-none">
          <div ref={cupInnerRef} className="will-change-transform pointer-events-none">
            <ScrollCoffeeStage
              frameNumberRef={globalFrameRef}
              fallbackFrame={1}
              className="w-[min(76vw,38dvh)] h-[min(76vw,38dvh)] min-h-[210px] max-w-[290px] max-h-[300px] md:w-[37vw] md:h-auto md:min-h-0 md:max-w-[310px] md:max-h-none lg:w-[40vw] lg:max-w-[465px] xl:w-[42vw] xl:max-w-[565px]"
            />
          </div>
        </div>
      </div>

      {/* 1. INTRO SECTION (100dvh on mobile for accurate mobile address-bar viewport sizing) */}
      <section
        ref={introSectionRef}
        className="relative z-10 min-h-[100dvh] md:min-h-[100svh] flex flex-col justify-between items-center text-center max-w-6xl mx-auto px-4 min-[375px]:px-5 sm:px-8 pt-24 sm:pt-28 pb-24 sm:pb-28 md:pb-12"
      >
        <div
          ref={introTitleRef}
          className="relative z-20 max-w-4xl mx-auto space-y-3 sm:space-y-4 pointer-events-auto"
        >
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

        {/* Bottom quick jump chapter bar + subtle scroll whisper (explicitly z-20 pointer-events-auto on top) */}
        <div className="relative z-20 pointer-events-auto w-full flex flex-col items-center gap-4 sm:gap-5 mt-auto">
          <nav
            aria-label="Jump to coffee chapter"
            className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-1 max-w-full"
          >
            {FILM_CHAPTERS.map((chap) => (
              <button
                key={chap.categoryId}
                type="button"
                onClick={() => scrollToChapter(chap.categoryId)}
                className="min-h-[44px] px-1.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] sm:tracking-[0.22em] text-white/60 hover:text-[#F5C518] transition-colors cursor-pointer"
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
      <section aria-label="Coffee Menu Film Chapters" className="relative z-10 pointer-events-auto">
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

      {/* QUIET EPILOGUE SECTION (extra bottom spacing below CTA keeps floating mobile bag pill clear) */}
      <section
        ref={epilogueRef}
        className="relative z-20 pointer-events-auto max-w-5xl mx-auto px-4 min-[375px]:px-5 sm:px-8 pt-16 pb-28 sm:pt-24 sm:pb-32 md:py-28 lg:py-32 text-center border-t border-white/[0.08]"
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
    </div>
  );
};
