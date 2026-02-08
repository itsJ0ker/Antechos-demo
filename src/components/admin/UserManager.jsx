import { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  UserCheck, 
  UserX, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  BookOpen, 
  Award, 
  Clock,
  MoreVertical,
  Plus,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  Star,
  TrendingUp,
  Activity
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [userStats, setUserStats] = useState({
    total: 0,
    active: 0,
    verified: 0,
    newThisMonth: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    loadUsers();
    loadUserStats();
  }, []);

  useEffect(() => {
    filterAndSortUsers();
  }, [users, searchTerm, filterStatus, sortBy, sortOrder]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      
      // Get users from user_profiles with related data
      const { data: profiles, error: profilesError } = await supabase
        .from('user_profiles')
        .select(`
          *,
          user_course_enrollments(
            id,
            course_id,
            status,
            progress,
            enrolled_at
          ),
          user_achievements(
            id,
            achievement_name,
            points
          ),
          user_sessions(
            id,
            session_start,
            duration_minutes
          )
        `)
        .order('created_at', { ascending: false });

      if (profilesError) {
        console.error('Error loading user profiles:', profilesError);
        return;
      }

      // Try to get auth users data (requires admin access)
      let authUsers = null;
      try {
        const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
        if (!authError) {
          authUsers = authData;
        }
      } catch (error) {
        console.log('Admin auth access not available, using profile data only');
      }

      // Merge auth data with profile data if available
      const mergedUsers = profiles?.map(profile => {
        const authUser = authUsers?.users?.find(u => u.id === profile.user_id);
        return {
          ...profile,
          auth_data: authUser,
          last_sign_in: authUser?.last_sign_in_at,
          email_confirmed: authUser?.email_confirmed_at ? true : false,
          phone_confirmed: authUser?.phone_confirmed_at ? true : false,
          total_enrollments: profile.user_course_enrollments?.length || 0,
          completed_courses: profile.user_course_enrollments?.filter(e => e.status === 'completed').length || 0,
          total_achievements: profile.user_achievements?.length || 0,
          total_points: profile.user_achievements?.reduce((sum, a) => sum + (a.points || 0), 0) || 0,
          recent_activity: profile.user_sessions?.slice(0, 5) || []
        };
      }) || [];

      setUsers(mergedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserStats = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from('user_profiles')
        .select('id, is_active, is_verified, created_at');

      if (error) {
        console.error('Error loading user stats:', error);
        return;
      }

      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const stats = {
        total: profiles?.length || 0,
        active: profiles?.filter(u => u.is_active).length || 0,
        verified: profiles?.filter(u => u.is_verified).length || 0,
        newThisMonth: profiles?.filter(u => new Date(u.created_at) >= thisMonth).length || 0
      };

      setUserStats(stats);
    } catch (error) {
      console.error('Error loading user stats:', error);
    }
  };

  const filterAndSortUsers = () => {
    let filtered = [...users];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.includes(searchTerm) ||
        user.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      switch (filterStatus) {
        case 'active':
          filtered = filtered.filter(user => user.is_active);
          break;
        case 'inactive':
          filtered = filtered.filter(user => !user.is_active);
          break;
        case 'verified':
          filtered = filtered.filter(user => user.is_verified);
          break;
        case 'unverified':
          filtered = filtered.filter(user => !user.is_verified);
          break;
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'created_at' || sortBy === 'updated_at' || sortBy === 'last_sign_in') {
        aValue = new Date(aValue || 0);
        bValue = new Date(bValue || 0);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleUserAction = async (userId, action) => {
    try {
      switch (action) {
        case 'activate':
          await supabase
            .from('user_profiles')
            .update({ is_active: true })
            .eq('user_id', userId);
          break;
        case 'deactivate':
          await supabase
            .from('user_profiles')
            .update({ is_active: false })
            .eq('user_id', userId);
          break;
        case 'verify':
          await supabase
            .from('user_profiles')
            .update({ is_verified: true })
            .eq('user_id', userId);
          break;
        case 'unverify':
          await supabase
            .from('user_profiles')
            .update({ is_verified: false })
            .eq('user_id', userId);
          break;
        case 'delete':
          if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            // Try admin delete first, fallback to profile delete
            try {
              await supabase.auth.admin.deleteUser(userId);
            } catch (adminError) {
              console.log('Admin delete not available, deleting profile only');
              await supabase
                .from('user_profiles')
                .delete()
                .eq('user_id', userId);
            }
          } else {
            return; // User cancelled, don't reload
          }
          break;
      }
      
      await loadUsers();
      await loadUserStats();
    } catch (error) {
      console.error(`Error performing ${action} on user:`, error);
      alert(`Error performing ${action} on user. Please try again.`);
    }
  };

  const exportUsers = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Location', 'Status', 'Verified', 'Enrollments', 'Completed', 'Points', 'Created At'].join(','),
      ...filteredUsers.map(user => [
        user.full_name || '',
        user.email || '',
        user.phone || '',
        user.location || '',
        user.is_active ? 'Active' : 'Inactive',
        user.is_verified ? 'Verified' : 'Unverified',
        user.total_enrollments,
        user.completed_courses,
        user.total_points,
        new Date(user.created_at).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600 mt-1">Manage user accounts, profiles, and activities</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button
            onClick={loadUsers}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button
            onClick={exportUsers}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={userStats.total}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Active Users"
          value={userStats.active}
          icon={UserCheck}
          color="green"
        />
        <StatCard
          title="Verified Users"
          value={userStats.verified}
          icon={CheckCircle}
          color="purple"
        />
        <StatCard
          title="New This Month"
          value={userStats.newThisMonth}
          icon={TrendingUp}
          color="orange"
        />
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Users</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="created_at">Created Date</option>
              <option value="full_name">Name</option>
              <option value="email">Email</option>
              <option value="last_sign_in">Last Sign In</option>
              <option value="total_enrollments">Enrollments</option>
            </select>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onAction={handleUserAction}
                  onView={() => {
                    setSelectedUser(user);
                    setShowUserModal(true);
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(indexOfLastUser, filteredUsers.length)}</span> of{' '}
                  <span className="font-medium">{filteredUsers.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === currentPage
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => {
            setShowUserModal(false);
            setSelectedUser(null);
          }}
          onAction={handleUserAction}
          onRefresh={loadUsers}
        />
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center">
        <div className={`w-12 h-12 bg-gradient-to-br ${colors[color]} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

const UserRow = ({ user, onAction, onView }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            {user.avatar_url ? (
              <img className="h-10 w-10 rounded-full" src={user.avatar_url} alt="" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                <Users className="h-5 w-5 text-gray-600" />
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {user.full_name || 'No name'}
            </div>
            <div className="text-sm text-gray-500">
              ID: {user.user_id?.slice(0, 8)}...
            </div>
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 flex items-center">
          <Mail className="w-4 h-4 mr-2 text-gray-400" />
          {user.email}
        </div>
        {user.phone && (
          <div className="text-sm text-gray-500 flex items-center mt-1">
            <Phone className="w-4 h-4 mr-2 text-gray-400" />
            {user.phone}
          </div>
        )}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col space-y-1">
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            user.is_active 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {user.is_active ? 'Active' : 'Inactive'}
          </span>
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            user.is_verified 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {user.is_verified ? 'Verified' : 'Unverified'}
          </span>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
        </div>
        {user.last_sign_in && (
          <div className="flex items-center mt-1">
            <Clock className="w-4 h-4 mr-2" />
            {new Date(user.last_sign_in).toLocaleDateString()}
          </div>
        )}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="space-y-1">
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-2" />
            {user.total_enrollments} courses
          </div>
          <div className="flex items-center">
            <Award className="w-4 h-4 mr-2" />
            {user.total_points} points
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          
          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="py-1">
                <button
                  onClick={() => {
                    onView();
                    setShowActions(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </button>
                
                <button
                  onClick={() => {
                    onAction(user.user_id, user.is_active ? 'deactivate' : 'activate');
                    setShowActions(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  {user.is_active ? <UserX className="w-4 h-4 mr-2" /> : <UserCheck className="w-4 h-4 mr-2" />}
                  {user.is_active ? 'Deactivate' : 'Activate'}
                </button>
                
                <button
                  onClick={() => {
                    onAction(user.user_id, user.is_verified ? 'unverify' : 'verify');
                    setShowActions(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  {user.is_verified ? <XCircle className="w-4 h-4 mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                  {user.is_verified ? 'Unverify' : 'Verify'}
                </button>
                
                <button
                  onClick={() => {
                    onAction(user.user_id, 'delete');
                    setShowActions(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete User
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

const UserDetailModal = ({ user, onClose, onAction, onRefresh }) => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {user.avatar_url ? (
              <img className="h-12 w-12 rounded-full" src={user.avatar_url} alt="" />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                <Users className="h-6 w-6 text-gray-600" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {user.full_name || 'No name'}
              </h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'profile', label: 'Profile', icon: Users },
              { id: 'courses', label: 'Courses', icon: BookOpen },
              { id: 'achievements', label: 'Achievements', icon: Award },
              { id: 'activity', label: 'Activity', icon: Activity }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'profile' && (
            <UserProfileTab user={user} onAction={onAction} onRefresh={onRefresh} />
          )}
          {activeTab === 'courses' && (
            <UserCoursesTab user={user} />
          )}
          {activeTab === 'achievements' && (
            <UserAchievementsTab user={user} />
          )}
          {activeTab === 'activity' && (
            <UserActivityTab user={user} />
          )}
        </div>
      </div>
    </div>
  );
};

const UserProfileTab = ({ user, onAction, onRefresh }) => {
  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Full Name</label>
              <p className="text-sm text-gray-900">{user.full_name || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-sm text-gray-900">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <p className="text-sm text-gray-900">{user.phone || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Location</label>
              <p className="text-sm text-gray-900">{user.location || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Occupation</label>
              <p className="text-sm text-gray-900">{user.occupation || 'Not provided'}</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4">Account Status</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Active Status</span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {user.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Verified</span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                user.is_verified ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {user.is_verified ? 'Verified' : 'Unverified'}
              </span>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Created At</label>
              <p className="text-sm text-gray-900">
                {user.created_at ? new Date(user.created_at).toLocaleString() : 'N/A'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Last Sign In</label>
              <p className="text-sm text-gray-900">
                {user.last_sign_in ? new Date(user.last_sign_in).toLocaleString() : 'Never'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      {user.bio && (
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">Bio</h4>
          <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">{user.bio}</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={() => onAction(user.user_id, user.is_active ? 'deactivate' : 'activate')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            user.is_active
              ? 'bg-red-100 text-red-700 hover:bg-red-200'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {user.is_active ? 'Deactivate' : 'Activate'}
        </button>
        <button
          onClick={() => onAction(user.user_id, user.is_verified ? 'unverify' : 'verify')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            user.is_verified
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          {user.is_verified ? 'Unverify' : 'Verify'}
        </button>
      </div>
    </div>
  );
};

const UserCoursesTab = ({ user }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-600">Total Enrollments</p>
              <p className="text-2xl font-bold text-blue-900">{user.total_enrollments}</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-600">Completed</p>
              <p className="text-2xl font-bold text-green-900">{user.completed_courses}</p>
            </div>
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-orange-600">In Progress</p>
              <p className="text-2xl font-bold text-orange-900">
                {user.total_enrollments - user.completed_courses}
              </p>
            </div>
          </div>
        </div>
      </div>

      {user.user_course_enrollments && user.user_course_enrollments.length > 0 ? (
        <div className="space-y-3">
          {user.user_course_enrollments.map((enrollment) => (
            <div key={enrollment.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Course ID: {enrollment.course_id}</p>
                  <p className="text-sm text-gray-500">
                    Enrolled: {new Date(enrollment.enrolled_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    enrollment.status === 'completed' ? 'bg-green-100 text-green-800' :
                    enrollment.status === 'active' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {enrollment.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    Progress: {enrollment.progress}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No course enrollments found</p>
        </div>
      )}
    </div>
  );
};

const UserAchievementsTab = ({ user }) => {
  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 p-4 rounded-lg mb-6">
        <div className="flex items-center">
          <Award className="w-8 h-8 text-yellow-600" />
          <div className="ml-3">
            <p className="text-sm font-medium text-yellow-600">Total Points</p>
            <p className="text-2xl font-bold text-yellow-900">{user.total_points}</p>
          </div>
        </div>
      </div>

      {user.user_achievements && user.user_achievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.user_achievements.map((achievement) => (
            <div key={achievement.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{achievement.achievement_name}</p>
                  <p className="text-sm text-gray-500">{achievement.points} points</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No achievements earned yet</p>
        </div>
      )}
    </div>
  );
};

const UserActivityTab = ({ user }) => {
  return (
    <div className="space-y-4">
      {user.recent_activity && user.recent_activity.length > 0 ? (
        <div className="space-y-3">
          {user.recent_activity.map((session) => (
            <div key={session.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    Session: {new Date(session.session_start).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Duration: {session.duration_minutes || 0} minutes
                  </p>
                </div>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No recent activity found</p>
        </div>
      )}
    </div>
  );
};

export default UserManager;