import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Linkedin, ChevronLeft, ChevronRight, ArrowRight, CheckCircle, Rocket, Eye, Play } from 'lucide-react';

const MarqueeBand = ({ label }) => (
  <div style={{ textAlign: 'center', overflow: 'hidden' }}>
    <p style={{ color: 'var(--text-secondary)', fontSize: 14, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 32 }}>
      {label}
    </p>
    <div className="marquee-container" style={{ position: 'relative', width: '100%', display: 'flex' }}>
      <div className="marquee-content" style={{ display: 'flex', gap: 64, alignItems: 'center', minWidth: '100%', animation: 'marquee 40s linear infinite' }}>
        {[
          'Amity University', 'Manipal University', 'Jain University', 'SRM University',
          'Lovely Professional University', 'NMIMS', 'Andhra University', 'UPES Dehradun',
          'Sharda University', 'Parul University', 'VGU Jaipur', 'Galgotias University'
        ].map(name => (
          <span key={name} style={{ color: 'var(--text-secondary)', fontSize: 18, fontWeight: 700, whiteSpace: 'nowrap', opacity: 0.5, letterSpacing: '0.02em' }}>{name}</span>
        ))}
        {/* Duplicate for seamless loop */}
        {[
          'Amity University', 'Manipal University', 'Jain University', 'SRM University',
          'Lovely Professional University', 'NMIMS', 'Andhra University', 'UPES Dehradun',
          'Sharda University', 'Parul University', 'VGU Jaipur', 'Galgotias University'
        ].map(name => (
          <span key={`${name}-loop`} style={{ color: 'var(--text-secondary)', fontSize: 18, fontWeight: 700, whiteSpace: 'nowrap', opacity: 0.5, letterSpacing: '0.02em' }}>{name}</span>
        ))}
      </div>
    </div>
    <style>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>
  </div>
);

/* ─── Inline CSS ─────────────────────────────────────────────────────────── */
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

  /* ── Fade-up ── */
  @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
  .fade-up { animation: fadeUp 0.7s ease forwards; }

  /* ── Stat card ── */
  .stat-card { transition: transform 0.3s; }
  .stat-card:hover { transform: translateY(-4px); }

  /* ── Diff card ── */
  .diff-card { transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s; }
  .diff-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(56,189,248,0.15); border-color: var(--orange) !important; }

  /* ── Carousel dots ── */
  .carousel-dot {
    width: 10px; height: 10px; border-radius: 50%;
    background: rgba(255,255,255,0.2); border: none; cursor: pointer;
    transition: background 0.3s, transform 0.3s;
  }
  .carousel-dot.active {
    background: var(--orange); transform: scale(1.3);
  }

  /* ── Team carousel ── */
  .team-carousel-track {
    display: flex; gap: 24px; transition: transform 0.4s ease;
    overflow: hidden;
  }

  /* ── Form Inputs ── */
  .form-input {
    width: 100%;
    padding: 14px 18px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    transition: all 0.3s ease;
    outline: none;
  }
  .form-input:focus {
    background: rgba(255,255,255,0.05);
    border-color: var(--orange);
    box-shadow: 0 0 0 4px rgba(56,189,248,0.15);
  }
  .form-input::placeholder {
    color: #666;
  }
  .form-select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    padding-right: 48px;
  }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--dark); }
  ::-webkit-scrollbar-thumb { background: var(--orange); border-radius: 2px; }
