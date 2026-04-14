import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Linkedin, ChevronLeft, ChevronRight, ArrowRight, CheckCircle, Rocket, Eye } from 'lucide-react';

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
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;
  const displayTeam = team.length > 0 ? team : defaultTeam;

  // Carousel logic for "What Makes Us Different"
  const visibleCards = 4;
  const totalDiffPages = Math.ceil(differentiators.length / visibleCards);

  // Team carousel logic
  const teamCardsPerView = 3;
  const maxTeamIndex = Math.max(0, displayTeam.length - teamCardsPerView);

  const handleTeamPrev = () => setTeamIndex(prev => Math.max(0, prev - 1));
  const handleTeamNext = () => setTeamIndex(prev => Math.min(maxTeamIndex, prev + 1));

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

        {/* ════════════════════════════════════════════════════════════════════
            2. OUR IMPACT - 4 stat boxes in a row
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '80px 24px', background: 'var(--dark-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <SectionLabel>Our Impact</SectionLabel>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              {displayStats.map((stat) => (
                <div key={stat.id} className="stat-card" style={{
                  background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16,
                  padding: '32px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden'
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--orange), var(--orange-light))' }} />
                  <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: 'var(--orange)', fontFamily: 'Sora, sans-serif', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {stat.value}{stat.suffix}
                  </div>
                  <div style={{ marginTop: 10, fontSize: 15, fontWeight: 500, color: 'var(--text-secondary)' }}>{stat.label}</div>
                </div>
              ))}
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

        {/* ════════════════════════════════════════════════════════════════════
            6. WHAT MAKES US DIFFERENT - Numbered cards (01-04) with carousel dots
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{ padding: '80px 24px', background: 'var(--dark-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <SectionLabel>Why Choose Us</SectionLabel>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '12px 0' }}>
                What Makes Us <span style={{ color: 'var(--orange)' }}>Different?</span>
              </h2>
            </div>

            {/* Cards row with numbers */}
            <div style={{ display: 'flex', gap: 20, overflow: 'hidden', position: 'relative' }}>
              {/* Left fade hint */}
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 40, background: 'linear-gradient(to right, var(--dark-2), transparent)', zIndex: 2, pointerEvents: 'none', opacity: diffIndex > 0 ? 1 : 0 }} />

              {differentiators.map((d, i) => (
                <div key={i} className="diff-card" style={{
                  flex: '0 0 calc(25% - 15px)',
                  background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 20, padding: '28px 24px',
                  position: 'relative', overflow: 'hidden',
                  transform: `translateX(-${diffIndex * 100}%)`, transition: 'transform 0.4s ease'
                }}>
                  {/* Number badge */}
                  <div style={{
                    fontSize: 48, fontWeight: 800, color: 'rgba(56,189,248,0.12)',
                    fontFamily: 'Sora, sans-serif', lineHeight: 1, marginBottom: 16
                  }}>{d.num}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{d.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{d.desc}</p>
                </div>
              ))}

              {/* Right fade hint */}
              <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 40, background: 'linear-gradient(to left, var(--dark-2), transparent)', zIndex: 2, pointerEvents: 'none', opacity: diffIndex < totalDiffPages - 1 ? 1 : 0 }} />
            </div>

            {/* Carousel dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 32 }}>
              {Array.from({ length: totalDiffPages }).map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot ${i === diffIndex ? 'active' : ''}`}
                  onClick={() => setDiffIndex(i)}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            {/* Carousel label */}
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>carousel</span>
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

      </div>
    </>
  );
};

export default Aboutus;
