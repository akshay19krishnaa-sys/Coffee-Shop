import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from '../components/Hero';
import { SpecialCollections } from '../components/SpecialCollections';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { CafeExperience } from '../components/CafeExperience';
import { Testimonials } from '../components/Testimonials';
import { FinalCTA } from '../components/FinalCTA';

export const HomePage = () => {
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    const settleTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 180);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(settleTimer);
    };
  }, []);

  return (
    <>
      <Hero />
      <SpecialCollections />
      <WhyChooseUs />
      <CafeExperience />
      <Testimonials />
      <FinalCTA />
    </>
  );
};

