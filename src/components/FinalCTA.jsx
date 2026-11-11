import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Phone, Mail, ArrowUpRight, Coffee } from 'lucide-react';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

export const FinalCTA = () => {
  const { openDrawer } = useCart();
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Text reveal
      gsap.from(textRef.current?.children, {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
      });

      // Image clip-path reveal
      if (imageContainerRef.current) {
        gsap.fromTo(
          imageContainerRef.current,
          { clipPath: 'inset(12% 0% 12% 0%)', opacity: 0.7 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Parallax on image inside container
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-[#101010] text-white py-16 sm:py-20 lg:py-24 my-0 overflow-hidden border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Alternating Layout: Strong Interior Image on Left, Editorial Details on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column: One Strong Relevant Image (Tribeca Roastery Interior) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div
              ref={imageContainerRef}
              className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#151515] aspect-[16/10] sm:aspect-[4/3] lg:aspect-[4/5] shadow-2xl group"
            >
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=85&w=1400&auto=format&fit=crop"
                alt="BREW. Tribeca flagship cafe architecture and espresso bar"
                className="w-full h-[115%] -top-[7%] relative object-cover object-center filter brightness-90 contrast-105 group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/90 via-transparent to-black/20 pointer-events-none" />

              {/* Minimal Image Tag */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#F5C518] mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Flagship Roastery & Tasting Room</span>
                  </div>
                  <p className="font-syne font-bold text-base sm:text-lg text-white">
                    742 Obsidian Ave, Tribeca, NYC
                  </p>
                  <p className="text-[11px] sm:text-xs text-white/60 font-mono mt-0.5">
                    Acoustic Basalt Stone • Modbar Extraction
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Contact Details */}
          <div ref={textRef} className="lg:col-span-6 space-y-6 sm:space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#F5C518]">
                06 // VISIT &amp; ORDER ONLINE
              </span>
            </div>

            <h2 className="font-syne font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[0.95]">
              VISIT THE <span className="text-[#F5C518]">ROASTERY.</span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-white/80 font-sans-custom font-light leading-relaxed">
              Step inside our sanctuary of tactile basalt stone, ambient acoustics, and precision extraction. Whether you are savoring a morning espresso ritual or ordering freshly roasted beans for your home, we invite you to experience coffee crafted at its highest standard.
            </p>

            <div className="space-y-5 sm:space-y-6 pt-4 border-t border-white/10 text-sm font-sans-custom">
              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F5C518] shrink-0 mt-0.5" />
                <div>
                  <p className="font-syne font-bold text-white text-base">Location</p>
                  <p className="text-white/70 font-light mt-0.5 text-xs sm:text-sm">
                    742 Obsidian Ave, Tribeca Historic District, New York, NY 10013
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#F5C518] shrink-0 mt-0.5" />
                <div>
                  <p className="font-syne font-bold text-white text-base">Hours of Extraction</p>
                  <div className="text-white/70 font-mono text-xs mt-1 space-y-0.5">
                    <p>Monday — Friday: 06:30 — 18:30</p>
                    <p>Saturday: 07:30 — 19:30</p>
                    <p>Sunday: 08:00 — 18:00</p>
                  </div>
                </div>
              </div>

              {/* Inquiries */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#F5C518] shrink-0 mt-0.5" />
                <div>
                  <p className="font-syne font-bold text-white text-base">Concierge & Inquiries</p>
                  <div className="text-white/70 font-mono text-xs mt-1 flex flex-wrap gap-4">
                    <a href="mailto:hello@brewcoffee.com" className="hover:text-[#F5C518] transition-colors flex items-center gap-1.5 min-h-[44px]">
                      <span>hello@brewcoffee.com</span>
                    </a>
                    <a href="tel:+12128905400" className="hover:text-[#F5C518] transition-colors flex items-center gap-1.5 min-h-[44px]">
                      <Phone className="w-3.5 h-3.5" />
                      <span>+1 (212) 890-5400</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Online CTA */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={openDrawer}
                className="group w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-[#F5C518] text-[#101010] font-syne font-black text-xs uppercase tracking-widest rounded hover:bg-[#FFDF40] hover:shadow-[0_0_25px_rgba(245,197,24,0.45)] transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>ORDER ONLINE NOW</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <Link
                to="/menu"
                className="group w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-transparent border border-white/25 hover:border-[#F5C518] text-white hover:text-[#F5C518] font-syne font-bold text-xs uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Coffee className="w-4 h-4" />
                <span>EXPLORE MENU</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
