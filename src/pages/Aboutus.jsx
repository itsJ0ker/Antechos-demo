import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Linkedin, Mail, Target, Eye, Heart, Award, Users, Rocket, Sparkles, TrendingUp, Globe, Zap, Star, CheckCircle, Play, ChevronRight, ArrowRight } from 'lucide-react';
import { LaserFlow } from '../components/effects/LaserFlow';
import { ParticleFieldEffect } from '../components/effects/ParticleFieldEffect';
import { ChromaGrid } from '../components/ChromaGrid/ChromaGrid';
import ProfileCard from '../components/ProfileCard/ProfileCard';
import Testimonials from '../components/Testimonials';
import { RippleEffect } from '../components/effects/RippleEffect';

/* ─── Inline CSS ─────────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

  :root {
    --orange: #38BDF8;
    --orange-light: #7DD3FC;
    --dark: #0A0C0F;
    --dark-2: #0F1318;
    --dark-3: #161C24;
    --card-bg: #131820;
    --border: rgba(56,189,248,0.1);
    --text-muted: #888;
    --text-secondary: #BBBBBB;
  }

  .about-page * { box-sizing: border-box; }
  .about-page { font-family: 'DM Sans', sans-serif; background: var(--dark); color: #fff; }
  .about-page h1, .about-page h2, .about-page h3, .about-page h4 { font-family: 'Sora', sans-serif; }

  /* ── Marquee ── */
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .marquee-track { display: flex; width: max-content; animation: marquee 20s linear infinite; }
  .marquee-track:hover { animation-play-state: paused; }

  /* ── Pulse dot ── */
  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 1; }
    100% { transform: scale(1.8); opacity: 0; }
  }
  .pulse-dot::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: var(--orange);
    animation: pulse-ring 1.5s ease-out infinite;
  }

  /* ── Timeline ── */
  .timeline-line { background: linear-gradient(to bottom, var(--orange), transparent); }

  /* ── Card hover ── */
  .diff-card { transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s; }
  .diff-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(56,189,248,0.15); border-color: var(--orange) !important; }

  /* ── Value card ── */
  .value-card { transition: transform 0.3s, box-shadow 0.3s; }
  .value-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(56,189,248,0.12); }

  /* ── Video thumb ── */
  .video-thumb { transition: transform 0.4s; }
  .video-thumb:hover { transform: scale(1.03); }

  /* ── Stat card ── */
  .stat-card { transition: transform 0.3s; }
  .stat-card:hover { transform: translateY(-4px); }

  /* ── Fade-up ── */
  @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
  .fade-up { animation: fadeUp 0.7s ease forwards; }

  /* ── Form ── */
  .form-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 16px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s;
  }
  .form-input:focus { border-color: var(--orange); }
  .form-input::placeholder { color: var(--text-muted); }
  .form-select { appearance: none; cursor: pointer; }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--dark); }
  ::-webkit-scrollbar-thumb { background: var(--orange); border-radius: 2px; }
