import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { coursesData } from '../data/coursesData';
import PremiumHero from '../components/premium/PremiumHero';
import FeaturedCourses from '../components/premium/FeaturedCourses';
import TransformationJourney from '../components/premium/TransformationJourney';
import StudentOutcomes from '../components/premium/StudentOutcomes';
import LearningExperience from '../components/premium/LearningExperience';
import CurriculumSlider from '../components/premium/CurriculumSlider';
import Testimonials from '../components/premium/Testimonials';
import FAQSection from '../components/premium/FAQSection';
import PremiumCTA from '../components/premium/PremiumCTA';
import '../styles/PremiumCourses.css';

const CoursesPremium = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="premium-container min-h-screen overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black z-[100] origin-left"
        style={{ scaleX }}
      />

      <PremiumHero />
      
      <FeaturedCourses courses={coursesData} />
      
      <div className="max-w-7xl mx-auto px-6">
        <TransformationJourney />
        <StudentOutcomes />
        <LearningExperience />
        <CurriculumSlider />
        <Testimonials />
        <FAQSection />
      </div>

      <PremiumCTA />
    </div>
  );
};

export default CoursesPremium;
