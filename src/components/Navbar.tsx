import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { toggleLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`navbar ${scrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}
      style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, transition: 'all 0.3s ease', background: scrolled ? 'rgba(5, 5, 5, 0.4)' : 'transparent', backdropFilter: scrolled ? 'blur(15px)' : 'none', padding: scrolled ? '0.5rem 5%' : '1rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
    >
      <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img src="/brand/gym logo.jpeg" alt="Oxygen Gym Logo" style={{ height: '50px', borderRadius: '50%', border: '2px solid #C62828', objectFit: 'cover' }} />
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: 'white' }}>
          OXYGEN <span style={{ color: '#C62828' }}>GYM</span>
        </h1>
      </div>

      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <a href="#about" onClick={() => setIsOpen(false)} className="ar">عن الجيم</a>
        <a href="#about" onClick={() => setIsOpen(false)} className="en">About</a>
        
        <a href="#services" onClick={() => setIsOpen(false)} className="ar">الخدمات</a>
        <a href="#services" onClick={() => setIsOpen(false)} className="en">Services</a>
        
        <a href="#team" onClick={() => setIsOpen(false)} className="ar">فريق العمل</a>
        <a href="#team" onClick={() => setIsOpen(false)} className="en">Team</a>

        <a href="#heroes" onClick={() => setIsOpen(false)} className="ar">أبطال الجيم</a>
        <a href="#heroes" onClick={() => setIsOpen(false)} className="en">Heroes</a>

        <a href="#gallery" onClick={() => setIsOpen(false)} className="ar">داخل الجيم</a>
        <a href="#gallery" onClick={() => setIsOpen(false)} className="en">Gallery</a>

        <a href="#calculator" onClick={() => setIsOpen(false)} className="ar">احسب احتياجك</a>
        <a href="#calculator" onClick={() => setIsOpen(false)} className="en">Calculator</a>
        
        <a href="#pricing" onClick={() => setIsOpen(false)} className="ar">الأسعار</a>
        <a href="#pricing" onClick={() => setIsOpen(false)} className="en">Pricing</a>
        
        <a href="#hours" onClick={() => setIsOpen(false)} className="ar">مواعيد العمل</a>
        <a href="#hours" onClick={() => setIsOpen(false)} className="en">Hours</a>
        
        <button onClick={toggleLang} className="lang-toggle" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1rem', padding: '0.5rem' }}>
          <Globe size={20} color="#C62828" />
          <span className="ar">EN</span>
          <span className="en">عربي</span>
        </button>
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', color: 'white', zIndex: 1001 }}>
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </div>

      <style>{`
        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        .hamburger {
          display: none;
        }
        @media (max-width: 768px) {
          .hamburger {
            display: block;
          }
          .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            height: 100vh;
            width: 70vw;
            background: rgba(5, 5, 5, 0.95);
            backdrop-filter: blur(15px);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: right 0.4s ease;
            gap: 2.5rem;
            box-shadow: -10px 0 30px rgba(0,0,0,0.5);
            z-index: 1000;
          }
          .nav-links.active {
            right: 0;
          }
          .nav-links a {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </motion.nav>
  );
}
