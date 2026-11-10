import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CoffeeOrigin } from './components/CoffeeOrigin';
import { RoastingProcess } from './components/RoastingProcess';
import { ArtOfBrewing } from './components/ArtOfBrewing';
import { SignatureMenu } from './components/SignatureMenu';
import { CafeExperience } from './components/CafeExperience';
import { Testimonials } from './components/Testimonials';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { OrderDrawer } from './components/OrderDrawer';
import { AmbientAudio } from './components/AmbientAudio';
import { ScrollProgress } from './components/ScrollProgress';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis smooth scroll with natural touch handling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
      syncTouch: false,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after assets finish layout
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <CartProvider>
      {/* Grain texture overlay for subtle analog luxury cinema feeling */}
      <div className="grain-overlay" />

      {/* Top golden progress indicator */}
      <ScrollProgress />

      {/* Main Page Layout - overflow-x-hidden ensures zero horizontal scroll on mobile */}
      <div className="min-h-screen w-full overflow-x-hidden bg-[#101010] text-white flex flex-col selection:bg-[#F5C518] selection:text-[#101010]">
        <Navbar />

        {/* Complete Responsive Narrative Sections */}
        <main className="flex-1 w-full overflow-x-hidden">
          {/* Hero Section – Image-Behind-Text Composition */}
          <Hero />

          {/* 1. Our Story & Coffee Origins */}
          <CoffeeOrigin />

          {/* 2. Roasting Process */}
          <RoastingProcess />

          {/* 3. Brewing Experience */}
          <ArtOfBrewing />

          {/* 4. Signature Menu */}
          <SignatureMenu />

          {/* 5. Café Experience & Gallery */}
          <CafeExperience />

          {/* 6. Testimonials */}
          <Testimonials />

          {/* 7. Contact & Roastery Visit */}
          <FinalCTA />
        </main>

        <Footer />

        {/* Floating Customizer & Order Drawer */}
        <OrderDrawer />

        {/* Ambient Roastery Audio synthesis toggle */}
        <AmbientAudio />
      </div>
    </CartProvider>
  );
}

export default App;
