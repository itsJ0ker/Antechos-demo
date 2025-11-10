import { supabase } from '../lib/supabase';

// Track page visit with comprehensive data
export const trackPageVisit = async (pagePath) => {
  try {
    // Get visitor information
    const visitorData = await getVisitorInfo(pagePath);
    
    // Insert into analytics table
    const { data, error } = await supabase
      .from('analytics')
      .insert([visitorData])
      .select()
      .single();

    if (error) {
      console.error('Analytics tracking error:', error);
      return null;
    }

    // Store session ID for duration tracking
    if (data?.id) {
      sessionStorage.setItem('analytics_session_id', data.id);
      sessionStorage.setItem('analytics_start_time', Date.now().toString());
    }

    return data;
  } catch (error) {
    console.error('Error tracking page visit:', error);
    return null;
  }
};

// Update session duration when user leaves
export const updateSessionDuration = async () => {
  try {
    const sessionId = sessionStorage.getItem('analytics_session_id');
    const startTime = sessionStorage.getItem('analytics_start_time');

    if (!sessionId || !startTime) return;

    const duration = Math.floor((Date.now() - parseInt(startTime)) / 1000); // in seconds

    await supabase
      .from('analytics')
      .update({ duration })
      .eq('id', sessionId);

    // Clear session data
    sessionStorage.removeItem('analytics_session_id');
    sessionStorage.removeItem('analytics_start_time');
  } catch (error) {
    console.error('Error updating session duration:', error);
  }
};

// Get comprehensive visitor information
const getVisitorInfo = async (pagePath) => {
  const userAgent = navigator.userAgent;
  
  return {
    page_path: pagePath,
    page_url: window.location.href,
    referrer: document.referrer || null,
    user_agent: userAgent,
    device: getDeviceType(userAgent),
    browser: getBrowserName(userAgent),
    os: getOperatingSystem(userAgent),
    screen_resolution: `${window.screen.width}x${window.screen.height}`,
    viewport_size: `${window.innerWidth}x${window.innerHeight}`,
    language: navigator.language || navigator.userLanguage,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    ip_address: await getIPAddress(),
    country: await getCountry(),
    city: await getCity(),
    visited_at: new Date().toISOString(),
  };
};

// Get device type from user agent
const getDeviceType = (userAgent) => {
  if (/mobile/i.test(userAgent)) return 'Mobile';
  if (/tablet|ipad/i.test(userAgent)) return 'Tablet';
  return 'Desktop';
};

// Get browser name from user agent
const getBrowserName = (userAgent) => {
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
  if (userAgent.includes('Edg')) return 'Edge';
  if (userAgent.includes('Opera') || userAgent.includes('OPR')) return 'Opera';
  return 'Unknown';
};

// Get operating system from user agent
const getOperatingSystem = (userAgent) => {
  if (userAgent.includes('Win')) return 'Windows';
  if (userAgent.includes('Mac')) return 'MacOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
  return 'Unknown';
};

// Get IP address using external API
const getIPAddress = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP:', error);
    return null;
  }
};

// Get country from IP
const getCountry = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_name || null;
  } catch (error) {
    console.error('Error fetching country:', error);
    return null;
  }
};

// Get city from IP
const getCity = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.city || null;
  } catch (error) {
    console.error('Error fetching city:', error);
    return null;
  }
};

// Track custom events
export const trackEvent = async (eventName, eventData = {}) => {
  try {
    const { data, error } = await supabase
      .from('analytics_events')
      .insert([{
        event_name: eventName,
        event_data: eventData,
        page_path: window.location.pathname,
        created_at: new Date().toISOString(),
      }]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error tracking event:', error);
    return null;
  }
};

// Initialize analytics tracking
export const initAnalytics = () => {
  // Track initial page visit
  trackPageVisit(window.location.pathname);

  // Update duration on page unload
  window.addEventListener('beforeunload', updateSessionDuration);

  // Track page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      updateSessionDuration();
    }
  });
};
