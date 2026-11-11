import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OrderDrawer } from './components/OrderDrawer';
import { AmbientAudio } from './components/AmbientAudio';
import { ScrollProgress } from './components/ScrollProgress';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Handles scroll restoration, hash scrolling (/#contact), and GSAP ScrollTrigger
 * synchronization across React Router navigation and browser Back/Forward actions.
 */
const AppShell = () => {
  const location = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
      syncTouch: false,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Scroll to hash or top on route change & refresh ScrollTrigger
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const scrollTimer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        ScrollTrigger.refresh();
      }, 120);
      return () => clearTimeout(scrollTimer);
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => clearTimeout(refreshTimer);
  }, [location.pathname, location.hash]);

  return (
    <>
      {/* Grain texture overlay */}
      <div className="grain-overlay" />

      {/* Top golden scroll progress bar */}
      <ScrollProgress />

      {/* Main layout container with zero horizontal overflow (overflow-x-clip preserves sticky/ScrollTrigger on mobile) */}
      <div className="min-h-screen w-full overflow-x-clip bg-[#101010] text-white flex flex-col selection:bg-[#F5C518] selection:text-[#101010]">
        <Navbar />

        <main className="flex-1 w-full overflow-x-clip">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        <Footer />

        {/* Slide-out Customizer & Order Bag Drawer */}
        <OrderDrawer />

        {/* Roastery ambient audio synthesis toggle */}
        <AmbientAudio />
      </div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppShell />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
