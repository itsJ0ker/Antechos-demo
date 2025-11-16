import { useState, useEffect } from 'react';
import { Star, Clock, Check, Users, Award, BookOpen, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import allCourses from '../data/allCourses';

const CoursesNew = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchCourses();
  }, []);

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">15,000+ Students Enrolled</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Explore Our Professional Courses
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Industry-recognized certifications designed to accelerate your career growth
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-300" />
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-300" />
                <span>Certified Courses</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-300" />
                <span>Expert Instructors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'All Courses' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => {
            const isPopular = index === 1 || index === 4; // Highlight specific courses
            
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-xl overflow-hidden transition-all hover:-translate-y-1 ${
                  isPopular 
                    ? 'ring-2 ring-blue-600 shadow-xl' 
                    : 'border border-gray-200 shadow-md hover:shadow-xl'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-2 text-sm font-semibold">
                    ⭐ Most Popular
                  </div>
                )}

                {/* Course Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600">
                  {course.image_url ? (
                    <img
                      src={course.image_url}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-20 h-20 text-white opacity-50" />
                    </div>
                  )}
                  
                  {/* Overlay Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    {course.category && (
                      <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-blue-600 rounded-full text-xs font-bold shadow-lg">
                        {course.category}
                      </span>
                    )}
                    {course.rating && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-bold text-gray-900">{course.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Skill Level Badge */}
                  {course.skill_level && (
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-indigo-600/90 backdrop-blur-sm text-white rounded-full text-xs font-semibold">
                        {course.skill_level}
                      </span>
                    </div>
                  )}
                </div>

                {/* Course Header */}
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {course.description}
                  </p>
                </div>

                {/* Features */}
                <div className="p-6 space-y-3">
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Lifetime access to all course materials</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Industry-recognized certificate</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Expert instructor support</span>
                  </div>
                  {course.duration && (
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <Clock className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{course.duration} of content</span>
                    </div>
                  )}
                </div>

                {/* Pricing */}
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <div className="mb-4">
                    {course.original_price && course.original_price > course.price && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg text-gray-400 line-through">
                          ₹{course.original_price.toLocaleString()}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                          Save {Math.round(((course.original_price - course.price) / course.original_price) * 100)}%
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900">
                        ₹{course.price?.toLocaleString() || 'Free'}
                      </span>
                      {course.price > 0 && (
                        <span className="text-gray-600 text-sm">one-time payment</span>
                      )}
                    </div>
                  </div>

                  <button className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    isPopular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}>
                    Enroll Now
                  </button>

                  <p className="text-center text-xs text-gray-500 mt-3">
                    30-day money-back guarantee
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Why Choose Our Courses?
            </h2>
            <p className="text-gray-600">
              Everything you need to succeed in your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8 text-blue-600" />,
                title: 'Industry Certified',
                description: 'Recognized certificates valued by employers'
              },
              {
                icon: <Users className="w-8 h-8 text-blue-600" />,
                title: 'Expert Instructors',
                description: 'Learn from industry professionals'
              },
              {
                icon: <BookOpen className="w-8 h-8 text-blue-600" />,
                title: 'Lifetime Access',
                description: 'Access materials anytime, anywhere'
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-600" />,
                title: 'Money-back Guarantee',
                description: '30-day full refund policy'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Talk to our counselors and find the perfect course for you
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all">
            Get Free Counseling
          </button>
        </div>
      </section>
    </div>
  );
};

export default CoursesNew;
