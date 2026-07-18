export default function Footer() {
  return (
    <>
      <section id="contact" style={{ background: '#050505', padding: '4rem 5%', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', flex: '1 1 250px' }}>
            <i className="fas fa-map-marker-alt" style={{ fontSize: '2rem', color: '#C62828', marginBottom: '1rem' }}></i>
            <h3 className="ar" style={{ color: 'white', marginBottom: '0.5rem' }}>العنوان</h3>
            <h3 className="en" style={{ color: 'white', marginBottom: '0.5rem' }}>Location</h3>
            <p className="ar" style={{ color: '#888' }}>بركة السبع، شارع المستشفى ناحية الإدارة الصحية، مقابل لمطعم ابو عريشة، شارع البرماوي، عمارة أولاد جابر</p>
            <p className="en" style={{ color: '#888' }}>Birket As Saba, Hospital Street near Health Admin, Opposite to Abu Arisha Restaurant, El Barmawy St, Awlad Gaber Building</p>
          </div>
          
          <div style={{ textAlign: 'center', flex: '1 1 250px' }}>
            <i className="fas fa-phone" style={{ fontSize: '2rem', color: '#C62828', marginBottom: '1rem' }}></i>
            <h3 className="ar" style={{ color: 'white', marginBottom: '0.5rem' }}>تواصل معنا</h3>
            <h3 className="en" style={{ color: 'white', marginBottom: '0.5rem' }}>Contact</h3>
            <p style={{ color: '#888', direction: 'ltr' }}>+20 10 12173777</p>
            <a href="https://www.facebook.com/share/18hQzp9Uxr/" target="_blank" rel="noopener noreferrer" style={{ color: '#C62828', fontSize: '1.5rem', marginTop: '1rem', display: 'inline-block' }}>
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </div>

        <div style={{ marginTop: '3rem', borderRadius: '15px', overflow: 'hidden', height: '400px' }}>
          <iframe 
            src="https://maps.google.com/maps?q=30.6368415,31.0915564&t=&z=16&ie=UTF8&iwloc=&output=embed" 
            style={{ width: '100%', height: '100%', border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <footer style={{ background: '#000', padding: '1.5rem', textAlign: 'center', color: '#666', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="ar">&copy; {new Date().getFullYear()} أوكسجين جيم. جميع الحقوق محفوظة.</p>
        <p className="en">&copy; {new Date().getFullYear()} Oxygen Gym. All rights reserved.</p>
      </footer>
    </>
  );
}
