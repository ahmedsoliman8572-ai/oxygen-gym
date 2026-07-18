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
    roleEn: 'Coach',
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
            className="team-card"
          >
            <div className="team-image-container">
              {/* Glowing orb background */}
              <div className="team-glow-orb"></div>
              <img 
                src={member.img} 
                alt={member.nameEn} 
                className="team-image"
              />
            </div>

            <div className="team-info">
              <div className="ar team-role">{member.roleAr}</div>
              <div className="en team-role">{member.roleEn}</div>
              
              <h3 className="ar team-name">{member.nameAr}</h3>
              <h3 className="en team-name">{member.nameEn}</h3>
              
              {member.subAr && <p className="ar team-sub">{member.subAr}</p>}
              {member.subEn && <p className="en team-sub">{member.subEn}</p>}
            </div>
          </motion.div>
        ))}
      </div>
      
      <style>{`
        .team-card {
          background: rgba(30, 30, 30, 0.6);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.05);
          width: 320px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }

        .team-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(198, 40, 40, 0.2);
          border: 1px solid rgba(198, 40, 40, 0.3);
        }

        .team-image-container {
          height: 350px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.4));
        }

        .team-glow-orb {
          position: absolute;
          width: 250px; 
          height: 250px;
          background: radial-gradient(circle, rgba(198,40,40,0.3) 0%, rgba(0,0,0,0) 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          animation: pulseGlow 3s infinite;
        }

        .team-image {
          height: 95%; /* Leaves a small gap at the top so the head isn't cut off */
          width: 100%;
          object-fit: contain;
          object-position: bottom; /* Forces the image to align perfectly to the bottom of the container */
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 10px 15px rgba(0,0,0,0.8));
          transition: transform 0.4s ease;
        }

        .team-card:hover .team-image {
          transform: scale(1.05) translateY(-5px); /* Moves up slightly on hover to give a 3D pop effect */
        }

        .team-info {
          padding: 1.5rem;
          text-align: center;
          background: #151515; /* Solid dark background to ensure text is fully readable */
          position: relative;
          z-index: 2; /* Ensures text is always on top of anything else */
          border-top: 1px solid rgba(198, 40, 40, 0.2); /* Nice separator */
        }

        .team-role {
          color: #C62828;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .team-name {
          color: white;
          margin: 0 0 0.5rem;
        }

        .team-sub {
          color: #888;
          font-size: 0.9rem;
          margin: 0;
          font-style: italic;
        }

        @keyframes pulseGlow {
          0% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.9); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
          100% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.9); }
        }

        @media (max-width: 768px) {
          .team-card {
            width: 280px;
          }
          .team-image-container {
            height: 300px;
          }
        }
      `}</style>
    </section>
  );
}
