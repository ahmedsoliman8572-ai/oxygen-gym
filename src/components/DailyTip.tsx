import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const tips = [
  // Training
  { type: 'training', ar: 'تمرين العضلة بمدى حركي كامل وبوزن معقول سيبني عضلات أسرع بكثير من استخدام وزن ثقيل جداً بمدى حركي قصير.', en: 'Training with a full range of motion using a reasonable weight builds muscle much faster than using extremely heavy weights with a short range of motion.' },
  { type: 'training', ar: 'سر البناء العضلي هو (الزيادة التدريجية). حاول دائماً زيادة الوزن، أو العدادت، أو تحسين التكنيك كل أسبوع.', en: 'The secret to muscle building is (Progressive Overload). Always try to increase the weight, reps, or improve your technique every week.' },
  { type: 'training', ar: 'الإحماء الديناميكي قبل التمرين لمدة 5 دقائق يقي مفاصلك من إصابات قد توقفك عن التمرين لشهور.', en: 'A 5-minute dynamic warm-up before training protects your joints from injuries that could stop you from working out for months.' },
  { type: 'training', ar: 'لا تنسحب عند الشعور بالحرقان في العضلة! العدادات الأخيرة التي تشعر فيها بالصعوبة هي التي تبني العضلات فعلياً.', en: 'Don\'t quit when you feel the burn! The last few difficult reps are the ones that actually build the muscle.' },
  { type: 'training', ar: 'التركيز الذهني (Mind-Muscle Connection): تركيزك على العضلة أثناء تمرينها يزيد من تفعيل الألياف العضلية بنسبة 20%!', en: 'Mind-Muscle Connection: Focusing on the muscle while training it increases muscle fiber activation by up to 20%!' },
  { type: 'training', ar: 'تمرين الأرجل لا يضخم الجزء السفلي فقط، بل يحفز إفراز هرمون التستوستيرون الطبيعي المفيد للجسم كله.', en: 'Training legs doesn\'t just build your lower body; it stimulates the natural release of testosterone which benefits your whole body.' },
  { type: 'training', ar: 'الشهيق يكون عند إرخاء العضلة (النزول بالوزن) والزفير يكون عند الانقباض (رفع الوزن). التنفس الصحيح يمنحك قوة إضافية.', en: 'Inhale during the eccentric (lowering the weight) and exhale during the concentric (lifting the weight). Proper breathing gives you extra power.' },
  
  // Nutrition
  { type: 'nutrition', ar: 'العضلات تتكون من 75% ماء! الجفاف البسيط بنسبة 2% يقلل من قوتك البدنية داخل الجيم بشكل ملحوظ.', en: 'Muscles are 75% water! Even a mild 2% dehydration significantly reduces your physical strength in the gym.' },
  { type: 'nutrition', ar: 'البروتين هو حجر الأساس. حاول تقسيم احتياجك اليومي على 3 إلى 5 وجبات لضمان بقاء جسمك في حالة بناء مستمر.', en: 'Protein is the building block. Try to divide your daily intake into 3 to 5 meals to ensure your body remains in an anabolic state.' },
  { type: 'nutrition', ar: 'لا تخف من الكربوهيدرات! هي مصدر الوقود الأول لجسمك لرفع الأوزان الثقيلة. تناولها قبل وبعد التمرين.', en: 'Don\'t fear carbs! They are your body\'s primary fuel source for heavy lifting. Consume them before and after your workout.' },
  { type: 'nutrition', ar: 'الوجبة المفتوحة (Cheat Meal) أداة لكسر ثبات الوزن وتجديد نشاط الغدة الدرقية إذا استخدمت بذكاء مرة أسبوعياً.', en: 'A cheat meal is a tool to break weight plateaus and refresh thyroid activity if used smartly once a week.' },
  { type: 'nutrition', ar: 'المكملات الغذائية هي (إضافة) وليست سحراً. إذا كان نظامك الغذائي سيئاً، فلن يفيدك أفضل بروتين في العالم.', en: 'Supplements are an (addition), not magic. If your diet is poor, the best protein in the world won\'t help you.' },
  { type: 'nutrition', ar: 'الدهون الصحية (مثل المكسرات وزيت الزيتون والأفوكادو) ضرورية جداً للحفاظ على صحة مفاصلك وإنتاج هرمونات الذكورة.', en: 'Healthy fats (like nuts, olive oil, and avocados) are absolutely essential for joint health and testosterone production.' },
  
  // Recovery & Mindset
  { type: 'mindset', ar: 'العضلات تُهدم في الجيم وتُبنى في السرير! النوم العميق من 7-8 ساعات هو الوقت الحقيقي للنمو العضلي.', en: 'Muscles are torn in the gym and built in bed! Deep sleep for 7-8 hours is the real time for muscle growth.' },
  { type: 'mindset', ar: 'الاستمرارية تتفوق على المثالية. أن تتدرب 3 أيام أسبوعياً لمدة سنة، أفضل من أن تتدرب 6 أيام وتتوقف بعد شهر!', en: 'Consistency beats perfection. Training 3 days a week for a year is better than training 6 days and quitting after a month!' },
  { type: 'mindset', ar: 'أيام الراحة (Rest Days) ليست كسلاً! هي الأيام التي يقوم فيها جسمك بإعادة بناء الألياف العضلية لتصبح أقوى وأكبر.', en: 'Rest days are not laziness! They are the days when your body rebuilds muscle fibers to become stronger and bigger.' },
  { type: 'mindset', ar: 'لا تقارن بدايتك بموسم حصاد الآخرين. ركز على تطورك الشخصي، فمنافسك الوحيد هو أنت في الأمس.', en: 'Don\'t compare your Chapter 1 to someone else\'s Chapter 20. Focus on your personal growth; your only competition is who you were yesterday.' },
  { type: 'mindset', ar: 'الشعور بألم العضلات بعد التمرين (DOMS) ليس المؤشر الوحيد على نجاح التمرين. التطور في الأوزان هو المؤشر الأهم.', en: 'Delayed Onset Muscle Soreness (DOMS) isn\'t the only indicator of a good workout. Progression in lifting is the most important metric.' },
  { type: 'mindset', ar: 'تهيئة عقلك قبل رفع الوزن الثقيل هي نصف الرفعة! تخيل أنك ترفع الوزن بنجاح قبل أن تلمس البار.', en: 'Mental preparation before a heavy lift is half the battle! Visualize a successful lift before you even touch the bar.' }
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
