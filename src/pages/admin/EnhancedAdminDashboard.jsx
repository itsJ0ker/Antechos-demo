import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  MessageSquare, 
  LogOut,
  Settings,
  Award,
  Building,
  Briefcase,
  Star,
  Menu,
  X,
  Home,
  DollarSign,
  FileText,
  Image as ImageIcon,
  TrendingUp,
  UserCheck,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { safeLoadStats } from '../../utils/authFix';
import { useAuth } from '../../contexts/SimpleAuth';
import EnhancedUniversityManager from '../../components/admin/EnhancedUniversityManager';
import UniversityPageManager from '../../components/admin/UniversityPageManager';
import AccreditationManager from '../../components/admin/AccreditationManager';
import HiringPartnersManager from '../../components/admin/HiringPartnersManager';
import CourseManager from '../../components/admin/CourseManager';
import TrainerManager from '../../components/admin/TrainerManager';
import WorkforceManager from '../../components/admin/WorkforceManager';
import TestimonialManager from '../../components/admin/TestimonialManager';
import EnquiryManager from '../../components/admin/EnquiryManager';
import AnalyticsDashboard from '../../components/admin/AnalyticsDashboard';
import BannerManager from '../../components/admin/BannerManager';
import MarketplaceManager from '../../components/admin/MarketplaceManager';
import HomePageManager from '../../components/admin/HomePageManager';
import AboutUsManager from '../../components/admin/AboutUsManager';
import AboutGalleryManager from '../../components/admin/AboutGalleryManager';
import CoursesHeroManager from '../../components/admin/CoursesHeroManager';
import MarketplaceImarticusManager from '../../components/admin/MarketplaceImarticusManager';
import CourseSpecializationsManager from '../../components/admin/CourseSpecializationsManager';
import EnhancedCourseSpecializationsManager from '../../components/admin/EnhancedCourseSpecializationsManager';
import UnifiedUniversitySpecializationsManager from '../../components/admin/UnifiedUniversitySpecializationsManager';
import MarketplaceRedesignManager from '../../components/admin/MarketplaceRedesignManager';
import CourseDetailManager from '../../components/admin/CourseDetailManager';
import CourseDetailTest from '../../components/admin/CourseDetailTest';
import SimpleCourseDetailManager from '../../components/admin/SimpleCourseDetailManager';
import DatabaseTest from '../../components/admin/DatabaseTest';
import QuickDiagnostic from '../../components/admin/QuickDiagnostic';
import UserManager from '../../components/admin/UserManager';
import UserManagerTest from '../../components/admin/UserManagerTest';
import AdminDashboardDebug from '../../components/debug/AdminDashboardDebug';
import AuthStateDebug from '../../components/debug/AuthStateDebug';
import EmergencyAdminAccess from '../../components/admin/EmergencyAdminAccess';

const EnhancedAdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    courses: 0,
    universities: 0,
    trainers: 0,
    enquiries: 0,
    testimonials: 0,
    users: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      // First check localStorage for admin session (fallback auth)
      const adminLoggedIn = localStorage.getItem('adminLoggedIn');
      const adminEmail = localStorage.getItem('adminEmail');
      
      if (adminLoggedIn === 'true' && adminEmail) {
        console.log('✅ Admin authenticated via localStorage:', adminEmail);
        setUser({ email: adminEmail });
        setAuthError(false);
        setLoading(false);
        return;
      }

      // If no localStorage session, check Supabase auth
      if (!supabase) {
        console.log('Supabase not configured');
        setAuthError(true);
        setLoading(false);
        return;
      }

      console.log('🔍 Checking authentication...');
      
      // Add a 10-second timeout for the entire auth process
      const authTimeout = setTimeout(() => {
        console.log('⏰ Auth timeout - showing emergency access');
        setAuthError(true);
        setLoading(false);
      }, 10000);

      const result = await safeAuthCheck();
      clearTimeout(authTimeout);
      
      if (result.error) {
        console.log('❌ Auth error:', result.error);
        setAuthError(true);
        setLoading(false);
        return;
      }
      
      const currentUser = result.data?.user;
      if (!currentUser) {
        console.log('❌ No user found, showing emergency access');
        setAuthError(true);
        setLoading(false);
        return;
      }

      console.log('✅ User authenticated:', currentUser.email);
      setUser(currentUser);
      setAuthError(false);
      
    } catch (error) {
      console.error('❌ Auth check error:', error);
      setAuthError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      console.log('🔄 Loading dashboard stats...');
      const newStats = await safeLoadStats();
      setStats(newStats);
      console.log('✅ Stats loaded successfully:', newStats);
    } catch (error) {
      console.error('❌ Error loading stats:', error);
      // Set default stats on error
      setStats({
        courses: 0,
        universities: 0,
        trainers: 0,
        enquiries: 0,
        testimonials: 0,
        users: 0,
      });
    }
  };

  const handleLogout = async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
      // Clear local admin session
      localStorage.removeItem('adminLoggedIn');
      localStorage.removeItem('adminEmail');
      localStorage.removeItem('adminLoginTime');
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: Home, color: 'blue' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'cyan' },
    { id: 'debug', label: 'Debug Dashboard', icon: Settings, color: 'red' },
    { id: 'auth-debug', label: 'Auth Debug', icon: UserCheck, color: 'orange' },
    { id: 'users', label: 'User Management', icon: Users, color: 'indigo' },
    { id: 'user-test', label: 'User Test', icon: Settings, color: 'gray' },
    { id: 'banners', label: 'Banners', icon: ImageIcon, color: 'orange' },
    { id: 'homepage', label: 'Home Page', icon: Home, color: 'purple' },
    { id: 'aboutus', label: 'About Us', icon: Users, color: 'green' },
    { id: 'about-gallery', label: 'About Gallery', icon: ImageIcon, color: 'teal' },
    //{ id: 'marketplace', label: 'Marketplace', icon: DollarSign, color: 'blue' },
    //{ id: 'marketplacenew', label: 'Marketplace (New)', icon: DollarSign, color: 'purple' },
    { id: 'marketplaceredesign', label: 'Marketplace Redesign', icon: DollarSign, color: 'rose' },
    { id: 'courseshero', label: 'Courses Hero', icon: FileText, color: 'cyan' },
    //{ id: 'universities', label: 'Universities', icon: Building, color: 'purple' },
    { id: 'university-page', label: 'University Page', icon: GraduationCap, color: 'blue' },
    //{ id: 'courses', label: 'Courses & Fees', icon: BookOpen, color: 'green' },
    { id: 'course-details', label: 'Course Management', icon: FileText, color: 'indigo' },
    //{ id: 'course-test', label: 'Course Test', icon: FileText, color: 'red' },
    //{ id: 'course-simple', label: 'Course Simple', icon: BookOpen, color: 'green' },
    //{ id: 'db-test', label: 'DB Test', icon: Settings, color: 'gray' },
    //{ id: 'diagnostic', label: 'Quick Fix', icon: TrendingUp, color: 'orange' },
    //{ id: 'specializations', label: 'Course Specializations', icon: GraduationCap, color: 'teal' },
    //{ id: 'specializations-enhanced', label: 'Specializations (Enhanced)', icon: GraduationCap, color: 'violet' },
    { id: 'unified-manager', label: 'University & Specializations', icon: Building, color: 'emerald' },
    { id: 'accreditations', label: 'Accreditations', icon: Award, color: 'yellow' },
    { id: 'hiring-partners', label: 'Hiring Partners', icon: Briefcase, color: 'emerald' },
    { id: 'trainers', label: 'Trainers', icon: Users, color: 'pink' },
    { id: 'workforce', label: 'Workforce', icon: Briefcase, color: 'indigo' },
    { id: 'testimonials', label: 'Testimonials', icon: Star, color: 'orange' },
    { id: 'enquiries', label: 'Enquiries', icon: MessageSquare, color: 'red' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">If this takes too long, there might be an authentication issue</p>
        </div>
      </div>
    );
  }

  if (authError) {
    return <EmergencyAdminAccess />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 flex flex-col fixed h-full z-50 shadow-2xl`}>
        {/* Logo & Toggle */}
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Antechos</h1>
                <p className="text-xs text-gray-400">Admin Panel</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* User Info */}
        {sidebarOpen && (
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.email}</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-l-4 border-white'
                    : 'hover:bg-gray-700 border-l-4 border-transparent'
                }`}
                title={!sidebarOpen ? item.label : ''}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {sidebarOpen && (
                  <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-600 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Manage your platform content and settings
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                  <p className="text-xs text-gray-600">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Manual Stats Loading */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Dashboard Statistics</h3>
                  <button
                    onClick={loadStats}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Load Stats
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  Click "Load Stats" to fetch dashboard statistics. This helps identify which query might be causing issues.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <StatCard
                  title="Total Users"
                  value={stats.users}
                  icon={Users}
                  color="indigo"
                  trend="+15%"
                />
                <StatCard
                  title="Total Courses"
                  value={stats.courses}
                  icon={BookOpen}
                  color="blue"
                  trend="+12%"
                />
                <StatCard
                  title="Universities"
                  value={stats.universities}
                  icon={Building}
                  color="purple"
                  trend="+5%"
                />
                <StatCard
                  title="Trainers"
                  value={stats.trainers}
                  icon={Users}
                  color="green"
                  trend="+8%"
                />
                <StatCard
                  title="Enquiries"
                  value={stats.enquiries}
                  icon={MessageSquare}
                  color="red"
                  trend="+23%"
                />
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {menuItems.slice(1).map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all group"
                      >
                        <Icon className="w-8 h-8 text-gray-400 group-hover:text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                          {item.label}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <ActivityItem
                    icon={BookOpen}
                    text="New course added: React Development"
                    time="2 hours ago"
                    color="blue"
                  />
                  <ActivityItem
                    icon={MessageSquare}
                    text="5 new enquiries received"
                    time="4 hours ago"
                    color="red"
                  />
                  <ActivityItem
                    icon={Star}
                    text="New testimonial published"
                    time="1 day ago"
                    color="yellow"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && <AnalyticsDashboard />}
          {activeTab === 'debug' && <AdminDashboardDebug />}
          {activeTab === 'auth-debug' && <AuthStateDebug />}
          {activeTab === 'users' && <UserManager />}
          {activeTab === 'user-test' && <UserManagerTest />}
          {activeTab === 'banners' && <BannerManager />}
          {activeTab === 'homepage' && <HomePageManager />}
          {activeTab === 'aboutus' && <AboutUsManager />}
          {activeTab === 'about-gallery' && <AboutGalleryManager />}
          {activeTab === 'marketplace' && <MarketplaceManager />}
          {activeTab === 'marketplacenew' && <MarketplaceImarticusManager />}
          {activeTab === 'marketplaceredesign' && <MarketplaceRedesignManager />}
          {activeTab === 'courseshero' && <CoursesHeroManager />}
          {activeTab === 'universities' && <EnhancedUniversityManager />}
          {activeTab === 'university-page' && <UniversityPageManager />}
          {activeTab === 'courses' && <CourseManager />}
          {activeTab === 'course-details' && <CourseDetailManager />}
          {activeTab === 'course-test' && <CourseDetailTest />}
          {activeTab === 'course-simple' && <SimpleCourseDetailManager />}
          {activeTab === 'db-test' && <DatabaseTest />}
          {activeTab === 'diagnostic' && <QuickDiagnostic />}
          {activeTab === 'specializations' && <CourseSpecializationsManager />}
          {activeTab === 'specializations-enhanced' && <EnhancedCourseSpecializationsManager />}
          {activeTab === 'unified-manager' && <UnifiedUniversitySpecializationsManager />}
          {activeTab === 'accreditations' && <AccreditationManager />}
          {activeTab === 'hiring-partners' && <HiringPartnersManager />}
          {activeTab === 'trainers' && <TrainerManager />}
          {activeTab === 'workforce' && <WorkforceManager />}
          {activeTab === 'testimonials' && <TestimonialManager />}
          {activeTab === 'enquiries' && <EnquiryManager />}
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    cyan: 'from-cyan-500 to-cyan-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
    yellow: 'from-yellow-500 to-yellow-600',
    pink: 'from-pink-500 to-pink-600',
    indigo: 'from-indigo-500 to-indigo-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${colors[color]} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className="text-sm font-medium text-green-600 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

const ActivityItem = ({ icon: Icon, text, time, color }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    red: 'bg-red-100 text-red-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600',
  };

  return (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`w-10 h-10 ${colors[color]} rounded-lg flex items-center justify-center`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{text}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
};

export default EnhancedAdminDashboard;