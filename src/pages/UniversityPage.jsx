import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ChevronLeft, ChevronRight, Star, Users, BookOpen, ArrowRight } from 'lucide-react';

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
      {/* Enhanced Hero Section */}
      {heroData && (
        <div 
          className="relative h-[800px] bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: `url(${heroData.background_image})` }}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 gradient-bg opacity-20"></div>
          <div 
            className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"
          ></div>
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full floating-animation"></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400/40 rounded-full floating-animation" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-40 left-20 w-1 h-1 bg-purple-400/50 rounded-full floating-animation" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-60 left-1/3 w-2 h-2 bg-pink-400/30 rounded-full floating-animation" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
            <div className="text-center max-w-5xl slide-in-up">
              <h1 className="text-7xl md:text-8xl font-bold mb-8 text-shadow bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                {heroData.title}
              </h1>
              {heroData.subtitle && (
                <p className="text-2xl md:text-3xl mb-12 text-shadow opacity-90 leading-relaxed">
                  {heroData.subtitle}
                </p>
              )}
              {heroData.cta_text && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href={heroData.cta_link}
                    className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-5 rounded-2xl font-semibold text-xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 pulse-glow"
                  >
                    <span className="relative z-10">{heroData.cta_text}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                  </a>
                  <button className="glass-effect text-white px-8 py-4 rounded-xl font-medium hover:bg-white/20 transition-all duration-300">
                    Watch Demo
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
              </div>
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

      {/* Enhanced Featured Courses Carousel */}
      <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Featured</span>
              <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
            
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              In Demand <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Courses</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the most sought-after programs designed to accelerate your career
            </p>
            
            {featuredCourses.length > 5 && (
              <div className="flex items-center justify-center gap-3 mt-6">
                <div className={`w-3 h-3 rounded-full ${isCarouselPaused ? 'bg-yellow-400' : 'bg-green-400'} animate-pulse shadow-lg`}></div>
                <span className="text-sm font-medium text-gray-500">
                  {isCarouselPaused ? 'Paused' : 'Auto-rotating'}
                </span>
              </div>
            )}
          </div>
          
          <div 
            className="relative mt-12"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
          >
            <div className="flex justify-center items-center gap-8 overflow-hidden">
              {featuredCourses.slice(currentFeaturedIndex, currentFeaturedIndex + 5).map((course, index) => (
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
                  className={`group flex-shrink-0 w-56 h-80 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl hover:shadow-2xl focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-500 cursor-pointer transform hover:scale-110 hover:-translate-y-4 focus:scale-110 focus:-translate-y-4 relative overflow-hidden card-hover-lift ${
                    clickedCourseId === course.id ? 'animate-pulse scale-95' : ''
                  }`}
                  style={{ 
                    background: `linear-gradient(135deg, ${course.background_color}, ${course.background_color}dd)`,
                    color: course.text_color 
                  }}
                >
                  {/* Enhanced gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Enhanced floating particles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-6 left-6 w-3 h-3 bg-white/40 rounded-full animate-pulse"></div>
                    <div className="absolute top-12 right-8 w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                    <div className="absolute bottom-12 left-8 w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                    <div className="absolute bottom-20 right-6 w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.9s' }}></div>
                  </div>

                  {/* Enhanced shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

                  <div className="relative z-10 space-y-4">
                    {course.badge_text && (
                      <div className="inline-flex">
                        <span 
                          className="text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-sm border border-white/30 animate-pulse"
                          style={{ backgroundColor: course.badge_color }}
                        >
                          ✨ {course.badge_text}
                        </span>
                      </div>
                    )}
                    
                    {/* Enhanced course icon */}
                    <div className="transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                      <div className="w-16 h-16 mx-auto bg-white/25 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white/35 transition-all duration-300 shadow-lg">
                        <BookOpen className="w-8 h-8 drop-shadow-lg" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold group-hover:scale-105 transition-transform duration-300 drop-shadow-lg">
                        {course.course_code}
                      </h3>
                      <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity line-clamp-2 leading-relaxed">
                        {course.course_name}
                      </p>
                    </div>

                    {/* Enhanced hover indicator */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {clickedCourseId === course.id ? (
                        <div className="w-6 h-6 mx-auto border-3 border-white/40 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-xs font-medium">Explore Course</span>
                          <ArrowRight className="w-4 h-4 animate-bounce" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Enhanced border glow */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-white/0 group-hover:border-white/40 transition-all duration-500 shadow-inner"></div>
                  
                  {/* Pulse effect on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-white/10 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            {/* Enhanced Carousel Dots */}
            <div className="flex justify-center gap-4 mt-12">
              {Array.from({ length: Math.ceil(featuredCourses.length / 5) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentFeaturedIndex(idx * 5)}
                  className={`group relative overflow-hidden rounded-full transition-all duration-500 hover:scale-125 ${
                    Math.floor(currentFeaturedIndex / 5) === idx 
                      ? 'w-12 h-4 bg-gradient-to-r from-blue-500 to-purple-500 shadow-xl' 
                      : 'w-4 h-4 bg-gray-300 hover:bg-gradient-to-r hover:from-gray-400 hover:to-gray-500 shadow-md'
                  }`}
                >
                  {Math.floor(currentFeaturedIndex / 5) === idx && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse opacity-75"></div>
                  )}
                  
                  {/* Ripple effect */}
                  <div className="absolute inset-0 rounded-full bg-white/30 scale-0 group-hover:scale-150 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
                </button>
              ))}
            </div>

            {/* Enhanced Navigation arrows */}
            {featuredCourses.length > 5 && (
              <>
                <button
                  onClick={() => setCurrentFeaturedIndex(Math.max(0, currentFeaturedIndex - 5))}
                  disabled={currentFeaturedIndex === 0}
                  className="absolute left-8 top-1/2 -translate-y-1/2 glass-effect backdrop-blur-md hover:bg-white/90 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group border border-white/20 hover:border-blue-200"
                >
                  <ChevronLeft className="w-7 h-7 text-gray-700 group-hover:text-blue-600 transition-colors group-hover:scale-110 transform duration-200" />
                  
                  {/* Ripple effect */}
                  <div className="absolute inset-0 rounded-2xl bg-blue-500/20 scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
                </button>
                <button
                  onClick={() => setCurrentFeaturedIndex(Math.min(featuredCourses.length - 5, currentFeaturedIndex + 5))}
                  disabled={currentFeaturedIndex >= featuredCourses.length - 5}
                  className="absolute right-8 top-1/2 -translate-y-1/2 glass-effect backdrop-blur-md hover:bg-white/90 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group border border-white/20 hover:border-blue-200"
                >
                  <ChevronRight className="w-7 h-7 text-gray-700 group-hover:text-blue-600 transition-colors group-hover:scale-110 transform duration-200" />
                  
                  {/* Ripple effect */}
                  <div className="absolute inset-0 rounded-2xl bg-blue-500/20 scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
                </button>
              </>
            )}

            
          </div>
        </div>
      </section>

      {/* Enhanced Universities to Explore */}
      {exploreSection && (
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/50 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-32 left-32 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Explore</span>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
              
              <h2 className="text-5xl font-bold text-gray-800 mb-6">
                {exploreSection.section_title.split(' ').map((word, index) => (
                  <span key={index} className={index === exploreSection.section_title.split(' ').length - 1 ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h2>
              {exploreSection.section_subtitle && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{exploreSection.section_subtitle}</p>
              )}
            </div>

            {showAllUniversities ? (
              // Grid view for all universities
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {exploreCards.map((card, index) => (
                  <a
                    key={card.id}
                    href={card.link}
                    className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden card-hover-lift border border-gray-100 hover:border-blue-200 fade-in-scale"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Image container with overlay */}
                    <div className="relative overflow-hidden">
                      <img 
                        src={card.image_url} 
                        alt={card.university_name} 
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Floating badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Featured
                      </div>
                    </div>
                    
                    <div className="p-8 space-y-4">
                      {/* Logo with enhanced styling */}
                      <div className="flex items-center gap-3">
                        <img 
                          src={card.logo_url} 
                          alt={card.university_name} 
                          className="h-14 w-14 object-contain rounded-xl bg-gray-50 p-2 group-hover:scale-110 transition-transform duration-300" 
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                            {card.university_name}
                          </h3>
                        </div>
                      </div>
                      
                      {card.description && (
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors">
                          {card.description}
                        </p>
                      )}
                      
                      {/* Enhanced stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-sm">
                          {card.rating && (
                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold text-yellow-700">{card.rating}</span>
                            </div>
                          )}
                          {card.student_count && (
                            <div className="flex items-center gap-1 text-gray-500">
                              <Users className="w-4 h-4" />
                              <span className="font-medium">{card.student_count.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                        
                        {card.course_count && (
                          <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-lg">
                            <BookOpen className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-semibold text-blue-700">{card.course_count} courses</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Explore button */}
                      <div className="pt-2">
                        <div className="flex items-center justify-between text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                          <span>Explore University</span>
                          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover border effect */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300"></div>
                  </a>
                ))}
              </div>
            ) : (
              // Horizontal scroll view for limited universities
              <div className="relative">
                <button
                  onClick={() => scrollExplore('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div id="explore-scroll" className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth px-12">
                  {exploreCards.map((card, index) => (
                    <a
                      key={card.id}
                      href={card.link}
                      className="group flex-shrink-0 w-96 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden card-hover-lift border border-gray-100 hover:border-blue-200"
                    >
                      {/* Enhanced image container */}
                      <div className="relative overflow-hidden">
                        <img 
                          src={card.image_url} 
                          alt={card.university_name} 
                          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Floating elements */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          Featured
                        </div>
                      </div>
                      
                      <div className="p-8 space-y-5">
                        {/* Enhanced logo section */}
                        <div className="flex items-center gap-4">
                          <img 
                            src={card.logo_url} 
                            alt={card.university_name} 
                            className="h-16 w-16 object-contain rounded-2xl bg-gray-50 p-3 group-hover:scale-110 transition-transform duration-300 shadow-sm" 
                          />
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                              {card.university_name}
                            </h3>
                          </div>
                        </div>
                        
                        {card.description && (
                          <p className="text-gray-600 leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors">
                            {card.description}
                          </p>
                        )}
                        
                        {/* Enhanced stats section */}
                        <div className="space-y-3 pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            {card.rating && (
                              <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-xl">
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-bold text-yellow-700">{card.rating}</span>
                                <span className="text-xs text-yellow-600">Rating</span>
                              </div>
                            )}
                            
                            {card.course_count && (
                              <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-xl">
                                <BookOpen className="w-5 h-5 text-blue-600" />
                                <span className="font-bold text-blue-700">{card.course_count}</span>
                                <span className="text-xs text-blue-600">Courses</span>
                              </div>
                            )}
                          </div>
                          
                          {card.student_count && (
                            <div className="flex items-center gap-2 text-gray-500">
                              <Users className="w-5 h-5" />
                              <span className="font-semibold">{card.student_count.toLocaleString()}</span>
                              <span className="text-sm">Active Students</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Enhanced explore button */}
                        <div className="pt-3">
                          <div className="flex items-center justify-between text-blue-600 font-bold group-hover:text-blue-700 transition-colors">
                            <span className="text-lg">Explore University</span>
                            <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced hover border effect */}
                      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300"></div>
                    </a>
                  ))}
                </div>

                <button
                  onClick={() => scrollExplore('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}

            <div className="text-center mt-12">
              <button 
                onClick={handleViewAllUniversities}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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

      {/* Enhanced Real Stories / Testimonials */}
      {storiesSection && testimonials.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                <span className="text-sm font-bold text-purple-600 uppercase tracking-wider">Success Stories</span>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>
              
              <h2 className="text-5xl font-bold text-gray-800 mb-6">
                {storiesSection.section_title.split(' ').map((word, index) => (
                  <span key={index} className={word.toLowerCase().includes('inspiring') || word.toLowerCase().includes('journey') ? 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </h2>
              {storiesSection.section_subtitle && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{storiesSection.section_subtitle}</p>
              )}
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/20 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-8 right-8 w-20 h-20 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-xl"></div>
                
                {/* Before/After transformation */}
                <div className="flex items-center justify-center gap-12 mb-12">
                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-2xl">😔</span>
                    </div>
                    <p className="font-bold text-lg text-gray-800">Before</p>
                    <p className="text-gray-600 max-w-xs leading-relaxed">{testimonials[currentTestimonialIndex].before_title}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <ArrowRight className="w-10 h-10 text-blue-600 animate-pulse" />
                    <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-2xl">🎉</span>
                    </div>
                    <p className="font-bold text-lg text-gray-800">After</p>
                    <p className="text-gray-600 max-w-xs leading-relaxed">{testimonials[currentTestimonialIndex].after_title}</p>
                  </div>
                </div>

                {/* Main testimonial content */}
                <div className="text-center space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      {testimonials[currentTestimonialIndex].student_name}
                    </h3>
                    
                    {/* Quote marks */}
                    <div className="flex justify-center mb-6">
                      <span className="text-6xl text-blue-200 font-serif">"</span>
                    </div>
                    
                    <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto italic">
                      {testimonials[currentTestimonialIndex].story}
                    </p>
                  </div>
                  
                  {/* Course and university info */}
                  <div className="flex items-center justify-center gap-8 text-gray-600 flex-wrap">
                    {testimonials[currentTestimonialIndex].course_name && (
                      <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold">{testimonials[currentTestimonialIndex].course_name}</span>
                      </div>
                    )}
                    {testimonials[currentTestimonialIndex].university_name && (
                      <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-xl">
                        <Users className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold">{testimonials[currentTestimonialIndex].university_name}</span>
                      </div>
                    )}
                    {testimonials[currentTestimonialIndex].rating && (
                      <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-yellow-700">{testimonials[currentTestimonialIndex].rating}/5</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Enhanced Navigation */}
                <div className="flex justify-center items-center gap-6 mt-12">
                  <button
                    onClick={() => setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                    className="group p-4 rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
                  </button>
                  
                  {/* Testimonial indicators */}
                  <div className="flex gap-3">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonialIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentTestimonialIndex 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-8' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
                    className="group p-4 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Talk to Expert CTA */}
      {expertCTA && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-16 text-center shadow-2xl">
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>
              
              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-2 h-2 bg-white/40 rounded-full floating-animation"></div>
                <div className="absolute top-32 right-32 w-3 h-3 bg-yellow-300/50 rounded-full floating-animation" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-32 left-32 w-1 h-1 bg-white/60 rounded-full floating-animation" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-20 right-20 w-2 h-2 bg-pink-300/40 rounded-full floating-animation" style={{ animationDelay: '0.5s' }}></div>
              </div>
              
              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-5xl font-bold text-white mb-6 text-shadow">
                    {expertCTA.title}
                  </h2>
                  {expertCTA.subtitle && (
                    <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed text-shadow">
                      {expertCTA.subtitle}
                    </p>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <a
                    href={expertCTA.button_link}
                    className="group relative inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                  >
                    <span className="relative z-10">{expertCTA.button_text}</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    
                    {/* Button glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  </a>
                  
                  <button className="glass-effect text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                    Schedule a Call
                  </button>
                </div>
                
                {/* Trust indicators */}
                <div className="flex items-center justify-center gap-8 text-white/80 text-sm pt-8">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Available 24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>Expert Guidance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>1000+ Students Helped</span>
                  </div>
                </div>
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
