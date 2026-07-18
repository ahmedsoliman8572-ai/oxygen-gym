import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const row1 = Array.from({ length: 7 }, (_, i) => `/heroes/${i + 1}.jpeg`);
const row2 = Array.from({ length: 6 }, (_, i) => `/heroes/${i + 8}.jpeg`);

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
        <Swiper
          modules={[Autoplay]}
          spaceBetween={15}
          slidesPerView="auto"
          loop={true}
          speed={4000}
          allowTouchMove={false}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: false,
          }}
          className="heroes-swiper"
        >
          {/* We duplicate the array multiple times to ensure the loop doesn't break on ultra-wide screens */}
          {[...row1, ...row1, ...row1].map((src, index) => (
            <SwiperSlide key={`r1-${index}`} style={{ width: 'auto' }}>
              <div className="hero-card">
                <img src={src} alt="Gym Hero" loading="lazy" />
                <div className="hero-glow"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Row 2 - Moves Right */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={15}
          slidesPerView="auto"
          loop={true}
          speed={4500}
          allowTouchMove={false}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          className="heroes-swiper"
          style={{ marginTop: '1rem' }}
        >
          {[...row2, ...row2, ...row2].map((src, index) => (
            <SwiperSlide key={`r2-${index}`} style={{ width: 'auto' }}>
              <div className="hero-card">
                <img src={src} alt="Gym Hero" loading="lazy" />
                <div className="hero-glow"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Gradient Edges */}
        <div className="marquee-edges"></div>
      </div>

      <style>{`
        /* Crucial: Makes the Swiper transition linear instead of ease-in-out so it never stops or stutters */
        .heroes-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
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

        /* Hover Effect: Since Swiper consumes pointer events, we apply hover to the card */
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

        /* Pause specific swiper on hover */
        .heroes-swiper:hover .swiper-wrapper {
          animation-play-state: paused; /* Fallback */
        }

        @media (max-width: 768px) {
          .hero-card {
            width: 220px;
            height: 280px;
          }
          .heroes-swiper .swiper-slide {
            width: 220px !important;
          }
        }
      `}</style>
    </section>
  );
}
