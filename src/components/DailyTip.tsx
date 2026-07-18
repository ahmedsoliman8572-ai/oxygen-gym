import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const tips = [
  // Training
  { type: 'training', ar: 'لما تتمرن المدى الحركي كامل بوزن معقول هتبني عضلات أسرع بكتير من إنك تشيل وزن تقيل أوي وتلعب نص عدة.', en: 'Training with a full range of motion using a reasonable weight builds muscle much faster than using extremely heavy weights with a short range of motion.' },
  { type: 'training', ar: 'سر الفورمة في (الزيادة التدريجية). حاول دايماً تزود الوزن، أو العدادت، أو تظبط الأداء بتاعك كل أسبوع.', en: 'The secret to muscle building is (Progressive Overload). Always try to increase the weight, reps, or improve your technique every week.' },
  { type: 'training', ar: 'تسخين 5 دقايق قبل ما تشيل حديد بيحمي مفاصلك من إصابات ممكن تقعدك في البيت بالشهور.', en: 'A 5-minute dynamic warm-up before training protects your joints from injuries that could stop you from working out for months.' },
  { type: 'training', ar: 'ماتسيبش الوزن لما تحس بنار في العضلة! العدادت الأخيرة اللي بتطلع بطلوع الروح دي هي اللي بتبني العضلات بجد.', en: 'Don\'t quit when you feel the burn! The last few difficult reps are the ones that actually build the muscle.' },
  { type: 'training', ar: 'ركز بدماغك مع العضلة وإنت بتلعب! الارتباط العقلي العضلي بيزود تشغيل الألياف العضلية بنسبة 20%.', en: 'Mind-Muscle Connection: Focusing on the muscle while training it increases muscle fiber activation by up to 20%!' },
  { type: 'training', ar: 'تمرينة الرجل مش بس بتكبر الجزء اللي تحت، دي بتضرب هرمون التستوستيرون الطبيعي في السما وتفيد جسمك كله.', en: 'Training legs doesn\'t just build your lower body; it stimulates the natural release of testosterone which benefits your whole body.' },
  { type: 'training', ar: 'خد نَفَس وإنت بتنزل بالوزن، وطلّعه وإنت بتزق. التنفس الصح بيديك قوة زيادة مكنتش تتخيلها.', en: 'Inhale during the eccentric (lowering the weight) and exhale during the concentric (lifting the weight). Proper breathing gives you extra power.' },
  
  // Nutrition
  { type: 'nutrition', ar: 'عضلاتك 75% منها مياه! لو عطشان شوية صغيرين قوتك في الجيم هتقل بشكل هتحس بيه جداً.', en: 'Muscles are 75% water! Even a mild 2% dehydration significantly reduces your physical strength in the gym.' },
  { type: 'nutrition', ar: 'البروتين هو الطوب اللي بتبني بيه. قسم وجباتك من 3 لـ 5 مرات عشان جسمك يفضل يبني طول اليوم.', en: 'Protein is the building block. Try to divide your daily intake into 3 to 5 meals to ensure your body remains in an anabolic state.' },
  { type: 'nutrition', ar: 'ماتخافش من الكارب! ده البنزين بتاعك عشان تقدر تشيل أوزان تقيلة. كُله قبل وبعد التمرين.', en: 'Don\'t fear carbs! They are your body\'s primary fuel source for heavy lifting. Consume them before and after your workout.' },
  { type: 'nutrition', ar: 'الوجبة الفري (Cheat Meal) دي أداة عشان تكسر ثبات الوزن وتفوق الغدة الدرقية، لو استخدمتها بذكاء مرة كل أسبوع.', en: 'A cheat meal is a tool to break weight plateaus and refresh thyroid activity if used smartly once a week.' },
  { type: 'nutrition', ar: 'المكملات مجرد (إضافة) مش سحر. لو أكلك بايظ، أغلى بروتين في العالم مش هيعملك حاجة.', en: 'Supplements are an (addition), not magic. If your diet is poor, the best protein in the world won\'t help you.' },
  { type: 'nutrition', ar: 'الدهون الصحية زي المكسرات وزيت الزيتون والأفوكادو مهمة جداً عشان مفاصلك وعشان هرمونات الذكورة بتاعتك.', en: 'Healthy fats (like nuts, olive oil, and avocados) are absolutely essential for joint health and testosterone production.' },
  
  // Recovery & Mindset
  { type: 'mindset', ar: 'العضلة بتتقطع في الجيم وبتتبني وإنت نايم! النوم العميق من 7 لـ 8 ساعات هو الوقت الحقيقي اللي بتكبر فيه.', en: 'Muscles are torn in the gym and built in bed! Deep sleep for 7-8 hours is the real time for muscle growth.' },
  { type: 'mindset', ar: 'إنك تستمر أهم من إنك تكون مثالي. تتمرن 3 أيام في الأسبوع لمدة سنة أحسن 100 مرة من إنك تفرم نفسك 6 أيام وتبطل بعد شهر!', en: 'Consistency beats perfection. Training 3 days a week for a year is better than training 6 days and quitting after a month!' },
  { type: 'mindset', ar: 'يوم الراحة مش معناه إنك مكسل! ده اليوم اللي جسمك بيلحم فيه الألياف العضلية عشان تبقى أقوى وأكبر من الأول.', en: 'Rest days are not laziness! They are the days when your body rebuilds muscle fibers to become stronger and bigger.' },
  { type: 'mindset', ar: 'ماتقارنش بدايتك بواحد بيتمرن بقاله سنين. ركز في تطورك إنت، منافسك الوحيد هو مستواك بتاع إمبارح.', en: 'Don\'t compare your Chapter 1 to someone else\'s Chapter 20. Focus on your personal growth; your only competition is who you were yesterday.' },
  { type: 'mindset', ar: 'الوجع بتاع بعد التمرين مش هو الدليل الوحيد إنك اتمرنت صح. الأهم إنك تكون بتطور أوزانك.', en: 'Delayed Onset Muscle Soreness (DOMS) isn\'t the only indicator of a good workout. Progression in lifting is the most important metric.' },
  { type: 'mindset', ar: 'إنك تهيأ دماغك قبل الرفعة التقيلة دي نص المسافة! تخيل إنك شلت الوزن ونجحت قبل ما تلمس البار أصلاً.', en: 'Mental preparation before a heavy lift is half the battle! Visualize a successful lift before you even touch the bar.' }
];

