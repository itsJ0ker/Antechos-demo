import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ChevronLeft, ChevronRight, Star, Users, BookOpen, ArrowRight, Clock, GraduationCap, CreditCard } from 'lucide-react';

// Enhanced custom styles for modern UI
const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
    50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
  }
  
  @keyframes slideInUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes fadeInScale {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
    50% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
  }
  
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .course-card-hover {
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
    background-size: 200% 200%;
    animation: shimmer 2s infinite;
  }
  
  .floating-animation {
    animation: float 3s ease-in-out infinite;
  }
  
  .glow-effect:hover {
    animation: glow 2s ease-in-out infinite;
  }
  
  .slide-in-up {
    animation: slideInUp 0.6s ease-out forwards;
  }
  
  .fade-in-scale {
    animation: fadeInScale 0.5s ease-out forwards;
  }
  
  .pulse-glow {
    animation: pulse-glow 2s infinite;
  }
  
  .gradient-bg {
    background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
    background-size: 400% 400%;
    animation: gradient-shift 15s ease infinite;
  }
  
  .glass-effect {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .text-shadow {
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .card-hover-lift {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .card-hover-lift:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  }
`;

const UniversityPage = () => {
  const [heroData, setHeroData] = useState(null);
  const [tabs, setTabs] = useState([]);
  const [stats, setStats] = useState([]);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [exploreSection, setExploreSection] = useState(null);
  const [exploreCards, setExploreCards] = useState([]);
  const [discoverSection, setDiscoverSection] = useState(null);
  const [courseCategories, setCourseCategories] = useState([]);
  const [courseCards, setCourseCards] = useState([]);
  const [storiesSection, setStoriesSection] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [expertCTA, setExpertCTA] = useState(null);
  const [blogsSection, setBlogsSection] = useState(null);
  const [blogs, setBlogs] = useState([]);
  
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAllUniversities, setShowAllUniversities] = useState(false);
  const [allUniversities, setAllUniversities] = useState([]);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [clickedCourseId, setClickedCourseId] = useState(null);

  // Handle course click with analytics
  const handleCourseClick = (course, event) => {
    // Track course click analytics
    try {
      setClickedCourseId(course.id);
      console.log('Course clicked:', course.course_name, course.id);
      
      // Optional: Add a small delay for visual feedback
      setTimeout(() => {
        window.location.href = course.link;
      }, 300);
    } catch (error) {
      console.error('Error tracking course click:', error);
      setClickedCourseId(null);
      // Fallback to direct navigation
      window.location.href = course.link;
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Auto-rotate featured courses carousel
  useEffect(() => {
    if (featuredCourses.length > 5 && !isCarouselPaused) {
      const interval = setInterval(() => {
        setCurrentFeaturedIndex((prev) => {
          const maxIndex = featuredCourses.length - 5;
          return prev >= maxIndex ? 0 : prev + 5;
        });
      }, 5000); // Rotate every 5 seconds

      return () => clearInterval(interval);
    }
  }, [featuredCourses.length, isCarouselPaused]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      // Fetch hero data (or use defaults)
      const { data: heroData } = await supabase
        .from('university_page_hero')
        .select('*')
        .eq('is_active', true)
        .maybeSingle();
      
      setHeroData(heroData || {
        title: 'Discover Your Future with Top Universities',
        subtitle: 'Explore world-class programs and transform your career',
        background_image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920',
        is_active: true
      });

      // Fetch tabs
      const { data: tabsData } = await supabase
        .from('university_page_tabs')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      setTabs(tabsData || []);

      // Fetch stats
      const { data: statsData } = await supabase
        .from('university_page_stats')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      setStats(statsData || [
        { stat_number: '1200+', stat_label: 'Active Students', icon_type: 'students', background_color: '#EFF6FF', text_color: '#2563EB' },
        { stat_number: '85+', stat_label: 'Best Faculty', icon_type: 'faculty', background_color: '#F3E8FF', text_color: '#9333EA' },
        { stat_number: '230+', stat_label: 'Active Courses', icon_type: 'courses', background_color: '#DCFCE7', text_color: '#16A34A' }
      ]);

      // Fetch featured courses directly from university_courses
      const { data: coursesData } = await supabase
        .from('university_courses')
        .select(`
          *,
          universities (id, name)
        `)
        .limit(10);
      
      const transformedFeatured = (coursesData || []).slice(0, 10).map((course, index) => ({
        id: course.id,
        course_code: course.course_name?.split(' ')[0] || 'COURSE',
        course_name: course.course_name || '',
        description: course.description || '',
        image_url: course.image_url || '',
        background_color: [
          '#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b',
          '#ef4444', '#06b6d4', '#8b5cf6', '#f97316', '#84cc16'
        ][index % 10],
        text_color: '#ffffff',
        link: course.universities?.id 
          ? `#/university/${course.universities.id}/course/${course.id}`
          : `/course/${course.id}`,
        badge_text: index < 3 ? 'Popular' : null,
        badge_color: '#ffffff20'
      }));
      setFeaturedCourses(transformedFeatured);

      // Fetch explore section settings
      const { data: exploreData } = await supabase
        .from('university_page_explore_section')
        .select('*')
        .eq('show_section', true)
        .maybeSingle();
      setExploreSection(exploreData || { section_title: 'Universities to Explore', show_section: true });

      // Fetch universities directly
      const { data: universitiesData } = await supabase
        .from('universities')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      const transformedUnis = (universitiesData || []).map(uni => ({
        id: uni.id,
        university_name: uni.name || '',
        logo_url: uni.image_url || '',
        image_url: uni.image_url || '',
        description: uni.description || '',
        rating: uni.rating || 0,
        student_count: uni.student_count || null,
        course_count: uni.course_count || null,
        link: `#/university/${uni.id}`
      }));
      
      // Store all universities and set initial display (first 8)
      setAllUniversities(transformedUnis);
      setExploreCards(transformedUnis.slice(0, 8));

      // Fetch discover section settings
      const { data: discoverData } = await supabase
        .from('university_page_discover_section')
        .select('*')
        .eq('show_section', true)
        .maybeSingle();
      setDiscoverSection(discoverData || { section_title: 'Discover Our Courses', show_section: true });

      // Create categories
      setCourseCategories([
        { id: 'mba-mca', category_name: 'MBA / MCA Programs', category_type: 'MBA/MCA' },
        { id: 'bba-bca', category_name: 'BBA / BCA Programs', category_type: 'BBA/BCA' }
      ]);

      // Transform all courses for discover section
      const transformedCourses = (coursesData || []).map(course => ({
        id: course.id,
        category_id: course.course_name?.toUpperCase().includes('MBA') || course.course_name?.toUpperCase().includes('MCA') ? 'mba-mca' : 'bba-bca',
        course_name: course.course_name || '',
        university_name: course.universities?.name || '',
        //image_url: course.image_url || '',
        duration: course.duration || '',
        mode: 'Online',
        price: course.fees || '',
        link: `#/university/${course.universities?.id}/course/${course.id}`
      }));
      setCourseCards(transformedCourses);

      // Fetch stories section
      const { data: storiesData } = await supabase
        .from('university_page_stories_section')
        .select('*')
        .eq('show_section', true)
        .maybeSingle();
      setStoriesSection(storiesData || { section_title: 'Real Stories, Inspiring Journey', show_section: true });

      // Fetch testimonials
      const { data: testimonialsData } = await supabase
        .from('university_page_testimonials')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      setTestimonials(testimonialsData || []);

      // Fetch CTA
      const { data: ctaData } = await supabase
        .from('university_page_expert_cta')
        .select('*')
        .eq('is_active', true)
        .maybeSingle();
      setExpertCTA(ctaData || { title: 'Talk to Expert', button_text: 'Talk to Expert', is_active: true });

      // Fetch blogs section
      const { data: blogsSectionData } = await supabase
        .from('university_page_blogs_section')
        .select('*')
        .eq('show_section', true)
        .maybeSingle();
      setBlogsSection(blogsSectionData || { section_title: 'Blogs', show_section: true });

      // Fetch blogs
      const { data: blogsData } = await supabase
        .from('university_page_blogs')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      setBlogs(blogsData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      // Set defaults on error
      setHeroData({ title: 'Discover Your Future', subtitle: 'Explore world-class programs', is_active: true });
      setExploreSection({ section_title: 'Universities to Explore', show_section: true });
      setDiscoverSection({ section_title: 'Discover Our Courses', show_section: true });
      setStoriesSection({ section_title: 'Real Stories', show_section: true });
      setBlogsSection({ section_title: 'Blogs', show_section: true });
    } finally {
      setLoading(false);
    }
  };

  const scrollExplore = (direction) => {
    const container = document.getElementById('explore-scroll');
    const scrollAmount = 300;
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  const scrollBlogs = (direction) => {
    const container = document.getElementById('blogs-scroll');
    const scrollAmount = 300;
    container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  const handleViewAllUniversities = () => {
    setShowAllUniversities(!showAllUniversities);
    if (!showAllUniversities) {
      setExploreCards(allUniversities);
    } else {
      setExploreCards(allUniversities.slice(0, 8));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Inject custom styles */}
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      {/* Professional Hero Section */}
      {heroData && (
        <div 
          className="relative h-[600px] bg-cover bg-center"
          style={{ backgroundImage: `url(${heroData.background_image})` }}
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
          
          <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                {heroData.title}
              </h1>
              {heroData.subtitle && (
                <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
                  {heroData.subtitle}
                </p>
              )}
              {heroData.cta_text && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={heroData.cta_link}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 text-center"
                  >
                    {heroData.cta_text}
                  </a>
                  {/*<button className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 border border-white/30">
                    Learn More
                  </button>*/}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      {stats.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Our Impact in Numbers</h2>
              <p className="text-gray-600">Transforming lives through quality education</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const getIcon = (type) => {
                  switch(type) {
                    case 'students':
                      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />;
                    case 'faculty':
                      return <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></>;
                    case 'courses':
                      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />;
                    default:
                      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />;
                  }
                };

                return (
                  <div 
                    key={stat.id}
                    className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                        style={{ backgroundColor: stat.background_color }}
                      >
                        <svg className="w-6 h-6" style={{ color: stat.text_color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {getIcon(stat.icon_type)}
                        </svg>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-3xl font-bold text-gray-800">
                          {stat.stat_number}
                        </p>
                        <p className="text-sm font-medium text-gray-600">
                          {stat.stat_label}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Navigation Tabs */}
      {tabs.length > 0 && (
        <section className="glass-effect backdrop-blur-md py-6 sticky top-0 z-40 border-b border-white/20">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-2 flex-wrap">
              {tabs.map((tab, index) => (
                <a
                  key={tab.id}
                  href={tab.tab_link}
                  className="group relative text-lg font-semibold text-gray-700 hover:text-blue-600 transition-all duration-300 py-3 px-6 rounded-2xl hover:bg-white/80 backdrop-blur-sm border border-transparent hover:border-blue-200 hover:shadow-lg"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10">{tab.tab_name}</span>
                  
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Active indicator */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-8 transition-all duration-300"></div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* In-Demand Courses Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-teal-700 mb-1">
              In-Demand Courses
            </h2>
            <p className="text-teal-600 text-base">
              Discover in-demand courses across industries
            </p>
          </div>
          
          {/* Courses Grid */}
          <div 
            className="relative"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredCourses.slice(currentFeaturedIndex, currentFeaturedIndex + 4).map((course) => (
                <div
                  key={course.id}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCourseClick(course, e);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCourseClick(course, e);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View course: ${course.course_name}`}
                  className={`group bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${
                    clickedCourseId === course.id ? 'opacity-75' : ''
                  }`}
                >
                  {/* Course Image */}
                  <div className="relative h-36 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    {course.image_url ? (
                      <img 
                        src={course.image_url} 
                        alt={course.course_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Course Content */}
                  <div className="p-4 space-y-3">
                    {/* Course Title */}
                    <h3 className="text-base font-semibold text-teal-700 line-clamp-2 min-h-[2.5rem]">
                      {course.course_name}
                    </h3>

                    {/* Course Details 
                    <div className="space-y-2 text-xs text-gray-600">*/}
                      {/* Duration
                      <div className="flex items-start gap-1.5">
                        <Clock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gray-500" />
                        <span>Duration: 2 year | 4 semester</span>
                      </div> */}

                      {/* Degree 
                      <div className="flex items-start gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gray-500" />
                        <span>Approved: UGC-entitled degree programme</span>
                      </div>*/}

                      {/* Mode 
                      <div className="flex items-start gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gray-500" />
                        <span>Mode: Online (Live/Recorded Lectures)</span>
                      </div>*/}

                      {/* Payment 
                      <div className="flex items-start gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gray-500" />
                        <span>Payment: EMI options available</span>
                      </div>
                    </div>*/}

                    {/* View Program Button */}
                    <button className="w-full bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                      {clickedCourseId === course.id ? (
                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          View Program
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {featuredCourses.length > 4 && (
              <>
                <button
                  onClick={() => setCurrentFeaturedIndex(Math.max(0, currentFeaturedIndex - 4))}
                  disabled={currentFeaturedIndex === 0}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed z-10"
                  aria-label="Previous courses"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={() => setCurrentFeaturedIndex(Math.min(featuredCourses.length - 4, currentFeaturedIndex + 4))}
                  disabled={currentFeaturedIndex >= featuredCourses.length - 4}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed z-10"
                  aria-label="Next courses"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </>
            )}
          </div>

          {/* Pagination Dots */}
          {featuredCourses.length > 4 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(featuredCourses.length / 4) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentFeaturedIndex(idx * 4)}
                  className={`transition-all duration-300 rounded-full ${
                    Math.floor(currentFeaturedIndex / 4) === idx 
                      ? 'w-8 h-3 bg-teal-700' 
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Universities to Explore */}
      {exploreSection && (
        <section className="py-20 bg-[#0d4d4d] relative overflow-hidden">
          {/* Curved top edge */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-white">
            <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1440 64" preserveAspectRatio="none">
              <path d="M0,64 Q360,0 720,32 T1440,64 L1440,64 L0,64 Z" fill="#0d4d4d"/>
            </svg>
          </div>
          
          {/* Curved bottom edge */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white">
            <svg className="absolute top-0 w-full h-16" viewBox="0 0 1440 64" preserveAspectRatio="none">
              <path d="M0,0 Q360,64 720,32 T1440,0 L1440,0 L0,0 Z" fill="#0d4d4d"/>
            </svg>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 pt-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#f4d03f] mb-4">
                {exploreSection.section_title}
              </h2>
              {exploreSection.section_subtitle && (
                <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed">
                  {exploreSection.section_subtitle}
                </p>
              )}
            </div>

            {showAllUniversities ? (
              // Grid view for all universities
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {exploreCards.map((card, index) => (
                  <a
                    key={card.id}
                    href={card.link}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Image container */}
                    <div className="relative overflow-hidden">
                      <img 
                        src={card.image_url} 
                        alt={card.university_name} 
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      
                      {/* Logo overlay */}
                      <div className="absolute top-3 right-3 bg-white rounded-lg p-2 shadow-md">
                        <img 
                          src={card.logo_url} 
                          alt={card.university_name} 
                          className="h-10 w-10 object-contain" 
                        />
                      </div>
                    </div>
                    
                    <div className="p-5 space-y-3">
                      {/* University name */}
                      <h3 className="text-lg font-bold text-gray-800 line-clamp-2 min-h-[3.5rem]">
                        {card.university_name}
                      </h3>
                      
                      {/* Rating */}
                      {card.rating && (
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-gray-700">{card.rating}</span>
                        </div>
                      )}
                      
                      {/* Features list */}
                      <div className="space-y-2 text-sm text-gray-600">
                        {card.description && (
                          <div className="flex items-start gap-2">
                            <span className="text-[#0d4d4d] mt-0.5">✓</span>
                            <span className="line-clamp-2">{card.description}</span>
                          </div>
                        )}
                        {card.course_count && (
                          <div className="flex items-start gap-2">
                            <span className="text-[#0d4d4d]">✓</span>
                            <span>{card.course_count}+ Courses Available</span>
                          </div>
                        )}
                        {card.student_count && (
                          <div className="flex items-start gap-2">
                            <span className="text-[#0d4d4d]">✓</span>
                            <span>{card.student_count.toLocaleString()} Active Students</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Know More button */}
                      <div className="pt-3">
                        <button className="w-full bg-[#0d4d4d] hover:bg-[#0a3d3d] text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-300">
                          Know More
                        </button>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              // Horizontal scroll view for limited universities
              <div className="relative">
                <button
                  onClick={() => scrollExplore('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300"
                >
                  <ChevronLeft className="w-6 h-6 text-[#0d4d4d]" />
                </button>

                <div id="explore-scroll" className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-12">
                  {exploreCards.map((card, index) => (
                    <a
                      key={card.id}
                      href={card.link}
                      className="group flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                    >
                      {/* Image container */}
                      <div className="relative overflow-hidden">
                        <img 
                          src={card.image_url} 
                          alt={card.university_name} 
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        
                        {/* Logo overlay */}
                        <div className="absolute top-3 right-3 bg-white rounded-lg p-2 shadow-md">
                          <img 
                            src={card.logo_url} 
                            alt={card.university_name} 
                            className="h-10 w-10 object-contain" 
                          />
                        </div>
                      </div>
                      
                      <div className="p-5 space-y-3">
                        {/* University name */}
                        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 min-h-[3.5rem]">
                          {card.university_name}
                        </h3>
                        
                        {/* Rating */}
                        {card.rating && (
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-gray-700">{card.rating}</span>
                          </div>
                        )}
                        
                        {/* Features list */}
                        <div className="space-y-2 text-sm text-gray-600">
                          {card.description && (
                            <div className="flex items-start gap-2">
                              <span className="text-[#0d4d4d] mt-0.5">✓</span>
                              <span className="line-clamp-2">{card.description}</span>
                            </div>
                          )}
                          {card.course_count && (
                            <div className="flex items-start gap-2">
                              <span className="text-[#0d4d4d]">✓</span>
                              <span>{card.course_count}+ Courses Available</span>
                            </div>
                          )}
                          {card.student_count && (
                            <div className="flex items-start gap-2">
                              <span className="text-[#0d4d4d]">✓</span>
                              <span>{card.student_count.toLocaleString()} Active Students</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Know More button */}
                        <div className="pt-3">
                          <button className="w-full bg-[#0d4d4d] hover:bg-[#0a3d3d] text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-300">
                            Know More
                          </button>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                <button
                  onClick={() => scrollExplore('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300"
                >
                  <ChevronRight className="w-6 h-6 text-[#0d4d4d]" />
                </button>
              </div>
            )}

            <div className="text-center mt-12">
              <button 
                onClick={handleViewAllUniversities}
                className="group inline-flex items-center gap-3 bg-[#f4d03f] hover:bg-[#e5c230] text-[#0d4d4d] font-bold px-8 py-3.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>{showAllUniversities ? 'Show Less Universities' : 'View All Universities'}</span>
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${showAllUniversities ? 'rotate-180' : 'group-hover:translate-x-1'}`} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Discover Our Courses - Carousel Format */}
      {discoverSection && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">{discoverSection.section_title}</h2>
            {discoverSection.section_subtitle && (
              <p className="text-gray-600 text-center mb-12">{discoverSection.section_subtitle}</p>
            )}

            <div className="space-y-12">
              {courseCategories.map((category) => {
                const categoryCourses = courseCards.filter(c => c.category_id === category.id);
                if (categoryCourses.length === 0) return null;

                return (
                  <div key={category.id}>
                    <h3 className="text-2xl font-bold mb-6">{category.category_type}</h3>
                    
                    {/* Carousel Container */}
                    <div className="relative">
                      <button
                        onClick={() => {
                          const container = document.getElementById(`discover-scroll-${category.id}`);
                          container.scrollBy({ left: -400, behavior: 'smooth' });
                        }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>

                      <div 
                        id={`discover-scroll-${category.id}`}
                        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-12"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                      >
                        {categoryCourses.map((course) => (
                          <a
                            key={course.id}
                            href={course.link}
                            className="flex-shrink-0 w-80 bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow border-2 border-gray-200 hover:border-blue-500"
                          >
                            {course.image_url && (
                              <img src={course.image_url} alt={course.course_name} className="w-full h-40 object-cover rounded-lg mb-4" />
                            )}
                            <h4 className="font-bold text-lg mb-2 line-clamp-2">{course.course_name}</h4>
                            {course.university_name && (
                              <p className="text-sm text-gray-600 mb-3">{course.university_name}</p>
                            )}
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              {course.duration && <span>{course.duration}</span>}
                              {course.mode && <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">{course.mode}</span>}
                            </div>
                            {course.price && (
                              <p className="text-blue-600 font-semibold mt-3">{course.price}</p>
                            )}
                          </a>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          const container = document.getElementById(`discover-scroll-${category.id}`);
                          container.scrollBy({ left: 400, behavior: 'smooth' });
                        }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Real Stories / Testimonials - New Design */}
      {storiesSection && testimonials.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#0d5858] mb-3">
                {storiesSection.section_title}
              </h2>
              {storiesSection.section_subtitle && (
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {storiesSection.section_subtitle}
                </p>
              )}
            </div>

            {/* Testimonial Card */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-12 relative">
                {/* Navigation Arrows */}
                <button
                  onClick={() => setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-200 z-10"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                
                <button
                  onClick={() => setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-200 z-10"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>

                {/* Before/After with Student Image */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-8">
                  {/* Before Card */}
                  <div className="flex-1 max-w-xs">
                    <div className="bg-white rounded-xl border-2 border-gray-200 p-6 text-center">
                      <div className="inline-block bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                        BEFORE
                      </div>
                      {testimonials[currentTestimonialIndex].before_company_logo ? (
                        <div className="flex items-center justify-center mb-3 h-16">
                          <img 
                            src={testimonials[currentTestimonialIndex].before_company_logo} 
                            alt="Before company" 
                            className="max-h-12 max-w-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="h-16 flex items-center justify-center mb-3">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                        </div>
                      )}
                      <p className="text-sm font-semibold text-gray-700">
                        {testimonials[currentTestimonialIndex].before_title || 'Previous Role'}
                      </p>
                    </div>
                  </div>

                  {/* Student Image with Arrow */}
                  <div className="relative flex flex-col items-center">
                    {/* Dotted line connecting before and after */}
                    <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
                      <div className="border-t-2 border-dashed border-gray-300 w-full"></div>
                    </div>
                    
                    {/* Student Image */}
                    <div className="relative z-10 mb-4">
                      {testimonials[currentTestimonialIndex].student_image_url ? (
                        <img 
                          src={testimonials[currentTestimonialIndex].student_image_url} 
                          alt={testimonials[currentTestimonialIndex].student_name}
                          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                      ) : (
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-white shadow-lg flex items-center justify-center">
                          <Users className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                      
                      {/* Salary Hike Badge */}
                      {testimonials[currentTestimonialIndex].salary_hike && (
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                          {testimonials[currentTestimonialIndex].salary_hike}
                        </div>
                      )}
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:block">
                      <ArrowRight className="w-8 h-8 text-[#0d5858]" />
                    </div>
                  </div>

                  {/* After Card */}
                  <div className="flex-1 max-w-xs">
                    <div className="bg-white rounded-xl border-2 border-[#0d5858] p-6 text-center">
                      <div className="inline-block bg-[#0d5858] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                        AFTER
                      </div>
                      {testimonials[currentTestimonialIndex].after_company_logo ? (
                        <div className="flex items-center justify-center mb-3 h-16">
                          <img 
                            src={testimonials[currentTestimonialIndex].after_company_logo} 
                            alt="After company" 
                            className="max-h-12 max-w-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="h-16 flex items-center justify-center mb-3">
                          <div className="w-12 h-12 bg-[#0d5858]/10 rounded-lg"></div>
                        </div>
                      )}
                      <p className="text-sm font-semibold text-gray-700">
                        {testimonials[currentTestimonialIndex].after_title || 'Current Role'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Student Name */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {testimonials[currentTestimonialIndex].student_name}
                  </h3>
                  {testimonials[currentTestimonialIndex].linkedin_url && (
                    <a 
                      href={testimonials[currentTestimonialIndex].linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#0077b5] hover:text-[#005885] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <span className="text-sm font-medium">View Profile</span>
                    </a>
                  )}
                </div>

                {/* Testimonial Quote */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="flex justify-center mb-3">
                    <span className="text-4xl text-[#0d5858] font-serif">"</span>
                  </div>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed text-center italic">
                    {testimonials[currentTestimonialIndex].story}
                  </p>
                </div>

                {/* Course Info */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                  {testimonials[currentTestimonialIndex].course_name && (
                    <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-gray-700">{testimonials[currentTestimonialIndex].course_name}</span>
                    </div>
                  )}
                  {testimonials[currentTestimonialIndex].university_name && (
                    <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-lg">
                      <GraduationCap className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-gray-700">{testimonials[currentTestimonialIndex].university_name}</span>
                    </div>
                  )}
                  {testimonials[currentTestimonialIndex].rating && (
                    <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-gray-700">{testimonials[currentTestimonialIndex].rating}/5</span>
                    </div>
                  )}
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonialIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentTestimonialIndex 
                          ? 'w-8 bg-[#0d5858]' 
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Talk to Expert Button */}
              <div className="text-center mt-8">
                <a
                  href={expertCTA?.button_link || '/contact'}
                  className="inline-flex items-center gap-2 bg-[#0d5858] hover:bg-[#0a4444] text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  <span>Talk To Expert Counsellor</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}



      {/* Blogs Section */}
      {blogsSection && blogs.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">{blogsSection.section_title}</h2>
            {blogsSection.section_subtitle && (
              <p className="text-gray-600 text-center mb-12">{blogsSection.section_subtitle}</p>
            )}

            <div className="relative">
              <button
                onClick={() => scrollBlogs('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div id="blogs-scroll" className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-12">
                {blogs.map((blog) => (
                  <a
                    key={blog.id}
                    href={blog.link}
                    className="flex-shrink-0 w-80 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                  >
                    <img src={blog.image_url} alt={blog.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      {blog.category && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">{blog.category}</span>
                      )}
                      <h3 className="text-lg font-bold mt-4 mb-2 line-clamp-2">{blog.title}</h3>
                      {blog.excerpt && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{blog.author_name}</span>
                        <span>{blog.read_time}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <button
                onClick={() => scrollBlogs('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default UniversityPage;