`;

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '6px 16px', background: 'rgba(56,189,248,0.12)',
    border: '1px solid rgba(56,189,248,0.3)', borderRadius: 100,
    fontSize: 13, fontWeight: 600, color: 'var(--orange)',
    letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16
  }}>{children}</div>
);

/* ─── Main Component ─────────────────────────────────────────────────────── */
const Aboutus = () => {
  const [team, setTeam] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [diffIndex, setDiffIndex] = useState(0);
  const [teamIndex, setTeamIndex] = useState(0);
  const [statsIndex, setStatsIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    company: '',
    experience: '',
    program: ''
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error
  const teamTrackRef = useRef(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [teamRes, statsRes] = await Promise.all([
        supabase.from('about_team').select('*').eq('is_active', true).order('display_order'),
        supabase.from('about_stats').select('*').order('display_order'),
      ]);
      setTeam(teamRes.data || []);
      setStats(statsRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const { error } = await supabase
        .from('enquiries')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          designation: formData.designation,
          company: formData.company,
          experience: formData.experience,
          course_interest: formData.program,
          source: 'about_us_page'
        }]);

      if (error) throw error;

      setFormStatus('success');
      // Reset form
      setFormData({ name: '', email: '', phone: '', designation: '', company: '', experience: '', program: '' });

      // Auto-redirect or reset status after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setFormStatus('error');
    }
  };

  /* Default data if DB is empty */
  const defaultStats = [
    { id: 1, value: '9000', suffix: '+', label: 'Students' },
    { id: 2, value: '100', suffix: '+', label: 'Active Clients' },
    { id: 3, value: '50', suffix: '+', label: 'University' },
    { id: 4, value: '1000', suffix: '+', label: 'Corporate Network' },
  ];

  const defaultTeam = [
    {
      id: 1, name: 'Amal Shaw', position: 'Co-Founder & CEO',
      image_url: 'https://cdn.prod.website-files.com/68ac13020232ad81bfa07e7c/698b03c1f423fd677b439b27_Frame%201000008678.png',
      linkedin_url: '#'
    },
    {
      id: 2, name: 'Vishwajeet', position: 'Founder & CEO',
      image_url: 'https://cdn.prod.website-files.com/68ac13020232ad81bfa07e7c/698b03c4f5a8b61a81e99c5d_Frame%201000008677.png',
      linkedin_url: '#'
    },
    {
      id: 3, name: 'Team Member 3', position: 'CTO',
      image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      linkedin_url: '#'
    },
    {
      id: 4, name: 'Team Member 4', position: 'COO',
      image_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      linkedin_url: '#'
    },
  ];

  const differentiators = [
    { num: '01', title: 'Job-Driven Programs', desc: 'Built around what companies actually hire for — focused on real skills that land real jobs.' },
    { num: '02', title: 'Mentorship That Matters', desc: 'Guidance from seasoned industry professionals who have walked the path before you.' },
    { num: '03', title: 'Learn by Doing', desc: 'Projects, case studies, and simulations instead of theory alone — building practical expertise.' },
    { num: '04', title: 'End-to-End Career Support', desc: 'From resume building to mock interviews to final placement — we are with you every step.' },
    { num: '05', title: 'Industry Recognized', desc: 'Our certificates are valued by top-tier companies and leading recruitment partners.' },
    { num: '06', title: 'Flexible Learning', desc: 'Balance your career and studies with our hybrid and self-paced learning models.' },
  ];

  const defaultValues = [
    { id: 1, title: 'Student-Centricity', description: 'Every decision we make puts learners first.', icon: <Rocket className="text-orange" /> },
    { id: 2, title: 'Integrity', description: 'We build trust through transparency and honest guidance.', icon: <CheckCircle className="text-orange" /> },
    { id: 3, title: 'Innovation', description: 'We constantly evolve to deliver cutting-edge solutions.', icon: <Eye className="text-orange" /> },
    { id: 4, title: 'Excellence', description: 'We strive for the highest quality in everything we do.', icon: <CheckCircle className="text-orange" /> },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;
  const displayValues = defaultValues;
  const displayTeam = team.length > 0 ? team : defaultTeam;

  const defaultVideoTestimonials = [
    { id: 1, name: 'Success Story 1', role: 'Cyber Security', videoId: 'dQw4w9WgXcQ' }, // Replace with real Shorts IDs
    { id: 2, name: 'Success Story 2', role: 'Software Dev', videoId: 'dQw4w9WgXcQ' },
    { id: 3, name: 'Success Story 3', role: 'Data Science', videoId: 'dQw4w9WgXcQ' },
    { id: 4, name: 'Success Story 4', role: 'Business AI', videoId: 'dQw4w9WgXcQ' },
  ];
  const videoTestimonials = defaultVideoTestimonials;

  const testimonials = [];

  // Auto carousel logic for stats
  useEffect(() => {
    const statsCount = displayStats.length;
    if (statsCount <= 4) return; // Only rotate if more than 4

    const interval = setInterval(() => {
      setStatsIndex(prev => (prev + 1) % Math.ceil(statsCount / 4));
    }, 4000);

    return () => clearInterval(interval);
  }, [displayStats.length]);
  // Carousel logic for "What Makes Us Different"
  const diffPerView = 4;
  const maxDiffIndex = Math.max(0, differentiators.length - diffPerView);

  useEffect(() => {
    if (differentiators.length <= diffPerView) return;
    const interval = setInterval(() => {
      setDiffIndex(prev => (prev >= maxDiffIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [differentiators.length, maxDiffIndex]);

  const handleDiffPrev = () => setDiffIndex(prev => Math.max(0, prev - 1));
  const handleDiffNext = () => setDiffIndex(prev => Math.min(maxDiffIndex, prev + 1));

  // Team carousel logic
  const teamCardsPerView = 3;
  const maxTeamIndex = Math.max(0, displayTeam.length - teamCardsPerView);

  const handleTeamPrev = () => setTeamIndex(prev => Math.max(0, prev - 1));
  const handleTeamNext = () => setTeamIndex(prev => Math.min(maxTeamIndex, prev + 1));

  // Video carousel logic
  const vidsPerView = 1;
  const videoCount = videoTestimonials.length;

  useEffect(() => {
    if (videoCount <= 1) return;
    const interval = setInterval(() => {
      setVideoIndex(prev => (prev + 1) % videoCount);
    }, 8000);
    return () => clearInterval(interval);
  }, [videoCount]);

  const handleVideoPrev = () => setVideoIndex(prev => (prev === 0 ? videoCount - 1 : prev - 1));
  const handleVideoNext = () => setVideoIndex(prev => (prev + 1) % videoCount);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0A0A' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, border: '3px solid rgba(56,189,248,0.2)', borderTopColor: 'var(--orange)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); }}`}</style>
          <p style={{ color: '#888', fontFamily: 'DM Sans, sans-serif' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="about-page">

        {/* ════════════════════════════════════════════════════════════════════
            1. HERO SECTION
            "Creating Careers, Not Just Courses" + subtitle + Team Image
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{
          minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, #0A0A0A 0%, #111111 60%, #150E08 100%)',
          position: 'relative', overflow: 'hidden', padding: '120px 24px 80px'
        }}>
          {/* decorative blobs */}
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-15%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
          {/* grid lines */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', maxWidth: 900, textAlign: 'center', zIndex: 1 }}>
            <h1 style={{
              fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.1,
              margin: '0 0 24px', letterSpacing: '-0.03em'
            }}>
              Creating Careers,{' '}
              <span style={{ color: 'var(--orange)' }}>Not Just Courses.</span>
            </h1>

            <p style={{ fontSize: 'clamp(15px, 2.2vw, 20px)', color: 'var(--text-secondary)', maxWidth: 700, margin: '0 auto 48px', lineHeight: 1.7 }}>
              Delivering the bridge between Learning and the Dream Career with Personalized Career Roadmap.
            </p>

            {/* Team Image */}
            <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)', position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
                alt="Team collaboration"
                style={{ width: '100%', height: 'clamp(220px, 32vw, 400px)', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center', color: '#fff', fontSize: 18, fontWeight: 600, fontFamily: 'Sora, sans-serif', letterSpacing: '0.02em' }}>
                {/*Team Image*/}
              </div>
            </div>
          </div>
        </section>

        {/* ── IMPACT STATS ───────────────────────────────────────────────── */}
        <section id="impact" style={{ padding: '100px 24px', background: 'var(--dark-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <SectionLabel>Our Impact</SectionLabel>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, margin: '12px 0 12px', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Through dedication and performance, we create opportunities<br style={{ display: 'none' }} />{' '}
                that drive <span style={{ color: 'var(--orange)' }}>real-world success.</span>
              </h2>
            </div>

            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{
                display: 'flex',
                gap: 24,
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: `translateX(-${statsIndex * (100 / (displayStats.length > 4 ? 4 : displayStats.length))}%)`
              }}>
                {displayStats.map((stat) => (
                  <div key={stat.id} className="stat-card" style={{
                    flex: '0 0 calc(25% - 18px)', // Exactly 4 in a row (accounting for gaps)
                    minWidth: '240px',
                    background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 20,
                    padding: '36px 24px', textAlign: 'center',
                    position: 'relative', overflow: 'hidden'
                  }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--orange), var(--orange-light))' }} />
                    <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: 'var(--orange)', fontFamily: 'Sora, sans-serif', letterSpacing: '-0.02em', lineHeight: 1 }}>
                      {stat.value}{stat.suffix}
                    </div>
                    <div style={{ marginTop: 10, fontSize: 16, fontWeight: 500, color: 'var(--text-secondary)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Dots indicator - only if more than 4 */}
              {displayStats.length > 4 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 40 }}>
                  {Array.from({ length: Math.ceil(displayStats.length / 4) }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setStatsIndex(idx)}
                      style={{
                        width: idx === statsIndex ? 24 : 8,
                        height: 8,
                        borderRadius: 4,
                        background: idx === statsIndex ? 'var(--orange)' : 'rgba(255,255,255,0.2)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            3. WHO WE ARE - Left: heading + text, Right: 2 rows of [Img | Context]
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '100px 24px', background: 'var(--dark)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            {/* Left - Text */}
            <div>
              <SectionLabel>Who We Are?</SectionLabel>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2, margin: '12px 0 20px' }}>
                Closing the Gap Between{' '}
                <span style={{ color: 'var(--orange)' }}>Education & Employability</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16, marginBottom: 20 }}>
                At <strong style={{ color: '#fff' }}>Antechos India</strong>, we are on a mission to close the gap between education and employability. Traditional learning often ends with a certificate, but we go far beyond that by equipping learners with practical skills, expert mentorship, and meaningful industry exposure.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 16 }}>
                Our programs are designed to help individuals transform ambition into achievement by focusing on real-world relevance rather than theoretical knowledge alone.
              </p>
            </div>

            {/* Right - 2 rows of [Image | Context] */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Row 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', background: 'var(--card-bg)' }}>
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80" alt="Education" style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Practical Learning</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
                    Hands-on projects and real-world case studies that prepare you for your career.
                  </p>
                </div>
              </div>

              {/* Row 2 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', background: 'var(--card-bg)' }}>
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80" alt="Mentorship" style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Industry Mentorship</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
                    Expert guidance from seasoned professionals who have walked the path before you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            4. OUR MISSION - Left: bullet points, Right: Image
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '100px 24px', background: 'var(--dark-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            {/* Left - Mission content */}
            <div>
              <SectionLabel>Our Mission</SectionLabel>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '12px 0 20px' }}>
                Empowering learners with <span style={{ color: 'var(--orange)' }}>future-ready skills</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 16, marginBottom: 28, lineHeight: 1.7 }}>
                To empower learners with future-ready skills and real career opportunities. We create programs that are:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  'Practical and hands-on learning experiences',
                  'Expert mentorship from industry leaders',
                  'Designed with direct industry input',
                  'Focused on long-term career growth'
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(56,189,248,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle size={14} style={{ color: 'var(--orange)' }} />
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 500, color: '#fff' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Image */}
            <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80"
                alt="Our Mission"
                style={{ width: '100%', height: 'clamp(280px, 28vw, 400px)', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            5. OUR VISION - Left: Image, Right: text
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '100px 24px', background: 'var(--dark)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            {/* Left - Image */}
            <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="Our Vision"
                style={{ width: '100%', height: 'clamp(280px, 28vw, 400px)', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Right - Vision content */}
            <div>
              <SectionLabel>Our Vision</SectionLabel>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '12px 0 20px' }}>
                A future where <span style={{ color: 'var(--orange)' }}>skills matter more</span> than degrees
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
                A future where skills matter more than degrees, and where every learner, regardless of background, has the tools, guidance, and opportunities to build a career they're proud of.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.8 }}>
                One that grows with them, opens new possibilities, and empowers them to thrive in an ever-changing world. We envision a world where education truly transforms lives and creates meaningful, lasting impact.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US - Controlled Carousel ───────────────────────── */}
        <section id="why-choose" style={{ padding: '100px 24px', background: 'var(--dark-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <SectionLabel>Why Choose Us</SectionLabel>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '12px 0' }}>
                What Makes Us <span style={{ color: 'var(--orange)' }}>Different?</span>
              </h2>
            </div>

            <div style={{ position: 'relative' }}>
              {/* Prev Button */}
              {differentiators.length > diffPerView && (
                <button
                  onClick={handleDiffPrev}
                  disabled={diffIndex === 0}
                  style={{
                    position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
                    width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--border)',
                    background: 'var(--card-bg)', color: '#fff', cursor: diffIndex === 0 ? 'default' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: diffIndex === 0 ? 0 : 1, transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                  }}
                >
                  <ChevronLeft size={20} />
                </button>
              )}

              {/* Next Button */}
              {differentiators.length > diffPerView && (
                <button
                  onClick={handleDiffNext}
                  disabled={diffIndex >= maxDiffIndex}
                  style={{
                    position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
                    width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--border)',
                    background: 'var(--card-bg)', color: '#fff', cursor: diffIndex >= maxDiffIndex ? 'default' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: diffIndex >= maxDiffIndex ? 0 : 1, transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              )}

              <div style={{ overflow: 'hidden', padding: '10px 0' }}>
                <div style={{
                  display: 'flex',
                  gap: 24,
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: `translateX(-${diffIndex * (100 / diffPerView + 0.55)}%)` // 0.55 is gap adjustment
                }}>
                  {differentiators.map((d, i) => (
                    <div key={i} className="diff-card" style={{
                      flex: '0 0 calc(25% - 18px)',
                      background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 24, padding: '36px 32px',
                      position: 'relative', overflow: 'hidden',
                      minHeight: '220px'
                    }}>
                      <div style={{
                        fontSize: 56, fontWeight: 800, color: 'rgba(56,189,248,0.1)',
                        fontFamily: 'Sora, sans-serif', lineHeight: 1, marginBottom: 20
                      }}>{d.num}</div>
                      <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#fff' }}>{d.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8 }}>{d.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination Dots */}
              {differentiators.length > diffPerView && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 40 }}>
                  {Array.from({ length: maxDiffIndex + 1 }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setDiffIndex(idx)}
                      style={{
                        width: idx === diffIndex ? 24 : 8,
                        height: 8,
                        borderRadius: 4,
                        background: idx === diffIndex ? 'var(--orange)' : 'rgba(255,255,255,0.2)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            7. OUR STORY - heading text + long image with context alongside
        ════════════════════════════════════════════════════════════════════ */}
        <section id="story" style={{ padding: '100px 24px', background: 'var(--dark)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <SectionLabel>Our Story</SectionLabel>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '12px 0 16px', maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
                We started as a vision to bridge the opportunity gap that has grown into a{' '}
                <span style={{ color: 'var(--orange)' }}>MOVEMENT</span> changing thousands of life
              </h2>
            </div>

            {/* Story layout: Long image left + context text right */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 48, alignItems: 'start' }}>
              {/* Left - tall/long image */}
              <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid var(--border)' }}>
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"
                  alt="Antechos India story"
                  style={{ width: '100%', height: 'clamp(400px, 50vw, 600px)', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Right - context text */}
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
                  Antechos India began with a simple belief: <strong style={{ color: '#fff' }}>Talent is everywhere, but opportunity is not.</strong>
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
                  India has one of the largest youth populations in the world — yet millions of graduates remain unemployable due to lack of direction, mentorship, and practical skills. Our founders saw this gap and set out to create something different: a platform where learning doesn't just stop at knowledge but continues all the way to career success.
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
                  Since then, we've helped thousands of learners break into tech, digital, and business roles — often with life-changing outcomes like 100%+ salary hikes, career switches, and first-job breakthroughs.
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.9, marginBottom: 28 }}>
                  Because at the heart of it, we don't measure success in certificates. We measure it in careers built, dreams achieved, and lives transformed.
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

        {/* ════════════════════════════════════════════════════════════════════
            8. THE MINDS BEHIND INNOVATION - Team carousel with arrows
        ════════════════════════════════════════════════════════════════════ */}
        <section id="team" style={{ padding: '100px 24px', background: 'var(--dark-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 8px' }}>
                The Minds Behind
              </h2>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--orange)' }}>
                INNOVATION
              </h2>
            </div>

            {/* Carousel with arrows */}
            <div style={{ position: 'relative' }}>
              {/* Left Arrow */}
              <button
                onClick={handleTeamPrev}
                disabled={teamIndex === 0}
                style={{
                  position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)', zIndex: 3,
                  width: 48, height: 48, borderRadius: '50%', border: '1px solid var(--border)',
                  background: 'var(--card-bg)', color: '#fff', cursor: teamIndex === 0 ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: teamIndex === 0 ? 0.3 : 1, transition: 'opacity 0.3s'
                }}
              >
                <ChevronLeft size={24} />
              </button>

              {/* Right Arrow */}
              <button
                onClick={handleTeamNext}
                disabled={teamIndex >= maxTeamIndex}
                style={{
                  position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', zIndex: 3,
                  width: 48, height: 48, borderRadius: '50%', border: '1px solid var(--border)',
                  background: 'var(--card-bg)', color: '#fff', cursor: teamIndex >= maxTeamIndex ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: teamIndex >= maxTeamIndex ? 0.3 : 1, transition: 'opacity 0.3s'
                }}
              >
                <ChevronRight size={24} />
              </button>

              {/* Cards track */}
              <div style={{ overflow: 'hidden', borderRadius: 20 }}>
                <div
                  ref={teamTrackRef}
                  style={{
                    display: 'flex', gap: 24,
                    transform: `translateX(-${teamIndex * (100 / teamCardsPerView + 2.3)}%)`,
                    transition: 'transform 0.4s ease'
                  }}
                >
                  {displayTeam.map(member => (
                    <div key={member.id} style={{
                      flex: `0 0 calc(${100 / teamCardsPerView}% - ${(teamCardsPerView - 1) * 24 / teamCardsPerView}px)`,
                      background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden',
                      transition: 'transform 0.3s, box-shadow 0.3s'
                    }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 60px rgba(56,189,248,0.12)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                    >
                      <div style={{ position: 'relative' }}>
                        <img
                          src={member.image_url || 'https://placehold.co/400x500/131820/38BDF8?text=Team+Member'}
                          alt={member.name}
                          style={{ width: '100%', height: 300, objectFit: 'cover', display: 'block' }}
                          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'; }}
                        />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.8) 0%, transparent 50%)' }} />
                      </div>
                      <div style={{ padding: '20px 24px' }}>
                        <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{member.name}</h3>
                        <p style={{ color: 'var(--orange)', fontWeight: 600, fontSize: 14, marginBottom: 12 }}>{member.position}</p>
                        {member.linkedin_url && (
                          <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            padding: '8px 16px', background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)',
                            borderRadius: 100, fontSize: 13, fontWeight: 600, color: 'var(--orange)', textDecoration: 'none',
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
              </div>
            </div>
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
                    <div style={{ position: 'absolute', top: 16, left: 16, background: 'var(--card-bg)', padding: 10, borderRadius: 12, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {React.isValidElement(val.icon) ? val.icon : <span>{val.icon || '⭐'}</span>}
                    </div>
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
                Since we started in <span style={{ color: 'var(--orange)' }}>2024</span>, we have tried to provide our learners with positive career outcomes.
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>
              {/* Timeline */}
              <div style={{ position: 'relative', paddingLeft: 32 }}>
                {[
                  { year: '2024', title: 'Antechos India Founded', desc: 'Vishwajeet Shinde launch Antechos India with a bold vision to reimagine education.' },
                  { year: '2024', title: 'First 1000 Learners', desc: 'Reached 1,000+ students and launched our first placement-focused programs.' },
                  { year: '2025', title: '100+ Corporate Tie-ups', desc: 'Built a robust hiring network with top companies across India.' },
                  { year: '2025', title: '10,000+ Placements', desc: 'Crossed a major milestone with over 10,000 successful career placements.' },
                  { year: '2026', title: '18k+ Learners', desc: 'Scaling impact with 18,000+ cross-trained professionals and a 95% placement rate.' },
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

        {/* ── ALUMNI TESTIMONIALS - Video Shorts Carousel ──────────────── */}
        <section id="testimonials" style={{ padding: '100px 24px', background: 'var(--dark)', overflow: 'hidden' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <SectionLabel>Alumni Stories</SectionLabel>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '12px 0 12px' }}>
                Hear from Antechos India's Alumni at{' '}
                <span style={{ color: 'var(--orange)' }}>Top Companies</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 17, maxWidth: 800, margin: '0 auto' }}>
                Real stories from real learners who transformed their careers with Antechos India.
              </p>
            </div>

            <div style={{ position: 'relative', maxWidth: 340, margin: '0 auto' }}>
              {/* Prev Button */}
              <button
                onClick={handleVideoPrev}
                style={{
                  position: 'absolute', left: -64, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
                  width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--border)',
                  background: 'var(--card-bg)', color: '#fff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)', transition: 'all 0.3s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--orange)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--card-bg)'}
              >
                <ChevronLeft size={20} />
              </button>

              {/* Next Button */}
              <button
                onClick={handleVideoNext}
                style={{
                  position: 'absolute', right: -64, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
                  width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--border)',
                  background: 'var(--card-bg)', color: '#fff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)', transition: 'all 0.3s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--orange)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--card-bg)'}
              >
                <ChevronRight size={20} />
              </button>

              <div style={{ overflow: 'hidden', borderRadius: 32, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
                <div style={{ 
                  display: 'flex', 
                  transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: `translateX(-${videoIndex * 100}%)`
                }}>
                  {videoTestimonials.map((v) => (
                    <div key={v.id} style={{
                      flex: '0 0 100%',
                      aspectRatio: '9/16',
                      background: '#000',
                      position: 'relative'
                    }}>
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${v.videoId}?autoplay=1&mute=1&loop=1&playlist=${v.videoId}&modestbranding=1&rel=0&controls=0`}
                        title={v.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ display: 'block' }}
                      ></iframe>
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 24px', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)', pointerEvents: 'none' }}>
                        <h4 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: '#fff', letterSpacing: '-0.01em' }}>{v.name}</h4>
                        <p style={{ fontSize: 14, color: 'var(--orange)', margin: '6px 0 0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{v.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pagination Dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 32 }}>
                {videoTestimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setVideoIndex(idx)}
                    style={{
                      width: idx === videoIndex ? 32 : 10,
                      height: 10,
                      borderRadius: 5,
                      background: idx === videoIndex ? 'var(--orange)' : 'rgba(255,255,255,0.15)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Trusted by marquee */}
            <div style={{ marginTop: 100 }}>
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
                  <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Success! We'll reach out soon.</h4>
                  <p style={{ color: 'var(--text-muted)' }}>Thank you for your interest.</p>
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
                      disabled={formStatus === 'submitting'}
                    />
                  ))}

                  <select className="form-input form-select" required value={formData.experience} onChange={e => setFormData(p => ({ ...p, experience: e.target.value }))} disabled={formStatus === 'submitting'}>
                    <option value="" disabled>Years of Experience *</option>
                    {['College Student', 'Less than 1 year', '1–2 year', '3–5 year', '5–7 year', '7+ year'].map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>

                  <select className="form-input form-select" required value={formData.program} onChange={e => setFormData(p => ({ ...p, program: e.target.value }))} disabled={formStatus === 'submitting'}>
                    <option value="" disabled>Program Preference *</option>
                    {['Cyber Security', 'Software Development', 'Data Science AI', 'Data Science ML', 'Data Engineering', 'Investment Banking', 'Business Analysis'].map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>

                  {formStatus === 'error' && (
                    <p style={{ color: '#ef4444', fontSize: 13, textAlign: 'center' }}>Something went wrong. Please try again.</p>
                  )}

                  <button type="submit" disabled={formStatus === 'submitting'} style={{
                    width: '100%', padding: '15px', background: 'var(--orange)', borderRadius: 12, border: 'none',
                    fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 700, color: '#fff', cursor: formStatus === 'submitting' ? 'not-allowed' : 'pointer',
                    marginTop: 4, transition: 'opacity 0.2s, transform 0.2s', opacity: formStatus === 'submitting' ? 0.7 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
                  }}
                    onMouseEnter={e => { if (formStatus !== 'submitting') { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
                    onMouseLeave={e => { if (formStatus !== 'submitting') { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = ''; } }}
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                        Submitting...
                      </>
                    ) : (
                      <>Book a Free Session <ArrowRight size={18} /></>
                    )}
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
