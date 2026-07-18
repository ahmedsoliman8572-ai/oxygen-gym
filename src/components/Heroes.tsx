import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

const heroes = Array.from({ length: 13 }, (_, i) => `/heroes/${i + 1}.jpeg`);

export default function Heroes() {
  return (
    <section id="heroes" style={{ padding: '6rem 0', background: '#020202', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '0 5%' }}>
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

      <div style={{ position: 'relative', width: '100%', padding: '2rem 0' }}>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 20,       // Subtle 3D rotation
            stretch: 0,       // Space between slides
            depth: 350,       // 3D depth effect
            modifier: 1,      // Effect multiplier
            slideShadows: true, // Cool 3D shadows on side slides
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="heroes-3d-slider"
        >
          {heroes.map((src, index) => (
            <SwiperSlide key={`hero-${index}`} className="hero-slide">
              <div className="hero-card">
                <img src={src} alt={`Gym Hero ${index + 1}`} loading="lazy" />
                <div className="hero-glow"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        /* Swiper 3D Container */
        .heroes-3d-slider {
          width: 100%;
          padding-top: 30px;
          padding-bottom: 50px;
        }

        /* Essential for auto width centering in Coverflow */
        .hero-slide {
          background-position: center;
          background-size: cover;
          width: 320px !important;
          height: 420px !important;
        }

        .hero-card {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          background-color: #1a1a1a;
          box-shadow: 0 15px 35px rgba(0,0,0,0.8);
          transition: filter 0.5s ease;
          /* Default state for side slides (darker) */
          filter: grayscale(60%) brightness(0.6);
        }

        /* Center Slide gets full color and brightness */
        .swiper-slide-active .hero-card {
          filter: grayscale(0%) brightness(1.1);
          box-shadow: 0 20px 50px rgba(198, 40, 40, 0.4);
        }

        .hero-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-glow {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 0 0 rgba(198, 40, 40, 0);
          transition: all 0.5s ease;
          pointer-events: none;
        }

        /* Active slide glow */
        .swiper-slide-active .hero-glow {
          box-shadow: inset 0 0 40px rgba(198, 40, 40, 0.5);
          border: 2px solid rgba(198, 40, 40, 0.8);
          border-radius: 20px;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .hero-slide {
            width: 250px !important;
            height: 340px !important;
          }
        }
      `}</style>
    </section>
  );
}
