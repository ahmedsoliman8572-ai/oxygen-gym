import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Pricing() {
  const { lang } = useLanguage();
  const [activePlan, setActivePlan] = useState<'1month' | '3months' | 'long'>('3months');

  const plans = {
    '1month': {
      titleAr: 'شهر واحد',
      titleEn: '1 Month',
      price: '550',
      oldPriceAr: '',
      oldPriceEn: '',
      featuresAr: ['دخول غير محدود', 'استخدام جميع الأجهزة', 'متابعة مبدئية'],
      featuresEn: ['Unlimited Access', 'All Equipment Usage', 'Initial Guidance'],
      btnTextAr: 'اشترك الآن',
      btnTextEn: 'Join Now',
      whatsapp: 'https://wa.me/201019183063'
    },
    '3months': {
      titleAr: '٣ شهور (عرض خاص)',
      titleEn: '3 Months (Special Offer)',
      price: '1100',
      oldPriceAr: 'بدلاً من ١٦٥٠ ج.م',
      oldPriceEn: 'Instead of 1650 EGP',
      featuresAr: ['توفير ٥٥٠ ج.م', 'دخول غير محدود', 'استخدام جميع الأجهزة'],
      featuresEn: ['Save 550 EGP', 'Unlimited Access', 'All Equipment Usage'],
      btnTextAr: 'اغتنم العرض',
      btnTextEn: 'Get Offer',
      whatsapp: 'https://wa.me/201019183063'
    },
    'long': {
      titleAr: 'فترات أطول',
      titleEn: 'Longer Periods',
      price: lang === 'ar' ? 'عروض خاصة' : 'Special Offers',
      oldPriceAr: 'خصومات ضخمة',
      oldPriceEn: 'Massive Discounts',
      featuresAr: ['خصومات تصل لـ ٤٠٪', 'مزايا حصرية للأعضاء', 'هدايا عند الاشتراك السنوي'],
      featuresEn: ['Up to 40% Off', 'Exclusive Member Perks', 'Annual Membership Gifts'],
      btnTextAr: 'تواصل معنا',
      btnTextEn: 'Contact Us',
      whatsapp: 'https://wa.me/201019183063'
    }
  };

  const current = plans[activePlan];

  return (
    <section id="pricing" style={{ padding: '6rem 5%', background: '#050505', color: 'white' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 className="section-title ar" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          خطط <span style={{ color: '#C62828' }}>الأسعار</span>
        </h2>
        <h2 className="section-title en" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Membership <span style={{ color: '#C62828' }}>Plans</span>
        </h2>
        <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #C62828, #8B1A1A)', margin: '0 auto', borderRadius: '2px', marginBottom: '3rem' }}></div>

        {/* The Toggle Switch */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          background: 'rgba(20,20,20,0.8)', 
          padding: '5px', 
          borderRadius: '50px', 
          maxWidth: '500px', 
          margin: '0 auto',
          border: '1px solid rgba(198,40,40,0.3)',
          position: 'relative'
        }}>
          {['1month', '3months', 'long'].map((planKey) => (
            <div 
              key={planKey}
              onClick={() => setActivePlan(planKey as any)}
              style={{
                flex: 1,
                padding: '12px 0',
                textAlign: 'center',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 1,
                fontSize: '1rem',
                fontWeight: activePlan === planKey ? 'bold' : 'normal',
                color: activePlan === planKey ? 'white' : '#888',
                transition: 'color 0.3s ease'
              }}
            >
              {lang === 'ar' ? plans[planKey as keyof typeof plans].titleAr.split(' ')[0] : plans[planKey as keyof typeof plans].titleEn.split(' ')[0]}
              {planKey === 'long' && (lang === 'ar' ? ' أطول' : ' Periods')}
              {planKey === '3months' && (lang === 'ar' ? ' شهور' : ' Months')}
              
              {/* Animated Background Pill */}
              {activePlan === planKey && (
                <motion.div
                  layoutId="pricingToggle"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: '#C62828',
                    borderRadius: '50px',
                    zIndex: -1,
                    boxShadow: '0 0 15px rgba(198,40,40,0.5)'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Dynamic Pricing Card */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={activePlan}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{ 
              background: 'rgba(15,15,15,0.9)', 
              padding: '3rem 2rem', 
              borderRadius: '20px', 
              textAlign: 'center', 
              border: activePlan === '3months' ? '2px solid #C62828' : '1px solid rgba(255,255,255,0.1)', 
              width: '100%',
              maxWidth: '450px',
              position: 'relative',
              boxShadow: activePlan === '3months' ? '0 20px 50px rgba(198, 40, 40, 0.15)' : '0 20px 40px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {activePlan === '3months' && (
              <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(45deg, #8B1A1A, #C62828)', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem', whiteSpace: 'nowrap', boxShadow: '0 5px 15px rgba(198,40,40,0.4)' }}>
                <span className="ar">الأكثر مبيعاً</span><span className="en">Most Popular</span>
              </div>
            )}
            
            <h3 style={{ fontSize: '1.5rem', color: '#ccc', marginBottom: '1.5rem' }}>
              {lang === 'ar' ? current.titleAr : current.titleEn}
            </h3>
            
            <div style={{ margin: '1rem 0', display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '3.5rem', fontWeight: 900, color: '#C62828', lineHeight: 1 }}>{current.price}</span>
              {activePlan !== 'long' && (
                <span style={{ color: '#888', fontSize: '1.2rem' }}>{lang === 'ar' ? 'ج.م' : 'EGP'}</span>
              )}
            </div>
            
            <div style={{ textDecoration: activePlan === '3months' ? 'line-through' : 'none', minHeight: '1.5rem', marginBottom: '2rem', fontSize: '1.1rem', color: activePlan === 'long' ? '#4caf50' : '#888' }}>
              {lang === 'ar' ? current.oldPriceAr : current.oldPriceEn}
            </div>

            <ul style={{ listStyle: 'none', margin: '0 0 2rem 0', padding: 0, textAlign: lang === 'ar' ? 'right' : 'left' }}>
              {(lang === 'ar' ? current.featuresAr : current.featuresEn).map((feature, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: lang === 'ar' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  style={{ color: '#aaa', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.8rem', justifyContent: lang === 'ar' ? 'flex-start' : 'flex-start', flexDirection: lang === 'ar' ? 'row-reverse' : 'row' }}
                >
                  <i className="fas fa-check-circle" style={{ color: '#C62828', fontSize: '1.2rem' }}></i> 
                  <span style={{ fontSize: '1.1rem' }}>{feature}</span>
                </motion.li>
              ))}
            </ul>

            <a 
              href={current.whatsapp} 
              target="_blank" 
              rel="noreferrer" 
              style={{ 
                display: 'block',
                background: activePlan === '3months' ? 'linear-gradient(45deg, #8B1A1A, #C62828)' : 'transparent', 
                border: activePlan === '3months' ? 'none' : '2px solid white', 
                color: 'white', 
                padding: '1rem 2rem', 
                borderRadius: '30px', 
                textDecoration: 'none', 
                fontWeight: 'bold',
                fontSize: '1.2rem',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)' }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <i className="fab fa-whatsapp" style={{ marginRight: '0.5rem', marginLeft: lang === 'ar' ? '0.5rem' : '0' }}></i> 
              {lang === 'ar' ? current.btnTextAr : current.btnTextEn}
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
