// No imports needed
const row1 = Array.from({ length: 7 }, (_, i) => `/heroes/${i + 1}.jpeg`);
const row2 = Array.from({ length: 6 }, (_, i) => `/heroes/${i + 8}.jpeg`);

// Bulletproof CSS Marquee Component
const MarqueeRow = ({ images, direction = 'left', speed = 40 }: { images: string[], direction?: 'left' | 'right', speed?: number }) => {
  // We wrap the images in a "Set" which has paddingRight to ensure perfect mathematical looping
  const ImageSet = () => (
    <div style={{ display: 'flex', gap: '30px', paddingRight: '30px' }}>
      {images.map((src, index) => (
        <div key={`img-${index}`} className="hero-card">
          <img src={src} alt="Gym Hero" loading="lazy" />
          <div className="hero-glow"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`marquee-row ${direction}`} style={{ '--speed': `${speed}s` } as React.CSSProperties}>
      <div className="marquee-track">
        {/* Render 4 identical sets so it can scroll infinitely even on 4k screens */}
        <ImageSet />
        <ImageSet />
        <ImageSet />
        <ImageSet />
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
        <MarqueeRow images={row1} direction="left" speed={40} />

        {/* Row 2 - Moves Right */}
        <div style={{ marginTop: '2rem' }}>
          <MarqueeRow images={row2} direction="right" speed={45} />
        </div>

        {/* Gradient Edges */}
        <div className="marquee-edges"></div>
      </div>

      <style>{`
        /* Marquee Animation Logic */
        .marquee-row {
          width: 100%;
          overflow: hidden;
          position: relative;
          display: flex;
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: scroll var(--speed) linear infinite;
        }

        /* Hover to pause */
        .marquee-track:hover {
          animation-play-state: paused;
        }

        /* Reverse direction for row 2 */
        .marquee-row.right .marquee-track {
          animation-direction: reverse;
        }

        /* Shift by exactly 25% (1 out of the 4 sets) to create a perfect seamless loop */
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }

        /* Design elements */
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
