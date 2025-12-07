import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { getCourses, getUniversities } from "../../lib/supabase";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false);
  const [showUniversitiesDropdown, setShowUniversitiesDropdown] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchCoursesAndUniversities();
  }, []);

  const fetchCoursesAndUniversities = async () => {
    try {
      const { data: coursesData } = await getCourses();
      const { data: universitiesData } = await getUniversities();
      
      if (coursesData) setCourses(coursesData);
      if (universitiesData) setUniversities(universitiesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = ["Home", "About", "Courses", "Universities", "Marketplace"];

  const handleNavigate = (text) => {
    const path = text === "Home" ? "/" : `/${text.toLowerCase()}`;
    navigate(path);
    setIsOpen(false);
    setShowCoursesDropdown(false);
    setShowUniversitiesDropdown(false);
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
    setShowCoursesDropdown(false);
    setIsOpen(false);
  };

  const handleUniversityClick = (universityCode) => {
    navigate(`/university/${universityCode}`);
    setShowUniversitiesDropdown(false);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 hover:opacity-90 transition-all duration-300 cursor-pointer group" 
            onClick={() => handleNavigate("Home")}
          >
            <img src={logo} alt="Logo" className="h-10 w-auto group-hover:scale-105 transition-transform" />
            <div className="text-lg font-bold text-gray-900">
              ANTECHOS INDIA
              <div className="text-xs text-gray-600 font-normal tracking-wide">
                XI SERVICES PRIVATE LIMITED
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((text, idx) => {
              if (text === "Courses") {
                return (
                  <div 
                    key={idx}
                    className="relative group"
                    onMouseEnter={() => setShowCoursesDropdown(true)}
                    onMouseLeave={() => setShowCoursesDropdown(false)}
                  >
                    <button
                      onClick={() => handleNavigate(text)}
                      className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      <span>{text}</span>
                      <ChevronDown size={16} className={`transition-transform duration-200 ${showCoursesDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Courses Dropdown */}
                    {showCoursesDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 py-3 max-h-96 overflow-y-auto">
                        <div className="px-4 py-2 border-b border-gray-200">
                          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Available Courses</h3>
                        </div>
                        {courses.length > 0 ? (
                          courses.map((course) => (
                            <button
                              key={course.id}
                              onClick={() => handleCourseClick(course.id)}
                              className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-150 border-b border-gray-100 last:border-0"
                            >
                              <div className="font-semibold text-gray-800 text-sm">{course.title}</div>
                              <div className="text-xs text-gray-500 mt-1">{course.category} • {course.duration}</div>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-sm text-gray-500">Loading courses...</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              } else if (text === "Universities") {
                return (
                  <div 
                    key={idx}
                    className="relative group"
                    onMouseEnter={() => setShowUniversitiesDropdown(true)}
                    onMouseLeave={() => setShowUniversitiesDropdown(false)}
                  >
                    <button
                      onClick={() => handleNavigate(text)}
                      className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                    >
                      <span>{text}</span>
                      <ChevronDown size={16} className={`transition-transform duration-200 ${showUniversitiesDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Universities Dropdown */}
                    {showUniversitiesDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 py-3 max-h-96 overflow-y-auto">
                        <div className="px-4 py-2 border-b border-gray-200">
                          <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Partner Universities</h3>
                        </div>
                        {universities.length > 0 ? (
                          universities.map((university) => (
                            <button
                              key={university.id}
                              onClick={() => handleUniversityClick(university.code || university.id)}
                              className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-150 border-b border-gray-100 last:border-0"
                            >
                              <div className="font-semibold text-gray-800 text-sm">{university.name}</div>
                              <div className="text-xs text-gray-500 mt-1">{university.location}</div>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-sm text-gray-500">Loading universities...</div>
                        )}
                      </div>
                    )}
                  </div>
                );
              } else {
                return (
                  <button
                    key={idx}
                    onClick={() => handleNavigate(text)}
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                  >
                    {text}
                  </button>
                );
              }
            })}
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-xl">
          <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {menuItems.map((item, i) => {
              if (item === "Courses") {
                return (
                  <div key={i} className="space-y-2">
                    <button
                      onClick={() => handleNavigate(item)}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all font-medium"
                    >
                      {item}
                    </button>
                    <div className="pl-4 space-y-1">
                      {courses.slice(0, 5).map((course) => (
                        <button
                          key={course.id}
                          onClick={() => handleCourseClick(course.id)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all"
                        >
                          {course.title}
                        </button>
                      ))}
                      {courses.length > 5 && (
                        <button
                          onClick={() => handleNavigate("Courses")}
                          className="w-full text-left px-3 py-2 text-xs text-blue-600 hover:text-blue-700"
                        >
                          View all courses →
                        </button>
                      )}
                    </div>
                  </div>
                );
              } else if (item === "Universities") {
                return (
                  <div key={i} className="space-y-2">
                    <button
                      onClick={() => handleNavigate(item)}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all font-medium"
                    >
                      {item}
                    </button>
                    <div className="pl-4 space-y-1">
                      {universities.slice(0, 5).map((university) => (
                        <button
                          key={university.id}
                          onClick={() => handleUniversityClick(university.code || university.id)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all"
                        >
                          {university.name}
                        </button>
                      ))}
                      {universities.length > 5 && (
                        <button
                          onClick={() => handleNavigate("Universities")}
                          className="w-full text-left px-3 py-2 text-xs text-blue-600 hover:text-blue-700"
                        >
                          View all universities →
                        </button>
                      )}
                    </div>
                  </div>
                );
              } else {
                return (
                  <button
                    key={i}
                    onClick={() => handleNavigate(item)}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all font-medium"
                  >
                    {item}
                  </button>
                );
              }
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
