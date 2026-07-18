const row1 = Array.from({ length: 7 }, (_, i) => `/heroes/${i + 1}.jpeg`);
const row2 = Array.from({ length: 6 }, (_, i) => `/heroes/${i + 8}.jpeg`);

const MarqueeRow = ({ images, direction = 'left', speed = 40 }: { images: string[], direction?: 'left' | 'right', speed?: number }) => {
  // Duplicate array 4 times for a seamless loop across any screen size
  const repeatedImages = [...images, ...images, ...images, ...images];

  return (
    <div className={`css-marquee ${direction}`}>
      <div className="css-marquee-track" style={{ animationDuration: `${speed}s` }}>
        {repeatedImages.map((src, index) => (
          <div key={`hero-${index}`} className="hero-card">
            <img src={src} alt="Gym Hero" loading="lazy" />
            <div className="hero-glow"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Heroes() {
  return (
    <section id="heroes" style={{ padding: '6rem 0', background: '#020202', overflow: 'hidden' }}>
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

      <div className="marquee-container" style={{ position: 'relative', padding: '2rem 0' }}>
        
        {/* Row 1 - Moves Left */}
        <MarqueeRow images={row1} direction="left" speed={30} />

        {/* Row 2 - Moves Right */}
        <div style={{ marginTop: '2rem' }}>
          <MarqueeRow images={row2} direction="right" speed={35} />
        </div>

        {/* Gradient Edges */}
        <div className="marquee-edges"></div>
      </div>

      <style>{`
        /* Mathematical Pure CSS Marquee */
        .css-marquee {
          width: 100%;
          overflow: hidden;
          position: relative;
          display: flex;
        }

        .css-marquee-track {
          display: flex;
          gap: 30px;
          padding-right: 30px;
          width: max-content;
          animation: scrollLeft linear infinite;
        }

        /* Reverse direction for Row 2 */
        .css-marquee.right .css-marquee-track {
          animation-name: scrollRight;
        }

        /* Hover to pause */
        .css-marquee-track:hover {
          animation-play-state: paused;
        }

        /* Shift exactly 25% (since we cloned 4 times) for a seamless loop */
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }

        @keyframes scrollRight {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }

        .marquee-edges {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          background: linear-gradient(to right, #020202 0%, transparent 15%, transparent 85%, #020202 100%);
        }

        .hero-card {
          position: relative;
          width: 280px;
          height: 350px;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          background-color: #1a1a1a;
          transition: all 0.5s ease;
          filter: grayscale(80%) brightness(0.6);
        }

        .hero-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.5s ease;
        }

        .hero-glow {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 0 0 rgba(198, 40, 40, 0);
          transition: all 0.5s ease;
          pointer-events: none;
        }

        .hero-card:hover {
          transform: scale(1.05) translateY(-10px);
          z-index: 10;
          filter: grayscale(0%) brightness(1.1);
          box-shadow: 0 20px 40px rgba(0,0,0,0.8);
        }

        .hero-card:hover .hero-glow {
          box-shadow: inset 0 0 50px 10px rgba(198, 40, 40, 0.6);
          border: 2px solid #C62828;
          border-radius: 20px;
        }

        @media (max-width: 768px) {
          .hero-card {
            width: 220px;
            height: 280px;
          }
        }
      `}</style>
    </section>
  );
}
