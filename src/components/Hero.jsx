import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Compass, Volume2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Custom SVG Roasted Coffee Bean with realistic cleft, gradient, and surface sheen
const CoffeeBean = ({ className = '', style = {} }) => (
  <svg
    viewBox="0 0 100 130"
    className={`drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] filter select-none pointer-events-none ${className}`}
    style={style}
  >
    <defs>
      <linearGradient id="beanGrad" x1="15%" y1="10%" x2="85%" y2="90%">
        <stop offset="0%" stopColor="#4A2E18" />
        <stop offset="35%" stopColor="#321A0C" />
        <stop offset="70%" stopColor="#1E0E05" />
        <stop offset="100%" stopColor="#0F0602" />
      </linearGradient>
      <linearGradient id="cleftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#150803" />
        <stop offset="100%" stopColor="#080201" />
      </linearGradient>
      <radialGradient id="highlightGrad" cx="30%" cy="30%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.18" />
        <stop offset="60%" stopColor="#F5C518" stopOpacity="0.06" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Bean main body */}
    <path
      d="M50 6 C76 6, 94 32, 94 65 C94 98, 76 124, 50 124 C24 124, 6 98, 6 65 C6 32, 24 6, 50 6 Z"
      fill="url(#beanGrad)"
    />
    {/* Surface sheen */}
    <ellipse cx="36" cy="40" rx="16" ry="28" fill="url(#highlightGrad)" transform="rotate(-18 36 40)" />
    {/* Deep organic cleft with S-curve */}
    <path
      d="M50 10 Q42 38, 52 65 Q62 92, 48 120"
      stroke="url(#cleftGrad)"
      strokeWidth="7"
      strokeLinecap="round"
      fill="none"
    />
    {/* Caramel golden cleft edge reflection */}
    <path
      d="M53 14 Q45 40, 54 65 Q64 90, 50 116"
      stroke="#F5C518"
      strokeWidth="1.2"
      strokeOpacity="0.45"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const Hero = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const watermarkRef = useRef(null);
  const floatingElementsRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const [bgSrc, setBgSrc] = useState(
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=90&w=2400&auto=format&fit=crop'
  );

  // Sync audio state with ambient player
  useEffect(() => {
    const handleAudioState = (e) => {
      if (e.detail?.isPlaying !== undefined) {
        setIsAudioPlaying(e.detail.isPlaying);
      }
    };
    window.addEventListener('ambient-audio-state', handleAudioState);
    return () => window.removeEventListener('ambient-audio-state', handleAudioState);
  }, []);

  const toggleHeroAudio = () => {
    window.dispatchEvent(new CustomEvent('toggle-ambient-audio'));
  };

  // Interactive mouse parallax (desktop only)
  const handleMouseMove = useCallback((e) => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none) or (max-width: 1023px)').matches) return;

    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;

    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: x * 12,
        y: y * 10,
        duration: 0.9,
        ease: 'power2.out',
      });
    }

    if (watermarkRef.current) {
      gsap.to(watermarkRef.current, {
        x: x * -16,
        y: y * -10,
        duration: 1.1,
        ease: 'power2.out',
      });
    }

    if (floatingElementsRef.current) {
      const beans = floatingElementsRef.current.children;
      if (beans[0]) gsap.to(beans[0], { x: x * 24, y: y * 20, rotate: -25 + x * 8, duration: 0.8, ease: 'power2.out' });
      if (beans[1]) gsap.to(beans[1], { x: x * -18, y: y * -16, rotate: 35 + x * -6, duration: 0.9, ease: 'power2.out' });
      if (beans[2]) gsap.to(beans[2], { x: x * 28, y: y * -22, rotate: 45 + y * 10, duration: 0.85, ease: 'power2.out' });
      if (beans[3]) gsap.to(beans[3], { x: x * -24, y: y * 26, rotate: -15 + y * -8, duration: 1.0, ease: 'power2.out' });
      if (beans[4]) gsap.to(beans[4], { x: x * 16, y: y * 18, rotate: 60 + x * 10, duration: 0.75, ease: 'power2.out' });
    }
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    const ctx = gsap.context(() => {
      // 1. Initial entrance animations
      gsap.fromTo(
        imageRef.current,
        { scale: isMobile ? 1.02 : 1.08, opacity: 0.85 },
        { scale: 1.0, opacity: 1, duration: 1.5, ease: 'power3.out' }
      );

      gsap.fromTo(
        watermarkRef.current,
        { opacity: 0, scale: 0.94 },
        { opacity: 0.08, scale: 1.0, duration: 1.6, ease: 'power2.out', delay: 0.2 }
      );

      // 2. Scroll Parallax: background scales and floats, floating beans rotate outwards
      if (!prefersReducedMotion && imageRef.current) {
        gsap.to(imageRef.current, {
          scale: isMobile ? 1.05 : 1.15,
          yPercent: isMobile ? 6 : 14,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: isMobile ? 0.6 : 1.2,
          },
        });

        if (floatingElementsRef.current) {
          gsap.to(floatingElementsRef.current.children, {
            yPercent: -35,
            stagger: 0.05,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.0,
            },
          });
        }
      }

      // 3. Typography & CTA elements reveal
      const tl = gsap.timeline({ delay: 0.2, defaults: { ease: 'power3.out' } });
      tl.from(headingRef.current, {
        opacity: 0,
        y: isMobile ? 35 : 55,
        duration: 0.95,
      })
        .from(
          descRef.current,
          {
            opacity: 0,
            y: 22,
            duration: 0.7,
          },
          '-=0.45'
        )
        .from(
          ctaRef.current?.children,
          {
            opacity: 0,
            y: 18,
            stagger: 0.1,
            duration: 0.55,
          },
          '-=0.35'
        );
    }, el);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero relative min-h-[94vh] sm:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#101010] text-white pt-24 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-12 select-none"
    >
      {/* ── 1. LARGE, CLEARLY VISIBLE COFFEE PHOTOGRAPH BACKGROUND ── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <img
          ref={imageRef}
          src={bgSrc}
          onError={() =>
            setBgSrc(
              'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=90&w=2400&auto=format&fit=crop'
            )
          }
          alt="Freshly roasted whole bean coffee and espresso extraction"
          className="hero-background w-full h-[120%] -top-[10%] relative object-cover object-[center_35%] sm:object-[center_40%] lg:object-center will-change-transform filter brightness-95 contrast-105"
        />

        {/* Crisp editorial gradients: keeps the coffee clearly visible while ensuring text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#101010]/85 via-black/30 to-[#101010] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(16,16,16,0.65)_100%)] pointer-events-none" />
      </div>

      {/* ── 2. COLOSSAL BACKDROP WATERMARK (Matching Hozon's monumental typography depth) ── */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none select-none overflow-hidden"
      >
        <span className="font-syne font-black text-[clamp(6rem,24vw,24rem)] tracking-tighter uppercase text-white/5 whitespace-nowrap leading-none transform -translate-y-4 sm:-translate-y-6">
          BREW.
        </span>
      </div>

      {/* ── 3. FLOATING COFFEE INGREDIENTS (Hozon's floating cucumber slices equivalent) ── */}
      <div
        ref={floatingElementsRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full z-[3] pointer-events-none overflow-hidden"
      >
        {/* Bean 1: Top Left */}
        <div className="absolute top-[20%] left-[6%] sm:left-[12%] w-10 h-14 sm:w-14 sm:h-18 md:w-16 md:h-20 opacity-85 transform -rotate-[25deg]">
          <CoffeeBean className="w-full h-full" />
        </div>

        {/* Bean 2: Mid-Low Left */}
        <div className="absolute top-[58%] left-[4%] sm:left-[8%] w-8 h-11 sm:w-12 sm:h-16 opacity-75 transform rotate-[35deg]">
          <CoffeeBean className="w-full h-full" />
        </div>

        {/* Bean 3: Top Right */}
        <div className="absolute top-[16%] right-[6%] sm:right-[14%] w-11 h-15 sm:w-16 sm:h-22 opacity-85 transform rotate-[45deg]">
          <CoffeeBean className="w-full h-full" />
        </div>

        {/* Bean 4: Mid Right */}
        <div className="absolute top-[52%] right-[3%] sm:right-[8%] w-12 h-16 sm:w-18 sm:h-24 opacity-90 transform -rotate-[15deg]">
          <CoffeeBean className="w-full h-full" />
        </div>

        {/* Bean 5: Bottom Right */}
        <div className="absolute top-[72%] right-[10%] sm:right-[18%] w-7 h-10 sm:w-10 sm:h-14 opacity-70 transform rotate-[60deg]">
          <CoffeeBean className="w-full h-full" />
        </div>

        {/* Ambient golden crema bubbles floating gently */}
        <div className="absolute top-[30%] left-[22%] w-3 h-3 rounded-full bg-[#F5C518]/25 blur-[1px] animate-pulse" />
        <div className="absolute top-[65%] right-[25%] w-2.5 h-2.5 rounded-full bg-[#F5C518]/30 blur-[1px] animate-pulse" style={{ animationDelay: '1.2s' }} />
        <div className="absolute top-[25%] right-[32%] w-2 h-2 rounded-full bg-white/20 blur-[0.5px]" />
      </div>

      {/* ── 4. HOZON EDITORIAL CORNER FRAMING (Top Corners) ── */}
      <div className="relative z-10 w-full flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/90 drop-shadow-md pt-2 sm:pt-0">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#F5C518] shadow-[0_0_10px_#F5C518]" />
          <span className="text-[#F5C518] font-bold">THE ART OF COFFEE.</span>
        </div>
        <div className="hidden md:block text-right text-white/80 max-w-xs font-light leading-relaxed">
          <div>A sensory ritual.</div>
          <div>A slower kind of greatness.</div>
        </div>
      </div>

      {/* ── 5. HOZON EDITORIAL CORNER FRAMING (Bottom Left Vertical Text) ── */}
      <div
        aria-hidden="true"
        className="absolute left-4 sm:left-6 lg:left-10 bottom-12 hidden md:flex items-center gap-3 [writing-mode:vertical-rl] rotate-180 font-mono text-[10px] tracking-[0.3em] uppercase text-white/60 select-none z-10"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
        <span>COFFEE. CRAFTED. CULTURE.</span>
      </div>

      {/* ── 6. HOZON EDITORIAL CORNER FRAMING (Bottom Right II / Audio Control) ── */}
      <div className="absolute right-4 sm:right-6 lg:right-10 bottom-10 hidden sm:flex items-center gap-2.5 z-20">
        <button
          onClick={toggleHeroAudio}
          className="group flex items-center justify-center w-11 h-11 rounded-full border border-white/30 bg-black/60 backdrop-blur-md text-white hover:border-[#F5C518] hover:text-[#F5C518] hover:shadow-[0_0_18px_rgba(245,197,24,0.4)] transition-all cursor-pointer"
          title={isAudioPlaying ? 'Pause roastery ambient audio' : 'Play roastery ambient audio'}
          aria-label="Toggle ambient roastery audio"
        >
          {isAudioPlaying ? (
            <span className="font-mono text-xs font-bold tracking-widest text-[#F5C518]">II</span>
          ) : (
            <Volume2 className="w-4 h-4 text-white group-hover:text-[#F5C518] transition-colors" />
          )}
        </button>
      </div>

      {/* ── 7. MAIN OVERSIZED TYPOGRAPHY & HERO COMPOSITION ── */}
      <div className="hero-content relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center my-auto py-6 sm:py-10">
        <h1
          ref={headingRef}
          className="font-syne font-black text-[clamp(2.4rem,8.2vw,8.2rem)] tracking-tight uppercase leading-[0.92] text-white select-none drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)] mb-6 max-w-full"
        >
          WAKE UP TO{' '}
          <span className="text-[#F5C518] drop-shadow-[0_0_40px_rgba(245,197,24,0.65)] block sm:inline">
            GREATNESS.
          </span>
        </h1>

        <p
          ref={descRef}
          className="max-w-xl text-sm sm:text-base md:text-lg text-white/95 font-sans-custom font-normal leading-relaxed mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] px-4"
        >
          Every bean has a story. Every cup has a character. Discover the art of exceptional coffee.
        </p>

        {/* Minimal CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto px-2 sm:px-0"
        >
          <a
            href="#menu"
            className="group min-h-[48px] px-8 py-3.5 bg-[#F5C518] text-[#101010] font-syne font-black text-xs uppercase tracking-widest rounded hover:bg-[#FFDF40] hover:shadow-[0_0_30px_rgba(245,197,24,0.7)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer shadow-xl"
          >
            <span>EXPLORE MENU</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="#story"
            className="group min-h-[48px] px-8 py-3.5 bg-black/60 backdrop-blur-md border border-white/30 text-white font-syne font-bold text-xs uppercase tracking-widest rounded hover:border-[#F5C518] hover:text-[#F5C518] hover:bg-black/85 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <span>OUR STORY</span>
            <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
          </a>
        </div>
      </div>

      {/* ── 8. MINIMAL SCROLL PROMPT (Bottom Center) ── */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 text-white/70 hover:text-[#F5C518] transition-colors pb-1">
        <a
          href="#story"
          className="flex flex-col items-center gap-1.5 group cursor-pointer p-2"
          aria-label="Scroll to discover our story"
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] drop-shadow-md">
            SCROLL TO DISCOVER
          </span>
          <div className="w-[1px] h-6 sm:h-8 bg-gradient-to-b from-[#F5C518] to-transparent animate-pulse" />
        </a>
      </div>
    </section>
  );
};
