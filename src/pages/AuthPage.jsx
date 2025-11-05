import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/SimpleAuth";
import loginImg from "../assets/illustrations/IL.jpg";
import signupImg from "../assets/illustrations/IL.jpg";
import { FcGoogle } from "react-icons/fc";
import { MdPhoneIphone } from "react-icons/md";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    const result = await login(email, password);
    
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    // For now, just show a message - you can implement signup later
    setError("Signup functionality coming soon! Please contact admin for account creation.");
  };

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-8">
      <div className="relative w-full max-w-5xl h-auto md:h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        <motion.div
          className={`relative w-full md:w-1/2 h-[250px] md:h-auto hidden md:block`}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <img
            src={isLogin ? loginImg : signupImg}
            alt="Auth Illustration"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 bg-white p-6 sm:p-10 relative"
          key={isLogin ? "login" : "signup"}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div key="login" className="h-full flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
                  Welcome Back
                </h2>
                <form className="space-y-4" onSubmit={handleLogin}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {error && (
                    <div className="text-red-600 text-sm text-center">
                      {error}
                    </div>
                  )}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </motion.button>
                </form>
                <div className="my-4 text-center text-gray-500 text-sm">OR</div>
                <div className="space-y-3">
                  <button className="w-full py-2 border rounded-lg flex items-center justify-center gap-2">
                    <MdPhoneIphone className="w-5 h-5" /> Login with Phone Number
                  </button>
                  <button className="w-full py-2 border rounded-lg flex items-center justify-center gap-2">
                    <FcGoogle className="w-5 h-5" /> Continue with Google
                  </button>
                </div>
                <p className="mt-6 text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-blue-600 hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div key="signup" className="h-full flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
                  Create Account
                </h2>
                <form className="space-y-4" onSubmit={handleSignup}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />

                  <div className="flex justify-center gap-4">
                    {["student", "teacher"].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`px-4 py-2 rounded-full border text-sm ${
                          role === r
                            ? "bg-blue-600 text-white border-blue-600"
                            : "text-gray-600 border-gray-300"
                        }`}
                      >
                        {r.charAt(0).toUpperCase() + r.slice(1)}
                      </button>
                    ))}
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm text-center">
                      {error}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {loading ? "Creating Account..." : "Sign Up"}
                  </motion.button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-blue-600 hover:underline"
                  >
                    Login
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
