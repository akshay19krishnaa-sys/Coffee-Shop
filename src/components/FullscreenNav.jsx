import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { label: 'HOME', href: '#hero' },
  { label: 'THE STORY', href: '#coffee-story' },
  { label: 'SIGNATURE MENU', href: '#signature-menu' },
  { label: 'ABOUT THE CAFÉ', href: '#about-cafe' },
  { label: 'WHY CHOOSE US', href: '#why-us' },
  { label: 'GALLERY', href: '#cafe-experience' },
  { label: 'REVIEWS', href: '#testimonials' },
  { label: 'ORDER NOW', href: '#final-cta', accent: true },
];

export const FullscreenNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const metaRef = useRef(null);
  const tlRef = useRef(null);
  const { cartCount, openDrawer } = useCart();

  // Track scroll for header style change
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Build GSAP open/close timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      // Set initial state for all link inner elements
      const linkInners = linksRef.current.map((el) => el?.querySelector('.nav-link-text'));
      const metaItems = metaRef.current?.querySelectorAll('.nav-meta-item');

      gsap.set(linkInners, { y: '110%' });
      gsap.set(metaItems, { opacity: 0, y: 20 });
      gsap.set(overlayRef.current, { clipPath: 'circle(0% at calc(100% - 56px) 56px)' });

      tl.to(overlayRef.current, {
        clipPath: 'circle(170% at calc(100% - 56px) 56px)',
        duration: 0.75,
        ease: 'power4.inOut',
      })
        .to(
          linkInners,
          {
            y: '0%',
            duration: 0.7,
            ease: 'power4.out',
            stagger: 0.07,
          },
          '-=0.3'
        )
        .to(
          metaItems,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
            stagger: 0.06,
          },
          '-=0.4'
        );

      tlRef.current = tl;
    });

    return () => ctx.revert();
  }, []);

  const openMenu = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
    tlRef.current?.play();
  };

  const closeMenu = () => {
    tlRef.current?.reverse().then(() => {
      setIsOpen(false);
      document.body.style.overflow = '';
    });
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    closeMenu();
    setTimeout(() => {
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <>
      {/* Fixed Header Bar */}
      <header
        className={`fixed top-0 left-0 w-full z-[9800] transition-all duration-500 ${isScrolled
            ? 'bg-[#101010]/90 backdrop-blur-md border-b border-[#F5C518]/12 py-4'
            : 'bg-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-3 select-none z-10"
          >
            <div className="w-9 h-9 rounded border border-[#F5C518] flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(245,197,24,0.25)] group-hover:shadow-[0_0_25px_rgba(245,197,24,0.5)] transition-shadow duration-300">
              <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
                <polygon points="20,3 37,12.5 37,27.5 20,37 3,27.5 3,12.5" stroke="#F5C518" strokeWidth="2.5" />
                <circle cx="20" cy="20" r="5" fill="#F5C518" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-syne font-black text-xl tracking-[0.18em] text-white">
                AURA<span className="text-[#F5C518]">NOIR</span>
              </span>
              <span className="text-[9px] font-mono tracking-[0.3em] text-[#F5C518]/80 uppercase">
                Specialty Roastery
              </span>
            </div>
          </a>

          {/* Right: Cart + Burger */}
          <div className="flex items-center gap-4 z-10">
            {/* Cart Button */}
            <button
              onClick={openDrawer}
              aria-label="Open Order Bag"
              className="relative p-2.5 rounded-full border border-white/15 hover:border-[#F5C518] text-white hover:text-[#F5C518] transition-all duration-300"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#F5C518] text-[#101010] text-[9px] font-black flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Hamburger Toggle */}
            <button
              onClick={isOpen ? closeMenu : openMenu}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="relative w-11 h-11 flex flex-col items-center justify-center gap-[5px] group z-[9901]"
            >
              <span
                className={`block h-[1.5px] bg-white transition-all duration-400 ease-in-out ${isOpen ? 'w-6 rotate-45 translate-y-[6.5px] bg-[#F5C518]' : 'w-6'
                  }`}
              />
              <span
                className={`block h-[1.5px] bg-white transition-all duration-400 ease-in-out ${isOpen ? 'w-0 opacity-0' : 'w-4'
                  }`}
              />
              <span
                className={`block h-[1.5px] bg-white transition-all duration-400 ease-in-out ${isOpen ? 'w-6 -rotate-45 -translate-y-[6.5px] bg-[#F5C518]' : 'w-5'
                  }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Navigation */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9850] bg-[#0a0a0a]"
        style={{ clipPath: 'circle(0% at calc(100% - 56px) 56px)' }}
        aria-hidden={!isOpen}
      >
        {/* Decorative grid background */}
        <div className="absolute inset-0 bg-grid-dots opacity-30 pointer-events-none" />

        {/* Yellow radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F5C518]/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative h-full max-w-7xl mx-auto px-8 sm:px-12 flex flex-col justify-center pt-28 pb-16">
          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col justify-center gap-2 sm:gap-3">
            {NAV_LINKS.map((link, idx) => (
              <div
                key={link.label}
                ref={(el) => (linksRef.current[idx] = el)}
                className="nav-link-wrapper overflow-hidden py-1"
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="nav-link-text group flex items-center gap-6 leading-none"
                >
                  {/* Index Number */}
                  <span className="text-[11px] font-mono text-[#F5C518]/60 group-hover:text-[#F5C518] transition-colors w-6 shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* Link Label */}
                  <span
                    className={`font-syne font-black uppercase tracking-tight leading-none text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl transition-colors duration-300 ${link.accent ? 'text-[#F5C518]' : 'text-white group-hover:text-[#F5C518]'
                      }`}
                  >
                    {link.label}
                  </span>

                  {/* Arrow on hover */}
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-8 h-8 text-[#F5C518]" />
                  </span>
                </a>
              </div>
            ))}
          </nav>

          {/* Footer Meta Row */}
          <div ref={metaRef} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-white/10">
            {/* Social Links */}
            <div className="flex items-center gap-6 nav-meta-item">
              {['Instagram', 'X/Twitter', 'YouTube'].map((social) => (
                <a
                  key={social}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-mono uppercase tracking-widest text-white/50 hover:text-[#F5C518] transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div className="nav-meta-item">
              <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest">
                concierge@auranoir.coffee
              </p>
            </div>

            {/* Tagline */}
            <div className="nav-meta-item">
              <p className="text-[11px] font-mono text-[#F5C518]/60 uppercase tracking-widest">
                NYC // EST. 2021
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
