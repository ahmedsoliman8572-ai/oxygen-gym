import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const count = useMotionValue(0);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    // Animate the counter from 0 to 100
    const controls = animate(count, 100, {
      duration: 2,
      ease: "easeInOut",
      onUpdate: (latest) => setDisplayCount(Math.round(latest)),
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => {
      controls.stop();
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.1, // Slight zoom out on exit for cinematic feel
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#050505',
            zIndex: 99999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              position: 'relative',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '2rem'
            }}
          >
            {/* Glowing Aura behind logo */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5, 
                ease: "easeInOut" 
              }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: '#C62828',
                filter: 'blur(30px)',
                zIndex: 0
              }}
            />
            
            <img 
              src="/brand/gym logo.jpeg" 
              alt="Oxygen Gym Logo" 
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: '2px solid rgba(198, 40, 40, 0.8)',
                objectFit: 'cover',
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 0 20px rgba(0,0,0,0.8)'
              }}
            />
          </motion.div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div 
              style={{
                fontSize: '3rem',
                fontWeight: 900,
                color: 'white',
                fontFamily: 'Oswald, sans-serif',
                textShadow: '0 0 10px rgba(198, 40, 40, 0.5)',
                marginBottom: '0.5rem'
              }}
            >
              {displayCount}%
            </motion.div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #C62828, transparent)',
                marginBottom: '1rem'
              }}
            />
            
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{
                color: '#888',
                letterSpacing: '6px',
                textTransform: 'uppercase',
                fontSize: '0.8rem',
                fontWeight: 600,
                margin: 0
              }}
            >
              Loading Power
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
