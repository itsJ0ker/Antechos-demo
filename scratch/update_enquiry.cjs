const fs = require('fs');
const file = 'src/pages/UniversityPageNew.jsx';
let content = fs.readFileSync(file, 'utf8');

const startIndex = content.indexOf('   return (\n      <div className="eq-wrapper">\n         <style dangerouslySetInnerHTML={{');
const endIndex = content.indexOf('export default UniversityPageNew;');

if (startIndex === -1 || endIndex === -1) {
    console.log('Could not find boundaries');
    process.exit(1);
}

const newReturnBlock = `   return (
      <div className="eq-wrapper">
         <style dangerouslySetInnerHTML={{
            __html: \`
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

            .eq-wrapper {
               width: 100%;
               font-family: 'Outfit', system-ui, sans-serif;
               background: #ffffff;
               position: relative;
               overflow: hidden;
               padding: 100px 0 80px 0;
            }

            .eq-bg-pattern {
               position: absolute;
               top: 40px;
               right: 35%;
               width: 140px;
               height: 140px;
               background-image: radial-gradient(#CBD5E1 2px, transparent 2px);
               background-size: 16px 16px;
               opacity: 0.6;
               pointer-events: none;
               z-index: 1;
            }

            .eq-container {
               max-width: 1280px;
               margin: 0 auto;
               padding: 0 40px;
               display: flex;
               align-items: center;
               justify-content: space-between;
               position: relative;
               z-index: 2;
            }

            .eq-left {
               flex: 1;
               max-width: 440px;
            }

            .eq-tag {
               display: inline-flex;
               align-items: center;
               gap: 8px;
               padding: 8px 16px;
               background: #ffffff;
               border: 1px solid #E2E8F0;
               border-radius: 100px;
               color: #2563EB;
               font-size: 12px;
               font-weight: 800;
               letter-spacing: 0.5px;
               text-transform: uppercase;
               margin-bottom: 24px;
               box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
            }

            .eq-tag svg {
               color: #2563EB;
               fill: #2563EB;
            }

            .eq-title {
               font-size: 48px;
               font-weight: 800;
               line-height: 1.1;
               color: #0F172A;
               margin-bottom: 20px;
            }

            .eq-title span {
               color: #EA580C;
            }

            .eq-desc {
               font-size: 16px;
               color: #475569;
               line-height: 1.6;
               margin-bottom: 32px;
               font-weight: 500;
            }

            .eq-features {
               display: flex;
               flex-direction: column;
            }

            .eq-feature {
               display: flex;
               align-items: center;
               gap: 16px;
               padding: 16px 0;
               border-bottom: 1px solid #F1F5F9;
               transition: transform 0.2s ease;
            }

            .eq-feature:last-child {
               border-bottom: none;
            }

            .eq-feature:hover {
               transform: translateX(4px);
            }

            .eq-feature-icon {
               width: 44px;
               height: 44px;
               border-radius: 12px;
               background: #EFF6FF;
               color: #2563EB;
               display: flex;
               align-items: center;
               justify-content: center;
               flex-shrink: 0;
            }

            .eq-feature-text {
               font-size: 15px;
               color: #1E293B;
               font-weight: 700;
            }

            .eq-image-container {
               position: absolute;
               left: 50%;
               bottom: -80px;
               transform: translateX(-50%);
               width: 480px;
               z-index: 3;
               pointer-events: none;
            }

            .eq-image-container img {
               width: 100%;
               height: auto;
               display: block;
               filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.15));
            }

            .eq-right {
               flex: 1;
               max-width: 420px;
               display: flex;
               justify-content: flex-end;
               z-index: 4;
            }

            .eq-form-card {
               width: 100%;
               background: linear-gradient(135deg, #2563EB, #1D4ED8);
               border-radius: 24px;
               padding: 32px 28px;
               box-shadow: 0 25px 50px -12px rgba(37, 99, 235, 0.25);
               position: relative;
               overflow: hidden;
            }

            .eq-form-top-icon {
               width: 52px;
               height: 52px;
               background: rgba(255, 255, 255, 0.15);
               border-radius: 50%;
               display: flex;
               align-items: center;
               justify-content: center;
               margin-bottom: 20px;
               color: rgba(255, 255, 255, 0.9);
            }

            .eq-form-header {
               margin-bottom: 24px;
            }

            .eq-form-title {
               font-size: 28px;
               font-weight: 700;
               color: #ffffff;
               margin-bottom: 12px;
               line-height: 1.2;
            }

            .eq-form-subtitle {
               font-size: 14px;
               color: rgba(255, 255, 255, 0.85);
               font-weight: 400;
               display: flex;
               align-items: center;
               gap: 6px;
            }

            .eq-form-subtitle svg {
               color: #FCD34D;
            }

            .eq-form-group {
               margin-bottom: 16px;
               position: relative;
               display: flex;
               align-items: center;
            }

            .eq-input-icon {
               position: absolute;
               left: 16px;
               color: rgba(255, 255, 255, 0.8);
               pointer-events: none;
               width: 20px;
               height: 20px;
               display: flex;
               align-items: center;
               justify-content: center;
            }

            .eq-input {
               width: 100%;
               background: rgba(255, 255, 255, 0.1);
               border: 1px solid rgba(255, 255, 255, 0.2);
               border-radius: 12px;
               padding: 16px 16px 16px 48px;
               font-family: inherit;
               font-size: 15px;
               color: #ffffff;
               transition: all 0.3s ease;
               outline: none;
            }

            .eq-input::placeholder {
               color: rgba(255, 255, 255, 0.8);
               font-weight: 400;
            }

            .eq-input:focus {
               border-color: rgba(255, 255, 255, 0.5);
               background: rgba(255, 255, 255, 0.15);
            }

            .eq-select-wrapper {
               position: relative;
               width: 100%;
            }

            .eq-select {
               appearance: none;
               padding-right: 40px;
               cursor: pointer;
            }

            .eq-select option {
               color: #000;
            }

            .eq-select-arrow {
               position: absolute;
               right: 16px;
               top: 50%;
               transform: translateY(-50%);
               color: rgba(255, 255, 255, 0.8);
               pointer-events: none;
            }

            .eq-submit {
               width: 100%;
               background: #ffffff;
               border: none;
               border-radius: 12px;
               padding: 16px;
               color: #1D4ED8;
               font-family: inherit;
               font-size: 16px;
               font-weight: 800;
               cursor: pointer;
               display: flex;
               align-items: center;
               justify-content: center;
               gap: 10px;
               margin-top: 24px;
               margin-bottom: 24px;
               transition: all 0.3s ease;
               box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
            }

            .eq-submit:hover {
               transform: translateY(-2px);
               box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
            }

            .eq-submit:active {
               transform: translateY(0);
            }

            .eq-card-trust {
               display: flex;
               align-items: center;
               justify-content: space-between;
               padding-top: 20px;
               border-top: 1px solid rgba(255, 255, 255, 0.15);
            }

            .eq-card-trust-item {
               display: flex;
               align-items: center;
               gap: 6px;
               color: rgba(255, 255, 255, 0.9);
               font-size: 13px;
               font-weight: 500;
            }

            /* Bottom Trust Bar */
            .eq-trust-wrapper {
               max-width: 1280px;
               margin: 80px auto 0;
               padding: 0 40px;
               position: relative;
               z-index: 2;
            }

            .eq-trust-inner {
               background: #ffffff;
               border: 1px solid #F1F5F9;
               border-radius: 24px;
               padding: 24px 40px;
               display: flex;
               align-items: center;
               justify-content: space-between;
               flex-wrap: wrap;
               gap: 24px;
               box-shadow: 0 10px 40px -10px rgba(0,0,0,0.05);
            }

            .eq-trust-item {
               display: flex;
               align-items: center;
               gap: 16px;
               flex: 1;
               min-width: 200px;
            }

            .eq-trust-icon {
               width: 48px;
               height: 48px;
               border-radius: 14px;
               background: #EFF6FF;
               border: 1px solid #DBEAFE;
               display: flex;
               align-items: center;
               justify-content: center;
               color: #2563EB;
               flex-shrink: 0;
            }

            .eq-trust-text h4 {
               color: #0F172A;
               font-size: 14px;
               font-weight: 800;
               margin: 0 0 4px 0;
               line-height: 1.2;
            }

            .eq-trust-text p {
               color: #64748B;
               font-size: 13px;
               margin: 0;
               font-weight: 500;
               line-height: 1.2;
            }

            /* --- Responsive Design --- */
            @media (max-width: 1200px) {
               .eq-image-container {
                  width: 400px;
                  bottom: -60px;
               }
            }

            @media (max-width: 1024px) {
               .eq-container {
                  padding: 0 24px;
               }
               .eq-trust-wrapper {
                  padding: 0 24px;
               }
               .eq-title {
                  font-size: 40px;
               }
               .eq-image-container {
                  width: 360px;
                  bottom: -50px;
               }
               .eq-trust-inner {
                  justify-content: center;
               }
            }

            @media (max-width: 860px) {
               .eq-wrapper {
                  padding: 60px 0;
               }
               .eq-container {
                  flex-direction: column;
                  gap: 40px;
               }
               .eq-left {
                  max-width: 100%;
                  text-align: center;
               }
               .eq-feature {
                  text-align: left;
               }
               .eq-features {
                  max-width: 500px;
                  margin: 0 auto;
               }
               .eq-right {
                  max-width: 100%;
                  justify-content: center;
                  width: 100%;
               }
               .eq-image-container {
                  position: relative;
                  left: auto;
                  bottom: auto;
                  transform: none;
                  width: 100%;
                  max-width: 320px;
                  margin: 0 auto -60px auto;
                  z-index: 5;
               }
               .eq-form-card {
                  max-width: 500px;
                  width: 100%;
                  margin: 0 auto;
               }
               .eq-bg-pattern {
                  display: none;
               }
            }

            @media (max-width: 650px) {
               .eq-title {
                  font-size: 34px;
               }
               .eq-trust-inner {
                  padding: 24px;
                  gap: 20px;
               }
               .eq-trust-item {
                  width: 100%;
               }
               .eq-image-container {
                  max-width: 260px;
                  margin: 0 auto -40px auto;
               }
            }
            \` }} />

         {/* Subtle Background Elements */}
         <div className="eq-bg-pattern"></div>

         <div className="eq-container">
            {/* Left Content */}
            <div className="eq-left">
               <div className="eq-tag">
                  <svg width="14" height="14" viewBox="0 0 24 24">
                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  100% Free Career Guidance
               </div>

               <h2 className="eq-title">
                  Stop Guessing Your <br />
                  Career Path. <br />
                  Get <span>Clarity</span> Today.
               </h2>

               <p className="eq-desc">
                  Connect with our expert advisors to map out a personalized educational journey that aligns perfectly with your goals.
               </p>

               <div className="eq-features">
                  {features.map((f, i) => (
                     <div className="eq-feature" key={i}>
                        <div className="eq-feature-icon">
                           {f.icon}
                        </div>
                        <span className="eq-feature-text">{f.label}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Middle Image Content */}
            <div className="eq-image-container">
               <img src="https://i.ibb.co/Zz3XNSQt/projects-XBJZo-W-N.png" alt="Career Advisor" />
            </div>

            {/* Right Form Content */}
            <div className="eq-right">
               <div className="eq-form-card">
                  <div className="eq-form-top-icon">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                     </svg>
                  </div>
                  
                  <div className="eq-form-header">
                     <h3 className="eq-form-title">Book Your<br />Consultation</h3>
                     <div className="eq-form-subtitle">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                           <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                        Limited slots per day. Hurry!
                     </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                     <div className="eq-form-group">
                        <div className="eq-input-icon">
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                           </svg>
                        </div>
                        <input
                           type="text"
                           placeholder="Your Full Name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           className="eq-input"
                           required
                        />
                     </div>
                     <div className="eq-form-group">
                        <div className="eq-input-icon">
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.9 2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6.09 6.09l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                           </svg>
                        </div>
                        <input
                           type="tel"
                           placeholder="Mobile Number"
                           value={mobile}
                           onChange={(e) => setMobile(e.target.value)}
                           maxLength={10}
                           className="eq-input"
                           required
                        />
                     </div>
                     <div className="eq-form-group eq-select-wrapper">
                        <div className="eq-input-icon">
                           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                              <path d="M6 12v5c3 3 9 3 12 0v-5" />
                           </svg>
                        </div>
                        <select
                           value={interest}
                           onChange={(e) => setInterest(e.target.value)}
                           required
                           className="eq-input eq-select"
                           style={{ color: interest ? '#ffffff' : 'rgba(255,255,255,0.8)' }}
                        >
                           <option value="" disabled>Select Your Interest</option>
                           {interests.map((it) => (
                              <option key={it} value={it} style={{ color: '#000' }}>
                                 {it}
                              </option>
                           ))}
                        </select>
                        <svg
                           className="eq-select-arrow"
                           width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        >
                           <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                     </div>

                     <button type="submit" disabled={loading} className="eq-submit">
                        {loading ? "Booking..." : "Book Free Slot Now"}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <line x1="5" y1="12" x2="19" y2="12"></line>
                           <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                     </button>
                  </form>
                  
                  <div className="eq-card-trust">
                     <div className="eq-card-trust-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                           <path d="M9 12l2 2 4-4" />
                        </svg>
                        100% Free
                     </div>
                     <div className="eq-card-trust-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                           <path d="M9 12l2 2 4-4" />
                        </svg>
                        No Spam
                     </div>
                     <div className="eq-card-trust-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                           <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        Secure
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Trust Bar */}
         <div className="eq-trust-wrapper">
            <div className="eq-trust-inner">
               {trustBadges.map((b, i) => (
                  <div key={i} className="eq-trust-item">
                     <div className="eq-trust-icon">
                        {b.icon}
                     </div>
                     <div className="eq-trust-text">
                        <h4>{b.label}</h4>
                        <p>{b.sub}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
`;

const newContent = content.substring(0, startIndex) + newReturnBlock + '\n\n' + 'export default UniversityPageNew;';
fs.writeFileSync(file, newContent);
console.log('Successfully updated component!');
