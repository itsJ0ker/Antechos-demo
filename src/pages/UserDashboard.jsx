import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../contexts/UserAuthContext";
import { 
  MdDashboard, 
  MdSchool, 
  MdBookmark, 
  MdPerson, 
  MdSettings, 
  MdLogout,
  MdNotifications,
  MdTrendingUp,
  MdAssignment,
  MdCalendarToday,
  MdChat
} from "react-icons/md";
import { FaGraduationCap, FaChartLine, FaClock, FaTrophy, FaCertificate } from "react-icons/fa";

const UserDashboard = () => {
  const { user, logout, profile } = useUserAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Component is already protected by ProtectedUserRoute
    // No need to check authentication here
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: MdDashboard },
    { id: "courses", label: "My Courses", icon: MdSchool },
    { id: "bookmarks", label: "Bookmarks", icon: MdBookmark },
    { id: "assignments", label: "Assignments", icon: MdAssignment },
    { id: "certificates", label: "Certificates", icon: FaCertificate },
    { id: "profile", label: "Profile", icon: MdPerson },
    { id: "settings", label: "Settings", icon: MdSettings },
  ];

  const stats = [
    { label: "Courses Enrolled", value: "12", icon: FaGraduationCap, color: "bg-blue-500" },
    { label: "Completed", value: "8", icon: FaTrophy, color: "bg-green-500" },
    { label: "In Progress", value: "4", icon: FaClock, color: "bg-yellow-500" },
    { label: "Certificates", value: "6", icon: FaCertificate, color: "bg-purple-500" },
  ];

  const recentCourses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      progress: 75,
      instructor: "John Doe",
      nextLesson: "React Hooks Advanced",
      dueDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Data Science with Python",
      progress: 45,
      instructor: "Jane Smith",
      nextLesson: "Machine Learning Basics",
      dueDate: "2024-01-20"
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      progress: 90,
      instructor: "Mike Johnson",
      nextLesson: "SEO Optimization",
      dueDate: "2024-01-12"
    }
  ];

  const upcomingEvents = [
    { id: 1, title: "Live Coding Session", date: "Jan 10, 2024", time: "2:00 PM" },
    { id: 2, title: "Career Guidance Webinar", date: "Jan 12, 2024", time: "4:00 PM" },
    { id: 3, title: "Project Submission", date: "Jan 15, 2024", time: "11:59 PM" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">
                Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student'}!
              </h1>
              <p className="text-blue-100">Continue your learning journey and achieve your goals.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Courses */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Continue Learning</h2>
              </div>
              <div className="p-6 space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <FaGraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                      <p className="text-sm text-gray-600">Next: {course.nextLesson}</p>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{course.progress}%</p>
                      <p className="text-xs text-gray-500">Due: {course.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
              </div>
              <div className="p-6 space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                    <MdCalendarToday className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "courses":
        return (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentCourses.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
                      <FaGraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">Instructor: {course.instructor}</p>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Continue Learning
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Profile Settings</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <MdPerson className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {user?.user_metadata?.full_name || 'Student'}
                  </h3>
                  <p className="text-gray-600">{user?.email}</p>
                  <button className="text-blue-600 hover:underline text-sm mt-1">
                    Change Profile Picture
                  </button>
                </div>
              </div>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.user_metadata?.full_name || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue={user?.user_metadata?.phone || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {sidebarItems.find(item => item.id === activeTab)?.label}
            </h2>
            <p className="text-gray-600">This section is coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/")}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                ← Back to Home
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <MdNotifications className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <MdChat className="w-6 h-6" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <MdLogout className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;