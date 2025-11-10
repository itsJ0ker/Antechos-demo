import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import {
  Users,
  Globe,
  Eye,
  MousePointer,
  TrendingUp,
  Clock,
  MapPin,
  Monitor,
  Smartphone,
  Calendar,
  BarChart3,
  PieChart,
} from 'lucide-react';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState([]);
  const [stats, setStats] = useState({
    totalVisitors: 0,
    todayVisitors: 0,
    uniqueIPs: 0,
    avgDuration: 0,
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('today');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      let query = supabase
        .from('analytics')
        .select('*')
        .order('visited_at', { ascending: false });

      // Filter by time range
      const now = new Date();
      if (timeRange === 'today') {
        const today = new Date(now.setHours(0, 0, 0, 0));
        query = query.gte('visited_at', today.toISOString());
      } else if (timeRange === 'week') {
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        query = query.gte('visited_at', weekAgo.toISOString());
      } else if (timeRange === 'month') {
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        query = query.gte('visited_at', monthAgo.toISOString());
      }

      const { data, error } = await query.limit(100);
      
      if (error) throw error;
      
      setAnalytics(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const uniqueIPs = new Set(data.map(item => item.ip_address)).size;
    const totalVisitors = data.length;
    
    const today = new Date().setHours(0, 0, 0, 0);
    const todayVisitors = data.filter(item => 
      new Date(item.visited_at) >= today
    ).length;

    const avgDuration = data.reduce((acc, item) => acc + (item.duration || 0), 0) / (data.length || 1);

    setStats({
      totalVisitors,
      todayVisitors,
      uniqueIPs,
      avgDuration: Math.round(avgDuration),
    });
  };

  const getDeviceIcon = (device) => {
    if (device?.toLowerCase().includes('mobile')) return <Smartphone className="w-4 h-4" />;
    return <Monitor className="w-4 h-4" />;
  };

  const getCountryFlag = (country) => {
    const flags = {
      'India': '🇮🇳',
      'USA': '🇺🇸',
      'UK': '🇬🇧',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺',
    };
    return flags[country] || '🌍';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Website Analytics</h2>
        <div className="flex gap-2">
          {['today', 'week', 'month', 'all'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeRange === range
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Visitors"
          value={stats.totalVisitors}
          icon={Users}
          color="blue"
          subtitle={`${timeRange} period`}
        />
        <StatCard
          title="Today's Visitors"
          value={stats.todayVisitors}
          icon={Eye}
          color="green"
          subtitle="Last 24 hours"
        />
        <StatCard
          title="Unique IPs"
          value={stats.uniqueIPs}
          icon={Globe}
          color="purple"
          subtitle="Distinct visitors"
        />
        <StatCard
          title="Avg Duration"
          value={`${stats.avgDuration}s`}
          icon={Clock}
          color="orange"
          subtitle="Time on site"
        />
      </div>

      {/* Visitor Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Visitors</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Page</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Browser</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analytics.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No analytics data available</p>
                    <p className="text-gray-400 text-sm mt-2">Visitor tracking will appear here once enabled</p>
                  </td>
                </tr>
              ) : (
                analytics.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(item.visited_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                      {item.ip_address || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <span>{getCountryFlag(item.country)}</span>
                        <span>{item.city || item.country || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="max-w-xs truncate" title={item.page_url}>
                        {item.page_url || item.page_path || '/'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        {getDeviceIcon(item.device)}
                        <span>{item.device || 'Desktop'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {item.browser || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {item.duration ? `${item.duration}s` : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Top Pages
          </h3>
          <div className="space-y-3">
            {getTopPages(analytics).map((page, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{page.path}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${page.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="ml-4 text-sm font-semibold text-gray-600">{page.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-600" />
            Top Countries
          </h3>
          <div className="space-y-3">
            {getTopCountries(analytics).map((country, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-2xl">{getCountryFlag(country.name)}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{country.name}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${country.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <span className="ml-4 text-sm font-semibold text-gray-600">{country.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color, subtitle }) => {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${colors[color]} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );
};

const getTopPages = (analytics) => {
  const pageCounts = {};
  analytics.forEach(item => {
    const path = item.page_path || item.page_url || '/';
    pageCounts[path] = (pageCounts[path] || 0) + 1;
  });

  const total = analytics.length || 1;
  return Object.entries(pageCounts)
    .map(([path, count]) => ({
      path,
      count,
      percentage: (count / total) * 100
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
};

const getTopCountries = (analytics) => {
  const countryCounts = {};
  analytics.forEach(item => {
    const country = item.country || 'Unknown';
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  });

  const total = analytics.length || 1;
  return Object.entries(countryCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: (count / total) * 100
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
};

export default AnalyticsDashboard;