import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdPerson, MdLogin } from "react-icons/md";
import { useUserAuth } from "../../contexts/UserAuthContext";
import UserLogin from "./UserLogin";

const LoginButton = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, logout, isAuthenticated } = useUserAuth();

  const handleLoginClick = () => {
    if (isAuthenticated) {
      // Navigate to dashboard or show user menu
      window.location.href = "#/user-dashboard";
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        {isAuthenticated ? (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <MdPerson className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
              </span>
            </div>
            <div className="relative group">
              <button className="p-2 text-gray-600 hover:text-gray-800">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <a
                    href="#/user-dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </a>
                  <a
                    href="#/user-profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="#/user-settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <motion.button
            onClick={handleLoginClick}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdLogin className="w-4 h-4" />
            <span className="font-medium">Login</span>
          </motion.button>
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <UserLogin onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
};

export default LoginButton;