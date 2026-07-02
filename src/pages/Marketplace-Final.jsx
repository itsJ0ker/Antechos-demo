import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function FadeUp({
  children, delay = 0, duration = 0.7, y = 24,
  className, style, as = 'div', once = true,
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

const MarketplaceFinal = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const headingText = "WE BUILD END-TO-END AI AUTOMATION SYSTEMS.";
  const words = headingText.split(' ');

  return (
    <>
      <style>
        {`
          @import url('https://db.onlinewebfonts.com/c/e66905e07608167a84e6ad52f638c3c6?family=Helvetica+Now+Var');
          
          .marketplace-final-container * {
            font-family: 'Helvetica Now Var', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          }

          .marketplace-section {
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100vh;
            padding: 70px 32px 32px 32px;
          }

          .marketplace-heading {
            display: flex;
            flex-wrap: wrap;
            gap: 0.25em;
            font-size: clamp(26px, 3vw, 42px);
            font-weight: 700;
            line-height: 1.08;
            letter-spacing: -0.01em;
            text-transform: uppercase;
            color: #fff;
            margin: 0;
          }

          @media (max-width: 900px) {
            .marketplace-section {
              padding: 90px 18px 32px 18px;
            }
          }

          @keyframes bounce-y {
            0%, 100% { transform: translateY(-5px); }
            50% { transform: translateY(5px); }
          }
          .animate-bounce-y {
            animation: bounce-y 3s ease-in-out infinite;
          }
        `}
      </style>
      <div className="marketplace-final-container">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_135830_bb6491d1-9b66-4aec-9722-13b4dfe3fb46.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
            zIndex: 0
          }}
        />
        <section className="marketplace-section">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '720px' }}>
            <h2 className="marketplace-heading">
              {words.map((word, i) => (
                <FadeUp
                  key={i}
                  as="span"
                  delay={0.15 + i * 0.08}
                  y={32}
                >
                  {word}
                </FadeUp>
              ))}
            </h2>
            <FadeUp
              as="p"
              delay={0.9}
              style={{
                marginTop: '24px',
                fontSize: '14px',
                lineHeight: '1.65',
                color: 'rgba(255,255,255,0.85)',
                maxWidth: '260px'
              }}
            >
              We provide all-in-one AI automation services in one place.
            </FadeUp>
          </div>
        </section>

        {/* New Grid Section */}
        <section className="relative z-10 w-full py-24 bg-[#fafafa]" style={{ backgroundImage: 'linear-gradient(#ebebeb 1px, transparent 1px), linear-gradient(90deg, #ebebeb 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
          <div className="flex flex-col items-center mb-18">
            <div className="relative w-full lg:max-w-5xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div style={{ opacity: 1, transform: 'none' }}>
                    <div className="rounded-3xl overflow-hidden aspect-[5/6] lg:aspect-[2/1] relative shadow-xl">
                      <img alt="Event 1" loading="lazy" decoding="async" className="object-cover absolute inset-0 w-full h-full text-transparent" src="/event.webp" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2000&auto=format&fit=crop'; }} />
                    </div>
                  </div>
                  <div style={{ opacity: 1, transform: 'none' }}>
                    <div className="rounded-3xl overflow-hidden aspect-[5/6] lg:aspect-[2/1] bg-gradient-to-br from-[#2E2866] to-[#3F3795] flex items-center justify-center p-6 text-white relative shadow-xl" style={{ boxShadow: 'inset -40px -40px 80px rgba(199,125,255,0.25), inset 40px 40px 80px rgba(62,58,168,0.25)' }}>
                      <div className="relative z-10 text-center">
                        <p className="font-body text-[10px] lg:text-sm font-bold uppercase tracking-[0.2em] text-white/50 mb-2">Residential</p>
                        <h3 className="font-display font-black text-6xl lg:text-8xl leading-none tracking-tight mb-1">36<span className="text-[#c77dff]">h</span></h3>
                        <p className="font-body text-xs lg:text-base font-semibold uppercase tracking-widest text-white/70">Of Pure Execution</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div style={{ opacity: 1, transform: 'none' }}>
                    <div className="rounded-3xl overflow-hidden aspect-[5/6] lg:aspect-[2/1] bg-gradient-to-br from-[#2E2866] to-[#3F3795] flex items-center justify-center p-6 text-white relative shadow-xl" style={{ boxShadow: 'inset -40px -40px 80px rgba(62,58,168,0.25), inset 40px 40px 80px rgba(199,125,255,0.15)' }}>
                      <div className="relative z-10 text-center">
                        <p className="font-body text-[10px] lg:text-sm font-bold uppercase tracking-[0.2em] text-white/50 mb-2">Attendees</p>
                        <h3 className="font-display font-black text-5xl lg:text-7xl leading-none tracking-tight mb-1">500<span className="text-[#c77dff]">+</span></h3>
                        <p className="font-body text-xs lg:text-base font-semibold uppercase tracking-widest text-white/70">Minds <br /> One Place.</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ opacity: 1, transform: 'none' }}>
                    <div className="rounded-3xl overflow-hidden aspect-[5/6] lg:aspect-[2/1] relative shadow-xl">
                      <img alt="Event 2" loading="lazy" decoding="async" className="object-cover absolute inset-0 w-full h-full text-transparent" src="/event2.webp" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop'; }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <div className="w-24 h-24 bg-[#4C3FA3] rounded-full flex items-center justify-center border-4 border-[#ffffff] shadow-xl shadow-[#4C3FA3]/30 animate-bounce-y pointer-events-auto">
                  <span className="text-white font-display font-bold text-xl text-center leading-none">Est<br />2026</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Speakers Section */}
        <section className="relative z-10 w-full py-24 bg-[#fafafa]" style={{ backgroundImage: 'linear-gradient(#ebebeb 1px, transparent 1px), linear-gradient(90deg, #ebebeb 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
          <div className="max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-1.5 text-xs font-bold tracking-[0.15em] uppercase text-gray-800 mb-6 shadow-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#8c52ff" />
                </svg>
                Event Speakers
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a2e] mb-6 tracking-tight font-display">
                Learn from those who <br className="hidden md:block" />
                actually <span className="text-[#8c52ff]">build.</span>
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-body">
                Our mentors and facilitators are here to guide you through your <strong className="font-semibold text-gray-700">journey</strong> of <strong className="font-semibold text-[#8c52ff]">exploration and execution.</strong>
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {[
                {
                  name: "Dr. Sunita Kaul",
                  title: "Environmental Expert",
                  img: "https://i.ibb.co/99wgwWjv/image.png",
                  url: "https://demo-web-ev.vercel.app/"
                },
                {
                  name: "Mohammed Ajmal C",
                  title: "IIT Madras | Ex-Intel • Founder and CEO, Xandylearning",
                  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
                },
                {
                  name: "Dr. Thomas George K.",
                  title: "President, LEAD Group of Institutions",
                  img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
                },
                {
                  name: "Rizwan Ramzan Ahamed",
                  title: "Cofounder & CEO, HACA",
                  img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop"
                }
              ].map((speaker, idx) => (
                <div key={idx} onClick={() => speaker.url && setSelectedSpeaker(speaker)} className="flex flex-col items-center group cursor-pointer w-full">
                  {/* Stacked Card Wrapper */}
                  <div className="relative aspect-[4/5] w-full max-w-[280px] mb-6 mx-auto perspective-1000">

                    {/* Deep Stack Layers (Acrylic style) */}
                    <div className="absolute inset-0 bg-[#f1f5f9] rounded-3xl translate-y-4 -translate-x-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,1)] border border-slate-200 transition-transform duration-500 group-hover:-translate-x-5 group-hover:translate-y-5"></div>
                    <div className="absolute inset-0 bg-[#f5f3ff] rounded-3xl translate-y-2 -translate-x-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,1)] border border-violet-200 z-10 transition-transform duration-500 group-hover:-translate-x-3 group-hover:translate-y-3"></div>

                    {/* Main Card */}
                    <div className="absolute inset-0 rounded-3xl shadow-xl overflow-hidden border border-white/60 z-20 transition-all duration-500 group-hover:shadow-purple-500/20 group-hover:-translate-y-1 bg-white">

                      {/* Image (Desaturated default, full color on hover) */}
                      <img src={speaker.img} alt={speaker.name} className="absolute inset-0 w-full h-full object-cover object-center grayscale-[0.4] contrast-[1.1] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0" />

                      {/* Rich Gradient Overlay (Bottom dark for legibility, top slightly tinted) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c29] via-[#302b63]/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-75 pointer-events-none"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 mix-blend-overlay pointer-events-none"></div>

                      {/* Universal / Non-Branded UI Elements */}
                      <div className="absolute inset-0 p-5 flex flex-col justify-between z-30 pointer-events-none">
                        {/* Top Row: Generic Badge */}
                        <div className="flex justify-end w-full">
                          <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-sm flex items-center gap-2 transform transition-transform duration-500 group-hover:-translate-y-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#c77dff] animate-pulse"></div>
                            <span className="text-white/90 text-[9px] font-bold tracking-[0.2em] uppercase">Featured</span>
                          </div>
                        </div>

                        {/* Bottom Row: Decor & Interaction */}
                        <div className="mt-auto flex justify-between items-end w-full">
                          {/* Decorative accent */}
                          <div className="flex gap-1.5 opacity-50 mb-1">
                            <div className="w-1 h-1 rounded-full bg-white"></div>
                            <div className="w-1 h-1 rounded-full bg-white"></div>
                            <div className="w-1 h-1 rounded-full bg-white/40"></div>
                          </div>

                          {/* Hover action icon (Arrow) */}
                          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transform transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 translate-x-2 shadow-lg">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Glare effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-40"></div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="text-center px-4 mt-2">
                    <h4 className="font-bold text-xl text-gray-900 mb-1.5 group-hover:text-[#8c52ff] transition-colors duration-300">{speaker.name}</h4>
                    <p className="text-[11px] leading-relaxed font-bold text-gray-500 uppercase tracking-[0.15em]">{speaker.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Iframe Modal */}
        {selectedSpeaker && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedSpeaker(null)}></div>
            
            {/* Modal Content */}
            <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col transform transition-all animate-in fade-in zoom-in duration-300">
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white z-20 shadow-sm">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{selectedSpeaker.name}</h3>
                  <p className="text-xs text-[#8c52ff] font-bold uppercase tracking-wider">{selectedSpeaker.title}</p>
                </div>
                <button 
                  onClick={() => setSelectedSpeaker(null)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
              
              {/* Iframe Container */}
              <div className="flex-1 w-full bg-gray-50 relative">
                {/* Loading spinner for iframe */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-gray-400 gap-3">
                   <div className="animate-spin w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full"></div>
                   <span className="text-sm font-semibold tracking-wider uppercase">Loading Portfolio</span>
                </div>
                <iframe 
                  src={selectedSpeaker.url} 
                  className="absolute inset-0 w-full h-full border-none z-10"
                  title={`${selectedSpeaker.name} Portfolio`}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MarketplaceFinal;
