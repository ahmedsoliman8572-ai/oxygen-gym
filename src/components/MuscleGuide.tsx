import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const muscles = [
  {
    id: 'chest',
    nameAr: 'عضلات الصدر (Chest)',
    nameEn: 'Chest Muscles (Pectorals)',
    descAr: 'المحرك الأساسي لحركات الدفع. وظيفتها الأساسية هي دفع الأجسام بعيداً عنك، وضم الذراعين للداخل. تقويتها تمنح الجزء العلوي مظهراً قوياً وتساعد في تحسين عملية التنفس واستقامة الجزء العلوي.',
    descEn: 'The primary engine for pushing movements. Its main function is pushing objects away and bringing arms inward. Strengthening it gives a powerful upper body look and improves breathing and posture.',
    icon: 'fa-child'
  },
  {
    id: 'back',
    nameAr: 'عضلات الظهر (Back)',
    nameEn: 'Back Muscles (Lats & Rhomboids)',
    descAr: 'مركز قوة السحب في الجسم. تعمل على سحب الأشياء نحوك وتدعم العمود الفقري بشكل كامل. تقوية الظهر هي السر الأساسي لعلاج تقوس الأكتاف ومنح الجسم شكل حرف V الجذاب.',
    descEn: 'The pulling powerhouse of the body. They pull objects toward you and fully support the spine. A strong back is the secret to fixing rounded shoulders and giving the attractive V-taper look.',
    icon: 'fa-child'
  },
  {
    id: 'shoulders',
    nameAr: 'عضلات الكتف (Shoulders)',
    nameEn: 'Shoulder Muscles (Deltoids)',
    descAr: 'تتكون من 3 رؤوس (أمامية، جانبية، خلفية). هي العضلة المسؤولة عن رفع الأوزان فوق الرأس وتحريك الذراع في جميع الاتجاهات (360 درجة). تعطي الجسم العرض والهيبة.',
    descEn: 'Composed of 3 heads (front, lateral, rear). Responsible for lifting weights overhead and moving the arm in all directions (360 degrees). They give the body width and presence.',
    icon: 'fa-child'
  },
  {
    id: 'arms',
    nameAr: 'عضلات الذراعين (Arms)',
    nameEn: 'Arm Muscles (Biceps & Triceps)',
    descAr: 'تتكون أساساً من البايسبس (وظيفتها ثني الذراع وسحب الأشياء) والترايسبس (وظيفتها فرد الذراع ودفع الأشياء). الترايسبس تمثل ثلثي حجم الذراع الفعلي!',
    descEn: 'Mainly consist of Biceps (bends the arm, pulls objects) and Triceps (straightens the arm, pushes objects). The triceps actually make up two-thirds of the arm\'s size!',
    icon: 'fa-child'
  },
  {
    id: 'core',
    nameAr: 'عضلات البطن والجذع (Core)',
    nameEn: 'Core & Abs',
    descAr: 'ليست مجرد شكل جميل (6-Pack)! الجذع هو حلقة الوصل بين النصف العلوي والسفلي. وظيفته الأساسية حفظ توازن الجسم، حماية العمود الفقري من الإصابات، ونقل القوة الحركية.',
    descEn: 'Not just for looks (6-Pack)! The core connects the upper and lower body. Its main function is to balance the body, protect the spine from injuries, and transfer kinetic energy.',
    icon: 'fa-child'
  },
  {
    id: 'legs',
    nameAr: 'عضلات الأرجل (Legs)',
    nameEn: 'Leg Muscles (Quads, Hammies, Calves)',
    descAr: 'أكبر وأقوى مجموعة عضلية في الإنسان. هي الأساس الذي يحمل وزنك كاملاً. مسؤولة عن المشي، الجري، والقفز. تمرينها يحفز هرمونات البناء (التستوستيرون) لكل الجسم.',
    descEn: 'The largest and strongest muscle group in humans. The foundation that carries your full weight. Responsible for walking, running, and jumping. Training them boosts growth hormones for the whole body.',
    icon: 'fa-child'
  }
];

