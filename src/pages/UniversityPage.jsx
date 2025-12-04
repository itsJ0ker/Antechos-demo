import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ChevronLeft, ChevronRight, Star, Users, BookOpen, ArrowRight } from 'lucide-react';

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

  useEffect(() => {
    fetchAllData();
  }, []);

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
      
      const transformedFeatured = (coursesData || []).slice(0, 5).map((course, index) => ({
        id: course.id,
        course_code: course.course_name?.split(' ')[0] || 'COURSE',
        course_name: course.course_name || '',
        description: course.description || '',
        image_url: course.image_url || '',
        background_color: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'][index % 5],
        text_color: '#ffffff',
        link: `/university/${course.universities?.id}/course/${course.id}`
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
      
      const transformedUnis = (universitiesData || []).slice(0, 8).map(uni => ({
        id: uni.id,
        university_name: uni.name || '',
        logo_url: uni.image_url || '',
        image_url: uni.image_url || '',
        description: uni.description || '',
        rating: uni.rating || 0,
        link: `/university/${uni.id}`
      }));
      setExploreCards(transformedUnis);

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
        image_url: course.image_url || '',
        duration: course.duration || '',
        mode: 'Online',
        price: course.fees || '',
        link: `/university/${course.universities?.id}/course/${course.id}`
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Larger */}
      {heroData && (
        <div 
          className="relative h-[700px] bg-cover bg-center"
          style={{ backgroundImage: `url(${heroData.background_image})` }}
        >
          <div 
            className="absolute inset-0 bg-black"
            style={{ opacity: heroData.overlay_opacity || 0.5 }}
          ></div>
          
          <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
            <h1 className="text-6xl font-bold mb-6 text-center">{heroData.title}</h1>
            {heroData.subtitle && (
              <p className="text-2xl mb-10 text-center max-w-3xl">{heroData.subtitle}</p>
            )}
            {heroData.cta_text && (
              <a
                href={heroData.cta_link}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg"
              >
                {heroData.cta_text}
              </a>
            )}
          </div>
        </div>
      )}

      {/* Stats Section - Below Hero */}
      {stats.length > 0 && (
        <section className="bg-white py-12 shadow-md">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {stats.map((stat) => {
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
                    className="flex items-center gap-4 p-6 rounded-xl hover:shadow-lg transition-shadow"
                    style={{ backgroundColor: stat.background_color }}
                  >
                    <div className="flex-shrink-0">
                      <svg className="w-16 h-16" style={{ color: stat.text_color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {getIcon(stat.icon_type)}
                      </svg>
                    </div>
                    <div>
                      <p className="text-4xl font-bold" style={{ color: stat.text_color }}>{stat.stat_number}</p>
                      <p className="text-gray-600 font-medium">{stat.stat_label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Navigation Tabs - Below Stats */}
      {tabs.length > 0 && (
        <section className="bg-gray-100 py-4 sticky top-0 z-40 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-8 flex-wrap">
              {tabs.map((tab) => (
                <a
                  key={tab.id}
                  href={tab.tab_link}
                  className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-white"
                >
                  {tab.tab_name}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Courses Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">In demand - Featured courses</h2>
          
          <div className="relative mt-12">
            <div className="flex justify-center items-center gap-6 overflow-hidden">
              {featuredCourses.slice(currentFeaturedIndex, currentFeaturedIndex + 5).map((course) => (
                <div
                  key={course.id}
                  className="flex-shrink-0 w-48 h-64 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  style={{ backgroundColor: course.background_color, color: course.text_color }}
                >
                  {course.badge_text && (
                    <span className="text-xs px-3 py-1 rounded-full mb-4" style={{ backgroundColor: course.badge_color }}>
                      {course.badge_text}
                    </span>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{course.course_code}</h3>
                  <p className="text-sm">{course.course_name}</p>
                </div>
              ))}
            </div>

            {/* Carousel Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: Math.ceil(featuredCourses.length / 5) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentFeaturedIndex(idx * 5)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    Math.floor(currentFeaturedIndex / 5) === idx ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Universities to Explore */}
      {exploreSection && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">{exploreSection.section_title}</h2>
            {exploreSection.section_subtitle && (
              <p className="text-gray-600 text-center mb-8">{exploreSection.section_subtitle}</p>
            )}

            <div className="relative">
              <button
                onClick={() => scrollExplore('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div id="explore-scroll" className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-12">
                {exploreCards.map((card) => (
                  <a
                    key={card.id}
                    href={card.link}
                    className="flex-shrink-0 w-80 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                  >
                    <img src={card.image_url} alt={card.university_name} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <img src={card.logo_url} alt={card.university_name} className="h-12 mb-4" />
                      <h3 className="text-xl font-bold mb-2">{card.university_name}</h3>
                      {card.description && <p className="text-gray-600 text-sm mb-4">{card.description}</p>}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {card.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{card.rating}</span>
                          </div>
                        )}
                        {card.student_count && (
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{card.student_count.toLocaleString()}</span>
                          </div>
                        )}
                        {card.course_count && (
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{card.course_count} courses</span>
                          </div>
                        )}
                      </div>
                    </div>
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

            <div className="text-center mt-8">
              <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2 mx-auto">
                View all <ArrowRight className="w-4 h-4" />
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

      {/* Real Stories / Testimonials */}
      {storiesSection && testimonials.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">{storiesSection.section_title}</h2>
            {storiesSection.section_subtitle && (
              <p className="text-gray-600 text-center mb-12">{storiesSection.section_subtitle}</p>
            )}

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-center gap-8 mb-8">
                  {/* Before */}
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gray-200 rounded-lg mb-4 mx-auto overflow-hidden">
                      {testimonials[currentTestimonialIndex].before_image && (
                        <img 
                          src={testimonials[currentTestimonialIndex].before_image} 
                          alt="Before" 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <p className="font-semibold">Before</p>
                    <p className="text-sm text-gray-600">{testimonials[currentTestimonialIndex].before_title}</p>
                  </div>

                  <ArrowRight className="w-8 h-8 text-blue-600" />

                  {/* After */}
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gray-200 rounded-lg mb-4 mx-auto overflow-hidden">
                      {testimonials[currentTestimonialIndex].after_image && (
                        <img 
                          src={testimonials[currentTestimonialIndex].after_image} 
                          alt="After" 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <p className="font-semibold">After</p>
                    <p className="text-sm text-gray-600">{testimonials[currentTestimonialIndex].after_title}</p>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">{testimonials[currentTestimonialIndex].student_name}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{testimonials[currentTestimonialIndex].story}</p>
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                    {testimonials[currentTestimonialIndex].course_name && (
                      <span>{testimonials[currentTestimonialIndex].course_name}</span>
                    )}
                    {testimonials[currentTestimonialIndex].university_name && (
                      <span>• {testimonials[currentTestimonialIndex].university_name}</span>
                    )}
                    {testimonials[currentTestimonialIndex].rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{testimonials[currentTestimonialIndex].rating}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={() => setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Talk to Expert CTA */}
      {expertCTA && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div 
              className="rounded-2xl p-12 text-center"
              style={{ backgroundColor: expertCTA.background_color, color: expertCTA.text_color }}
            >
              <h2 className="text-3xl font-bold mb-4">{expertCTA.title}</h2>
              {expertCTA.subtitle && <p className="text-lg mb-8">{expertCTA.subtitle}</p>}
              <a
                href={expertCTA.button_link}
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {expertCTA.button_text}
              </a>
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
