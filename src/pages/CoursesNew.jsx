import { useState, useEffect } from 'react';
import { Star, Clock, Check, Users, Award, BookOpen, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import allCourses from '../data/allCourses';
import { supabase } from '../lib/supabase';
import ScrollProgress from '../components/common/ScrollProgress';
import BackToTop from '../components/common/BackToTop';
import Newsletter from '../components/common/Newsletter';

const CoursesNew = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [heroData, setHeroData] = useState(null);
  const [heroFeatures, setHeroFeatures] = useState([]);
  const [heroStats, setHeroStats] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      // Fetch hero content
      const { data: hero, error: heroError } = await supabase
        .from('courses_hero')
        .select('*')
        .eq('is_active', true)
        .single();

      if (heroError && heroError.code !== 'PGRST116') {
        console.error('Error fetching hero:', heroError);
        return;
      }

      if (hero) {
        setHeroData(hero);

        // Fetch features
        const { data: features, error: featuresError } = await supabase
          .from('courses_hero_features')
          .select('*')
          .eq('hero_id', hero.id)
          .order('display_order');

        if (!featuresError) {
          setHeroFeatures(features || []);
        }

        // Fetch stats
        const { data: stats, error: statsError } = await supabase
          .from('courses_hero_stats')
          .select('*')
          .eq('hero_id', hero.id)
          .order('display_order');

        if (!statsError) {
          setHeroStats(stats || []);
        }
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const coursesData = await allCourses();
      setCourses(coursesData || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(courses.map(c => c.category))];
  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <ScrollProgress />
      {/* Modern Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundColor: heroData?.background_color || '#93B5F1',
            backgroundImage: heroData?.background_image ? `url(${heroData.background_image})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left Content */}
              <div className="p-10 lg:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 w-fit">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  Professional Courses
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {heroData?.title || 'Secure Payments'}
                  </span>
                  <br />
                  <span className="text-gray-900">{heroData?.subtitle || 'Made Simple'}</span>
                </h1>
                
                <p className="text-gray-600 text-base mb-6 leading-relaxed">
                  {heroData?.description || 'Process transactions with confidence. Enterprise-grade security meets effortless user experience.'}
                </p>

                {/* Features */}
                {heroFeatures.length > 0 && (
                  <div className="space-y-3 mb-6">
                    {heroFeatures.map((feature) => (
                      <div key={feature.id} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 text-sm">{feature.icon}</span>
                        </div>
                        <span className="text-gray-700 text-sm font-medium">{feature.feature_text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <a
                  href={heroData?.cta_link || '/contact'}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 w-fit"
                >
                  {heroData?.cta_text || 'Get a Callback'}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              {/* Right Image */}
              <div 
                className="relative bg-gradient-to-br from-blue-400 to-indigo-500 p-8 lg:p-12 flex items-center justify-center"
                style={{ 
                  backgroundColor: heroData?.background_color || '#93B5F1'
                }}
              >
                {heroData?.hero_image ? (
                  <img
                    src={heroData.hero_image}
                    alt="Hero"
                    className="w-full max-w-sm h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full max-w-sm h-64 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <BookOpen className="w-24 h-24 text-white/70" />
                  </div>
                )}
                
                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* Stats Bar */}
            {heroStats.length > 0 && (
              <div className="bg-white border-t border-gray-100 px-10 py-6">
                <div className="grid grid-cols-3 gap-8">
                  {heroStats.map((stat, index) => (
                    <div key={stat.id} className="text-center group">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modern Category Filter */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Browse Courses</h2>
                <p className="text-xs text-gray-500">Find the perfect course for you</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full border border-blue-200">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-gray-900">{filteredCourses.length}</span>
              <span className="text-xs text-gray-600">courses</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`group relative px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400 hover:shadow-md'
                }`}
              >
                {selectedCategory === cat && (
                  <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
                )}
                <span className="relative flex items-center gap-2">
                  {cat === 'all' ? 'All Courses' : cat}
                  {selectedCategory === cat && (
                    <Check className="w-4 h-4" />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Course Cards */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => {
            const isPopular = index === 1 || index === 4;
            
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  isPopular 
                    ? 'ring-2 ring-blue-500 shadow-xl shadow-blue-100' 
                    : 'border border-gray-200 shadow-lg hover:border-blue-300'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white text-center py-2.5 text-sm font-bold flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    Most Popular Choice
                  </div>
                )}

                {/* Course Image */}
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">
                  {course.image_url ? (
                    <img
                      src={course.image_url}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-20 h-20 text-white/40" />
                    </div>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    {course.category && (
                      <span className="px-3 py-1.5 bg-white/95 backdrop-blur-md text-blue-600 rounded-full text-xs font-bold shadow-lg">
                        {course.category}
                      </span>
                    )}
                    {course.rating && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="text-sm font-bold text-gray-900">{course.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Skill Level */}
                  {course.skill_level && (
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 backdrop-blur-md text-white rounded-full text-xs font-bold shadow-lg">
                        {course.skill_level}
                      </span>
                    </div>
                  )}
                </div>

                {/* Course Header */}
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Features */}
                <div className="p-6 space-y-3 bg-gradient-to-b from-white to-gray-50">
                  <div className="flex items-start gap-3 text-sm text-gray-700">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span>Lifetime access to all course materials</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-700">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span>Industry-recognized certificate</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-700">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span>Expert instructor support</span>
                  </div>
                  {course.duration && (
                    <div className="flex items-start gap-3 text-sm text-gray-700">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Clock className="w-3 h-3 text-blue-600" />
                      </div>
                      <span>{course.duration} of content</span>
                    </div>
                  )}
                </div>

                {/* Pricing */}
                <div className="p-6 bg-gradient-to-br from-gray-50 to-white border-t border-gray-100">
                  <div className="mb-4">
                    {course.original_price && course.original_price > course.price && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-base text-gray-400 line-through">
                          ₹{course.original_price.toLocaleString()}
                        </span>
                        <span className="px-2.5 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-sm">
                          {Math.round(((course.original_price - course.price) / course.original_price) * 100)}% OFF
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        ₹{course.price?.toLocaleString() || 'Free'}
                      </span>
                      {course.price > 0 && (
                        <span className="text-gray-500 text-xs">one-time</span>
                      )}
                    </div>
                  </div>

                  <button className={`w-full py-3.5 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                    isPopular
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:scale-105'
                      : 'bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:shadow-lg hover:scale-105'
                  }`}>
                    Enroll Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>

                  <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-500">
                    <Shield className="w-3.5 h-3.5" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Modern Features Section */}
      <section className="relative bg-gradient-to-b from-white via-blue-50 to-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Award className="w-4 h-4" />
              Why Choose Us
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Succeed</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join thousands of students who have transformed their careers with our courses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8" />,
                title: 'Industry Certified',
                description: 'Recognized certificates valued by employers',
                color: 'from-blue-500 to-indigo-500'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Expert Instructors',
                description: 'Learn from industry professionals',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: 'Lifetime Access',
                description: 'Access materials anytime, anywhere',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Money-back Guarantee',
                description: '30-day full refund policy',
                color: 'from-orange-500 to-red-500'
              }
            ].map((feature, index) => (
              <div key={index} className="group text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Modern CTA Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Users className="w-4 h-4" />
            Expert Guidance Available
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Need Help Choosing the Right Course?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Talk to our expert counselors and find the perfect course tailored to your career goals
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2">
              Get Free Counseling
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-200">
              View All Courses
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-8 mt-12 text-white/90">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span className="text-sm">Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span className="text-sm">Career Guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span className="text-sm">Course Recommendations</span>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
};

export default CoursesNew;
