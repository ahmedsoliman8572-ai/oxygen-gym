import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const photos = Array.from({ length: 9 }, (_, i) => `/gallery/photo${i + 1}.jpeg`);

export default function Gallery() {
  const { lang } = useLanguage();

  return (
    <section id="gallery" style={{ padding: '6rem 0 4rem', background: '#050505', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 className="section-title ar" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>
          داخل <span style={{ color: '#C62828' }}>الجيم</span>
        </h2>
        <h2 className="section-title en" style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem' }}>
          Inside <span style={{ color: '#C62828' }}>The Gym</span>
        </h2>
        <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #C62828, #8B1A1A)', margin: '0 auto', borderRadius: '2px' }}></div>
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
          className="mySwiper"
          style={{ width: '100%', paddingTop: '50px', paddingBottom: '50px' }}
        >
          {photos.map((src, idx) => (
            <SwiperSlide 
              key={idx} 
              style={{ 
                width: '300px', 
                height: '400px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 15px 50px rgba(0,0,0,0.5)'
              }}
            >
              <img 
                src={src} 
                alt={`Oxygen Gym Interior ${idx + 1}`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      <style>{`
        /* Customizing Swiper Pagination for Premium Look */
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
        
        /* Responsive adjustments */
        @media (min-width: 768px) {
          .swiper-slide {
            width: 500px !important;
            height: 600px !important;
          }
        }
      `}</style>
    </section>
  );
}
