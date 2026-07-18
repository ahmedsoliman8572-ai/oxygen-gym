import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    nameAr: 'كابتن كمال عبد المحسن',
    nameEn: 'Capt. Kamal Abdel Mohsen',
    roleAr: 'المالك ومؤسس الجيم',
    roleEn: 'Owner & Founder',
    subAr: '"شيخ المدربين في مصر"',
    subEn: '"Sheikh of Coaches in Egypt"',
    img: '/team/owner_nobg.png'
  },
  {
    nameAr: 'كابتن احمد سمري',
    nameEn: 'Capt. Ahmed Samry',
    roleAr: 'مدرب',
    img: '/team/coach_nobg.png'
  }
];

export default function Team() {
  return (
    <section id="team" style={{ padding: '6rem 5%', background: 'var(--bg-surface-light)' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="section-title ar" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>
          فريق <span style={{ color: '#C62828' }}>العمل</span>
        </h2>
        <h2 className="section-title en" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>
          Our <span style={{ color: '#C62828' }}>Team</span>
        </h2>
        <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #C62828, #8B1A1A)', margin: '0 auto', borderRadius: '2px' }}></div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto' }}>
        {teamMembers.map((member, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <Tilt
              className="parallax-effect-glare-scale"
              perspective={500}
              glareEnable={true}
              glareMaxOpacity={0.45}
              scale={1.05}
              gyroscope={true}
              style={{
                background: 'rgba(30, 30, 30, 0.6)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.05)',
                width: '320px',
                overflow: 'hidden',
                transformStyle: 'preserve-3d',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}
            >
              <div 
                style={{ 
                  height: '350px', 
                  position: 'relative', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'flex-end',
                  transform: 'translateZ(60px)' // Pops the image out in 3D space
                }}
              >
                {/* Glowing orb */}
                <div style={{
                  position: 'absolute',
                  width: '250px', height: '250px',
                  background: 'radial-gradient(circle, rgba(198,40,40,0.3) 0%, rgba(0,0,0,0) 70%)',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  animation: 'pulseGlow 3s infinite'
                }}></div>
                
                <img 
                  src={member.img} 
                  alt={member.nameEn} 
                  style={{ height: '110%', objectFit: 'contain', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.8))' }}
                />
              </div>

              <div style={{ padding: '1.5rem', textAlign: 'center', transform: 'translateZ(30px)' }}>
                <div className="ar" style={{ color: '#C62828', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase' }}>{member.roleAr}</div>
                <div className="en" style={{ color: '#C62828', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase' }}>{member.roleEn}</div>
                
                <h3 className="ar" style={{ color: 'white', margin: '0 0 0.5rem' }}>{member.nameAr}</h3>
                <h3 className="en" style={{ color: 'white', margin: '0 0 0.5rem' }}>{member.nameEn}</h3>
                
                {member.subAr && <p className="ar" style={{ color: '#888', fontSize: '0.9rem', margin: 0, fontStyle: 'italic' }}>{member.subAr}</p>}
                {member.subEn && <p className="en" style={{ color: '#888', fontSize: '0.9rem', margin: 0, fontStyle: 'italic' }}>{member.subEn}</p>}
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
      
      <style>{`
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(198, 40, 40, 0.4); }
          70% { box-shadow: 0 0 0 20px rgba(198, 40, 40, 0); }
          100% { box-shadow: 0 0 0 0 rgba(198, 40, 40, 0); }
        }
      `}</style>
    </section>
  );
}
