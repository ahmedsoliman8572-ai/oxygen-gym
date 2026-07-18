import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Calculator from './components/Calculator';
import Team from './components/Team';
import Heroes from './components/Heroes';
import Pricing from './components/Pricing';
import Hours from './components/Hours';
import AboutServices from './components/AboutServices';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import CinematicGrain from './components/CinematicGrain';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <LanguageProvider>
      <Preloader />
      <CustomCursor />
      <CinematicGrain />
      <div className="app-container" style={{ background: '#050505', color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
        <Navbar />
        <Hero />
        <AboutServices />
        <Gallery />
        <Calculator />
        <Team />
        <Heroes />
        <Pricing />
        <Hours />
        <Footer />
        
        <a href="https://wa.me/201012173777" className="whatsapp-float" target="_blank" rel="noopener noreferrer" style={{ position: 'fixed', bottom: '30px', right: '30px', background: '#25d366', color: 'white', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '35px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', zIndex: 100, transition: 'all 0.3s ease' }}>
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </LanguageProvider>
  );
}

export default App;
