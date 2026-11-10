import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ParallaxImage — Cinematic image with optional clip-path reveal and parallax.
 *
 * Props:
 *  src        — image URL
 *  alt        — alt text
 *  intensity  — parallax strength 0–1 (default 0.5)
 *  clipReveal — animate from inset(100%) → inset(0%) on scroll (default false)
 *  scale      — scale image from 1.2 to 1.0 during reveal (default true)
 *  className  — wrapper class names
 *  imgClass   — extra classes for the img element
 */
export const ParallaxImage = ({
  src,
  alt = '',
  intensity = 0.5,
  clipReveal = false,
  scale = true,
  className = '',
  imgClass = '',
}) => {
  const wrapperRef = useRef(null);
  const imgRef = useRef(null);
  const [revealed, setRevealed] = useState(!clipReveal);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    if (!wrapper || !img) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        if (clipReveal) setRevealed(true);
        return;
      }

      /* Parallax movement */
      const yAmount = intensity * 20;
      gsap.to(img, {
        yPercent: yAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      /* Clip-path reveal */
      if (clipReveal) {
        gsap.fromTo(
          wrapper,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.4,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 80%',
              toggleActions: 'play none none none',
              onStart: () => setRevealed(true),
            },
          }
        );

        if (scale) {
          gsap.fromTo(
            img,
            { scale: 1.2 },
            {
              scale: 1,
              duration: 1.6,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: wrapper,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }
    }, wrapper);

    return () => ctx.revert();
  }, [clipReveal, intensity, scale]);

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden ${revealed ? 'parallax-revealed' : ''} ${className}`}
      style={{ willChange: 'clip-path' }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover will-change-transform ${imgClass}`}
        style={{ transformOrigin: 'center center' }}
      />

      {/* Corner bracket SVG decorators — appear after reveal */}
      {clipReveal && (
        <>
          {/* Top-left */}
          <svg
            className="corner-bracket"
            style={{ top: 12, left: 12 }}
            viewBox="0 0 18 18"
            fill="none"
          >
            <path d="M18 1H1v17" stroke="#F5C518" strokeWidth="2" strokeLinecap="square" />
          </svg>
          {/* Top-right */}
          <svg
            className="corner-bracket"
            style={{ top: 12, right: 12 }}
            viewBox="0 0 18 18"
            fill="none"
          >
            <path d="M0 1h17v17" stroke="#F5C518" strokeWidth="2" strokeLinecap="square" />
          </svg>
          {/* Bottom-left */}
          <svg
            className="corner-bracket"
            style={{ bottom: 12, left: 12 }}
            viewBox="0 0 18 18"
            fill="none"
          >
            <path d="M18 17H1V0" stroke="#F5C518" strokeWidth="2" strokeLinecap="square" />
          </svg>
          {/* Bottom-right */}
          <svg
            className="corner-bracket"
            style={{ bottom: 12, right: 12 }}
            viewBox="0 0 18 18"
            fill="none"
          >
            <path d="M0 17h17V0" stroke="#F5C518" strokeWidth="2" strokeLinecap="square" />
          </svg>
        </>
      )}
    </div>
  );
};
