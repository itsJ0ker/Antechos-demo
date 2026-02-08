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

      {/* Rest of the component continues... */}
      {/* This is a backup file - the original component continues with all sections */}
    </div>
  );
};

export default UniversityPage;
