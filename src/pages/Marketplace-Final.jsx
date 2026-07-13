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

          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
      <div className="marketplace-final-container relative w-full overflow-hidden">
        {/* Background Video setup */}
        <div className="absolute inset-0 w-full h-[100vh] z-0">
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260514_135830_bb6491d1-9b66-4aec-9722-13b4dfe3fb46.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          {/* Gradient overlay for better text contrast and seamless blend to next section */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#fafafa]"></div>
        </div>

        <section className="relative z-10 flex flex-col justify-center items-center min-h-[100vh] px-6 text-center pb-20">
          <div className="flex flex-col items-center max-w-5xl mx-auto pt-10">
            {/* Premium Badge */}


            {/* Main Centered Heading */}
            <h2 className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-2 text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black leading-[1.05] tracking-tighter text-white mb-8 uppercase drop-shadow-2xl font-display">
              {words.map((word, i) => (
                <FadeUp
                  key={i}
                  as="span"
                  delay={0.2 + i * 0.1}
                  y={40}
                  className={(word === "AUTOMATION" || word === "SYSTEMS.") ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#c77dff]" : ""}
                >
                  {word}
                </FadeUp>
              ))}
            </h2>

            {/* Sophisticated Subtitle */}
            <FadeUp delay={0.9} className="mt-4 mb-12">
              <p className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto font-body font-medium leading-relaxed">
                We design and deploy <strong className="text-white font-semibold">all-in-one intelligent systems</strong> that fundamentally transform the way your business scales and operates.
              </p>
            </FadeUp>

            {/* Call to Action Buttons */}
            <FadeUp delay={1.1}>
              <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
                <button className="px-10 py-5 rounded-full bg-white text-black font-extrabold text-lg tracking-wide hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  Start Building
                </button>
                <button className="px-10 py-5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white font-bold text-lg tracking-wide hover:bg-white/10 transition-colors duration-300 flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  Watch Showcase
                </button>
              </div>
            </FadeUp>
          </div>

          {/* Minimalist Scroll Indicator */}
          <FadeUp delay={1.5} className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center gap-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
              <span className="text-[10px] text-white font-bold uppercase tracking-[0.25em]">Scroll to Explore</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent animate-bounce"></div>
            </div>
          </FadeUp>
        </section>

        {/* New Grid Section */}
        <section className="relative z-10 w-full py-24 bg-[#fafafa]" style={{ backgroundImage: 'linear-gradient(#ebebeb 1px, transparent 1px), linear-gradient(90deg, #ebebeb 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
          <div className="flex flex-col items-center mb-18">
            <div className="relative w-full lg:max-w-5xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div style={{ opacity: 1, transform: 'none' }}>
                    <div className="rounded-3xl overflow-hidden aspect-[5/6] lg:aspect-[2/1] relative shadow-xl flex items-center justify-center text-white text-center group">
                      <img alt="Event 1" loading="lazy" decoding="async" className="object-cover absolute inset-0 w-full h-full text-transparent transition-transform duration-700 group-hover:scale-105" src="/event.webp" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2000&auto=format&fit=crop'; }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80 transition-opacity duration-500"></div>
                      <div className="relative z-10 flex flex-col items-center justify-center p-6 w-full h-full">
                        <p className="font-body text-[10px] lg:text-sm font-bold uppercase tracking-[0.3em] text-[#c77dff] mb-3">Enterprise</p>
                        <h3 className="font-display font-black text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tighter drop-shadow-2xl">
                          Recruitment <span className="text-white/90 block mt-1">Solutions</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div style={{ opacity: 1, transform: 'none' }}>
                    <div className="rounded-3xl overflow-hidden aspect-[5/6] lg:aspect-[2/1] bg-gradient-to-br from-[#2E2866] to-[#3F3795] flex items-center justify-center p-6 text-white relative shadow-xl" style={{ boxShadow: 'inset -40px -40px 80px rgba(199,125,255,0.25), inset 40px 40px 80px rgba(62,58,168,0.25)' }}>
                      <div className="relative z-10 text-center flex flex-col items-center justify-center w-full h-full">
                        <p className="font-body text-[10px] lg:text-sm font-bold uppercase tracking-[0.3em] text-white/50 mb-3">Academic</p>
                        <h3 className="font-display font-black text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tighter drop-shadow-2xl">
                          University <span className="text-[#c77dff] block mt-1">Affiliated</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div style={{ opacity: 1, transform: 'none' }}>
                    <div className="rounded-3xl overflow-hidden aspect-[5/6] lg:aspect-[2/1] bg-gradient-to-br from-[#2E2866] to-[#3F3795] flex items-center justify-center p-6 text-white relative shadow-xl" style={{ boxShadow: 'inset -40px -40px 80px rgba(62,58,168,0.25), inset 40px 40px 80px rgba(199,125,255,0.15)' }}>
                      <div className="relative z-10 text-center flex flex-col items-center justify-center w-full h-full">
                        <p className="font-body text-[10px] lg:text-sm font-bold uppercase tracking-[0.3em] text-white/50 mb-3">Corporate</p>
                        <h3 className="font-display font-black text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tighter drop-shadow-2xl">
                          Training <span className="text-[#c77dff] block mt-1">Solutions</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div style={{ opacity: 1, transform: 'none' }}>
                    <div className="rounded-3xl overflow-hidden aspect-[5/6] lg:aspect-[2/1] relative shadow-xl flex items-center justify-center text-white text-center group">
                      <img alt="Event 2" loading="lazy" decoding="async" className="object-cover absolute inset-0 w-full h-full text-transparent transition-transform duration-700 group-hover:scale-105" src="/event2.webp" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop'; }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80 transition-opacity duration-500"></div>
                      <div className="relative z-10 flex flex-col items-center justify-center p-6 w-full h-full">
                        <p className="font-body text-[10px] lg:text-sm font-bold uppercase tracking-[0.3em] text-[#c77dff] mb-3">Digital</p>
                        <h3 className="font-display font-black text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tighter drop-shadow-2xl">
                          E-learning <span className="text-white/90 block mt-1">Solutions</span>
                        </h3>
                      </div>
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
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-16 max-w-5xl mx-auto px-4">
              {[
                {
                  name: "Dr. Sunita Kaul",
                  title: "Environmental Expert",
                  img: "/sunitakaul.jpg",
                  url: "https://demo-web-ev.vercel.app/"
                },
                {
                  name: "Vishwajeet Shinde",
                  title: "Founder & CEO of Antechos-India",
                  img: "/vishwajeet.jpg",
                  url: "https://vishwajeet.antechosindia.com/"
                }
              ].map((speaker, idx) => (
                <div key={idx} onClick={() => speaker.url && setSelectedSpeaker(speaker)} className="flex flex-col items-center group cursor-pointer w-full max-w-[320px]">
                  {/* Stacked Card Wrapper with custom aspect ratio for 2:3 images */}
                  <div className="relative w-full aspect-[2/3] mb-6 mx-auto perspective-1000">

                    {/* Premium Ambient Glow Background (Fades in/scales on hover) */}
                    <div className="absolute -inset-3 bg-gradient-to-tr from-violet-600 via-indigo-500 to-fuchsia-500 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700 scale-95 group-hover:scale-105 pointer-events-none"></div>

                    {/* Stacked Effect layers behind the card (Stack of identical cards) */}
                    <div className="absolute inset-0 rounded-[2rem] translate-y-6 -translate-x-6 border border-slate-200 overflow-hidden transition-transform duration-500 group-hover:-translate-x-8 group-hover:translate-y-8 shadow-xl">
                      <img src={speaker.img} alt="" className="absolute inset-0 w-full h-full object-cover blur-md scale-105" />
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                    <div className="absolute inset-0 rounded-[2rem] translate-y-3 -translate-x-3 border border-slate-200 z-10 overflow-hidden transition-transform duration-500 group-hover:-translate-x-4 group-hover:translate-y-4 shadow-xl">
                      <img src={speaker.img} alt="" className="absolute inset-0 w-full h-full object-cover blur-sm scale-[1.02]" />
                      <div className="absolute inset-0 bg-black/10"></div>
                    </div>

                    {/* Main Image Card Container */}
                    <div className="absolute inset-0 rounded-[2rem] shadow-xl overflow-hidden border border-white z-20 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/10 group-hover:-translate-y-1.5 bg-white flex items-center justify-center">

                      {/* The edit image card itself (full color, clean, no overlays) */}
                      <img 
                        src={speaker.img} 
                        alt={speaker.name} 
                        className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-[1.02]" 
                      />

                      {/* Glare sweep effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-30"></div>
                      
                      {/* Premium border wrapper */}
                      <div className="absolute inset-0 border-2 border-white/40 rounded-[2rem] pointer-events-none z-40"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Experience Bento Section */}
        <section className="py-24 relative bg-white border-y border-gray-200/60">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 rounded-full px-5 py-1.5 text-xs font-bold tracking-[0.15em] uppercase text-[#8c52ff] mb-6">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" /></svg>
                  The Experience
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] tracking-tight font-display max-w-2xl">
                  Not just another conference. <br />
                  <span className="text-[#8c52ff]">An execution hub.</span>
                </h2>
              </div>
              <p className="text-gray-500 max-w-md text-lg pb-2">
                We've designed every hour to maximize your learning, networking, and actual building time.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
              {/* Box 1: Masterclasses */}
              <div className="md:col-span-2 relative rounded-[32px] overflow-hidden bg-[#1a1a2e] group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8c52ff]/40 to-transparent mix-blend-overlay"></div>
                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="Masterclass" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                  <h3 className="text-3xl font-bold text-white mb-3">Live Masterclasses</h3>
                  <p className="text-gray-300 max-w-md text-lg">Watch elite founders break down their growth strategies, completely unfiltered.</p>
                </div>
              </div>

              {/* Box 2: Networking */}
              <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 border border-gray-100 p-8 md:p-10 flex flex-col group cursor-pointer">
                <div className="flex-1 flex items-center justify-center relative">
                  {/* Floating Avatars */}
                  <div className="relative w-32 h-32">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" className="absolute top-0 right-0 w-12 h-12 rounded-full border-2 border-white shadow-lg z-20 group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform duration-500" alt="Network" />
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" className="absolute bottom-0 left-4 w-14 h-14 rounded-full border-2 border-white shadow-lg z-30 group-hover:translate-y-2 group-hover:-translate-x-2 transition-transform duration-500" alt="Network" />
                    <div className="absolute top-8 left-0 w-10 h-10 rounded-full border-2 border-white shadow-lg bg-[#8c52ff] flex items-center justify-center text-white text-xs font-bold z-10 animate-bounce-y">+50</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1a1a2e] mb-2">Curated Connections</h3>
                  <p className="text-gray-500">Meet your next co-founder or early investor.</p>
                </div>
              </div>

              {/* Box 3: Execution */}
              <div className="relative rounded-[32px] overflow-hidden bg-[#fafafa] border border-gray-200 p-8 md:p-10 flex flex-col justify-between group cursor-pointer hover:border-[#8c52ff]/30 transition-colors duration-300">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-gray-100 group-hover:bg-[#8c52ff] group-hover:text-white transition-colors duration-300 text-[#8c52ff]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1a1a2e] mb-2">Buildathon</h3>
                  <p className="text-gray-500">Stop listening and start deploying real products.</p>
                </div>
              </div>

              {/* Box 4: Funding */}
              <div className="md:col-span-2 relative rounded-[32px] overflow-hidden bg-gradient-to-r from-blue-600 to-[#8c52ff] p-8 md:p-10 flex items-center group cursor-pointer">
                {/* Decorative background shapes */}
                <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

                <div className="relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="max-w-sm">
                    <h3 className="text-3xl font-bold text-white mb-3">Pitch Your Vision</h3>
                    <p className="text-white/80 text-lg">Select teams will get the chance to pitch directly to a panel of top-tier VC firms.</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 group-hover:scale-105 transition-transform duration-500">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                        <span className="text-[#8c52ff] font-black text-xl">$</span>
                      </div>
                      <div>
                        <p className="text-white/80 text-sm font-bold uppercase tracking-wider">Total Funding Pool</p>
                        <p className="text-white font-black text-3xl">₹1Cr+</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Testimonials Section */}
        <section className="py-24 relative overflow-hidden bg-[#fafafa]">
          {/* Subtle Background Elements */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#8c52ff]/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-1.5 text-xs font-bold tracking-[0.15em] uppercase text-gray-800 mb-6 shadow-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#8c52ff" /></svg>
                Real Impact
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#1a1a2e] mb-6 tracking-tight font-display">
                What the <span className="text-[#8c52ff]">community</span> says
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Sarah Jenkins", role: "Product Manager", text: "The hands-on approach completely transformed how I think about building products. Absolute game changer." },
                { name: "Rahul Sharma", role: "Software Engineer", text: "I've attended dozens of bootcamps, but nothing comes close to the caliber of mentors here. Highly recommended." },
                { name: "Elena Rodriguez", role: "Startup Founder", text: "The network you build here is invaluable. I found my co-founder and secured our first round of funding through connections made here." }
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-white/60 backdrop-blur-xl border border-gray-200/60 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" className="group-hover:scale-110 transition-transform"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    ))}
                  </div>
                  <p className="text-gray-700 text-lg font-medium leading-relaxed mb-8">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8c52ff] to-blue-500 p-[2px]">
                      <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-bold text-[#8c52ff] text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Application CTA */}
        <section className="py-24 relative overflow-hidden bg-[#1a1a2e]">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8c52ff]/20 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight font-display">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#8c52ff]">build?</span>
            </h2>
            <p className="text-gray-300 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Applications are currently open for the next cohort. Seats are strictly limited to ensure quality mentorship.
            </p>

            <form className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex flex-col sm:flex-row gap-2 shadow-2xl shadow-[#8c52ff]/20 focus-within:border-white/20 transition-colors duration-300">
              <input
                type="email"
                placeholder="Enter your work email..."
                className="flex-1 bg-transparent border-none text-white px-6 py-4 focus:outline-none placeholder-gray-500 text-lg"
              />
              <button
                type="button"
                className="bg-gradient-to-r from-[#8c52ff] to-blue-600 hover:opacity-90 text-white font-bold px-8 py-4 rounded-xl transition-opacity duration-300 whitespace-nowrap text-lg shadow-lg"
              >
                Apply Now
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 mt-8 text-gray-400 text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Takes 2 minutes. No upfront payment required.
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
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
