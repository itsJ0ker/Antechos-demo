import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SimpleProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const adminLoggedIn = localStorage.getItem('adminLoggedIn');
      const adminEmail = localStorage.getItem('adminEmail');
      const loginTime = localStorage.getItem('adminLoginTime');

      if (adminLoggedIn === 'true' && adminEmail && loginTime) {
        // Check if login is not too old (24 hours)
        const loginDate = new Date(loginTime);
        const now = new Date();
        const hoursDiff = (now - loginDate) / (1000 * 60 * 60);

        if (hoursDiff < 24) {
          setIsAuthenticated(true);
        } else {
          // Session expired
          localStorage.removeItem('adminLoggedIn');
          localStorage.removeItem('adminEmail');
          localStorage.removeItem('adminLoginTime');
          navigate('/admin/working-login');
        }
      } else {
        navigate('/admin/working-login');
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

export default SimpleProtectedRoute;