import { useAdmin } from '../../contexts/AdminContext';
import { useState } from 'react';

const AdminDebug = () => {
  const { user, isAdmin, loading, profile } = useAdmin();
  const [showDebug, setShowDebug] = useState(false);

  if (!showDebug) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowDebug(true)}
          className="bg-gray-800 text-white px-3 py-2 rounded text-xs"
        >
          Debug
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black text-white p-4 rounded-lg max-w-sm text-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Admin Debug</h3>
        <button
          onClick={() => setShowDebug(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
      <div className="space-y-1">
        <div>Loading: {loading ? 'Yes' : 'No'}</div>
        <div>User: {user ? user.email : 'None'}</div>
        <div>Is Admin: {isAdmin ? 'Yes' : 'No'}</div>
        <div>Profile Role: {profile?.role || 'None'}</div>
        <div>Admin Email: {import.meta.env.VITE_ADMIN_EMAIL || 'Not set'}</div>
        <div>Current Path: {window.location.pathname}</div>
      </div>
    </div>
  );
};

export default AdminDebug;