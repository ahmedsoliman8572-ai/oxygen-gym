import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
type Goal = 'cut' | 'maintain' | 'bulk';

export default function Calculator() {
  const { lang } = useLanguage();
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(25);
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(75);
  const [activity, setActivity] = useState<ActivityLevel>('moderate');
  const [goal, setGoal] = useState<Goal>('maintain');
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

    // Target Calories based on Goal
    let targetCalories = tdee;
    if (goal === 'cut') targetCalories -= 500;
    if (goal === 'bulk') targetCalories += 500;

    // Bodybuilding Macros Calculation
    // Protein: 2.2g per kg of bodyweight
    const protein = Math.round(weight * 2.2);
    const proteinCals = protein * 4;

    // Fats: 25% of total calories
    const fats = Math.round((targetCalories * 0.25) / 9);
    const fatCals = fats * 9;

    // Carbs: Remaining calories
    const carbs = Math.round((targetCalories - proteinCals - fatCals) / 4);

    return {
      tdee: Math.round(tdee),
      bmi: bmi.toFixed(1),
      bmiStatus: lang === 'ar' ? bmiStatusAr : bmiStatusEn,
      bmiColor,
      targetCalories: Math.round(targetCalories),
      macros: {
        protein,
        carbs,
        fats
      }
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
        <p className="ar" style={{ marginTop: '1rem', color: '#aaa' }}>أدخل بياناتك لتعرف مؤشر كتلة جسمك وجدول الماكروز (البروتين، الكارب، الدهون) المطلوب لهدفك</p>
        <p className="en" style={{ marginTop: '1rem', color: '#aaa' }}>Enter your details to calculate your BMI and the exact Macros needed to reach your goal</p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        
        {/* Input Form */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="calc-inputs print-hide"
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
          <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
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

          {/* Goal */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>{lang === 'ar' ? 'الهدف (Goal)' : 'Your Goal'}</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => setGoal('cut')}
                style={{ flex: 1, padding: '10px', background: goal === 'cut' ? '#2196f3' : '#111', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', transition: '0.3s' }}
              >
                {lang === 'ar' ? 'تنشيف' : 'Cut'}
              </button>
              <button 
                onClick={() => setGoal('maintain')}
                style={{ flex: 1, padding: '10px', background: goal === 'maintain' ? '#4caf50' : '#111', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', transition: '0.3s' }}
              >
                {lang === 'ar' ? 'ثبات' : 'Maintain'}
              </button>
              <button 
                onClick={() => setGoal('bulk')}
                style={{ flex: 1, padding: '10px', background: goal === 'bulk' ? '#C62828' : '#111', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', transition: '0.3s' }}
              >
                {lang === 'ar' ? 'ضخامة' : 'Bulk'}
              </button>
            </div>
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
        <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AnimatePresence>
            {showResults ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                {/* Top Row: BMI & Calories */}
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {/* BMI Card */}
                  <div style={{ flex: 1, background: 'rgba(20,20,20,0.8)', padding: '1.5rem', borderRadius: '20px', borderTop: `4px solid ${results.bmiColor}` }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#aaa' }}>{lang === 'ar' ? 'مؤشر كتلة الجسم (BMI)' : 'Body Mass Index'}</h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>{results.bmi}</span>
                      <span style={{ fontSize: '1.2rem', color: results.bmiColor, fontWeight: 'bold' }}>{results.bmiStatus}</span>
                    </div>
                  </div>

                  {/* Target Calories */}
                  <div style={{ flex: 1, background: 'rgba(20,20,20,0.8)', padding: '1.5rem', borderRadius: '20px', borderTop: '4px solid white' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#aaa' }}>{lang === 'ar' ? 'السعرات المطلوبة' : 'Target Calories'}</h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>{results.targetCalories}</span>
                      <span style={{ color: '#888' }}>{lang === 'ar' ? 'سعرة' : 'kcal'}</span>
                    </div>
                  </div>
                </div>

                {/* Macros Section */}
                <div style={{ background: 'rgba(20,20,20,0.8)', padding: '2rem', borderRadius: '20px', border: '1px solid #333' }}>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: 'white', textAlign: 'center' }}>
                    {lang === 'ar' ? 'خطة الماكروز الخاصة بك' : 'Your Custom Macros Plan'}
                  </h3>
                  
                  <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {/* Protein */}
                    <div style={{ flex: '1 1 120px', textAlign: 'center', padding: '1.5rem', background: 'rgba(33, 150, 243, 0.1)', border: '1px solid #2196f3', borderRadius: '15px' }}>
                      <div style={{ color: '#2196f3', fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{lang === 'ar' ? 'بروتين' : 'Protein'}</div>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>{results.macros.protein}<span style={{ fontSize: '1rem', color: '#888' }}>g</span></div>
                    </div>

                    {/* Carbs */}
                    <div style={{ flex: '1 1 120px', textAlign: 'center', padding: '1.5rem', background: 'rgba(76, 175, 80, 0.1)', border: '1px solid #4caf50', borderRadius: '15px' }}>
                      <div style={{ color: '#4caf50', fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{lang === 'ar' ? 'كارب' : 'Carbs'}</div>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>{results.macros.carbs}<span style={{ fontSize: '1rem', color: '#888' }}>g</span></div>
                    </div>

                    {/* Fats */}
                    <div style={{ flex: '1 1 120px', textAlign: 'center', padding: '1.5rem', background: 'rgba(255, 152, 0, 0.1)', border: '1px solid #ff9800', borderRadius: '15px' }}>
                      <div style={{ color: '#ff9800', fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>{lang === 'ar' ? 'دهون صحية' : 'Fats'}</div>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>{results.macros.fats}<span style={{ fontSize: '1rem', color: '#888' }}>g</span></div>
                    </div>
                  </div>
                </div>

                {/* Call To Action & Print */}
                <div className="print-hide" style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                  <a 
                    href="https://wa.me/201019183063" 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ flex: '2 1 200px', display: 'block', textAlign: 'center', padding: '15px', background: 'transparent', color: 'white', border: '2px solid #C62828', borderRadius: '10px', fontSize: '1.1rem', textDecoration: 'none', transition: 'all 0.3s' }}
                    onMouseOver={(e) => { e.currentTarget.style.background = '#C62828'; e.currentTarget.style.transform = 'translateY(-5px)' }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    <i className="fab fa-whatsapp" style={{ marginRight: '8px', marginLeft: '8px' }}></i>
                    {lang === 'ar' ? 'أرسل لنا نتيجتك' : 'Send your result'}
                  </a>
                  
                  <button 
                    onClick={() => window.print()}
                    style={{ flex: '1 1 150px', padding: '15px', background: '#333', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                    onMouseOver={(e) => { e.currentTarget.style.background = '#444'; e.currentTarget.style.transform = 'translateY(-5px)' }}
                    onMouseOut={(e) => { e.currentTarget.style.background = '#333'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    <i className="fas fa-print"></i>
                    {lang === 'ar' ? 'طباعة التقرير' : 'Print Report'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px dashed #333', borderRadius: '20px', padding: '3rem 0' }}
              >
                <p style={{ color: '#666', fontSize: '1.2rem', textAlign: 'center' }}>
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

        /* 🖨️ Print Styles */
        @media print {
          body * {
            visibility: hidden;
          }
          #calculator, #calculator * {
            visibility: visible;
          }
          #calculator {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            padding: 2rem !important;
            color: black !important;
          }
          .print-hide, .calc-inputs, nav, footer, .whatsapp-float {
            display: none !important;
          }
          /* Force layout to look good on paper */
          #calculator > div > h2 {
            color: black !important;
          }
          #calculator > div > p {
            color: #333 !important;
          }
          /* Ensure results cards have dark borders to show up on white paper */
          div[style*="background: rgba(20, 20, 20, 0.8)"], 
          div[style*="background: rgba(20,20,20,0.8)"] {
            background: white !important;
            border: 2px solid #ddd !important;
            color: black !important;
            box-shadow: none !important;
          }
          div[style*="background: rgba(20,20,20,0.8)"] span,
          div[style*="background: rgba(20,20,20,0.8)"] h3 {
            color: black !important;
          }
        }
      `}</style>
    </section>
  );
}
