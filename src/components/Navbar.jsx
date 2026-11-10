import { useState, useEffect } from 'react';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, openDrawer } = useCart();

  // Exactly the 4 simplified navigation items
  const navLinks = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'Our Story', href: '#story', id: 'story' },
    { name: 'Menu', href: '#menu', id: 'menu' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Scroll spy logic
      const scrollPosition = window.scrollY + 250;

      const heroEl = document.getElementById('hero');
      const storyEl = document.getElementById('story') || document.getElementById('origin');
      const menuEl = document.getElementById('menu');
      const contactEl = document.getElementById('contact');

      if (contactEl && scrollPosition >= contactEl.offsetTop - 100) {
        setActiveSection('contact');
      } else if (menuEl && scrollPosition >= menuEl.offsetTop - 100) {
        setActiveSection('menu');
      } else if (storyEl && scrollPosition >= storyEl.offsetTop - 100) {
        setActiveSection('story');
      } else if (heroEl) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#101010]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: BREW. Text Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-3 select-none cursor-pointer py-1"
            aria-label="BREW. Home"
          >
            <div className="flex flex-col">
              <span className="font-syne font-black text-2xl sm:text-3xl tracking-[0.16em] text-white leading-none">
                BREW<span className="text-[#F5C518]">.</span>
              </span>
              <span className="text-[7.5px] sm:text-[8px] font-mono uppercase tracking-[0.3em] text-[#F5C518]/90 mt-1 font-semibold">
                COFFEE • CRAFTED • CULTURE
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation (Visible on laptop/desktop: lg:flex 1024px+) */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative text-xs font-mono uppercase tracking-[0.2em] transition-colors py-2 group cursor-pointer min-h-[44px] flex items-center ${
                    isActive ? 'text-[#F5C518] font-bold' : 'text-white/75 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  {/* Subtle animated underline */}
                  <span
                    className={`absolute bottom-1 left-0 h-[2px] bg-[#F5C518] transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right: Cart Button + Order Online CTA / Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Functional Cart Button with minimum 44px touch target */}
            <button
              onClick={openDrawer}
              aria-label="Open Order Bag"
              className="relative min-w-[44px] min-h-[44px] p-2.5 rounded-full bg-[#181818]/90 border border-white/15 hover:border-[#F5C518] text-white hover:text-[#F5C518] transition-all cursor-pointer flex items-center justify-center"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#F5C518] text-[#101010] text-[9px] font-mono font-black flex items-center justify-center shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Desktop Order Online Button (1024px+) */}
            <button
              onClick={openDrawer}
              className="hidden lg:inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded bg-[#F5C518] text-[#101010] font-syne font-black text-xs uppercase tracking-widest hover:bg-[#FFDF40] hover:shadow-[0_0_25px_rgba(245,197,24,0.45)] transition-all transform active:scale-95 cursor-pointer"
            >
              <span>ORDER ONLINE</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>

            {/* Mobile & Tablet Hamburger Button (Visible on < 1024px with 44px touch target) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative min-w-[44px] min-h-[44px] w-11 h-11 rounded-lg bg-[#181818]/80 border border-white/10 flex flex-col items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              <span
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  mobileMenuOpen ? 'w-5 rotate-45 translate-y-2 bg-[#F5C518]' : 'w-5'
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  mobileMenuOpen ? 'w-0 opacity-0' : 'w-3.5 self-end mr-3'
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  mobileMenuOpen ? 'w-5 -rotate-45 -translate-y-2 bg-[#F5C518]' : 'w-5'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Mobile Drawer Navigation Menu (< 1024px) */}
      <div
        className={`fixed inset-0 z-30 bg-[#0d0d0d]/98 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between px-6 sm:px-10 py-24 lg:hidden ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="space-y-6">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#F5C518]">
            NAVIGATION // BREW.
          </p>
          <nav className="flex flex-col gap-1">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group flex items-center justify-between text-2xl sm:text-3xl font-syne font-black uppercase tracking-tight text-white/90 hover:text-[#F5C518] py-3.5 border-b border-white/10 transition-colors min-h-[48px]"
              >
                <span>{link.name}</span>
                <span className="text-xs font-mono text-[#F5C518]/70 group-hover:text-[#F5C518]">
                  0{idx + 1}
                </span>
              </a>
            ))}
          </nav>
        </div>

        <div className="space-y-4 pt-6 border-t border-white/10">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openDrawer();
            }}
            className="w-full min-h-[48px] py-3.5 bg-[#F5C518] text-[#101010] font-syne font-black text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <span>ORDER ONLINE NOW</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <div className="flex items-center justify-between text-xs font-mono text-white/40">
            <span>COFFEE. CRAFTED. CULTURE.</span>
            <span className="text-[#F5C518]">EST. 2026</span>
          </div>
        </div>
      </div>
    </>
  );
};
