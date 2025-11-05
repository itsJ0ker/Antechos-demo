import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, getCurrentUser, signOut } from '../lib/supabase';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    console.log('🔄 AdminProvider initialized');
    setLoading(false);
  }, []);

  const checkUserProfile = async (currentUser) => {
    console.log('🔍 Checking profile for:', currentUser?.email);
    // Simplified for now
    setUser(currentUser);
    setProfile(null);
    setIsAdmin(false);
  };

  const logout = async () => {
    console.log('🔄 Logging out');
    setUser(null);
    setIsAdmin(false);
    setProfile(null);
  };

  const value = {
    user,
    isAdmin,
    loading,
    profile,
    logout,
    checkUserProfile
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;