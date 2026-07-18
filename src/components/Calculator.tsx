import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';

export default function Calculator() {
  const { lang } = useLanguage();
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(25);
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(75);
  const [activity, setActivity] = useState<ActivityLevel>('moderate');
  const [showResults, setShowResults] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activityOptions = [
    { value: 'sedentary', labelAr: 'لا أتمرن (0 أيام)', labelEn: 'Sedentary (0 days)' },
    { value: 'light', labelAr: 'خفيف (1-3 أيام)', labelEn: 'Light (1-3 days)' },
    { value: 'moderate', labelAr: 'متوسط (3-5 أيام)', labelEn: 'Moderate (3-5 days)' },
    { value: 'active', labelAr: 'نشط (6 أيام)', labelEn: 'Active (6 days)' },
    { value: 'veryActive', labelAr: 'رياضي محترف (مرتين يوميا)', labelEn: 'Very Active (Twice a day)' },
  ];

  const calculateResults = () => {
    // Mifflin-St Jeor Equation
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr += gender === 'male' ? 5 : -161;

    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };

    const tdee = bmr * multipliers[activity];
    const bmi = weight / Math.pow(height / 100, 2);

    let bmiStatusEn = '';
    let bmiStatusAr = '';
    let bmiColor = '';

    if (bmi < 18.5) {
      bmiStatusEn = 'Underweight';
      bmiStatusAr = 'نحافة';
      bmiColor = '#ffc107'; // yellow
    } else if (bmi < 25) {
      bmiStatusEn = 'Normal';
      bmiStatusAr = 'وزن مثالي';
      bmiColor = '#4caf50'; // green
    } else if (bmi < 30) {
      bmiStatusEn = 'Overweight';
      bmiStatusAr = 'وزن زائد';
      bmiColor = '#ff9800'; // orange
    } else {
      bmiStatusEn = 'Obese';
      bmiStatusAr = 'سمنة';
      bmiColor = '#f44336'; // red
    }

    return {
      tdee: Math.round(tdee),
      bmi: bmi.toFixed(1),
      bmiStatus: lang === 'ar' ? bmiStatusAr : bmiStatusEn,
      bmiColor,
      bulking: Math.round(tdee + 500),
      cutting: Math.round(tdee - 500)
    };
  };

  const results = calculateResults();

  return (
    <section id="calculator" style={{ padding: '6rem 5% 4rem', background: '#050505', color: 'white', position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 className="section-title ar" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          احسب <span style={{ color: '#C62828' }}>احتياجك</span>
        </h2>
        <h2 className="section-title en" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Fitness <span style={{ color: '#C62828' }}>Calculator</span>
        </h2>
        <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, #C62828, #8B1A1A)', margin: '0 auto', borderRadius: '2px' }}></div>
        <p className="ar" style={{ marginTop: '1rem', color: '#aaa' }}>أدخل بياناتك لتعرف مؤشر كتلة جسمك والسعرات المطلوبة لتحقيق هدفك</p>
        <p className="en" style={{ marginTop: '1rem', color: '#aaa' }}>Enter your details to calculate your BMI and required calories to reach your goal</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        
        {/* Input Form */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ flex: '1 1 400px', background: 'rgba(20,20,20,0.8)', padding: '2rem', borderRadius: '20px', border: '1px solid rgba(198,40,40,0.2)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}
        >
          {/* Gender */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <button 
              onClick={() => setGender('male')}
              style={{ flex: 1, padding: '10px', background: gender === 'male' ? '#C62828' : '#111', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', transition: '0.3s' }}
            >
              {lang === 'ar' ? 'ذكر' : 'Male'}
            </button>
            <button 
              onClick={() => setGender('female')}
              style={{ flex: 1, padding: '10px', background: gender === 'female' ? '#C62828' : '#111', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', transition: '0.3s' }}
            >
              {lang === 'ar' ? 'أنثى' : 'Female'}
            </button>
          </div>

          {/* Age */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>{lang === 'ar' ? 'العمر (سنوات)' : 'Age (years)'}</span>
              <span style={{ color: '#C62828', fontWeight: 'bold' }}>{age}</span>
            </div>
            <input type="range" min="15" max="80" value={age} onChange={(e) => setAge(parseInt(e.target.value))} className="calc-slider" />
          </div>

          {/* Height */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>{lang === 'ar' ? 'الطول (سم)' : 'Height (cm)'}</span>
              <span style={{ color: '#C62828', fontWeight: 'bold' }}>{height}</span>
            </div>
            <input type="range" min="120" max="220" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} className="calc-slider" />
          </div>

          {/* Weight */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>{lang === 'ar' ? 'الوزن (كجم)' : 'Weight (kg)'}</span>
              <span style={{ color: '#C62828', fontWeight: 'bold' }}>{weight}</span>
            </div>
            <input type="range" min="40" max="150" value={weight} onChange={(e) => setWeight(parseInt(e.target.value))} className="calc-slider" />
          </div>

          {/* Activity Level Custom Dropdown */}
          <div style={{ marginBottom: '2rem', position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>{lang === 'ar' ? 'مستوى النشاط (أيام التمرين)' : 'Activity Level (Workout Days)'}</label>
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{ width: '100%', padding: '12px 15px', background: '#111', color: 'white', border: '1px solid #333', borderRadius: '10px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span>{lang === 'ar' ? activityOptions.find(o => o.value === activity)?.labelAr : activityOptions.find(o => o.value === activity)?.labelEn}</span>
              <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`} style={{ color: '#C62828' }}></i>
            </div>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <>
                  <div style={{ position: 'fixed', inset: 0, zIndex: 9 }} onClick={() => setIsDropdownOpen(false)}></div>
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: '100%',
                      background: '#1a1a1a',
                      border: '1px solid #333',
                      borderRadius: '10px',
                      marginTop: '5px',
                      padding: 0,
                      listStyle: 'none',
                      zIndex: 10,
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.8)'
                    }}
                  >
                    {activityOptions.map((option) => (
                      <li 
                        key={option.value}
                        onClick={() => {
                          setActivity(option.value as ActivityLevel);
                          setIsDropdownOpen(false);
                        }}
                        style={{
                          padding: '12px 15px',
                          color: activity === option.value ? '#C62828' : 'white',
                          background: activity === option.value ? 'rgba(198, 40, 40, 0.1)' : 'transparent',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                          borderBottom: '1px solid #222'
                        }}
                        onMouseOver={(e) => {
                          if (activity !== option.value) e.currentTarget.style.background = '#222';
                        }}
                        onMouseOut={(e) => {
                          if (activity !== option.value) e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        {lang === 'ar' ? option.labelAr : option.labelEn}
                      </li>
                    ))}
                  </motion.ul>
                </>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={() => setShowResults(true)}
            style={{ width: '100%', padding: '15px', background: 'linear-gradient(45deg, #C62828, #ff1744)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', transition: 'transform 0.3s', boxShadow: '0 10px 20px rgba(198,40,40,0.3)' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {lang === 'ar' ? 'احسب الآن' : 'Calculate Now'}
          </button>
        </motion.div>

        {/* Results Display */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AnimatePresence>
            {showResults ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                {/* BMI Card */}
                <div style={{ background: 'rgba(20,20,20,0.8)', padding: '1.5rem', borderRadius: '20px', borderLeft: `5px solid ${results.bmiColor}` }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#aaa' }}>{lang === 'ar' ? 'مؤشر كتلة الجسم (BMI)' : 'Body Mass Index (BMI)'}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>{results.bmi}</span>
                    <span style={{ fontSize: '1.2rem', color: results.bmiColor, fontWeight: 'bold' }}>{results.bmiStatus}</span>
                  </div>
                </div>

                {/* Maintenance Calories */}
                <div style={{ background: 'rgba(20,20,20,0.8)', padding: '1.5rem', borderRadius: '20px', border: '1px solid #333' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#aaa' }}>{lang === 'ar' ? 'سعرات الثبات (يوميا)' : 'Maintenance Calories (Daily)'}</h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>{results.tdee}</span>
                    <span style={{ color: '#888' }}>{lang === 'ar' ? 'سعر حراري' : 'kcal'}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  {/* Cutting Calories */}
                  <div style={{ flex: 1, background: 'rgba(20,20,20,0.8)', padding: '1.5rem', borderRadius: '20px', borderTop: '4px solid #2196f3' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#aaa' }}>{lang === 'ar' ? 'للتنشيف (Cutting)' : 'For Cutting'}</h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>{results.cutting}</span>
                    </div>
                  </div>

                  {/* Bulking Calories */}
                  <div style={{ flex: 1, background: 'rgba(20,20,20,0.8)', padding: '1.5rem', borderRadius: '20px', borderTop: '4px solid #C62828' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#aaa' }}>{lang === 'ar' ? 'للضخامة (Bulking)' : 'For Bulking'}</h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>{results.bulking}</span>
                    </div>
                  </div>
                </div>

                {/* Call To Action */}
                <a 
                  href="https://wa.me/201019183063" 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ display: 'block', textAlign: 'center', marginTop: '1rem', padding: '15px', background: 'transparent', color: 'white', border: '2px solid #C62828', borderRadius: '10px', fontSize: '1.1rem', textDecoration: 'none', transition: 'all 0.3s' }}
                  onMouseOver={(e) => { e.currentTarget.style.background = '#C62828'; e.currentTarget.style.transform = 'translateY(-5px)' }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {lang === 'ar' ? 'شارك نتيجتك معنا لنحدد لك الاشتراك المناسب' : 'Share your result with us for a custom plan'}
                </a>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px dashed #333', borderRadius: '20px' }}
              >
                <p style={{ color: '#666', fontSize: '1.2rem' }}>
                  {lang === 'ar' ? 'أدخل بياناتك لترى النتائج هنا' : 'Enter your details to see results here'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .calc-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          background: #333;
          border-radius: 3px;
          outline: none;
        }
        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #C62828;
          cursor: pointer;
          transition: 0.2s;
        }
        .calc-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 15px #C62828;
        }
      `}</style>
    </section>
  );
}
