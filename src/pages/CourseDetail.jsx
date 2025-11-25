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

      // Fetch specializations
      const { data: specsData, error: specsError } = await supabase
        .from('course_specializations')
        .select('*')
        .eq('parent_course_id', courseId)
        .eq('is_active', true)
        .order('display_order');

      if (!specsError) {
        setSpecializations(specsData || []);
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
                  className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow"
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

                  {/* CTA Button */}
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded font-semibold transition-colors">
                    Apply Now
                  </button>
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
      </div>
    </div>
  );
};

export default CourseDetail;
