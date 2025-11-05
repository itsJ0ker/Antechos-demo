import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../contexts/SimpleAuth";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const menuItems = ["Home", "About", "Courses", "Universities", "Marketplace"];

  const handleNavigate = (text) => {
    const path = text === "Home" ? "/" : `/${text.toLowerCase()}`;
    navigate(path);
    setIsOpen(false); // Close mobile menu if open
  };

  return (
    <nav className="bg-white dark:bg-gray-900 dark:text-white shadow-sm border-b border-gray-200 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3 hover:opacity-90 transition-opacity cursor-pointer" onClick={() => handleNavigate("Home")}>
            <img src={logo} alt="Logo" className="h-10 w-auto" />
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              ANTECHOS INDIA
              <div className="text-xs text-gray-600 dark:text-gray-300 font-normal">
                XI SERVICES PRIVATE LIMITED
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {menuItems.map((text, idx) => (
              <span
                key={idx}
                onClick={() => handleNavigate(text)}
                className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {text}
              </span>
            ))}

            {user ? (
              <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
                <span className="text-sm text-gray-600">
                  Welcome, {user.email.split('@')[0]}
                </span>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium ml-6"
                onClick={() => navigate("/AuthPage")}
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {menuItems.map((item, i) => (
              <div
                key={i}
                onClick={() => handleNavigate(item)}
                className="block cursor-pointer text-gray-700 hover:text-blue-600 transition-colors py-2 font-medium"
              >
                {item}
              </div>
            ))}
            
            <div className="pt-4 border-t border-gray-200">
              {user ? (
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    Welcome, {user.email.split('@')[0]}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    navigate("/AuthPage");
                    setIsOpen(false);
                  }}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
