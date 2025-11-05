import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  MessageSquare, 
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  LogOut,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase, getStatistics, getAllCourses, getAllUniversities, getAllTrainers, getAllWorkforce, getAllTestimonials, getAllEnquiries } from '../../lib/supabase';
import { useAuth } from '../../contexts/SimpleAuth';
import CourseManager from '../../components/admin/CourseManager';
import UniversityManager from '../../components/admin/UniversityManager';
import TrainerManager from '../../components/admin/TrainerManager';
import WorkforceManager from '../../components/admin/WorkforceManager';
import TestimonialManager from '../../components/admin/TestimonialManager';
import EnquiryManager from '../../components/admin/EnquiryManager';
import NotificationSystem from '../../components/admin/NotificationSystem';

const AdminDashboard = () => {
  const [stats, setStats] = useState([]);
  const [courses, setCourses] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [workforce, setWorkforce] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState('');
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    loadDashboardData();
  }, [user, navigate]);

  const loadDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const [
        statsResult,
        coursesResult,
        universitiesResult,
        trainersResult,
        workforceResult,
        testimonialsResult,
        enquiriesResult
      ] = await Promise.all([
        getStatistics(),
        getAllCourses(),
        getAllUniversities(),
        getAllTrainers(),
        getAllWorkforce(),
        getAllTestimonials(),
        getAllEnquiries()
      ]);

      if (statsResult.error) throw statsResult.error;
      if (coursesResult.error) throw coursesResult.error;
      if (universitiesResult.error) throw universitiesResult.error;
      if (trainersResult.error) throw trainersResult.error;
      if (workforceResult.error) throw workforceResult.error;
      if (testimonialsResult.error) throw testimonialsResult.error;
      if (enquiriesResult.error) throw enquiriesResult.error;

      setStats(statsResult.data || []);
      setCourses(coursesResult.data || []);
      setUniversities(universitiesResult.data || []);
      setTrainers(trainersResult.data || []);
      setWorkforce(workforceResult.data || []);
      setTestimonials(testimonialsResult.data || []);
      setEnquiries(enquiriesResult.data || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDeleteItem = async (table, id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Reload data
      await loadDashboardData();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    }
  };

  const handleToggleStatus = async (table, id, currentStatus) => {
    try {
      const { error } = await supabase
        .from(table)
        .update({ is_active: !currentStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      // Reload data
      await loadDashboardData();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status. Please try again.');
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 border-l-4"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p className="text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              {change}% from last month
            </p>
          )}
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          <Icon className="w-8 h-8" style={{ color }} />
        </div>
      </div>
    </motion.div>
  );

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 rounded-lg font-medium transition-all ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  const DataTable = ({ title, data, columns, tableName }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column.header}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.slice(0, 10).map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button 
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {item.hasOwnProperty('is_active') && (
                      <button 
                        onClick={() => handleToggleStatus(tableName, item.id, item.is_active)}
                        className={`p-1 rounded ${item.is_active ? 'text-orange-600 hover:text-orange-900 hover:bg-orange-50' : 'text-green-600 hover:text-green-900 hover:bg-green-50'}`}
                        title={item.is_active ? 'Deactivate' : 'Activate'}
                      >
                        {item.is_active ? '⏸️' : '▶️'}
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteItem(tableName, item.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NotificationSystem />
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-1 rounded text-sm">
                  {error}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                Welcome, {user?.email?.split('@')[0] || 'Admin'}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('settings')}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {(user?.email || 'A').charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 overflow-x-auto">
          <TabButton
            id="overview"
            label="Overview"
            isActive={activeTab === 'overview'}
            onClick={setActiveTab}
          />
          <TabButton
            id="courses"
            label="Courses"
            isActive={activeTab === 'courses'}
            onClick={setActiveTab}
          />
          <TabButton
            id="universities"
            label="Universities"
            isActive={activeTab === 'universities'}
            onClick={setActiveTab}
          />
          <TabButton
            id="trainers"
            label="Trainers"
            isActive={activeTab === 'trainers'}
            onClick={setActiveTab}
          />
          <TabButton
            id="workforce"
            label="Workforce"
            isActive={activeTab === 'workforce'}
            onClick={setActiveTab}
          />
          <TabButton
            id="testimonials"
            label="Testimonials"
            isActive={activeTab === 'testimonials'}
            onClick={setActiveTab}
          />
          <TabButton
            id="enquiries"
            label="Enquiries"
            isActive={activeTab === 'enquiries'}
            onClick={setActiveTab}
          />
          <TabButton
            id="analytics"
            label="Analytics"
            isActive={activeTab === 'analytics'}
            onClick={setActiveTab}
          />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Courses"
                value={courses.length}
                icon={BookOpen}
                color="#3B82F6"
                change={12}
              />
              <StatCard
                title="Universities"
                value={universities.length}
                icon={GraduationCap}
                color="#10B981"
                change={8}
              />
              <StatCard
                title="Trainers"
                value={trainers.length}
                icon={Users}
                color="#F59E0B"
                change={15}
              />
              <StatCard
                title="Enquiries"
                value={enquiries.length}
                icon={MessageSquare}
                color="#EF4444"
                change={25}
              />
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Resources</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Courses</span>
                    <span className="font-semibold text-green-600">
                      {courses.filter(c => c.is_active).length}/{courses.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Trainers</span>
                    <span className="font-semibold text-green-600">
                      {trainers.filter(t => t.is_active).length}/{trainers.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Workforce</span>
                    <span className="font-semibold text-green-600">
                      {workforce.filter(w => w.is_active).length}/{workforce.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Enquiry Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">New</span>
                    <span className="font-semibold text-blue-600">
                      {enquiries.filter(e => e.status === 'new').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">In Progress</span>
                    <span className="font-semibold text-yellow-600">
                      {enquiries.filter(e => e.status === 'contacted').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Converted</span>
                    <span className="font-semibold text-green-600">
                      {enquiries.filter(e => e.status === 'converted').length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Quality</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Featured Testimonials</span>
                    <span className="font-semibold text-yellow-600">
                      {testimonials.filter(t => t.is_featured).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg Rating</span>
                    <span className="font-semibold text-green-600">
                      {testimonials.length > 0 
                        ? (testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / testimonials.length).toFixed(1)
                        : '0.0'}⭐
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Reviews</span>
                    <span className="font-semibold text-blue-600">
                      {testimonials.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Enquiries</h3>
                <div className="space-y-4">
                  {enquiries.slice(0, 5).map((enquiry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{enquiry.name}</p>
                        <p className="text-sm text-gray-600">{enquiry.course_interest}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        enquiry.status === 'new' ? 'bg-blue-100 text-blue-800' :
                        enquiry.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {enquiry.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Statistics</h3>
                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-600">{stat.metric_name}</span>
                      <span className="font-semibold text-gray-900">
                        {stat.metric_value}{stat.metric_type === 'placement_rate' ? '%' : '+'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <CourseManager />
        )}

        {/* Universities Tab */}
        {activeTab === 'universities' && (
          <UniversityManager />
        )}

        {/* Trainers Tab */}
        {activeTab === 'trainers' && (
          <TrainerManager />
        )}

        {/* Workforce Tab */}
        {activeTab === 'workforce' && (
          <WorkforceManager />
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <TestimonialManager />
        )}

        {/* Enquiries Tab */}
        {activeTab === 'enquiries' && (
          <EnquiryManager />
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Enquiry Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">New</span>
                    <span className="font-semibold text-blue-600">
                      {enquiries.filter(e => e.status === 'new').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contacted</span>
                    <span className="font-semibold text-yellow-600">
                      {enquiries.filter(e => e.status === 'contacted').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Converted</span>
                    <span className="font-semibold text-green-600">
                      {enquiries.filter(e => e.status === 'converted').length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Active Resources</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Trainers</span>
                    <span className="font-semibold text-green-600">
                      {trainers.filter(t => t.is_active).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Workforce</span>
                    <span className="font-semibold text-green-600">
                      {workforce.filter(w => w.is_active).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Featured Testimonials</span>
                    <span className="font-semibold text-yellow-600">
                      {testimonials.filter(t => t.is_featured).length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Course Categories</h4>
                <div className="space-y-2">
                  {[...new Set(courses.map(c => c.category))].slice(0, 4).map(category => (
                    <div key={category} className="flex justify-between">
                      <span className="text-gray-600">{category}</span>
                      <span className="font-semibold text-blue-600">
                        {courses.filter(c => c.category === category).length}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="flex justify-between">
                      <span className="text-gray-600">{rating} Stars</span>
                      <span className="font-semibold text-yellow-600">
                        {testimonials.filter(t => t.rating === rating).length}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  ...enquiries.slice(0, 3).map(e => ({
                    type: 'enquiry',
                    title: `New enquiry from ${e.name}`,
                    subtitle: `Interested in ${e.course_interest}`,
                    time: new Date(e.created_at).toLocaleString(),
                    color: 'blue'
                  })),
                  ...testimonials.slice(0, 2).map(t => ({
                    type: 'testimonial',
                    title: `New testimonial from ${t.name}`,
                    subtitle: `${t.rating} star rating`,
                    time: new Date(t.created_at).toLocaleString(),
                    color: 'green'
                  }))
                ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5).map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 bg-${activity.color}-500`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.subtitle}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Settings</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">User Information</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Email:</strong> {user?.email}</p>
                      <p><strong>Role:</strong> admin</p>
                      <p><strong>Name:</strong> {user?.email?.split('@')[0] || 'Not set'}</p>
                      <p><strong>Last Login:</strong> {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Platform Stats</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Total Courses:</strong> {courses.length}</p>
                      <p><strong>Total Universities:</strong> {universities.length}</p>
                      <p><strong>Total Trainers:</strong> {trainers.length}</p>
                      <p><strong>Total Enquiries:</strong> {enquiries.length}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <button
                    onClick={() => loadDashboardData()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-4"
                  >
                    Refresh Data
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('This will clear all cached data. Continue?')) {
                        localStorage.clear();
                        window.location.reload();
                      }
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Clear Cache
                  </button>
                </div>
              </div>
            </div>

            {/* Database Management */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Database Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{courses.length}</div>
                  <div className="text-sm text-gray-600">Courses</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{universities.length}</div>
                  <div className="text-sm text-gray-600">Universities</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{trainers.length}</div>
                  <div className="text-sm text-gray-600">Trainers</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{workforce.length}</div>
                  <div className="text-sm text-gray-600">Workforce</div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-medium text-gray-900 mb-4">Data Export</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { name: 'Courses', data: courses, filename: 'courses' },
                    { name: 'Universities', data: universities, filename: 'universities' },
                    { name: 'Trainers', data: trainers, filename: 'trainers' },
                    { name: 'Workforce', data: workforce, filename: 'workforce' },
                    { name: 'Testimonials', data: testimonials, filename: 'testimonials' },
                    { name: 'Enquiries', data: enquiries, filename: 'enquiries' }
                  ].map(({ name, data, filename }) => (
                    <button
                      key={name}
                      onClick={() => {
                        if (data.length === 0) {
                          alert(`No ${name.toLowerCase()} data to export`);
                          return;
                        }
                        
                        const headers = Object.keys(data[0]).filter(key => 
                          !key.includes('_at') && typeof data[0][key] !== 'object'
                        );
                        
                        const csvContent = [
                          headers.join(','),
                          ...data.map(item => 
                            headers.map(header => 
                              typeof item[header] === 'string' && item[header].includes(',') 
                                ? `"${item[header]}"` 
                                : item[header] || ''
                            ).join(',')
                          )
                        ].join('\\n');

                        const blob = new Blob([csvContent], { type: 'text/csv' });
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${filename}_export_${new Date().toISOString().split('T')[0]}.csv`;
                        a.click();
                        window.URL.revokeObjectURL(url);
                      }}
                      className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      Export {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">System Health</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Data Integrity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Courses with modules</span>
                      <span className="text-green-600">
                        {courses.filter(c => c.course_modules?.length > 0).length}/{courses.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trainers with skills</span>
                      <span className="text-green-600">
                        {trainers.filter(t => t.trainer_skills?.length > 0).length}/{trainers.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Universities with programs</span>
                      <span className="text-green-600">
                        {universities.filter(u => u.university_programs?.length > 0).length}/{universities.length}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Content Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Published Courses</span>
                      <span className="text-blue-600">
                        {courses.filter(c => c.is_active).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Testimonials</span>
                      <span className="text-blue-600">
                        {testimonials.filter(t => t.is_active).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pending Enquiries</span>
                      <span className="text-yellow-600">
                        {enquiries.filter(e => e.status === 'new').length}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        if (confirm('This will refresh all data from the database. Continue?')) {
                          loadDashboardData();
                        }
                      }}
                      className="w-full px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      Refresh All Data
                    </button>
                    <button
                      onClick={() => {
                        const stats = {
                          courses: courses.length,
                          universities: universities.length,
                          trainers: trainers.length,
                          workforce: workforce.length,
                          testimonials: testimonials.length,
                          enquiries: enquiries.length,
                          timestamp: new Date().toISOString()
                        };
                        
                        const blob = new Blob([JSON.stringify(stats, null, 2)], { type: 'application/json' });
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `admin_report_${new Date().toISOString().split('T')[0]}.json`;
                        a.click();
                        window.URL.revokeObjectURL(url);
                      }}
                      className="w-full px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;