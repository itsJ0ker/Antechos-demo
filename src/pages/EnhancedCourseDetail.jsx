import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  ArrowLeft,
  GraduationCap,
  Calendar,
  DollarSign,
  Award,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Briefcase,
  BookOpen,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const EnhancedCourseDetail = () => {
  const { universityId, courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    fetchCourseDetails();
  }, [universityId, courseId]);

  const fetchCourseDetails = async () => {
    try {
      // Fetch course details
      const { data: courseData, error: courseError } = await supabase
        .from('university_courses')
        .select('*')
        .eq('id', courseId)
        .eq('university_id', universityId)
        .single();

      if (courseError) throw courseError;
      
      // Parse foundation_curriculum if it exists
      const parseField = (field) => {
        if (typeof field === 'string') {
          try {
            return JSON.parse(field);
          } catch (e) {
            console.error('Error parsing foundation_curriculum:', e);
            return [];
          }
        }
        return field || [];
      };

      const parsedCourse = {
        ...courseData,
        foundation_curriculum: parseField(courseData.foundation_curriculum)
      };
      
      setCourse(parsedCourse);

      // Fetch university details
      const { data: uniData } = await supabase
        .from('universities')
        .select('name, image_url')
        .eq('id', universityId)
        .single();
      
      setUniversity(uniData);

      // Fetch specializations
      const { data: specsData, error: specsError } = await supabase
        .from('course_specializations')
        .select('*')
        .eq('parent_course_id', courseId)
        .eq('is_active', true)
        .order('display_order');

      if (!specsError && specsData) {
        // Parse JSON fields if they're stored as strings
        const parsedSpecs = specsData.map(spec => {
          const parseField = (field) => {
            if (typeof field === 'string') {
              try {
                return JSON.parse(field);
              } catch (e) {
                console.error('Error parsing field:', e);
                return [];
              }
            }
            return field || [];
          };

          return {
            ...spec,
            curriculum: parseField(spec.curriculum),
            specialization_program_highlights: parseField(spec.specialization_program_highlights),
            program_highlights: parseField(spec.program_highlights),
            industry_insight_stats: parseField(spec.industry_insight_stats),
            career_paths: parseField(spec.career_paths)
          };
        });
        setSpecializations(parsedSpecs);
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Carousel navigation functions
  const nextSlide = () => {
    const maxSlide = Math.max(0, specializations.length - itemsPerView);
    setCurrentSlide(prev => {
      const newSlide = Math.min(prev + 1, maxSlide);
      console.log('Next slide:', { prev, newSlide, maxSlide, itemsPerView, totalSpecs: specializations.length });
      return newSlide;
    });
  };

  const prevSlide = () => {
    setCurrentSlide(prev => {
      const newSlide = Math.max(prev - 1, 0);
      console.log('Prev slide:', { prev, newSlide, itemsPerView, totalSpecs: specializations.length });
      return newSlide;
    });
  };

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3); // lg: 3 items
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2); // md: 2 items
      } else {
        setItemsPerView(1); // sm: 1 item
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Reset carousel when specializations change
  useEffect(() => {
    setCurrentSlide(0);
  }, [specializations]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="flex items-start gap-6">
            {university?.image_url && (
              <img
                src={university.image_url}
                alt={university.name}
                className="w-20 h-20 object-cover rounded-lg border border-gray-300"
              />
            )}
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">{university?.name}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {course.name || course.course_name}
              </h1>
              {course.description && (
                <p className="text-gray-600">{course.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Program Overview */}
        {course.description && (
          <div className="bg-white border border-gray-300 rounded-lg p-6 overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Program Overview</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
              {course.description}
            </p>
          </div>
        )}

        {/* Program Highlights - Course Level */}
        {course.program_highlights && Array.isArray(course.program_highlights) && course.program_highlights.length > 0 && (
          <div className="bg-white border border-gray-300 rounded-lg p-6 overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {course.program_highlights.map((highlight, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow overflow-hidden">
                  {highlight.image_url && (
                    <div className="mb-4 flex justify-center">
                      <img
                        src={highlight.image_url}
                        alt={highlight.title}
                        className="h-16 w-auto object-contain cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => setZoomedImage({ url: highlight.image_url, title: highlight.title })}
                      />
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900 mb-2 text-center break-words">
                    {highlight.title}
                  </h3>
                  {highlight.description && (
                    <p className="text-sm text-gray-600 text-center break-words">
                      {highlight.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Foundation Curriculum - Semester 1 & 2 (From Course Level) */}
        {course && (
          <div className="bg-white border border-gray-300 rounded-lg p-6 overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Foundation Curriculum</h2>
                <p className="text-gray-600">Common foundation semesters for all specializations</p>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                📚 These foundation semesters provide the core knowledge base that all specializations build upon.
              </p>
            </div>

            {course.foundation_curriculum && Array.isArray(course.foundation_curriculum) && course.foundation_curriculum.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {course.foundation_curriculum.map((sem, idx) => (
                  <div key={idx} className="border border-gray-300 rounded-lg p-4 overflow-hidden bg-gradient-to-br from-blue-50 to-white">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {sem.semester}
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 break-words">{sem.semester}</h3>
                    </div>
                    {sem.description && (
                      <p className="text-sm text-gray-600 mb-3 break-words">{sem.description}</p>
                    )}
                    {sem.subjects && Array.isArray(sem.subjects) && sem.subjects.length > 0 ? (
                      <ul className="space-y-2">
                        {sem.subjects.map((subject, subIdx) => (
                          <li key={subIdx} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="break-words">{subject}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No subjects defined yet</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-2">Foundation curriculum not yet defined</p>
                <p className="text-sm text-gray-500">The foundation semesters will be added by the course administrator</p>
              </div>
            )}
          </div>
        )}



        {/* Available Specializations Section */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 overflow-hidden">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Available Specializations
            </h2>
            <p className="text-gray-600">
              Choose from our range of specialized programs to customize your learning path
            </p>
          </div>

          {specializations.length > 0 ? (
            <div className="relative">
              {/* Carousel Navigation */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    Showing {Math.min(itemsPerView, specializations.length - currentSlide)} of {specializations.length} specializations
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className={`p-2 rounded-lg border transition-colors ${
                      currentSlide === 0
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    disabled={currentSlide >= specializations.length - itemsPerView}
                    className={`p-2 rounded-lg border transition-colors ${
                      currentSlide >= specializations.length - itemsPerView
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Carousel Container */}
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${(currentSlide * 100) / itemsPerView}%)`,
                  }}
                >
                  {specializations.map((spec) => (
                    <div
                      key={spec.id}
                      className="flex-shrink-0 px-3"
                      style={{ width: `${100 / itemsPerView}%` }}
                    >
                      <div
                        onClick={() => setSelectedSpec(spec)}
                        className={`border-2 rounded-lg p-6 cursor-pointer transition-all h-full ${
                          selectedSpec?.id === spec.id
                            ? 'border-blue-600 bg-blue-50 shadow-lg'
                            : 'border-gray-300 hover:border-blue-400 hover:shadow-lg'
                        }`}
                      >
                        {spec.image_url && (
                          <div className="mb-4">
                            <img
                              src={spec.image_url}
                              alt={spec.name}
                              className="w-full h-40 object-cover rounded-lg"
                            />
                          </div>
                        )}

                        <h3 className="text-lg font-bold text-gray-900 mb-3 break-words">
                          {spec.name}
                        </h3>

                        {spec.description && (
                          <p className="text-sm text-gray-600 mb-4 line-clamp-3 break-words">
                            {spec.description}
                          </p>
                        )}

                        <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                          {spec.duration && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Duration
                              </span>
                              <span className="font-semibold text-gray-900">{spec.duration}</span>
                            </div>
                          )}
                          {spec.fees && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                Fees
                              </span>
                              <span className="font-semibold text-blue-600">{spec.fees}</span>
                            </div>
                          )}
                        </div>

                        {spec.eligibility && (
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-gray-700 mb-1">Eligibility</p>
                            <p className="text-sm text-gray-600">{spec.eligibility}</p>
                          </div>
                        )}

                        {selectedSpec?.id === spec.id && (
                          <div className="mt-4 pt-4 border-t border-blue-200">
                            <p className="text-sm font-semibold text-blue-600 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              Selected
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Dots Indicator */}
              {specializations.length > itemsPerView && (
                <div className="flex justify-center mt-6 gap-2">
                  {Array.from({ length: Math.max(0, specializations.length - itemsPerView + 1) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        currentSlide === index
                          ? 'bg-blue-600'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No specializations available</p>
            </div>
          )}
        </div>

        {/* Specialization Details (when selected) */}
        {selectedSpec && (
          <>
            {/* About Specialization */}
            <div className="bg-white border border-gray-300 rounded-lg p-6 overflow-hidden">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 break-words">
                About {selectedSpec.name}
              </h2>
              {selectedSpec.program_overview && (
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                    {selectedSpec.program_overview}
                  </p>
                </div>
              )}
              {selectedSpec.description && (
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                  {selectedSpec.description}
                </p>
              )}
            </div>

            {/* Specialization Program Highlights with Images */}
            {selectedSpec.specialization_program_highlights && Array.isArray(selectedSpec.specialization_program_highlights) && selectedSpec.specialization_program_highlights.length > 0 && (
              <div className="bg-white border border-gray-300 rounded-lg p-6 overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedSpec.specialization_program_highlights.map((highlight, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow overflow-hidden">
                      {highlight.image_url && (
                        <div className="mb-4 flex justify-center">
                          <img
                            src={highlight.image_url}
                            alt={highlight.title}
                            className="h-16 w-auto object-contain cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => setZoomedImage({ url: highlight.image_url, title: highlight.title })}
                          />
                        </div>
                      )}
                      <h3 className="font-semibold text-gray-900 mb-2 text-center break-words">
                        {highlight.title}
                      </h3>
                      {highlight.description && (
                        <p className="text-sm text-gray-600 text-center break-words">
                          {highlight.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Industry Insight */}
            {selectedSpec.industry_insight_content && (
              <div className="bg-white border border-gray-300 rounded-lg p-6 overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 break-words">
                  {selectedSpec.industry_insight_title || 'Industry Insight'}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap break-words">
                  {selectedSpec.industry_insight_content}
                </p>
                
                {selectedSpec.industry_insight_stats && selectedSpec.industry_insight_stats.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedSpec.industry_insight_stats.map((stat, idx) => (
                      <div key={idx} className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                        <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Core of Specialization - Program Highlights */}
            {selectedSpec.program_highlights && selectedSpec.program_highlights.length > 0 && (
              <div className="bg-white border border-gray-300 rounded-lg p-6 overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 break-words">
                  Core of {selectedSpec.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedSpec.program_highlights.map((highlight, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 break-words">{highlight.title}</h3>
                        <p className="text-sm text-gray-600 break-words">{highlight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specialization Curriculum - Semester 3+ (Specific to selected specialization) */}
            {selectedSpec.curriculum && Array.isArray(selectedSpec.curriculum) && selectedSpec.curriculum.length > 0 && (
              <div className="bg-white border border-gray-300 rounded-lg p-6 overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 break-words">
                      Specialization Curriculum - {selectedSpec.name}
                    </h2>
                    <p className="text-gray-600">Advanced courses specific to this specialization (Semester 3+)</p>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-purple-800">
                    🎯 These advanced semesters focus on specialized knowledge and skills specific to {selectedSpec.name}.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedSpec.curriculum.map((sem, idx) => (
                    <div key={idx} className="border border-purple-300 rounded-lg p-4 bg-gradient-to-br from-purple-50 to-white overflow-hidden">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
                          SPEC
                        </div>
                        <h3 className="font-bold text-lg text-gray-900 break-words">{sem.semester}</h3>
                      </div>
                      {sem.description && (
                        <p className="text-sm text-gray-600 mb-3 break-words">{sem.description}</p>
                      )}
                      {sem.subjects && Array.isArray(sem.subjects) && sem.subjects.length > 0 ? (
                        <ul className="space-y-2">
                          {sem.subjects.map((subject, subIdx) => (
                            <li key={subIdx} className="flex items-start gap-2 text-sm text-gray-700">
                              <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                              <span className="break-words">{subject}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500 italic">No subjects defined yet</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Career Paths */}
            {selectedSpec.career_paths && selectedSpec.career_paths.length > 0 && (
              <div className="bg-white border border-gray-300 rounded-lg p-6 overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Career Paths</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedSpec.career_paths.map((career, idx) => (
                    <div key={idx} className="border border-gray-300 rounded-lg p-4 overflow-hidden">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-2 break-words">{career.title}</h3>
                          <p className="text-sm text-gray-600 mb-2 break-words">{career.description}</p>
                          {career.salary_range && (
                            <p className="text-sm font-semibold text-green-600 break-words">
                              {career.salary_range}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Support & Alumni */}
            {(selectedSpec.career_support || selectedSpec.alumni_network) && (
              <div className="bg-white border border-gray-300 rounded-lg p-6 overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Support & Alumni</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedSpec.career_support && (
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="break-words">Career Support</span>
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                        {selectedSpec.career_support}
                      </p>
                    </div>
                  )}
                  {selectedSpec.alumni_network && (
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="break-words">Alumni Network</span>
                      </h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                        {selectedSpec.alumni_network}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Career Levels */}
            {(selectedSpec.entry_level_info || selectedSpec.mid_level_info || selectedSpec.senior_level_info) && (
              <div className="bg-white border border-gray-300 rounded-lg p-6 overflow-hidden">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Career Progression</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedSpec.entry_level_info && (
                    <div className="border border-gray-300 rounded-lg p-4 overflow-hidden">
                      <h3 className="font-semibold text-gray-900 mb-3">Entry Level</h3>
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                        {selectedSpec.entry_level_info}
                      </p>
                    </div>
                  )}
                  {selectedSpec.mid_level_info && (
                    <div className="border border-gray-300 rounded-lg p-4 overflow-hidden">
                      <h3 className="font-semibold text-gray-900 mb-3">Mid Level</h3>
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                        {selectedSpec.mid_level_info}
                      </p>
                    </div>
                  )}
                  {selectedSpec.senior_level_info && (
                    <div className="border border-gray-300 rounded-lg p-4 overflow-hidden">
                      <h3 className="font-semibold text-gray-900 mb-3">Senior Level</h3>
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                        {selectedSpec.senior_level_info}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Book Your Seat */}
            {selectedSpec.booking_enabled && (
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">
                  {selectedSpec.booking_cta_text || 'Book Your Seat Today'}
                </h2>
                <p className="text-blue-100 mb-6">
                  Start your journey towards a successful career in {selectedSpec.name}
                </p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Apply Now
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg p-4">
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
            <div className="flex flex-col items-center">
              <img
                src={zoomedImage.url}
                alt={zoomedImage.title}
                className="max-w-full max-h-[80vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              {zoomedImage.title && (
                <p className="mt-4 text-lg font-semibold text-gray-900 text-center">
                  {zoomedImage.title}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedCourseDetail;
