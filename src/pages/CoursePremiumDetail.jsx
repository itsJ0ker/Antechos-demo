import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { coursesData } from '../data/coursesData';
import DetailHero from '../components/premium/detail/DetailHero';
import StoryBasedIntroduction from '../components/premium/detail/StoryBasedIntroduction';
import JourneyTimeline from '../components/premium/detail/JourneyTimeline';
import CareerTransformation from '../components/premium/detail/CareerTransformation';
import SkillsToolsEcosystem from '../components/premium/detail/SkillsToolsEcosystem';
import CertificationShowcase from '../components/premium/detail/CertificationShowcase';
import FAQSection from '../components/premium/FAQSection';
import PremiumCTA from '../components/premium/PremiumCTA';
import '../styles/PremiumCourses.css';

const CoursePremiumDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const foundCourse = coursesData.find(c => c.slug === slug);
    if (foundCourse) {
      setCourse(foundCourse);
      window.scrollTo(0, 0);
    } else {
      navigate('/courses-premium');
    }
  }, [slug, navigate]);

  if (!course) return null;

  return (
    <div className="premium-container min-h-screen">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black z-[100] origin-left"
        style={{ scaleX }}
      />

      <DetailHero course={course} />
      
      <div className="max-w-7xl mx-auto px-6">
        <StoryBasedIntroduction course={course} />
        <JourneyTimeline curriculum={course.curriculum} />
        <CareerTransformation careerData={course.careerTransformation} />
        <SkillsToolsEcosystem skills={course.careerTransformation.skills} />
        
        {/* Project Section Wrapper */}
        <section className="py-32">
          <div className="text-center mb-20">
            <h2 className="p-heading-lg mb-6 uppercase tracking-tighter">Strategic Projects</h2>
            <p className="p-text-body max-w-2xl mx-auto">
              You won't just learn. You'll build. These enterprise-grade projects 
              form the core of your professional portfolio.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {course.projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-12 bg-white border border-black/5 rounded-[3rem] shadow-sm hover:shadow-xl transition-all"
              >
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-p-accent mb-4">Mission 0{i+1}</div>
                <h3 className="text-2xl font-bold mb-6">{project.title}</h3>
                <p className="text-p-text-body">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <CertificationShowcase certification={course.certification} />

        <FAQSection />
      </div>

      <PremiumCTA />

      {/* Sticky Enrollment Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-black/5 z-50 md:hidden">
        <button className="p-btn-primary w-full justify-center">Enroll Now - {course.price}</button>
      </div>
    </div>
  );
};

export default CoursePremiumDetail;
