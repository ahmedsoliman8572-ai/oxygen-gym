import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="hero" id="home" style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'scale(1.15)', /* crops out any embedded letterboxing from the video */
          zIndex: 0
        }}
      >
        <source src="/brand/video.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay for better text readability */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)', zIndex: 1 }}></div>

      <div className="hero-content" style={{ textAlign: 'center', zIndex: 2, padding: '0 20px', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="ar" style={{ color: '#C62828', fontSize: '1.5rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>مرحباً بك في</h2>
          <h2 className="en" style={{ color: '#C62828', fontSize: '1.5rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Welcome to</h2>
          
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, marginBottom: '1rem', color: 'white', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            OXYGEN <span style={{ color: '#C62828' }}>GYM</span>
          </h1>
        </motion.div>

        <motion.p 
          className="ar"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ fontSize: '1.2rem', color: '#ccc', maxWidth: '600px', margin: '0 auto 2rem' }}
        >
          اكتشف قوتك الحقيقية مع أحدث الأجهزة التدريبية وأفضل المدربين في مصر.
        </motion.p>
        
        <motion.p 
          className="en"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ fontSize: '1.2rem', color: '#ccc', maxWidth: '600px', margin: '0 auto 2rem' }}
        >
          Discover your true strength with the latest equipment and the best coaches in Egypt.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
        >
          <a href="#pricing" className="btn btn-primary ar" style={{ background: 'linear-gradient(45deg, #8B1A1A, #C62828)', color: 'white', padding: '1rem 2.5rem', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(198, 40, 40, 0.4)' }}>اشترك الآن</a>
          <a href="#pricing" className="btn btn-primary en" style={{ background: 'linear-gradient(45deg, #8B1A1A, #C62828)', color: 'white', padding: '1rem 2.5rem', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(198, 40, 40, 0.4)' }}>Join Now</a>
          
          <a href="#about" className="btn btn-outline ar" style={{ background: 'transparent', border: '2px solid white', color: 'white', padding: '1rem 2.5rem', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>اكتشف المزيد</a>
          <a href="#about" className="btn btn-outline en" style={{ background: 'transparent', border: '2px solid white', color: 'white', padding: '1rem 2.5rem', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>Explore More</a>
        </motion.div>
      </div>

      <div className="mouse-scroll" style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)' }}>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ width: '30px', height: '50px', border: '2px solid white', borderRadius: '15px', display: 'flex', justifyContent: 'center', paddingTop: '10px' }}
        >
          <div style={{ width: '4px', height: '10px', background: '#C62828', borderRadius: '2px' }}></div>
        </motion.div>
      </div>
    </section>
  );
}
