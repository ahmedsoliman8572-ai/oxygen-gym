const heroes = Array.from({ length: 13 }, (_, i) => `/heroes/${i + 1}.jpeg`);

export default function Heroes() {
  return (
    <section id="heroes" style={{ padding: '6rem 0', background: '#020202' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '0 5%' }}>
        <h2 className="section-title ar" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>
          أبطال <span style={{ color: '#C62828' }}>الجيم</span>
        </h2>
        <h2 className="section-title en" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>
          Gym <span style={{ color: '#C62828' }}>Heroes</span>
        </h2>
        <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #C62828, #8B1A1A)', margin: '0 auto', borderRadius: '2px' }}></div>
        <p className="ar" style={{ color: '#888', marginTop: '1rem', fontSize: '1.2rem' }}>نتائج حقيقية لأبطال تدربوا في أوكسجين جيم</p>
        <p className="en" style={{ color: '#888', marginTop: '1rem', fontSize: '1.2rem' }}>Real results from heroes who trained at Oxygen Gym</p>
      </div>

      <div className="heroes-grid">
        {heroes.map((src, index) => {
          // Make some images larger for a dynamic "Bento Box" premium feel on desktop
          const isLarge = index === 0 || index === 4 || index === 9;
          
          return (
            <div key={`hero-${index}`} className={`hero-card ${isLarge ? 'large' : ''}`}>
              <img src={src} alt={`Gym Hero ${index + 1}`} loading="lazy" />
              <div className="hero-glow"></div>
            </div>
          );
        })}
      </div>

      <style>{`
        /* Modern Premium Grid Layout */
        .heroes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          grid-auto-rows: 300px;
          gap: 20px;
          padding: 0 5%;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Dynamic Spanning on Desktop */
        @media (min-width: 768px) {
          .hero-card.large {
            grid-column: span 2;
            grid-row: span 2;
          }
        }

        .hero-card {
          position: relative;
          border-radius: 15px;
          overflow: hidden;
          cursor: pointer;
          background-color: #1a1a1a;
          transition: all 0.5s ease;
          filter: grayscale(60%) brightness(0.8);
          box-shadow: 0 10px 20px rgba(0,0,0,0.5);
        }

        .hero-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
        }

        .hero-glow {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 0 0 rgba(198, 40, 40, 0);
          transition: all 0.5s ease;
          pointer-events: none;
        }

        /* Hover Effects */
        .hero-card:hover {
          transform: translateY(-5px);
          z-index: 10;
          filter: grayscale(0%) brightness(1.1);
          box-shadow: 0 15px 30px rgba(198, 40, 40, 0.4);
        }

        .hero-card:hover img {
          transform: scale(1.08);
        }

        .hero-card:hover .hero-glow {
          box-shadow: inset 0 0 40px rgba(198, 40, 40, 0.6);
          border: 1px solid rgba(198, 40, 40, 0.8);
          border-radius: 15px;
        }

        /* Mobile Grid */
        @media (max-width: 767px) {
          .heroes-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 200px;
            gap: 15px;
            padding: 0 15px;
          }
          /* Reset span on mobile so everything fits nicely in 2 columns */
          .hero-card.large {
            grid-column: span 1;
            grid-row: span 1;
          }
        }
      `}</style>
    </section>
  );
}
