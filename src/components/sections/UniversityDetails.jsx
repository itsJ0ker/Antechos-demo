import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { universityData } from "../../data/universityData";
import {
  ChevronDown,
  ChevronUp,
  Award,
  BookOpen,
  DollarSign,
  HelpCircle,
  GraduationCap,
  Briefcase,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  MapPin,
  Star,
  Calendar,
  Globe,
  Phone,
  Mail,
  ExternalLink,
  Play,
  Image as ImageIcon,
} from "lucide-react";

const UniversityDetails = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeSection, setActiveSection] = useState("accreditation");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchUniversity = async () => {
      try {
        if (!supabase) {
          console.log('Supabase not configured, using static data');
          const numericId = parseInt(id);
          const staticUniversity = universityData.find(uni => 
            uni.id === id || 
            uni.id === numericId || 
            uni.code?.toLowerCase() === id.toLowerCase()
          );
          if (staticUniversity) {
            setUniversity(staticUniversity);
          }
          return;
        }

        console.log('Fetching university with ID:', id);
        
        // First try basic university data
        let { data, error } = await supabase
          .from('universities')
          .select('*')
          .eq('id', id)
          .eq('is_active', true)
          .single();

        if (data && !error) {
          console.log('Basic university data loaded:', data);
          
          // Try to fetch enhanced data separately
          try {
            // Fetch accreditations
            const { data: accreditations } = await supabase
              .from('university_accreditations')
              .select(`
                id,
                display_order,
                accreditation:accreditations(
                  id,
                  name,
                  full_name,
                  logo_url,
                  description
                )
              `)
              .eq('university_id', id);
            
            if (accreditations) {
              data.university_accreditations = accreditations;
              console.log('Accreditations loaded:', accreditations);
            }

            // Fetch other enhanced data
            const { data: benefits } = await supabase
              .from('university_benefits')
              .select('*')
              .eq('university_id', id)
              .order('display_order');
            
            if (benefits) data.university_benefits = benefits;

            const { data: steps } = await supabase
              .from('university_admission_steps')
              .select('*')
              .eq('university_id', id)
              .order('display_order');
            
            if (steps) data.university_admission_steps = steps;

            const { data: stats } = await supabase
              .from('university_career_stats')
              .select('*')
              .eq('university_id', id)
              .order('display_order');
            
            if (stats) data.university_career_stats = stats;

            const { data: partners } = await supabase
              .from('university_hiring_partners')
              .select('*')
              .eq('university_id', id)
              .order('display_order');
            
            if (partners) data.university_hiring_partners = partners;

            const { data: images } = await supabase
              .from('university_campus_images')
              .select('*')
              .eq('university_id', id)
              .order('display_order');
            
            if (images) data.university_campus_images = images;

            // Fetch university courses
            const { data: courses } = await supabase
              .from('university_courses')
              .select('*')
              .eq('university_id', id)
              .order('created_at');
            
            if (courses) {
              data.courses = courses;
              console.log('Courses loaded:', courses);
            }

            // Fetch university FAQs
            const { data: faqs } = await supabase
              .from('university_faqs')
              .select('*')
              .eq('university_id', id)
              .order('order_index');
            
            if (faqs) {
              data.faq = faqs;
              console.log('FAQs loaded:', faqs);
            }

          } catch (enhancedError) {
            console.log('Enhanced data not available:', enhancedError);
          }
        }

        if (error) {
          console.error('Database error:', error);
        }

        if (error || !data) {
          console.log('Database university not found, using static data');
          const numericId = parseInt(id);
          const staticUniversity = universityData.find(uni => 
            uni.id === id || 
            uni.id === numericId || 
            uni.code?.toLowerCase() === id.toLowerCase()
          );
          if (staticUniversity) {
            setUniversity(staticUniversity);
          }
        } else {
          console.log('University data loaded from database:', data);
          console.log('Accreditations found:', data.university_accreditations);
          setUniversity(data);
        }
      } catch (error) {
        console.error('Error fetching university:', error);
        const numericId = parseInt(id);
        const staticUniversity = universityData.find(uni => 
          uni.id === id || 
          uni.id === numericId || 
          uni.code?.toLowerCase() === id.toLowerCase()
        );
        if (staticUniversity) {
          setUniversity(staticUniversity);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUniversity();
    }
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "accreditation",
        "about",
        "courses",
        "fees",
        "benefits",
        "degree",
        "admission",
        "career",
        "partners",
        "faq",
      ];

      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading university details...</p>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">University Not Found</h1>
          <p className="text-gray-600 mb-4">The university you're looking for doesn't exist.</p>
          <Link to="/universities" className="text-blue-600 hover:underline">
            Back to Universities
          </Link>
        </div>
      </div>
    );
  }

  const navigationItems = [
    { id: "accreditation", label: "Accreditation" },
    { id: "about", label: "About University" },
    { id: "courses", label: "Courses" },
    { id: "fees", label: "Fees" },
    { id: "benefits", label: "Benefits" },
    { id: "degree", label: "Degree Overview" },
    { id: "admission", label: "Admission Process" },
    { id: "career", label: "Career & Placement" },
    { id: "partners", label: "Hiring Partners" },
    { id: "faq", label: "FAQs" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section with Background */}
      <div 
        className="relative min-h-[70vh] bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.8), rgba(67, 56, 202, 0.8)), url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2086&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[50vh]">
            {/* Left Side - University Info */}
            <div className="text-center lg:text-left space-y-8">
              {/* University Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white/90 border border-white/30">
                <Award className="w-4 h-4" />
                <span>Premier Educational Institution</span>
              </div>

              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  {university.name}
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 font-light max-w-2xl">
                  {university.about?.substring(0, 120) || university.description?.substring(0, 120) || "Empowering minds, shaping futures through excellence in education"}...
                </p>
              </div>
              
              {/* University Stats */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                  <MapPin className="w-5 h-5 text-blue-200" />
                  <span className="text-white font-medium">{university.location}</span>
                </div>
                
                {university.nirf_rank && (
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 rounded-full font-bold text-gray-900 shadow-lg">
                    NIRF Rank #{university.nirf_rank}
                  </div>
                )}
                
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full font-semibold text-white border border-white/30">
                  {university.keyInfo?.ranking || "NAAC A++"}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                <button className="group px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                  <span className="flex items-center gap-2">
                    <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Get Guidance
                  </span>
                </button>
                <button className="group px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                  <span className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Apply Now
                  </span>
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">{university.placement_rate || 90}%</div>
                  <div className="text-blue-200 text-xs sm:text-sm">Placement Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">500+</div>
                  <div className="text-blue-200 text-xs sm:text-sm">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-white">₹8L+</div>
                  <div className="text-blue-200 text-xs sm:text-sm">Avg Package</div>
                </div>
              </div>
            </div>

            {/* Right Side - University Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                {/* Main Image */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                  <img
                    src={university.hero_image || university.image_url || university.image || 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                    alt={university.name}
                    className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  
                  {/* Overlay with Play Button for Video */}
                  {university.video_url && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                        <Play className="w-6 h-6 text-blue-600 ml-1" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  ⭐ Top Rated
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-gray-800 text-sm font-medium shadow-lg border border-white/50">
                  🎓 {university.established || "Est. 1990"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24 bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Quick Navigation</h3>
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? "bg-blue-600 text-white font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-12 min-w-0">
            {/* Accreditation Section */}
            <section id="accreditation" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full mb-4">
                    <Award className="w-6 h-6" />
                    <span className="font-bold text-lg">Accreditation & Recognition</span>
                  </div>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Our university is recognized and accredited by leading educational bodies, ensuring quality education and global recognition.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                  {university.university_accreditations && university.university_accreditations.length > 0 ? (
                    university.university_accreditations
                      .sort((a, b) => a.display_order - b.display_order)
                      .map((item, i) => (
                        <div
                          key={i}
                          className="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-300"
                          title={item.accreditation?.full_name || item.accreditation?.name}
                        >
                          <div className="w-24 h-24 rounded-2xl border-2 border-blue-200 flex items-center justify-center p-4 bg-white group-hover:border-blue-500 group-hover:shadow-lg transition-all duration-300">
                            {item.accreditation?.logo_url ? (
                              <img
                                src={item.accreditation.logo_url}
                                alt={item.accreditation.name}
                                className="max-w-full max-h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.parentElement.innerHTML = `<span class="text-sm text-blue-600 font-bold">${item.accreditation.name}</span>`;
                                }}
                              />
                            ) : (
                              <span className="text-sm text-blue-600 text-center font-bold">
                                {item.accreditation?.name}
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-semibold text-gray-800 text-center mt-3 group-hover:text-blue-600 transition-colors">
                            {item.accreditation?.name}
                          </p>
                          {item.accreditation?.full_name && (
                            <p className="text-xs text-gray-500 text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {item.accreditation.full_name}
                            </p>
                          )}
                        </div>
                      ))
                  ) : university.approvals && university.approvals.length > 0 ? (
                    // Fallback to old approvals structure
                    university.approvals.map((approval, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center group cursor-pointer transform hover:scale-105 transition-all duration-300"
                      >
                        <div className="w-24 h-24 rounded-2xl border-2 border-blue-200 flex items-center justify-center p-4 bg-white group-hover:border-blue-500 group-hover:shadow-lg transition-all duration-300">
                          <img
                            src={approval.logo}
                            alt={approval.name}
                            className="max-w-full max-h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                        <p className="text-sm font-semibold text-gray-800 text-center mt-3 group-hover:text-blue-600 transition-colors">
                          {approval.name}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No accreditations available</p>
                      <p className="text-gray-400 text-sm mt-2">Accreditation information will be updated soon</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* About University Section */}
            <section id="about" className="scroll-mt-24">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">About University</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {university.about || university.description}
                </p>
                
                {/* Campus Images */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {university.university_campus_images && university.university_campus_images.length > 0 ? (
                    university.university_campus_images
                      .sort((a, b) => a.display_order - b.display_order)
                      .slice(0, 3)
                      .map((img, i) => (
                        <div key={i} className="border-2 border-gray-300 rounded-lg overflow-hidden">
                          <img
                            src={img.image_url}
                            alt={img.caption || `Campus ${i + 1}`}
                            className="w-full h-48 object-cover"
                          />
                          <div className="text-center py-2 bg-gray-50 text-sm font-medium">
                            {img.caption || `Campus ${i + 1}`}
                          </div>
                        </div>
                      ))
                  ) : (
                    [1, 2, 3].map((i) => (
                      <div key={i} className="border-2 border-gray-300 rounded-lg overflow-hidden">
                        <img
                          src={university.image}
                          alt={`Campus ${i}`}
                          className="w-full h-48 object-cover"
                        />
                        <div className="text-center py-2 bg-gray-50 text-sm font-medium">
                          Campus {i}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>

            {/* Courses Section - Formal Academic Design */}
            <section id="courses" className="scroll-mt-24">
              <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-sm">
                {/* Header */}
                <div className="mb-8 pb-6 border-b-2 border-gray-200">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Academic Programs
                      </h2>
                      <p className="text-gray-600">
                        Comprehensive courses designed to meet industry standards
                      </p>
                    </div>
                    
                    {/* Navigation Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const container = document.getElementById('courses-carousel');
                          container.scrollBy({ left: -380, behavior: 'smooth' });
                        }}
                        className="p-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded transition-colors"
                        aria-label="Previous"
                      >
                        <ChevronDown className="w-5 h-5 text-gray-700 transform rotate-90" />
                      </button>
                      <button
                        onClick={() => {
                          const container = document.getElementById('courses-carousel');
                          container.scrollBy({ left: 380, behavior: 'smooth' });
                        }}
                        className="p-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded transition-colors"
                        aria-label="Next"
                      >
                        <ChevronDown className="w-5 h-5 text-gray-700 transform -rotate-90" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                  {university.courses && university.courses.length > 0 ? (
                    <>
                      <div 
                        id="courses-carousel"
                        className="flex overflow-x-auto gap-5 pb-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
                        style={{
                          scrollbarWidth: 'thin',
                          scrollbarColor: '#cbd5e1 #f1f5f9'
                        }}
                      >
                        {university.courses.map((course, i) => (
                          <div
                            key={i}
                            className="flex-shrink-0 w-[360px] bg-white border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 snap-start"
                          >
                            {/* Course Image */}
                            <div className="relative h-48 bg-gray-100 border-b border-gray-300">
                              {course.image_url ? (
                                <img
                                  src={course.image_url}
                                  alt={course.name || course.course_name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                  <GraduationCap className="w-16 h-16 text-gray-400" />
                                </div>
                              )}
                            </div>

                            {/* Course Content */}
                            <div className="p-6">
                              {/* Course Title */}
                              <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {course.name || course.course_name}
                              </h3>
                              
                              {/* Description */}
                              {course.description && (
                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                  {course.description}
                                </p>
                              )}

                              {/* Course Details */}
                              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                                {course.duration && (
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600 flex items-center gap-2">
                                      <Calendar className="w-4 h-4" />
                                      Duration
                                    </span>
                                    <span className="font-semibold text-gray-900">{course.duration}</span>
                                  </div>
                                )}
                                {course.fees && (
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600 flex items-center gap-2">
                                      <DollarSign className="w-4 h-4" />
                                      Program Fee
                                    </span>
                                    <span className="font-bold text-blue-600">{course.fees}</span>
                                  </div>
                                )}
                              </div>

                              {/* Specializations Info */}
                              <div className="mb-4 pb-3 border-b border-gray-200">
                                <p className="text-xs font-semibold text-gray-700 mb-1 uppercase">Available Specializations</p>
                                <p className="text-sm text-blue-600 font-semibold">
                                  Click "View Program Details" to see all specializations
                                </p>
                              </div>

                              {/* CTA Button */}
                              <Link
                                to={`/university/${id}/course/${course.id}`}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded font-semibold transition-colors flex items-center justify-center gap-2"
                              >
                                <span>View Program Details</span>
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>

                    </>
                  ) : (
                    <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                      <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Courses Available</h3>
                      <p className="text-gray-600 text-sm">Course information will be displayed here once added</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Fee Structure Section */}
            <section id="fees" className="scroll-mt-24">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Fee Structure</h2>
                <div className="overflow-x-auto -mx-6 px-6">
                  <table className="min-w-full border-collapse w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-3 px-4 font-bold text-gray-900">Course</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-900">Full Fee</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-900">Yearly</th>
                        <th className="text-left py-3 px-4 font-bold text-gray-900">Sem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {university.courses && university.courses.length > 0 ? (
                        university.courses.map((course, i) => {
                          // Safely parse fees and duration
                          const feesStr = course.fees || '0';
                          const fullFee = parseInt(feesStr.replace(/[^0-9]/g, '')) || 0;
                          const durationStr = course.duration || '1';
                          const duration = parseInt(durationStr.replace(/[^0-9]/g, '')) || 1;
                          const yearly = Math.floor(fullFee / duration);
                          const semester = Math.floor(yearly / 2);
                          
                          return (
                            <tr key={i} className="border-b border-gray-200">
                              <td className="py-3 px-4 text-gray-700">{course.name || course.course_name}</td>
                              <td className="py-3 px-4 text-gray-700">{course.fees || 'N/A'}</td>
                              <td className="py-3 px-4 text-gray-700">
                                {fullFee > 0 ? `₹${yearly.toLocaleString()}` : 'N/A'}
                              </td>
                              <td className="py-3 px-4 text-gray-700">
                                {fullFee > 0 ? `₹${semester.toLocaleString()}` : 'N/A'}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="4" className="py-8 px-4 text-center text-gray-500">
                            No courses available yet. Add courses from the admin panel.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-100 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-full mb-4">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-bold text-lg">Why Choose Us</span>
                  </div>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Discover the unique advantages that make our university the perfect choice for your educational journey.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                  {university.university_benefits && university.university_benefits.length > 0 ? (
                    university.university_benefits
                      .sort((a, b) => a.display_order - b.display_order)
                      .map((benefit) => (
                        <div
                          key={benefit.benefit_number}
                          className="group bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                        >
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            {benefit.benefit_number}
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {benefit.title}
                          </h3>
                          {benefit.description && (
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {benefit.description}
                            </p>
                          )}
                        </div>
                      ))
                  ) : (
                    // Fallback benefits
                    [
                      { num: "1", title: "Flexible Learning", desc: "Study at your own pace with flexible schedules" },
                      { num: "2", title: "Expert Faculty", desc: "Learn from industry experts and experienced professors" },
                      { num: "3", title: "Global Recognition", desc: "Internationally recognized degrees and certifications" },
                      { num: "4", title: "Career Support", desc: "Comprehensive placement assistance and career guidance" },
                      { num: "5", title: "Industry Projects", desc: "Hands-on experience with real-world projects" },
                      { num: "6", title: "Networking", desc: "Connect with peers and industry professionals" },
                      { num: "7", title: "Affordable Fees", desc: "Quality education at competitive prices" },
                      { num: "8", title: "Lifetime Access", desc: "Continued support and resources after graduation" },
                    ].map((benefit) => (
                      <div
                        key={benefit.num}
                        className="group bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          {benefit.num}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {benefit.desc}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>

            {/* Program Overview Section */}
            <section id="degree" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full mb-4">
                    <GraduationCap className="w-6 h-6" />
                    <span className="font-bold text-lg">Program Overview</span>
                  </div>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Comprehensive program details designed to provide you with world-class education and industry-relevant skills.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Duration</h3>
                        <p className="text-gray-600 text-sm">Program Length</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">
                      {university.university_courses?.[0]?.duration || university.courses?.[0]?.duration || "2-4 years"}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Mode</h3>
                        <p className="text-gray-600 text-sm">Learning Format</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">
                      {university.learning_mode || "Online / Distance Learning"}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Recognition</h3>
                        <p className="text-gray-600 text-sm">Accreditation</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">
                      {university.recognition || "UGC-DEB Approved"}
                    </p>
                  </div>
                </div>
                
                {/* Video Section */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 text-lg sm:text-xl truncate">University Overview Video</h3>
                      <p className="text-gray-600 text-sm sm:text-base">Get an inside look at our campus and programs</p>
                    </div>
                  </div>
                  
                  {university.video_url ? (
                    <div className="w-full max-w-full">
                      <div className="relative w-full" style={{paddingBottom: '56.25%'}}>
                        <iframe
                          src={university.video_url}
                          title="University Overview Video"
                          className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full max-w-full">
                      <div className="relative w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-lg" style={{paddingBottom: '56.25%'}}>
                        <div className="absolute inset-0 flex items-center justify-center text-center text-white p-4">
                          <div>
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-white/30 transition-colors cursor-pointer">
                              <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1" />
                            </div>
                            <h4 className="text-lg sm:text-xl font-bold mb-2">University Overview</h4>
                            <p className="text-gray-300 text-sm sm:text-base">Video coming soon</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {university.video_description && (
                    <p className="text-gray-600 mt-4 leading-relaxed text-sm sm:text-base">
                      {university.video_description}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Admission Process Section */}
            <section id="admission" className="scroll-mt-24">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full mb-4">
                    <Users className="w-6 h-6" />
                    <span className="font-bold text-lg">Admission Process</span>
                  </div>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Follow our simple and streamlined admission process to begin your educational journey with us.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-6 md:gap-8">
                    {university.university_admission_steps && university.university_admission_steps.length > 0 ? (
                      university.university_admission_steps
                        .sort((a, b) => a.display_order - b.display_order)
                        .map((step, i) => (
                          <React.Fragment key={step.step_number}>
                            <div className="flex flex-col items-center group">
                              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                {step.step_number}
                              </div>
                              <h3 className="font-bold text-gray-900 text-center text-lg mb-2 group-hover:text-orange-600 transition-colors">
                                {step.title}
                              </h3>
                              {step.subtitle && (
                                <p className="text-sm text-gray-600 text-center mb-2">{step.subtitle}</p>
                              )}
                              {step.description && (
                                <p className="text-xs text-gray-500 text-center max-w-32">{step.description}</p>
                              )}
                            </div>
                            {i < university.university_admission_steps.length - 1 && (
                              <div className="hidden md:block">
                                <ArrowRight className="w-8 h-8 text-orange-400 animate-pulse" />
                              </div>
                            )}
                          </React.Fragment>
                        ))
                    ) : (
                      // Fallback admission steps
                      [
                        { step: "1", title: "Registration", subtitle: "Create Account", desc: "Sign up and create your profile" },
                        { step: "2", title: "Choose Program", subtitle: "Select Course", desc: "Browse and select your desired program" },
                        { step: "3", title: "Documentation", subtitle: "Upload Documents", desc: "Submit required academic documents" },
                        { step: "4", title: "Application Review", subtitle: "Verification", desc: "Our team reviews your application" },
                        { step: "5", title: "Enrollment", subtitle: "Confirmation", desc: "Complete enrollment and payment" },
                        { step: "6", title: "Welcome", subtitle: "Get Started", desc: "Begin your learning journey" },
                      ].map((item, i) => (
                        <React.Fragment key={i}>
                          <div className="flex flex-col items-center group">
                            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                              {item.step}
                            </div>
                            <h3 className="font-bold text-gray-900 text-center text-lg mb-2 group-hover:text-orange-600 transition-colors">
                              {item.title}
                            </h3>
                            {item.subtitle && (
                              <p className="text-sm text-gray-600 text-center mb-2">{item.subtitle}</p>
                            )}
                            <p className="text-xs text-gray-500 text-center max-w-32">{item.desc}</p>
                          </div>
                          {i < 5 && (
                            <div className="hidden md:block">
                              <ArrowRight className="w-8 h-8 text-orange-400 animate-pulse" />
                            </div>
                          )}
                        </React.Fragment>
                      ))
                    )}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-12 text-center">
                  <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h3>
                    <p className="text-gray-600 mb-6">Join thousands of students who have transformed their careers with us.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <button className="px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Start Application
                      </button>
                      <button className="px-8 py-3 bg-white border-2 border-orange-600 text-orange-600 rounded-xl hover:bg-orange-50 transition-all duration-300 font-bold">
                        Download Brochure
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Career & Placement Section */}
            <section id="career" className="scroll-mt-24">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">CAREER & Placement</h2>
                <div className="space-y-4 mb-6">
                  {university.university_career_stats && university.university_career_stats.length > 0 ? (
                    university.university_career_stats
                      .sort((a, b) => a.display_order - b.display_order)
                      .map((stat, i) => (
                        <div key={i} className="border-b border-gray-200 pb-2">
                          <p className="text-gray-700">• {stat.stat_label}: {stat.stat_value}</p>
                        </div>
                      ))
                  ) : (
                    <>
                      <div className="border-b border-gray-200 pb-2">
                        <p className="text-gray-700">• Placement Rate: {university.placement_rate || 90}%+</p>
                      </div>
                      <div className="border-b border-gray-200 pb-2">
                        <p className="text-gray-700">• Average Package: {university.average_package || '₹8L+'}</p>
                      </div>
                      <div className="border-b border-gray-200 pb-2">
                        <p className="text-gray-700">• Top Recruiters: {university.top_recruiters_count || 500}+ Companies</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* Hiring Partners Section */}
            <section id="partners" className="scroll-mt-24">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Hiring Partners</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
                  {university.university_hiring_partners && university.university_hiring_partners.length > 0 ? (
                    university.university_hiring_partners
                      .sort((a, b) => a.display_order - b.display_order)
                      .map((partner, i) => (
                        <div
                          key={i}
                          className="aspect-square border-2 border-gray-300 rounded-lg flex items-center justify-center p-2 overflow-hidden group cursor-pointer"
                          title={partner.partner_name}
                          onClick={() => partner.website_url && window.open(partner.website_url, '_blank')}
                        >
                          {partner.logo_url ? (
                            <img
                              src={partner.logo_url}
                              alt={partner.partner_name}
                              className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                            />
                          ) : (
                            <span className="text-gray-400 text-xs text-center font-medium">{partner.partner_name}</span>
                          )}
                        </div>
                      ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-500">No hiring partners information available</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="scroll-mt-24">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                {university.faq && university.faq.length > 0 ? (
                  <div className="space-y-3">
                    {university.faq.map((item, i) => (
                      <div
                        key={i}
                        className="border border-gray-300 rounded-lg overflow-hidden hover:border-blue-400 transition-colors"
                      >
                        <button
                          onClick={() => toggleFaq(i)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium text-gray-900 pr-4 flex items-center gap-2">
                            <span className="text-blue-600 font-bold">{i + 1}.</span>
                            {item.q || item.question}
                          </span>
                          {expandedFaq === i ? (
                            <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        {expandedFaq === i && (
                          <div className="px-4 pb-4 border-t border-gray-200 bg-gradient-to-br from-blue-50 to-gray-50">
                            <p className="text-gray-700 leading-relaxed pt-4 whitespace-pre-wrap">
                              {item.a || item.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No FAQs available yet</p>
                    <p className="text-gray-400 text-sm mt-2">FAQs will appear here once added from the admin panel</p>
                  </div>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetails;
