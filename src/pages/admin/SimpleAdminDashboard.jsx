import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  MessageSquare, 
  LogOut,
  Eye,
  Edit,
  Trash2,
  Plus,
  Building
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import EnhancedUniversityManager from '../../components/admin/EnhancedUniversityManager';
import AccreditationManager from '../../components/admin/AccreditationManager';

const SimpleAdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    courses: [],
    universities: [],
    trainers: [],
    workforce: [],
    testimonials: [],
    enquiries: [],
    stats: []
  });
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      // Check if supabase is available
      if (!supabase) {
        console.log('Supabase not configured - admin features disabled');
        setLoading(false);
        return;
      }

      // Check if user is logged in
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      if (!currentUser) {
        navigate('/admin/login');
        return;
      }

      // Check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', currentUser.id)
        .single();

      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
      const isUserAdmin = 
        profile?.role === 'admin' || 
        currentUser.email === adminEmail || 
        currentUser.email.includes('admin');

      if (!isUserAdmin) {
        navigate('/admin/access-denied');
        return;
      }

      setUser(currentUser);
      await loadAllData();
    } catch (error) {
      console.error('Auth check error:', error);
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const loadAllData = async () => {
    try {
      const [courses, universities, trainers, workforce, testimonials, enquiries, stats] = await Promise.all([
        supabase.from('courses').select('*').order('created_at', { ascending: false }),
        supabase.from('universities').select('*').order('created_at', { ascending: false }),
        supabase.from('trainers').select('*').order('created_at', { ascending: false }),
        supabase.from('workforce').select('*').order('created_at', { ascending: false }),
        supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
        supabase.from('enquiries').select('*').order('created_at', { ascending: false }),
        supabase.from('statistics').select('*').order('display_order', { ascending: true })
      ]);

      setData({
        courses: courses.data || [],
        universities: universities.data || [],
        trainers: trainers.data || [],
        workforce: workforce.data || [],
        testimonials: testimonials.data || [],
        enquiries: enquiries.data || [],
        stats: stats.data || []
      });
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleDelete = async (table, id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await supabase.from(table).delete().eq('id', id);
      await loadAllData(); // Reload data
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete item');
    }
  };

  const handleToggleStatus = async (table, id, currentStatus) => {
    try {
      await supabase.from(table).update({ is_active: !currentStatus }).eq('id', id);
      await loadAllData(); // Reload data
    } catch (error) {
      console.error('Toggle error:', error);
      alert('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          <Icon className="w-8 h-8" style={{ color }} />
        </div>
      </div>
    </div>
  );

  const DataTable = ({ title, items, columns, tableName }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.slice(0, 10).map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {columns.map((col, j) => (
                  <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900 p-1 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    {item.hasOwnProperty('is_active') && (
                      <button 
                        onClick={() => handleToggleStatus(tableName, item.id, item.is_active)}
                        className="text-orange-600 hover:text-orange-900 p-1 rounded"
                        title={item.is_active ? 'Deactivate' : 'Activate'}
                      >
                        {item.is_active ? '⏸️' : '▶️'}
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(tableName, item.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded"
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'courses', label: 'Courses' },
            { id: 'universities', label: 'Universities' },
            { id: 'enhanced-universities', label: 'Enhanced Universities' },
            { id: 'accreditations', label: 'Accreditations' },
            { id: 'trainers', label: 'Trainers' },
            { id: 'workforce', label: 'Workforce' },
            { id: 'testimonials', label: 'Testimonials' },
            { id: 'enquiries', label: 'Enquiries' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard title="Total Courses" value={data.courses.length} icon={BookOpen} color="#3B82F6" />
              <StatCard title="Universities" value={data.universities.length} icon={GraduationCap} color="#10B981" />
              <StatCard title="Trainers" value={data.trainers.length} icon={Users} color="#F59E0B" />
              <StatCard title="Enquiries" value={data.enquiries.length} icon={MessageSquare} color="#EF4444" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Enquiries</h3>
                <div className="space-y-4">
                  {data.enquiries.slice(0, 5).map((enquiry, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                  {data.stats.map((stat, i) => (
                    <div key={i} className="flex items-center justify-between">
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

        {/* Other Tabs */}
        {activeTab === 'courses' && (
          <DataTable
            title="Courses Management"
            items={data.courses}
            tableName="courses"
            columns={[
              { header: 'Title', key: 'title' },
              { header: 'Category', key: 'category' },
              { header: 'Price', key: 'price', render: (item) => `₹${item.price}` },
              { header: 'Status', key: 'is_active', render: (item) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.is_active ? 'Active' : 'Inactive'}
                </span>
              )}
            ]}
          />
        )}

        {activeTab === 'universities' && (
          <DataTable
            title="Universities Management"
            items={data.universities}
            tableName="universities"
            columns={[
              { header: 'Name', key: 'name' },
              { header: 'Code', key: 'code' },
              { header: 'Location', key: 'location' },
              { header: 'Rating', key: 'rating' },
              { header: 'Status', key: 'is_active', render: (item) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.is_active ? 'Active' : 'Inactive'}
                </span>
              )}
            ]}
          />
        )}

        {activeTab === 'enhanced-universities' && (
          <EnhancedUniversityManager />
        )}

        {activeTab === 'accreditations' && (
          <AccreditationManager />
        )}

        {activeTab === 'trainers' && (
          <DataTable
            title="Trainers Management"
            items={data.trainers}
            tableName="trainers"
            columns={[
              { header: 'Name', key: 'name' },
              { header: 'Profile', key: 'profile_title' },
              { header: 'Industry', key: 'industry' },
              { header: 'Rating', key: 'rating' },
              { header: 'Status', key: 'is_active', render: (item) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.is_active ? 'Active' : 'Inactive'}
                </span>
              )}
            ]}
          />
        )}

        {activeTab === 'workforce' && (
          <DataTable
            title="Workforce Management"
            items={data.workforce}
            tableName="workforce"
            columns={[
              { header: 'Name', key: 'name' },
              { header: 'Profile', key: 'profile_title' },
              { header: 'Industry', key: 'industry' },
              { header: 'Rating', key: 'rating' },
              { header: 'Status', key: 'is_active', render: (item) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.is_active ? 'Active' : 'Inactive'}
                </span>
              )}
            ]}
          />
        )}

        {activeTab === 'testimonials' && (
          <DataTable
            title="Testimonials Management"
            items={data.testimonials}
            tableName="testimonials"
            columns={[
              { header: 'Name', key: 'name' },
              { header: 'Company', key: 'company' },
              { header: 'Rating', key: 'rating' },
              { header: 'Featured', key: 'is_featured', render: (item) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.is_featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {item.is_featured ? 'Featured' : 'Regular'}
                </span>
              )}
            ]}
          />
        )}

        {activeTab === 'enquiries' && (
          <DataTable
            title="Enquiries Management"
            items={data.enquiries}
            tableName="enquiries"
            columns={[
              { header: 'Name', key: 'name' },
              { header: 'Email', key: 'email' },
              { header: 'Course Interest', key: 'course_interest' },
              { header: 'Status', key: 'status', render: (item) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'new' ? 'bg-blue-100 text-blue-800' :
                  item.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {item.status}
                </span>
              )},
              { header: 'Date', key: 'created_at', render: (item) => 
                new Date(item.created_at).toLocaleDateString()
              }
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default SimpleAdminDashboard;