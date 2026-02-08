import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AdminIndex = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      navigate('/admin/working');
    } else {
      navigate('/admin/working-login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to admin login...</p>
      </div>
    </div>
  );
};

export default AdminIndex;