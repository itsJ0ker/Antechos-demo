import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  ArrowLeft,
  GraduationCap,
  Calendar,
  DollarSign,
  BookOpen,
  Award,
  Users,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react';

const CourseDetail = () => {
  const { universityId, courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setCourse(courseData);

      // Fetch university details
      const { data: uniData } = await supabase
        .from('universities')
        .select('name, image_url')
        .eq('id', universityId)
        .single();
      
      setUniversity(uniData);

      // Fetch specializations with all enhanced fields
      const { data: specsData, error: specsError } = await supabase
        .from('course_specializations')
        .select('*')
        .eq('parent_course_id', courseId)
        .eq('is_active', true)
        .order('display_order');

      console.log('Frontend - Fetched specs:', specsData);
      console.log('Frontend - Fetch error:', specsError);

      if (!specsError && specsData) {
        // Parse JSON strings to objects
        const parsedSpecs = specsData.map(spec => ({
          ...spec,
          curriculum: typeof spec.curriculum === 'string' ? JSON.parse(spec.curriculum) : spec.curriculum,
          program_highlights: typeof spec.program_highlights === 'string' ? JSON.parse(spec.program_highlights) : spec.program_highlights,
          career_paths: typeof spec.career_paths === 'string' ? JSON.parse(spec.career_paths) : spec.career_paths,
          industry_insight_stats: typeof spec.industry_insight_stats === 'string' ? JSON.parse(spec.industry_insight_stats) : spec.industry_insight_stats
        }));
        
        setSpecializations(parsedSpecs);
        // Auto-select first specialization if available
        if (parsedSpecs.length > 0) {
          console.log('Frontend - Parsed curriculum:', parsedSpecs[0].curriculum);
          setSelectedSpec(parsedSpecs[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
    } finally {
      setLoading(false);
    }
  };

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
            <span>Back to University</span>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Overview */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {course.duration && (
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Duration</p>
                  <p className="font-semibold text-gray-900">{course.duration}</p>
                </div>
              </div>
            )}

            {course.fees && (
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Program Fee</p>
                  <p className="font-semibold text-green-600">{course.fees}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Specializations</p>
                <p className="font-semibold text-gray-900">{specializations.length} Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Program Overview */}
        {selectedSpec?.program_overview && (
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Program Overview</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line break-words">
              {selectedSpec.program_overview}
            </p>
          </div>
        )}

        {/* Industry Insight */}
        {selectedSpec?.industry_insight_content && (
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {selectedSpec.industry_insight_title || 'Industry Insight'}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line break-words">
              {selectedSpec.industry_insight_content}
            </p>
            
            {selectedSpec.industry_insight_stats && Array.isArray(selectedSpec.industry_insight_stats) && selectedSpec.industry_insight_stats.length > 0 && (
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

        {/* Program Highlights */}
        {selectedSpec?.program_highlights && Array.isArray(selectedSpec.program_highlights) && selectedSpec.program_highlights.length > 0 && (
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Highlights</h2>
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

        {/* Specializations */}
        <div className="bg-white border border-gray-300 rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Available Specializations
            </h2>
            <p className="text-gray-600">
              Choose from our range of specialized programs tailored to your career goals
            </p>
          </div>

          {specializations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specializations.map((spec) => (
                <div
                  key={spec.id}
                  onClick={() => setSelectedSpec(spec)}
                  className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                    selectedSpec?.id === spec.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-400 hover:shadow-lg'
                  }`}
                >
                  {/* Specialization Image */}
                  {spec.image_url && (
                    <div className="mb-4">
                      <img
                        src={spec.image_url}
                        alt={spec.name}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Specialization Name */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {spec.name}
                  </h3>

                  {/* Description */}
                  {spec.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {spec.description}
                    </p>
                  )}

                  {/* Details */}
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

                  {/* Eligibility */}
                  {spec.eligibility && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-1">Eligibility</p>
                      <p className="text-sm text-gray-600">{spec.eligibility}</p>
                    </div>
                  )}

                  {selectedSpec?.id === spec.id && (
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <p className="text-sm font-semibold text-blue-600">✓ Selected - Scroll down for details</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No specializations available for this course yet</p>
            </div>
          )}
        </div>

        {/* Course Curriculum */}
        {selectedSpec?.curriculum && Array.isArray(selectedSpec.curriculum) && selectedSpec.curriculum.length > 0 && (
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedSpec.curriculum.map((sem, idx) => (
                <div key={idx} className="border border-gray-300 rounded-lg p-4 break-words">
                  <h3 className="font-bold text-lg text-gray-900 mb-3 break-words">{sem.semester}</h3>
                  {sem.description && (
                    <p className="text-sm text-gray-600 mb-3 break-words">{sem.description}</p>
                  )}
                  {sem.subjects && Array.isArray(sem.subjects) && sem.subjects.length > 0 && (
                    <ul className="space-y-2">
                      {sem.subjects.map((subject, subIdx) => (
                        <li key={subIdx} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="break-words">{subject}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Career Paths */}
        {selectedSpec?.career_paths && Array.isArray(selectedSpec.career_paths) && selectedSpec.career_paths.length > 0 && (
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Career Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedSpec.career_paths.map((career, idx) => (
                <div key={idx} className="border border-gray-300 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-green-600" />
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
        {(selectedSpec?.career_support || selectedSpec?.alumni_network) && (
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Support & Alumni</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedSpec.career_support && (
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    Career Support
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line break-words">
                    {selectedSpec.career_support}
                  </p>
                </div>
              )}
              {selectedSpec.alumni_network && (
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    Alumni Network
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line break-words">
                    {selectedSpec.alumni_network}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Career Levels */}
        {(selectedSpec?.entry_level_info || selectedSpec?.mid_level_info || selectedSpec?.senior_level_info) && (
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Career Progression</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedSpec.entry_level_info && (
                <div className="border border-gray-300 rounded-lg p-4 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-3">Entry Level</h3>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line break-words">
                    {selectedSpec.entry_level_info}
                  </p>
                </div>
              )}
              {selectedSpec.mid_level_info && (
                <div className="border border-gray-300 rounded-lg p-4 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-3">Mid Level</h3>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line break-words">
                    {selectedSpec.mid_level_info}
                  </p>
                </div>
              )}
              {selectedSpec.senior_level_info && (
                <div className="border border-gray-300 rounded-lg p-4 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-3">Senior Level</h3>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line break-words">
                    {selectedSpec.senior_level_info}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Book Your Seat */}
        {selectedSpec?.booking_enabled && (
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
      </div>
    </div>
  );
};

export default CourseDetail;
