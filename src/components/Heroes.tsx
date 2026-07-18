import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const heroes = Array.from({ length: 13 }, (_, i) => `/heroes/${i + 1}.jpeg`);

export default function Heroes() {
  const { lang } = useLanguage();

  return (
    <section id="heroes" style={{ padding: '6rem 0', background: '#020202', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem', padding: '0 5%' }}>
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

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        style={{ width: '100%', paddingBottom: '3rem' }}
      >
        <Swiper
          key={lang} // Force remount when language changes
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="heroes-swiper"
          style={{ width: '100%', paddingTop: '50px', paddingBottom: '50px' }}
        >
          {heroes.map((src, idx) => (
            <SwiperSlide 
              key={`hero-${idx}`} 
              className="hero-swiper-slide"
            >
              <div className="hero-card">
                <img 
                  src={src} 
                  alt={`Gym Hero ${idx + 1}`} 
                  loading="lazy"
                />
                <div className="hero-glow"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      <style>{`
        /* Customizing Swiper Pagination for Premium Look (Matches Gallery) */
        .swiper-pagination-bullet {
          background: #555 !important;
          opacity: 1 !important;
          width: 10px !important;
          height: 10px !important;
          transition: all 0.3s ease !important;
        }
        .swiper-pagination-bullet-active {
          background: #C62828 !important;
          width: 30px !important;
          border-radius: 5px !important;
        }

        .hero-swiper-slide {
          width: 300px !important;
          height: 400px !important;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 50px rgba(0,0,0,0.5);
        }

        .hero-card {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: #1a1a1a;
          /* Default state for side slides (darker) */
          transition: filter 0.5s ease;
          filter: grayscale(60%) brightness(0.6);
        }

        /* Center Slide gets full color and brightness */
        .swiper-slide-active .hero-card {
          filter: grayscale(0%) brightness(1.1);
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

        /* Responsive adjustments */
        @media (min-width: 768px) {
          .hero-swiper-slide {
            width: 400px !important;
            height: 500px !important;
          }
        }
      `}</style>
    </section>
  );
}
