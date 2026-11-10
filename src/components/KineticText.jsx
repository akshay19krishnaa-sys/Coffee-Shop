import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';

/**
 * KineticText — Reusable split-text animation component.
 *
 * Props:
 *  text       — string to render
 *  className  — additional class names
 *  delay      — animation start delay in seconds (default 0)
 *  type       — 'words' | 'chars' | 'lines'  (default 'words')
 *  animation  — 'slideUp' | 'slideIn' | 'rotateIn' | 'fadeScale'  (default 'slideUp')
 *  tag        — HTML tag to use as wrapper (default 'div')
 */
export const KineticText = ({
  text = '',
  className = '',
  delay = 0,
  type = 'words',
  animation = 'slideUp',
  tag: Tag = 'div',
}) => {
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const animatedRef = useRef(false);

  /* Split text into tokens once */
  const tokens = useMemo(() => {
    if (type === 'chars') return text.split('');
    if (type === 'words') return text.split(' ');
    return [text]; // lines — treat the whole string as one unit
  }, [text, type]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll('.split-char, .split-word');

    const runAnimation = () => {
      if (animatedRef.current) return;
      animatedRef.current = true;

      let fromVars;
      let ease;

      switch (animation) {
        case 'rotateIn':
          fromVars = {
            translateY: '100%',
            rotateX: -90,
            opacity: 0,
            transformOrigin: 'bottom center',
          };
          ease = 'power4.out';
          break;
        case 'slideIn':
          fromVars = { translateX: '-80px', opacity: 0 };
          ease = 'power3.out';
          break;
        case 'fadeScale':
          fromVars = { scale: 0.6, opacity: 0, filter: 'blur(8px)' };
          ease = 'power2.out';
          break;
        case 'slideUp':
        default:
          fromVars = { translateY: '110%', opacity: 0 };
          ease = 'power3.out';
          break;
      }

      gsap.fromTo(
        chars,
        { ...fromVars },
        {
          translateY: '0%',
          translateX: '0px',
          rotateX: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: animation === 'rotateIn' ? 0.9 : 0.75,
          ease,
          stagger: type === 'chars' ? 0.03 : 0.07,
          delay,
        }
      );
    };

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) runAnimation();
      },
      { threshold: 0.15 }
    );

    observerRef.current.observe(container);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [animation, delay, type]);

  const renderToken = (token, i) => {
    if (type === 'chars') {
      return (
        <span
          key={i}
          className="split-char"
          aria-hidden="true"
          style={{
            display: 'inline-block',
            willChange: 'transform, opacity',
          }}
        >
          {token === ' ' ? '\u00A0' : token}
        </span>
      );
    }

    if (type === 'words') {
      return (
        <span
          key={i}
          className="split-word"
          style={{ display: 'inline-block', overflow: 'hidden' }}
        >
          <span
            className="split-char"
            style={{
              display: 'inline-block',
              willChange: 'transform, opacity',
            }}
          >
            {token}
          </span>
          {i < tokens.length - 1 && '\u00A0'}
        </span>
      );
    }

    // lines
    return (
      <span
        key={i}
        className="split-char"
        style={{ display: 'block', willChange: 'transform, opacity' }}
      >
        {token}
      </span>
    );
  };

  const perspectiveStyle =
    animation === 'rotateIn' ? { perspective: '800px' } : {};

  return (
    <Tag
      ref={containerRef}
      className={className}
      aria-label={text}
      style={perspectiveStyle}
    >
      {tokens.map(renderToken)}
    </Tag>
  );
};
