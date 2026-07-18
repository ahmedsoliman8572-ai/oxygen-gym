import { motion } from 'framer-motion';

export default function Hours() {
  return (
    <section id="hours" style={{ padding: '6rem 5%', background: 'linear-gradient(rgba(5,5,5,0.9), rgba(5,5,5,0.9)), url("/hero_bg.png") center/cover fixed' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="section-title ar" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>مواعيد <span style={{ color: '#C62828' }}>العمل</span></h2>
        <h2 className="section-title en" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>Working <span style={{ color: '#C62828' }}>Hours</span></h2>
        <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #C62828, #8B1A1A)', margin: '0 auto', borderRadius: '2px' }}></div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Men Hours */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ background: 'rgba(30, 30, 30, 0.8)', backdropFilter: 'blur(10px)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', minWidth: '300px', textAlign: 'center' }}
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
          style={{ background: 'rgba(30, 30, 30, 0.8)', backdropFilter: 'blur(10px)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)', minWidth: '300px', textAlign: 'center' }}
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
    </section>
  );
}