export default function DailyTip() {
  const { lang } = useLanguage();
  const [tipOfTheDay, setTipOfTheDay] = useState(tips[0]);

  useEffect(() => {
    // Calculate the current day of the year to pick a deterministic but rotating daily tip
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Pick the tip
    const index = dayOfYear % tips.length;
    setTipOfTheDay(tips[index]);
  }, []);

  const getIcon = (type: string) => {
    switch(type) {
      case 'training': return 'fas fa-dumbbell';
      case 'nutrition': return 'fas fa-utensils';
      case 'mindset': return 'fas fa-brain';
      default: return 'fas fa-lightbulb';
    }
  };

  const getTypeLabelAr = (type: string) => {
    switch(type) {
      case 'training': return 'نصيحة في التدريب';
      case 'nutrition': return 'نصيحة في التغذية';
      case 'mindset': return 'نصيحة في الاستشفاء والعقلية';
      default: return 'نصيحة';
    }
  };

  const getTypeLabelEn = (type: string) => {
    switch(type) {
      case 'training': return 'Training Tip';
      case 'nutrition': return 'Nutrition Tip';
      case 'mindset': return 'Recovery & Mindset Tip';
      default: return 'Tip';
    }
  };

  return (
    <section id="daily-tip" style={{ padding: '4rem 5%', background: '#111', position: 'relative' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ 
            background: 'linear-gradient(135deg, rgba(20,20,20,0.9), rgba(30,0,0,0.8))', 
            borderRadius: '20px', 
            padding: '3rem 2rem', 
            border: '1px solid rgba(198,40,40,0.3)',
            boxShadow: '0 15px 30px rgba(0,0,0,0.5)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Decorative quote mark */}
          <i className="fas fa-quote-left" style={{ position: 'absolute', top: '20px', left: '30px', fontSize: '4rem', color: 'rgba(198,40,40,0.1)', zIndex: 0 }}></i>
          <i className="fas fa-quote-right" style={{ position: 'absolute', bottom: '20px', right: '30px', fontSize: '4rem', color: 'rgba(198,40,40,0.1)', zIndex: 0 }}></i>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(198,40,40,0.2)', padding: '8px 20px', borderRadius: '30px', marginBottom: '2rem' }}>
              <i className={getIcon(tipOfTheDay.type)} style={{ color: '#C62828' }}></i>
              <span style={{ color: '#ffaaaa', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>
                {lang === 'ar' ? 'نصيحة الكابتن لليوم' : 'COACH TIP OF THE DAY'}
              </span>
            </div>

            <h3 style={{ fontSize: '1.8rem', color: 'white', lineHeight: '1.6', marginBottom: '2rem', fontStyle: 'italic' }}>
              "{lang === 'ar' ? tipOfTheDay.ar : tipOfTheDay.en}"
            </h3>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '40px', height: '40px', background: '#C62828', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <i className="fas fa-user-ninja" style={{ color: 'white' }}></i>
              </div>
              <div style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                <div style={{ color: 'white', fontWeight: 'bold', letterSpacing: '1px' }}>OXYGEN GYM COACH</div>
                <div style={{ color: '#C62828', fontSize: '0.85rem' }}>{lang === 'ar' ? getTypeLabelAr(tipOfTheDay.type) : getTypeLabelEn(tipOfTheDay.type)}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
