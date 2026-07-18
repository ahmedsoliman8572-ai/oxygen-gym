import { motion } from 'framer-motion';

export default function AboutServices() {
  return (
    <>
      <section id="about" style={{ padding: '6rem 5%', background: '#050505', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          style={{ flex: '1 1 400px', maxWidth: '600px' }}
        >
          <img src="/gallery/photo1.jpeg" alt="Oxygen Gym Facility" style={{ width: '100%', borderRadius: '20px', boxShadow: '20px 20px 0 rgba(198, 40, 40, 0.2)' }} />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          style={{ flex: '1 1 400px', maxWidth: '600px' }}
        >
          <h2 className="section-title ar" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>عن <span style={{ color: '#C62828' }}>أوكسجين جيم</span></h2>
          <h2 className="section-title en" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>About <span style={{ color: '#C62828' }}>Oxygen Gym</span></h2>
          
          <p className="ar" style={{ color: '#ccc', lineHeight: 1.8, marginBottom: '1rem' }}>
            أوكسجين جيم هو وجهتك الأولى للياقة البدنية في بركة السبع. نلتزم بتوفير بيئة تدريبية احترافية، مجهزة بأحدث المعدات لضمان تحقيق أهدافك.
          </p>
          <p className="en" style={{ color: '#ccc', lineHeight: 1.8, marginBottom: '1rem' }}>
            Oxygen Gym is your premier fitness destination in Birket As Saba. We are committed to providing a professional training environment, equipped with the latest machines to ensure you reach your goals.
          </p>
        </motion.div>
      </section>

      <section id="services" style={{ padding: '6rem 5%', background: '#0a0a0a' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="section-title ar" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>خدماتنا <span style={{ color: '#C62828' }}>المميزة</span></h2>
          <h2 className="section-title en" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>Our <span style={{ color: '#C62828' }}>Services</span></h2>
          <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #C62828, #8B1A1A)', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: 'fa-dumbbell', titleAr: 'كمال الأجسام', titleEn: 'Bodybuilding', descAr: 'أحدث الأجهزة والأوزان الحرة', descEn: 'Latest machines & free weights' },
            { icon: 'fa-running', titleAr: 'كارديو', titleEn: 'Cardio', descAr: 'معدات متطورة للياقة القلبية', descEn: 'Advanced cardiovascular equipment' },
            { icon: 'fa-user-ninja', titleAr: 'تدريب شخصي', titleEn: 'Personal Training', descAr: 'برامج مخصصة مع أفضل المدربين', descEn: 'Customized programs with elite coaches' }
          ].map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              whileHover={{ y: -10 }}
              style={{ background: 'rgba(30, 30, 30, 0.6)', padding: '2.5rem', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', flex: '1 1 300px', maxWidth: '400px' }}
            >
              <i className={`fas ${service.icon}`} style={{ fontSize: '3rem', color: '#C62828', marginBottom: '1.5rem' }}></i>
              <h3 className="ar" style={{ color: 'white', marginBottom: '1rem', fontSize: '1.5rem' }}>{service.titleAr}</h3>
              <h3 className="en" style={{ color: 'white', marginBottom: '1rem', fontSize: '1.5rem' }}>{service.titleEn}</h3>
              <p className="ar" style={{ color: '#888' }}>{service.descAr}</p>
              <p className="en" style={{ color: '#888' }}>{service.descEn}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
