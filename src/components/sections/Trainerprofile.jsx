import {
  Award,
  BookOpen,
  Briefcase,
  ChevronLeft,
  Clock,
  Download,
  FileText,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTrainerById } from "../../data/dataservice";

const TrainerProfile = () => {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchTrainer = async () => {
      try {
        const data = await getTrainerById(Number(id));
        setTrainer(data);
      } catch (error) {
        console.error("Error fetching trainer:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrainer();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading trainer profile...</p>
      </div>
    </div>
  );
  
  if (!trainer) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Trainer Not Found</h1>
        <p className="text-gray-600 mb-4">The trainer you're looking for doesn't exist.</p>
        <Link to="/marketplace" className="text-blue-600 hover:underline">
          Back to Marketplace
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <Link
            to="/marketplace"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> Back to Marketplace
          </Link>
          
          <div className="flex flex-col md:flex-row items-start gap-6">
            <img
              src={trainer.photo}
              alt={trainer.name}
              className="w-32 h-32 rounded-lg object-cover border border-gray-200 shadow-sm"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{trainer.name}</h1>
              <p className="text-xl text-blue-600 mb-3">{trainer.profile}</p>
              <p className="text-gray-700 mb-4">{trainer.bio}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{trainer.ratings}</span>
                  <span className="text-gray-600">({trainer.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{trainer.location}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  <span>{trainer.experience}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Contact Trainer
                </button>
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  View Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            <SidebarSection title="Quick Info" icon={<Users className="mr-2 h-5 w-5 text-blue-600" />}>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Fee:</span>
                  <span className="ml-2 font-semibold text-gray-900">{trainer.fee}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Availability:</span>
                  <span className="ml-2 font-semibold text-gray-900">{trainer.availability}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Industry:</span>
                  <span className="ml-2 font-semibold text-gray-900">{trainer.industry}</span>
                </div>
              </div>
            </SidebarSection>
            
            <SidebarList title="Expertise" icon={<BookOpen className="mr-2 h-5 w-5 text-blue-600" />} items={trainer.expertise} />
            <SidebarList title="Languages" icon={<Globe className="mr-2 h-5 w-5 text-blue-600" />} items={trainer.languages} />
            <SidebarList title="Skills" icon={<Award className="mr-2 h-5 w-5 text-blue-600" />} items={trainer.skills?.slice(0, 8)} />
            
            <SidebarSection title="Contact Info" icon={<Phone className="mr-2 h-5 w-5 text-blue-600" />}>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-600">Email:</span>
                  <a href={`mailto:${trainer.contact.email}`} className="ml-2 text-blue-600 hover:underline">
                    {trainer.contact.email}
                  </a>
                </p>
                <p className="text-sm">
                  <span className="text-gray-600">Phone:</span>
                  <a href={`tel:${trainer.contact.phone}`} className="ml-2 text-blue-600 hover:underline">
                    {trainer.contact.phone}
                  </a>
                </p>
                {trainer.contact.linkedin && (
                  <p className="text-sm">
                    <span className="text-gray-600">LinkedIn:</span>
                    <a href={trainer.contact.linkedin} className="ml-2 text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                      View Profile
                    </a>
                  </p>
                )}
              </div>
            </SidebarSection>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed">{trainer.about}</p>
            </div>

            {/* Certifications Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="mr-2 h-5 w-5 text-blue-600" />
                Certifications
              </h2>
              <div className="grid gap-3">
                {trainer.certifications.map((cert, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="font-medium text-gray-900">{cert}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Star className="mr-2 h-5 w-5 text-blue-600" />
                Achievements
              </h2>
              <div className="space-y-3">
                {trainer.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                    <p className="text-gray-700">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects Section */}
            {trainer.projects && trainer.projects.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-blue-600" />
                  Projects
                </h2>
                <div className="grid gap-6">
                  {trainer.projects.map((project, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-700 mb-3">{project.description}</p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.impact && (
                        <p className="text-sm text-green-600 font-medium">Impact: {project.impact}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Courses Section */}
            {trainer.courses && trainer.courses.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
                  Courses & Training
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {trainer.courses.map((course, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-gray-700 text-sm mb-2">{course.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Mode: {course.mode}</span>
                        {course.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span>{course.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Section */}
            {trainer.education && trainer.education.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-blue-600" />
                  Education
                </h2>
                <div className="space-y-4">
                  {trainer.education.map((edu, idx) => (
                    <div key={idx} className="border-l-4 border-blue-600 pl-4">
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700">{edu.institution}</p>
                      <p className="text-sm text-gray-600">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonials Section */}
            {trainer.testimonials && trainer.testimonials.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5 text-blue-600" />
                  Testimonials
                </h2>
                <div className="space-y-4">
                  {trainer.testimonials.map((testimonial, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-600">
                      <p className="text-gray-700 italic mb-3">"{testimonial.text}"</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">{testimonial.position}</p>
                        </div>
                        {testimonial.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{testimonial.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarSection = ({ title, icon, children }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-3">{icon} {title}</h3>
    <div className="text-gray-700 text-sm">{children}</div>
  </div>
);

const SidebarList = ({ title, icon, items }) => (
  <SidebarSection title={title} icon={icon}>
    <div className="space-y-2">
      {items && items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></div>
          <span className="text-gray-700 text-sm">{item}</span>
        </div>
      ))}
    </div>
  </SidebarSection>
);

export default TrainerProfile;