`;

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
const Divider = () => (
  <div style={{ width: 48, height: 3, background: 'var(--orange)', borderRadius: 2, margin: '16px 0 24px' }} />
);

const SectionLabel = ({ children }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '6px 16px', background: 'rgba(56,189,248,0.12)',
    border: '1px solid rgba(56,189,248,0.3)', borderRadius: 100,
    fontSize: 13, fontWeight: 600, color: 'var(--orange)',
    letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16
  }}>{children}</div>
);

/* ─── Marquee companies ──────────────────────────────────────────────────── */
const companies = ['Google', 'Microsoft', 'Amazon', 'Accenture', 'Infosys', 'TCS', 'Wipro', 'IBM'];

const MarqueeBand = ({ label = 'Trusted by' }) => (
  <div style={{ overflow: 'hidden', padding: '8px 0' }}>
    {label && <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, marginBottom: 16, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</p>}
    <div className="marquee-track">
      {[...companies, ...companies].map((c, i) => (
        <span key={i} style={{
          padding: '10px 32px', margin: '0 8px', background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border)', borderRadius: 8,
          fontSize: 15, fontWeight: 600, color: 'var(--text-secondary)',
          whiteSpace: 'nowrap', display: 'inline-block'
        }}>{c}</span>
      ))}
    </div>
  </div>
);

/* ─── Main Component ─────────────────────────────────────────────────────── */
const Aboutus = () => {
  const [team, setTeam] = useState([]);
  const [values, setValues] = useState([]);
  const [stats, setStats] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', designation: '', experience: '', company: '', program: ''
  });
  const [formStatus, setFormStatus] = useState('idle');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [teamRes, valuesRes, statsRes, testimonialsRes] = await Promise.all([
        supabase.from('about_team').select('*').eq('is_active', true).order('display_order'),
        supabase.from('about_values').select('*').order('display_order'),
        supabase.from('about_stats').select('*').order('display_order'),
        supabase.from('testimonials').select('*').eq('is_active', true).order('display_order').limit(6),
      ]);
      setTeam(teamRes.data || []);
      setValues(valuesRes.data || []);
      setStats(statsRes.data || []);
      setTestimonials(testimonialsRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* Default data if DB is empty */
  const defaultStats = [
    { id: 1, value: '18k', suffix: '+', label: 'Cross-trained' },
    { id: 2, value: '95', suffix: '%', label: 'Placement Rate' },
    { id: 3, value: '400', suffix: '+', label: 'Corporate Tie-ups' },
    { id: 4, value: '4.8', suffix: '/5', label: 'Avg Rating' },
  ];

  const defaultValues = [
    {
      id: 1, title: 'Entrepreneurship', icon: '🚀',
      description: 'We embrace innovation and move with agility to identify opportunities, turning ideas into meaningful outcomes that create real-world impact, drive progress, and help us adapt quickly in an ever-changing environment.'
    },
    {
      id: 2, title: 'Teamwork', icon: '🤝',
      description: 'We collaborate openly, combining diverse perspectives to solve problems more effectively, strengthen decision-making, and work together toward shared goals that benefit both individuals and the team.'
    },
    {
      id: 3, title: 'Data-Driven', icon: '📊',
      description: 'We use evidence-based insights to guide decisions, measure real impact, identify patterns, and continuously improve outcomes through structured analysis, experimentation, and informed action.'
    },
    {
      id: 4, title: 'Transparency', icon: '🔍',
      description: 'We build trust through open communication, shared knowledge, and clear accountability, ensuring expectations remain aligned and decisions are understood at every stage of the journey.'
    },
  ];

  const defaultTeam = [
    {
      id: 1, name: 'Vishwajeet Shinde', position: 'Co-Founder',
      image_url: 'https://cdn.prod.website-files.com/68ac13020232ad81bfa07e7c/698b03c1f423fd677b439b27_Frame%201000008678.png',
      linkedin_url: 'https://www.linkedin.com/in/rroshansharma'
    },
    {
      id: 2, name: 'Maryam Siddiqui', position: 'Co-Founder',
      image_url: 'https://cdn.prod.website-files.com/68ac13020232ad81bfa07e7c/698b03c4f5a8b61a81e99c5d_Frame%201000008677.png',
      linkedin_url: 'https://www.linkedin.com/in/maryam-siddiqui-antechos-india'
    },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;
  const displayValues = values.length > 0 ? values : defaultValues;
  const displayTeam = team.length > 0 ? team : defaultTeam;

  const differentiators = [
    { icon: '🎯', title: 'Job-Driven Programs', desc: 'Built around what companies actually hire for.' },
    { icon: '👨‍🏫', title: 'Mentorship That Matters', desc: 'Guidance from seasoned industry professionals.' },
    { icon: '🛠️', title: 'Learn by Doing', desc: 'Projects, case studies, and simulations instead of theory alone.' },
    { icon: '🏆', title: 'End-to-End Career Support', desc: 'From resume building to mock interviews to final placement.' },
  ];

  const videoTestimonials = [
    { thumb: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600', name: 'Alumni Story 1' },
    { thumb: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=600', name: 'Alumni Story 2' },
    { thumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600', name: 'Alumni Story 3' },
    { thumb: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600', name: 'Alumni Story 4' },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('success');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0A0A' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, border: '3px solid rgba(56,189,248,0.2)', borderTopColor: 'var(--orange)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); }}`}</style>
          <p style={{ color: '#888', fontFamily: 'DM Sans, sans-serif' }}>Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="about-page">

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <section style={{
          minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, #0A0A0A 0%, #111111 60%, #150E08 100%)',
          position: 'relative', overflow: 'hidden', padding: '120px 24px 80px'
        }}>
          {/* decorative blobs */}
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-15%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
          {/* grid lines */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', maxWidth: 900, textAlign: 'center', zIndex: 1 }}>
            <SectionLabel>Transforming Education Since 2025</SectionLabel>

            <h1 style={{
              fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 800, lineHeight: 1.1,
              margin: '20px 0 24px', letterSpacing: '-0.03em'
            }}>
              Creating Careers,{' '}
              <span style={{ color: 'var(--orange)' }}>Not Just Courses.</span>
            </h1>

            <p style={{ fontSize: 'clamp(16px, 2.5vw, 22px)', color: 'var(--text-secondary)', maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.7 }}>
              Delivering industry-relevant programs designed for career transformation.
            </p>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#story" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', background: 'var(--orange)', borderRadius: 100,
                fontWeight: 700, fontSize: 16, color: '#fff', textDecoration: 'none',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 8px 32px rgba(56,189,248,0.35)'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(56,189,248,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(56,189,248,0.35)'; }}
              >
                Our Story <ArrowRight size={18} />
              </a>
              <a href="#team" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', background: 'transparent',
                border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 100,
                fontWeight: 600, fontSize: 16, color: '#fff', textDecoration: 'none',
                transition: 'border-color 0.2s, background 0.2s'
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.background = 'rgba(56,189,248,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent'; }}
              >
                Join Our Team
              </a>
            </div>

            {/* hero image strip */}
            <div style={{ marginTop: 64, borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)', position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
                alt="Team collaboration"
                style={{ width: '100%', height: 'clamp(200px, 30vw, 380px)', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 60%)' }} />
            </div>
          </div>
        </section>

        {/* ── IMPACT STATS ───────────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: 'var(--dark-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <SectionLabel>Our Impact</SectionLabel>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, margin: '12px 0 12px', letterSpacing: '-0.02em' }}>
                Through dedication and performance, we create opportunities<br style={{ display: 'none' }} />{' '}
                that drive <span style={{ color: 'var(--orange)' }}>real-world success.</span>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
              {displayStats.map((stat, i) => (
                <div key={stat.id} className="stat-card" style={{
                  background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 20,
                  padding: '36px 28px', textAlign: 'center',
                  position: 'relative', overflow: 'hidden'
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--orange), var(--orange-light))' }} />
                  <div style={{ fontSize: 'clamp(40px, 5vw, 60px)', fontWeight: 800, color: 'var(--orange)', fontFamily: 'Sora, sans-serif', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {stat.value}{stat.suffix}
                  </div>
                  <div style={{ marginTop: 10, fontSize: 16, fontWeight: 500, color: 'var(--text-secondary)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHO WE ARE ─────────────────────────────────────────────────── */}
        <section style={{ padding: '100px 24px', background: 'var(--dark)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 80, alignItems: 'start' }}>
            {/* Left */}
            <div>
              <SectionLabel>Who We Are?</SectionLabel>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2, margin: '12px 0 20px' }}>
                Closing the Gap Between{' '}
                <span style={{ color: 'var(--orange)' }}>Education & Employability</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16, marginBottom: 20 }}>
                At <strong style={{ color: '#fff' }}>Antechos India</strong>, we are on a mission to close the gap between education and employability. Traditional learning often ends with a certificate, but we go far beyond that by equipping learners with practical skills, expert mentorship, and meaningful industry exposure.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16, marginBottom: 32 }}>
                Our programs are designed to help individuals transform ambition into achievement by focusing on real-world relevance rather than theoretical knowledge alone. We empower students and working professionals to build confidence, clarity, and capability—because for us, success isn't just about learning; it's about creating meaningful, long-term careers.
              </p>

              {/* Mission box */}
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 28px' }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Rocket size={20} style={{ color: 'var(--orange)' }} /> Our Mission
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 20, lineHeight: 1.7 }}>
                  To empower learners with future-ready skills and real career opportunities. We create programs that are:
                </p>
                {['Practical and hands-on', 'Expert mentorship', 'Designed with industry input', 'Long-term growth'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(56,189,248,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle size={12} style={{ color: 'var(--orange)' }} />
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – image collage */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80" alt="" style={{ width: '100%', borderRadius: 16, aspectRatio: '4/3', objectFit: 'cover' }} />
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" alt="" style={{ width: '100%', borderRadius: 16, aspectRatio: '4/3', objectFit: 'cover', marginTop: 24 }} />
              <div style={{ gridColumn: '1 / -1', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 28px' }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Eye size={18} style={{ color: 'var(--orange)' }} /> Our Vision
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8 }}>
                  A future where skills matter more than degrees, and where every learner, regardless of background, has the tools, guidance, and opportunities to build a career they're proud of — one that grows with them, opens new possibilities, and empowers them to thrive in an ever-changing world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT MAKES US DIFFERENT ────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: 'var(--dark-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <SectionLabel>Why Choose Us</SectionLabel>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '12px 0' }}>
                What Makes Us <span style={{ color: 'var(--orange)' }}>Different</span>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
              {differentiators.map((d, i) => (
                <div key={i} className="diff-card" style={{
                  background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 20, padding: '32px 28px'
                }}>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{d.icon}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{d.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7 }}>{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OUR STORY ──────────────────────────────────────────────────── */}
        <section id="story" style={{ padding: '100px 24px', background: 'var(--dark)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <SectionLabel>Our Story</SectionLabel>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '12px 0 16px' }}>
                What started as a vision to bridge the opportunity gap has grown into a{' '}
                <span style={{ color: 'var(--orange)' }}>movement</span> changing thousands of lives.
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
                  alt="Antechos India story"
                  style={{ width: '100%', borderRadius: 20, objectFit: 'cover', aspectRatio: '4/3', border: '1px solid var(--border)' }}
                />
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
                  Antechos India began with a simple belief: <strong style={{ color: '#fff' }}>Talent is everywhere, but opportunity is not.</strong>
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
                  India has one of the largest youth populations in the world — yet millions of graduates remain unemployable due to lack of direction, mentorship, and practical skills. Our founders saw this gap and set out to create something different: a platform where learning doesn't just stop at knowledge but continues all the way to career success.
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.9, marginBottom: 32 }}>
                  Since then, we've helped thousands of learners break into tech, digital, and business roles — often with life-changing outcomes like 100%+ salary hikes, career switches, and first-job breakthroughs.
                </p>
                <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 14, padding: '20px 24px' }}>
                  <p style={{ fontStyle: 'italic', color: '#fff', fontSize: 16, lineHeight: 1.7 }}>
                    "Because at the heart of it, we don't measure success in certificates. We measure it in careers built, dreams achieved, and lives transformed."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MEET OUR FOUNDERS ──────────────────────────────────────────── */}
        <section id="team" style={{ padding: '100px 24px', background: 'var(--dark-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <SectionLabel>Meet Our Founders</SectionLabel>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '12px 0 16px' }}>
                The Minds Behind <span style={{ color: 'var(--orange)' }}>Innovation</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 17, maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
                Vishwajeet Shinde started Antechos India with one mission: to go beyond traditional learning. Their vision is simple → transform education into real-world impact & create careers instead of just certificates.
              </p>
            </div>

            {/* If team from DB exists, use ChromaGrid; else render default cards */}
            {team.length > 0 ? (
              <div className="mb-16">
                <ChromaGrid
                  items={team.map(member => ({
                    image: member.image_url || 'https://via.placeholder.com/400x600',
                    title: member.name,
                    subtitle: member.position,
                    handle: member.email ? `@${member.email.split('@')[0]}` : '',
                    borderColor: '#38BDF8',
                    gradient: 'linear-gradient(145deg, #38BDF8, #000)',
                    url: member.linkedin_url
                  }))}
                  radius={300}
                  columns={3}
                />
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 380px))', gap: 32, justifyContent: 'center' }}>
                {displayTeam.map(member => (
                  <div key={member.id} style={{
                    background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 24, overflow: 'hidden',
                    transition: 'transform 0.3s, box-shadow 0.3s'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 24px 60px rgba(56,189,248,0.15)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                  >
                    <div style={{ position: 'relative' }}>
                      <img
                        src={member.image_url || 'https://via.placeholder.com/400x500'}
                        alt={member.name}
                        style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block' }}
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'; }}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 50%)' }} />
                    </div>
                    <div style={{ padding: '24px 28px' }}>
                      <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{member.name}</h3>
                      <p style={{ color: 'var(--orange)', fontWeight: 600, fontSize: 15, marginBottom: 16 }}>{member.position}</p>
                      {member.linkedin_url && (
                        <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" style={{
                          display: 'inline-flex', alignItems: 'center', gap: 8,
                          padding: '9px 20px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)',
                          borderRadius: 100, fontSize: 14, fontWeight: 600, color: 'var(--orange)', textDecoration: 'none',
                          transition: 'background 0.2s'
                        }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(56,189,248,0.2)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(56,189,248,0.1)'; }}
                        >
                          <Linkedin size={14} /> LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CORE VALUES ────────────────────────────────────────────────── */}
        <section style={{ padding: '100px 24px', background: 'var(--dark)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <SectionLabel>Core Values</SectionLabel>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '12px 0 16px' }}>
                Our Core <span style={{ color: 'var(--orange)' }}>Values</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 17, maxWidth: 600, margin: '0 auto' }}>
                Driven by purpose and powered by principles, our values inspire us to create meaningful impact every day.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
              {displayValues.map((val, i) => (
                <div key={val.id} className="value-card" style={{
                  background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden'
                }}>
                  <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={[
                        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500',
                        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500',
                        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
                        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500',
                      ][i % 4]}
                      alt={val.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
                    <div style={{ position: 'absolute', top: 16, left: 16, fontSize: 28 }}>{val.icon || '⭐'}</div>
                  </div>
                  <div style={{ padding: '24px 24px' }}>
                    <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{val.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8 }}>{val.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OUR JOURNEY / TIMELINE ─────────────────────────────────────── */}
        <section style={{ padding: '100px 24px', background: 'var(--dark-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <SectionLabel>Know Our Journey</SectionLabel>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '12px 0 16px' }}>
                Since we started in <span style={{ color: 'var(--orange)' }}>2020</span>, we have tried to provide our learners with positive career outcomes.
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>
              {/* Timeline */}
              <div style={{ position: 'relative', paddingLeft: 32 }}>
                {[
                  { year: '2020', title: 'Antechos India Founded', desc: 'Vishwajeet Shinde launch Antechos India with a bold vision to reimagine education.' },
                  { year: '2021', title: 'First 1000 Learners', desc: 'Reached 1,000+ students and launched our first placement-focused programs.' },
                  { year: '2022', title: '100+ Corporate Tie-ups', desc: 'Built a robust hiring network with top companies across India.' },
                  { year: '2023', title: '10,000+ Placements', desc: 'Crossed a major milestone with over 10,000 successful career placements.' },
                  { year: '2024', title: '18k+ Learners', desc: 'Scaling impact with 18,000+ cross-trained professionals and a 95% placement rate.' },
                ].map((milestone, i, arr) => (
                  <div key={i} style={{ position: 'relative', paddingBottom: i < arr.length - 1 ? 40 : 0 }}>
                    {/* line */}
                    {i < arr.length - 1 && (
                      <div style={{ position: 'absolute', left: -24, top: 20, width: 2, height: 'calc(100% - 10px)', background: 'linear-gradient(to bottom, var(--orange), rgba(56,189,248,0.1))' }} />
                    )}
                    {/* dot */}
                    <div style={{ position: 'absolute', left: -30, top: 10, width: 12, height: 12, borderRadius: '50%', background: 'var(--orange)', border: '2px solid var(--dark-2)', zIndex: 1 }} />
                    <span style={{ display: 'inline-block', padding: '3px 12px', background: 'rgba(56,189,248,0.12)', borderRadius: 100, fontSize: 12, fontWeight: 700, color: 'var(--orange)', marginBottom: 6 }}>{milestone.year}</span>
                    <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{milestone.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{milestone.desc}</p>
                  </div>
                ))}
              </div>

              {/* Quote + image */}
              <div>
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
                  alt="Journey"
                  style={{ width: '100%', borderRadius: 20, objectFit: 'cover', aspectRatio: '4/3', marginBottom: 28, border: '1px solid var(--border)' }}
                />
                <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.9, marginBottom: 24 }}>
                  Vishwajeet Shinde started Antechos India with a bold mission: to reimagine education for the real world. They saw a gap: students and professionals were earning certificates but struggling to turn them into careers.
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.9, marginBottom: 24 }}>
                  Their vision is simple yet powerful: <strong style={{ color: '#fff' }}>Empowering Ambitions With Real-world Learning.</strong>
                </p>
                <div style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: 14, padding: '20px 24px' }}>
                  <p style={{ fontWeight: 700, fontSize: 16, lineHeight: 1.7, fontFamily: 'Sora, sans-serif' }}>
                    Together, Vishwajeet Shinde continue to lead Antechos India with one promise: to transform potential into achievement, and learners into leaders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ALUMNI TESTIMONIALS ────────────────────────────────────────── */}
        <section style={{ padding: '100px 24px', background: 'var(--dark)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <SectionLabel>Alumni Stories</SectionLabel>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '12px 0 12px' }}>
                Hear from Antechos India's Alumni at{' '}
                <span style={{ color: 'var(--orange)' }}>Top Companies</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 17, marginBottom: 16 }}>
                No filters. No fake promises. Just real transformations.<br />Antechos India changes lives through skills that matter.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
              {videoTestimonials.map((v, i) => (
                <div key={i} className="video-thumb" style={{
                  position: 'relative', borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
                  aspectRatio: '9/12', background: '#111', border: '1px solid var(--border)'
                }}>
                  <img src={v.thumb} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
                  <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                    width: 52, height: 52, borderRadius: '50%', background: 'rgba(56,189,248,0.9)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 0 8px rgba(56,189,248,0.2)'
                  }}>
                    <Play size={20} fill="#fff" color="#fff" style={{ marginLeft: 3 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Scrolling testimonials */}
            {testimonials.length > 0 && (
              <div style={{ marginTop: 64 }}>
                <Testimonials testimonials={testimonials} title="" />
              </div>
            )}

            {/* Trusted by marquee */}
            <div style={{ marginTop: 64 }}>
              <MarqueeBand label="Trusted by" />
            </div>
          </div>
        </section>

        {/* ── CTA + LEAD FORM ────────────────────────────────────────────── */}
        <section style={{ padding: '100px 24px', background: 'linear-gradient(135deg, #0A0A0A 0%, #150E08 100%)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--orange), var(--orange-light), var(--orange))' }} />
          <div style={{ position: 'absolute', top: '10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'start' }}>
            {/* Left CTA */}
            <div>
              <SectionLabel>Join Our Mission</SectionLabel>
              <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, margin: '16px 0 20px' }}>
                We don't just teach skills — we help you{' '}
                <span style={{ color: 'var(--orange)' }}>build your future</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 17, lineHeight: 1.8, marginBottom: 36 }}>
                Ready to transform your career? Join 18,000+ learners who've already made the move.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <a href="#programs" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '14px 28px', background: 'var(--orange)', borderRadius: 100,
                  fontWeight: 700, fontSize: 16, color: '#fff', textDecoration: 'none',
                  boxShadow: '0 8px 32px rgba(56,189,248,0.35)'
                }}>Explore Programs <ArrowRight size={16} /></a>
                <a href="#contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '14px 28px', background: 'transparent',
                  border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 100,
                  fontWeight: 600, fontSize: 16, color: '#fff', textDecoration: 'none'
                }}>Book a Free Session</a>
              </div>

              {/* inline stat strip */}
              <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
                {[{ n: '18k+', l: 'Learners' }, { n: '95%', l: 'Placement' }, { n: '4.8★', l: 'Rating' }].map(s => (
                  <div key={s.l}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--orange)', fontFamily: 'Sora, sans-serif' }}>{s.n}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lead form */}
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 24, padding: '36px 32px' }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Upgrade Your Skills to Achieve Your Dream Job</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 28 }}>Fill the form and we'll reach out within 24 hours.</p>

              {formStatus === 'success' ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                  <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Thanks! You are being redirected.</h4>
                  <p style={{ color: 'var(--text-muted)' }}>We'll reach out shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { key: 'name', placeholder: 'Full Name *', type: 'text' },
                    { key: 'email', placeholder: 'Email Address *', type: 'email' },
                    { key: 'phone', placeholder: 'Contact Number *', type: 'tel' },
                    { key: 'designation', placeholder: 'Designation *', type: 'text' },
                    { key: 'company', placeholder: 'Current Company / College Name *', type: 'text' },
                  ].map(f => (
                    <input
                      key={f.key}
                      type={f.type}
                      placeholder={f.placeholder}
                      required
                      className="form-input"
                      value={formData[f.key]}
                      onChange={e => setFormData(p => ({ ...p, [f.key]: e.target.value }))}
                    />
                  ))}

                  <select className="form-input form-select" required value={formData.experience} onChange={e => setFormData(p => ({ ...p, experience: e.target.value }))}>
                    <option value="" disabled>Years of Experience *</option>
                    {['College Student', 'Less than 1 year', '1–2 year', '3–5 year', '5–7 year', '7+ year'].map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>

                  <select className="form-input form-select" required value={formData.program} onChange={e => setFormData(p => ({ ...p, program: e.target.value }))}>
                    <option value="" disabled>Program Preference *</option>
                    {['Cyber Security', 'Software Development', 'Data Science AI', 'Data Science ML', 'Data Engineering', 'Investment Banking', 'Business Analysis'].map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>

                  <button type="submit" style={{
                    width: '100%', padding: '15px', background: 'var(--orange)', borderRadius: 12, border: 'none',
                    fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 700, color: '#fff', cursor: 'pointer',
                    marginTop: 4, transition: 'opacity 0.2s, transform 0.2s'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = ''; }}
                  >
                    Book a Free Session →
                  </button>
                </form>
              )}

              {/* Trusted logos strip */}
              <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Trusted by alumni at</p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                  {['Google', 'Microsoft', 'Amazon', 'Accenture'].map(c => (
                    <span key={c} style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', opacity: 0.7 }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Aboutus;