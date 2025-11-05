// src/pages/UniversityDetails.jsx
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import { getUniversityById } from "../../lib/supabase";
import { universityData } from "../../data/universityData";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Award,
  BookOpen,
  DollarSign,
  HelpCircle,
  GraduationCap,
  Star,
  Download,
  Users,
  Calendar,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Phone,
} from "lucide-react";

import img1 from "../../assets/education/1.jpeg";
import img2 from "../../assets/education/2.jpg";
import img3 from "../../assets/education/3.jpg";
import img4 from "../../assets/education/4.jpg";

const UniversityDetails = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        // First try to get from Supabase
        const { data, error } = await getUniversityById(id);
        if (error || !data) {
          console.log('Supabase data not found, using static data');
          // Fallback to static data
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
          setUniversity(data);
        }
      } catch (error) {
        console.error('Error fetching university:', error);
        // Fallback to static data on error
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
  const [activeSection, setActiveSection] = useState("accreditations");
  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const image = [img1, img2, img3, img4];

  const images = university
    ? [university.heroImage || university.image, university.image]
    : [];

  useEffect(() => {
    setIsVisible(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      updateActiveSection();
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const updateActiveSection = () => {
    const sections = [
      "accreditations",
      "about",
      "courses",
      "fee-structure",
      "online-benefits",
      "degree-overview",
      "admission-process",
      "placement",
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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = isMobile ? 80 : 100;
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: "smooth",
      });
      setShowMobileMenu(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-center animate-pulse px-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading university details...</p>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-center px-4">
          <GraduationCap className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-white mx-auto mb-4 opacity-50" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            404
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl">
            University Not Found
          </p>
        </div>
      </div>
    );
  }

  const sections = [
    { id: "accreditations", label: "Accreditations", icon: Award },
    { id: "about", label: "About University", icon: MapPin },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "fee-structure", label: "Fee Structure", icon: DollarSign },
    { id: "online-benefits", label: "Online Benefits", icon: Users },
    { id: "degree-overview", label: "Degree Overview", icon: GraduationCap },
    { id: "admission-process", label: "Admission Process", icon: Calendar },
    { id: "placement", label: "Placement", icon: Briefcase },
    { id: "faq", label: "FAQ", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white border-b border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - University Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {university.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{university.location}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex text-yellow-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-5 h-5 ${star <= Math.floor(university.rating || 4) ? 'fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">{university.rating || 4.0}/5.0</span>
                <span className="text-gray-500">({university.reviewCount || "500+"} Reviews)</span>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Established</p>
                  <p className="font-semibold text-gray-900">{university.keyInfo?.established || "1990"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ranking</p>
                  <p className="font-semibold text-gray-900">{university.keyInfo?.ranking || "NAAC A+"}</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Apply Now
                </button>
                <button className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Brochure
                </button>
              </div>

              {/* Contact Info */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 mb-2">Need assistance with admission?</p>
                <button className="text-blue-600 font-semibold hover:underline">
                  Contact Admissions Team →
                </button>
              </div>
            </div>

            {/* Right Side - University Image */}
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img
                  src={university.image || images[0]}
                  alt={university.name}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Accreditation Badges */}
              {university.approvals && university.approvals.length > 0 && (
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg border">
                    {university.approvals.slice(0, 4).map((approval, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <img
                          src={approval.logo}
                          alt={approval.name}
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    ))}
                    {university.approvals.length > 4 && (
                      <span className="text-xs text-gray-600 ml-2">+{university.approvals.length - 4} more</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isMobile ? (
            <div>
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="w-full py-4 flex items-center justify-between text-gray-700 font-medium"
              >
                <span>
                  {sections.find((s) => s.id === activeSection)?.label || "Navigation"}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    showMobileMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showMobileMenu && (
                <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                          activeSection === section.id
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{section.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <nav className="flex items-center space-x-8 py-4 overflow-x-auto">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <main className="space-y-16">
            {/* Accreditations Section */}
            <section id="accreditations" className="scroll-mt-24">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Accreditations & Recognitions
                  </h2>
                </div>
                <p className="text-gray-600 mb-8">
                  Our university is recognized by leading educational bodies and accreditation agencies.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {university.approvals && university.approvals.map((approval, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="w-16 h-16 mb-3 flex items-center justify-center">
                        <img
                          src={approval.logo}
                          alt={approval.name}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-800 text-center">
                        {approval.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="scroll-mt-24">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    About {university.name}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      {university.about || university.description}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Highlights</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            World-class faculty
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            Industry-relevant curriculum
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            Global recognition
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            Strong alumni network
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Programs Offered</h4>
                        <div className="flex flex-wrap gap-2">
                          {university.programs && university.programs.map((program, i) => (
                            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {program}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Quick Facts</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600">Established</p>
                        <p className="font-semibold">{university.keyInfo?.established || "1990"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-semibold">{university.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Accreditation</p>
                        <p className="font-semibold">{university.keyInfo?.ranking || "NAAC A+"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Campus Size</p>
                        <p className="font-semibold">{university.keyInfo?.campusSize || "Virtual"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Courses Section */}
            <section id="courses" className="scroll-mt-24">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Programs & Courses
                  </h2>
                </div>
                <p className="text-gray-600 mb-8">
                  Explore our comprehensive range of academic programs designed for your success.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {university.courses && university.courses.map((course, i) => (
                    <div
                      key={i}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {course.name}
                        </h3>
                        {course.description && (
                          <p className="text-gray-600 text-sm mb-3">
                            {course.description}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Duration:</span>
                          <span className="font-medium">{course.duration}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Fees:</span>
                          <span className="font-medium text-blue-600">{course.fees}</span>
                        </div>
                      </div>

                      {course.specialization && course.specialization.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">Specializations:</p>
                          <div className="flex flex-wrap gap-1">
                            {course.specialization.slice(0, 3).map((spec, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                {spec}
                              </span>
                            ))}
                            {course.specialization.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                +{course.specialization.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Learn More
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Fee Structure */}
            <section id="fee-structure" className="scroll-mt-24">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Fee Structure
                  </h2>
                </div>
                <p className="text-gray-600 mb-8">
                  Transparent and competitive fee structure for all programs.
                </p>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Program</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Fees</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Duration</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Specializations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {university.courses && university.courses.map((course, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">{course.name}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-semibold text-blue-600">{course.fees}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-gray-700">{course.duration}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm text-gray-600">
                              {course.specialization && course.specialization.length > 0 
                                ? `${course.specialization.length} Available`
                                : 'General'
                              }
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Fees may vary based on specialization. EMI options and scholarships are available. 
                    Contact our admissions team for detailed fee structure and payment plans.
                  </p>
                </div>
              </div>
            </section>

            {/* Online Benefits */}
            <section id="online-benefits" className="scroll-mt-24">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Online Learning Benefits
                  </h2>
                </div>
                <p className="text-gray-600 mb-8">
                  Experience flexible, high-quality education designed for modern learners.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      icon: Users,
                      title: "Flexible Learning",
                      desc: "Learn at your own pace",
                    },
                    {
                      icon: Calendar,
                      title: "24/7 Access",
                      desc: "Access materials anytime",
                    },
                    {
                      icon: GraduationCap,
                      title: "Global Recognition",
                      desc: "Internationally recognized degrees",
                    },
                    {
                      icon: Briefcase,
                      title: "Career Support",
                      desc: "Balance work and study",
                    },
                  ].map((benefit, i) => (
                    <div
                      key={i}
                      className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <benefit.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {benefit.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Degree Overview */}
            <section id="degree-overview" className="scroll-mt-24">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Degree Overview
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-600 mb-6">
                      Our degrees are designed to meet global standards and industry requirements.
                    </p>
                    
                    <div className="space-y-4">
                      {[
                        "Globally recognized degrees",
                        "Industry-aligned curriculum",
                        "Flexible learning options",
                        "Expert faculty guidance",
                        "Practical project experience",
                        "Lifetime learning resources",
                        "Strong alumni network",
                        "Career placement support",
                      ].map((point, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                          <span className="text-gray-700">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Degree Features</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Recognition</span>
                        <span className="font-medium">Global</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Format</span>
                        <span className="font-medium">Online/Hybrid</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Support</span>
                        <span className="font-medium">24/7</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Validity</span>
                        <span className="font-medium">Lifetime</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Admission Process */}
            <section id="admission-process" className="scroll-mt-24">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Admission Process
                  </h2>
                </div>
                <p className="text-gray-600 mb-8">
                  Our streamlined admission process makes it easy to start your educational journey.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      step: "1",
                      title: "Application",
                      desc: "Submit your online application form with basic details",
                    },
                    {
                      step: "2",
                      title: "Documentation",
                      desc: "Upload required academic documents and certificates",
                    },
                    {
                      step: "3",
                      title: "Review",
                      desc: "Our admissions team reviews your application",
                    },
                    {
                      step: "4",
                      title: "Enrollment",
                      desc: "Complete fee payment and confirm your enrollment",
                    },
                  ].map((process, i) => (
                    <div key={i} className="text-center">
                      <div className="relative mb-6">
                        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <span className="text-blue-600 text-xl font-bold">
                            {process.step}
                          </span>
                        </div>
                        {i < 3 && (
                          <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {process.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {process.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Placement */}
            <section id="placement" className="scroll-mt-24">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Placement & Career Support
                  </h2>
                </div>
                <p className="text-gray-600 mb-8">
                  We provide comprehensive career support to help you achieve your professional goals.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  {[
                    { number: "90%+", label: "Placement Rate" },
                    { number: "500+", label: "Partner Companies" },
                    { number: "₹8L+", label: "Average Package" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {stat.number}
                      </div>
                      <div className="text-gray-700 font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Career Services</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        Resume building workshops
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        Interview preparation sessions
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        Industry networking events
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        Job placement assistance
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Industry Partners</h4>
                    <p className="text-gray-600 mb-4">
                      We collaborate with leading companies across various industries to provide 
                      our students with excellent career opportunities.
                    </p>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      View All Partners
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-24">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Frequently Asked Questions
                  </h2>
                </div>
                <p className="text-gray-600 mb-8">
                  Find answers to commonly asked questions about our programs and admission process.
                </p>

                <div className="space-y-4">
                  {university.faq && university.faq.map((item, i) => (
                    <div
                      key={i}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFaq(i)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 pr-4">
                          {item.q || item.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                            expandedFaq === i ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-200 ${
                          expandedFaq === i ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        <div className="p-6 pt-0 border-t border-gray-100">
                          <p className="text-gray-700 leading-relaxed">
                            {item.a || item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-blue-600 text-white rounded-lg shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Contact CTA */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs">
          <p className="text-sm text-gray-700 mb-3">Need help with admission?</p>
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
              Call Now
            </button>
            <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors">
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetails;