export default function MuscleGuide() {
  const { lang } = useLanguage();
  const [activeMuscle, setActiveMuscle] = useState(muscles[0]);

  return (
    <section id="muscle-guide" style={{ padding: '6rem 5%', background: '#0a0a0a', color: 'white', position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="section-title ar" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          الدليل التفاعلي <span style={{ color: '#C62828' }}>للعضلات</span>
        </h2>
        <h2 className="section-title en" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Interactive <span style={{ color: '#C62828' }}>Muscle Guide</span>
        </h2>
        <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #C62828, #8B1A1A)', margin: '0 auto', borderRadius: '2px' }}></div>
        <p className="ar" style={{ marginTop: '1rem', color: '#aaa', fontSize: '1.1rem' }}>اختر العضلة لتعرف وظيفتها الأساسية وكيف تخدم جسمك</p>
        <p className="en" style={{ marginTop: '1rem', color: '#aaa', fontSize: '1.1rem' }}>Select a muscle to understand its main function and how it serves your body</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
        
        {/* Muscle Selector List */}
        <div style={{ flex: '1 1 350px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {muscles.map((muscle) => (
            <button
              key={muscle.id}
              onClick={() => setActiveMuscle(muscle)}
              style={{
                background: activeMuscle.id === muscle.id ? 'linear-gradient(90deg, rgba(198,40,40,0.2), transparent)' : 'transparent',
                border: activeMuscle.id === muscle.id ? '1px solid #C62828' : '1px solid #333',
                borderLeft: activeMuscle.id === muscle.id ? '4px solid #C62828' : '4px solid #333',
                padding: '1rem 1.5rem',
                textAlign: lang === 'ar' ? 'right' : 'left',
                color: activeMuscle.id === muscle.id ? 'white' : '#888',
                fontSize: '1.2rem',
                fontWeight: activeMuscle.id === muscle.id ? 'bold' : 'normal',
                cursor: 'pointer',
                borderRadius: '5px',
                transition: 'all 0.3s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onMouseOver={(e) => {
                if (activeMuscle.id !== muscle.id) {
                  e.currentTarget.style.borderColor = '#666';
                  e.currentTarget.style.color = '#ccc';
                }
              }}
              onMouseOut={(e) => {
                if (activeMuscle.id !== muscle.id) {
                  e.currentTarget.style.borderColor = '#333';
                  e.currentTarget.style.color = '#888';
                }
              }}
            >
              <span>{lang === 'ar' ? muscle.nameAr : muscle.nameEn}</span>
              <i className="fas fa-chevron-left" style={{ opacity: activeMuscle.id === muscle.id ? 1 : 0, transform: lang === 'en' ? 'rotate(180deg)' : 'none', transition: '0.3s' }}></i>
            </button>
          ))}
        </div>

        {/* Dynamic Details Display */}
        <div style={{ flex: '2 1 500px', position: 'relative', minHeight: '350px' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, rgba(198,40,40,0.15) 0%, transparent 70%)', zIndex: 0 }}></div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMuscle.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              style={{ position: 'relative', zIndex: 1, background: 'rgba(20,20,20,0.8)', backdropFilter: 'blur(10px)', padding: '3rem', borderRadius: '20px', border: '1px solid rgba(198,40,40,0.3)', boxShadow: '0 15px 35px rgba(0,0,0,0.5)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              <h3 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1.5rem', borderBottom: '2px solid #C62828', paddingBottom: '1rem', display: 'inline-block' }}>
                {lang === 'ar' ? activeMuscle.nameAr : activeMuscle.nameEn}
              </h3>
              
              <p style={{ fontSize: '1.3rem', lineHeight: '1.8', color: '#ccc' }}>
                {lang === 'ar' ? activeMuscle.descAr : activeMuscle.descEn}
              </p>
              
              <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#C62828' }}>
                <i className="fas fa-info-circle"></i>
                <span style={{ fontSize: '0.9rem', color: '#888' }}>
                  {lang === 'ar' ? 'معلومة: تمرين هذه العضلة بانتظام يحسن من كفاءتك في الحياة اليومية.' : 'Info: Training this muscle regularly improves your daily life efficiency.'}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
