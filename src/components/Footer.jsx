import { useState, useEffect } from 'react';
import { ArrowUp, MapPin, Clock, Phone, Mail } from 'lucide-react';

export const Footer = () => {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-[#0d0d0d] text-white pt-16 sm:pt-20 pb-12 overflow-hidden border-t border-[#F5C518]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid: Location, Hours, Contact, Brand */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-12 sm:pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-syne font-black text-2xl sm:text-3xl tracking-[0.2em] text-white leading-none">
                BREW<span className="text-[#F5C518]">.</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-[#F5C518] mt-1.5 font-bold">
                COFFEE • CRAFTED • CULTURE
              </span>
            </div>

            <p className="text-xs text-white/60 font-sans-custom leading-relaxed font-light">
              High-end specialty coffee roastery and architectural espresso laboratory. We roast single-origin microlots to their apex potential.
            </p>

            {/* Live Clock / Open status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151515] border border-[#F5C518]/30">
              <span className="w-2 h-2 rounded-full bg-[#F5C518] animate-pulse" />
              <span className="text-[10px] font-mono text-white/80">
                NYC EST: <span className="text-[#F5C518] font-bold">{localTime || '10:00 AM'}</span> // OPEN
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <h4 className="font-syne font-bold text-xs uppercase tracking-[0.2em] text-[#F5C518]">
              FLAGSHIP LOCATION
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-white/70 font-sans-custom">
              <MapPin className="w-4 h-4 text-[#F5C518] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">742 Obsidian Avenue</p>
                <p>Tribeca / Soho Historic District</p>
                <p>New York, NY 10013</p>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="space-y-3">
            <h4 className="font-syne font-bold text-xs uppercase tracking-[0.2em] text-[#F5C518]">
              EXTRACTION HOURS
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-white/70 font-mono">
              <Clock className="w-4 h-4 text-[#F5C518] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-white">Mon — Fri: 06:30 — 18:30</p>
                <p className="text-white">Saturday: 07:30 — 19:30</p>
                <p className="text-white">Sunday: 08:00 — 18:00</p>
              </div>
            </div>
          </div>

          {/* Contact & Inquiries */}
          <div className="space-y-3">
            <h4 className="font-syne font-bold text-xs uppercase tracking-[0.2em] text-[#F5C518]">
              PRIVATE INQUIRIES
            </h4>
            <div className="space-y-2 text-xs font-mono text-white/70">
              <a
                href="mailto:concierge@brew.coffee"
                className="flex items-center gap-2 hover:text-[#F5C518] transition-colors min-h-[36px]"
              >
                <Mail className="w-4 h-4 text-[#F5C518]" />
                <span>concierge@brew.coffee</span>
              </a>
              <a
                href="tel:+12128905400"
                className="flex items-center gap-2 hover:text-[#F5C518] transition-colors min-h-[36px]"
              >
                <Phone className="w-4 h-4 text-[#F5C518]" />
                <span>+1 (212) 890-5400</span>
              </a>
            </div>

            {/* Social Links with custom SVG */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="min-w-[40px] min-h-[40px] w-10 h-10 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center text-white/70 hover:text-[#F5C518] hover:border-[#F5C518] transition-all cursor-pointer"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="min-w-[40px] min-h-[40px] w-10 h-10 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center text-white/70 hover:text-[#F5C518] hover:border-[#F5C518] transition-all cursor-pointer"
                aria-label="X / Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="min-w-[40px] min-h-[40px] w-10 h-10 rounded-full bg-[#181818] border border-white/10 flex items-center justify-center text-white/70 hover:text-[#F5C518] hover:border-[#F5C518] transition-all cursor-pointer"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Navigation Links, Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-mono text-center sm:text-left">
          <p>© 2026 BREW. Specialty Coffee Roasters. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a href="#hero" className="hover:text-[#F5C518] transition-colors min-h-[44px] flex items-center">Home</a>
            <a href="#story" className="hover:text-[#F5C518] transition-colors min-h-[44px] flex items-center">Our Story</a>
            <a href="#menu" className="hover:text-[#F5C518] transition-colors min-h-[44px] flex items-center">Menu</a>
            <a href="#contact" className="hover:text-[#F5C518] transition-colors min-h-[44px] flex items-center">Contact</a>
            <button
              onClick={scrollToTop}
              className="min-h-[44px] flex items-center gap-1.5 text-white/80 hover:text-[#F5C518] transition-colors cursor-pointer"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
