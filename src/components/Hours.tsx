import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Hours() {
  const { lang } = useLanguage();
  const [crowdLevel, setCrowdLevel] = useState(0);
  const [crowdStatusAr, setCrowdStatusAr] = useState('');
  const [crowdStatusEn, setCrowdStatusEn] = useState('');
  const [crowdColor, setCrowdColor] = useState('');

  useEffect(() => {
    const updateCrowdStatus = () => {
      const hour = new Date().getHours();
      
      // Calculate crowdedness based on time of day
      if (hour >= 2 && hour < 7) {
        setCrowdLevel(0);
        setCrowdStatusAr('الجيم مغلق الآن');
        setCrowdStatusEn('Gym is Closed');
        setCrowdColor('#555');
      } else if (hour >= 7 && hour < 9) {
        setCrowdLevel(45);
        setCrowdStatusAr('هادئ نسبياً');
        setCrowdStatusEn('Relatively Quiet');
        setCrowdColor('#4caf50');
      } else if (hour >= 9 && hour < 10) {
        setCrowdLevel(20);
        setCrowdStatusAr('هادئ جداً');
        setCrowdStatusEn('Very Quiet');
        setCrowdColor('#4caf50');
      } else if (hour >= 10 && hour < 14) {
        setCrowdLevel(60);
        setCrowdStatusAr('متوسط الزحام (سيدات)');
        setCrowdStatusEn('Moderate (Women)');
        setCrowdColor('#ff9800');
      } else if (hour >= 14 && hour < 17) {
        setCrowdLevel(30);
        setCrowdStatusAr('هادئ (سيدات)');
        setCrowdStatusEn('Quiet (Women)');
        setCrowdColor('#4caf50');
      } else if (hour >= 17 && hour < 21) {
        setCrowdLevel(95);
        setCrowdStatusAr('مزدحم جداً (ذروة)');
        setCrowdStatusEn('Very Crowded (Peak)');
        setCrowdColor('#f44336');
      } else if (hour >= 21 && hour <= 23) {
        setCrowdLevel(75);
        setCrowdStatusAr('مزدحم');
        setCrowdStatusEn('Crowded');
        setCrowdColor('#ff9800');
      } else {
        // Midnight to 2 AM
        setCrowdLevel(30);
        setCrowdStatusAr('هادئ (نهاية اليوم)');
        setCrowdStatusEn('Quiet (Late Night)');
        setCrowdColor('#4caf50');
      }
    };

    updateCrowdStatus();
    const interval = setInterval(updateCrowdStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hours" style={{ padding: '6rem 5%', background: 'linear-gradient(rgba(5,5,5,0.9), rgba(5,5,5,0.9)), url("/hero_bg.png") center/cover fixed' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="section-title ar" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>مواعيد <span style={{ color: '#C62828' }}>العمل</span></h2>
        <h2 className="section-title en" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>Working <span style={{ color: '#C62828' }}>Hours</span></h2>
        <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #C62828, #8B1A1A)', margin: '0 auto', borderRadius: '2px' }}></div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* LIVE CROWD INDICATOR */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ background: 'rgba(20, 20, 20, 0.8)', backdropFilter: 'blur(10px)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
        >
          {/* Pulsing indicator light */}
          <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="pulse-dot" style={{ width: '12px', height: '12px', borderRadius: '50%', background: crowdColor }}></div>
            <span style={{ color: crowdColor, fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>LIVE</span>
          </div>

          <h3 className="ar" style={{ color: 'white', marginBottom: '1rem', fontSize: '1.4rem' }}>مؤشر الزحام الحالي</h3>
          <h3 className="en" style={{ color: 'white', marginBottom: '1rem', fontSize: '1.4rem' }}>Current Gym Status</h3>
          
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: crowdColor, marginBottom: '1.5rem' }}>
            {lang === 'ar' ? crowdStatusAr : crowdStatusEn}
          </div>

          <div style={{ width: '100%', height: '15px', background: '#222', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: crowdLevel + '%' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ height: '100%', background: crowdColor, borderRadius: '10px' }}
            ></motion.div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: '#888', fontSize: '0.8rem' }}>
            <span className="ar">هادئ</span><span className="en">Quiet</span>
            <span className="ar">مزدحم جداً</span><span className="en">Very Crowded</span>
          </div>
        </motion.div>

        {/* HOURS BOXES */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Men Hours */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ flex: '1 1 300px', background: 'rgba(30, 30, 30, 0.8)', backdropFilter: 'blur(10px)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}
          >
            <h3 className="ar" style={{ color: '#C62828', marginBottom: '1.5rem', fontSize: '1.5rem' }}><i className="fas fa-male"></i> الرجال</h3>
            <h3 className="en" style={{ color: '#C62828', marginBottom: '1.5rem', fontSize: '1.5rem' }}><i className="fas fa-male"></i> Men</h3>
            
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span className="ar" style={{ color: '#ccc' }}>الفترة الصباحية</span>
                <span className="en" style={{ color: '#ccc' }}>Morning</span>
                <span className="ar" style={{ color: 'white' }}>7 ص - 10 ص</span>
                <span className="en" style={{ color: 'white' }}>7 AM - 10 AM</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="ar" style={{ color: '#ccc' }}>الفترة المسائية</span>
                <span className="en" style={{ color: '#ccc' }}>Evening</span>
                <span className="ar" style={{ color: 'white' }}>5 م - 2 ص</span>
                <span className="en" style={{ color: 'white' }}>5 PM - 2 AM</span>
              </li>
            </ul>
          </motion.div>

          {/* Women Hours */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ flex: '1 1 300px', background: 'rgba(30, 30, 30, 0.8)', backdropFilter: 'blur(10px)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}
          >
            <h3 className="ar" style={{ color: '#C62828', marginBottom: '1.5rem', fontSize: '1.5rem' }}><i className="fas fa-female"></i> السيدات</h3>
            <h3 className="en" style={{ color: '#C62828', marginBottom: '1.5rem', fontSize: '1.5rem' }}><i className="fas fa-female"></i> Women</h3>
            
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="ar" style={{ color: '#ccc' }}>يومياً</span>
                <span className="en" style={{ color: '#ccc' }}>Daily</span>
                <span className="ar" style={{ color: 'white' }}>10 ص - 5 م</span>
                <span className="en" style={{ color: 'white' }}>10 AM - 5 PM</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulseDot {
          0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
        .pulse-dot {
          animation: pulseDot 2s infinite;
        }
      `}</style>
    </section>
  );
}
