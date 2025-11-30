import { useState, useEffect } from "react";
import { HashRouter, Routes, Route, useLocation, useParams } from "react-router-dom";
import "./index.css";

import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import About from "./pages/Aboutus";
import Courses from "./pages/CoursesNew";
import Universities from "./pages/Universities";
import MarketplaceImarticus from "./pages/MarketplaceImarticus";
import MarketplaceRedesign from "./pages/MarketplaceRedesign";
import TrainerProfile from "./components/sections/Trainerprofile";
import UniversityDetail from "./components/sections/UniversityDetails";
import CourseDetail from "./pages/CourseDetail";
import EnhancedCourseDetail from "./pages/EnhancedCourseDetail";
import TestSpecializations from "./pages/TestSpecializations";
import IndustryTrainer from "./components/sections/Industrytrainer";
import SkilledWorkforce from "./components/sections/SkilledWorkforce";
import FullStackTeams from "./components/sections/FullStackTeams";
import ScrollToTop from "./components/Layout/ScrollToTop";
import EnquiryPopup from "./components/sections/PopupForm";
import LiveChatWidget from "./components/common/LiveChatWidget";
import Portfolio from "./components/port/Portfolio";
import allCourses from "./data/allCourses"; // ✅ your dataset
import CourseDetailPage from "./components/sections/coursedetails";
// ✅ detail page component

// Admin components
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SimpleAdminDashboard from "./pages/admin/SimpleAdminDashboard";
import EnhancedAdminDashboard from "./pages/admin/EnhancedAdminDashboard";
import CourseSpecializationsPage from "./pages/admin/CourseSpecializationsPage";

// Simple Auth components
import SimpleLogin from "./pages/SimpleLogin";
import SimpleDashboard from "./pages/SimpleDashboard";
import { AuthProvider } from "./contexts/SimpleAuth";

// Mock Auth components (CORS workaround)
import MockAdminLogin from "./pages/admin/MockAdminLogin";
import { MockAuthProvider } from "./contexts/MockAuth";

// Analytics tracking
import { trackPageVisit, updateSessionDuration } from "./utils/analytics";

const AppContent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  const hideLayout = ["/AuthPage", "/admin/login", "/admin/dashboard", "/admin/old-dashboard", "/simple-login", "/simple-dashboard"].includes(location.pathname);

  // check login & form submission
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const formSubmitted = localStorage.getItem("enquiryFormSubmitted") === "true";

  // Track page visits with analytics
  useEffect(() => {
    // Don't track admin pages
    if (!location.pathname.startsWith('/admin') && !location.pathname.startsWith('/simple-')) {
      trackPageVisit(location.pathname);
    }

    // Cleanup on unmount
    return () => {
      if (!location.pathname.startsWith('/admin') && !location.pathname.startsWith('/simple-')) {
        updateSessionDuration();
      }
    };
  }, [location.pathname]);

  useEffect(() => {
    const shouldShow =
      location.pathname === "/" && !isLoggedIn && !formSubmitted;

    if (shouldShow) {
      setShowPopup(true);

      const interval = setInterval(() => {
        setShowPopup(true);
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [location.pathname, isLoggedIn, formSubmitted]);

  const handleFormSubmit = () => {
    localStorage.setItem("enquiryFormSubmitted", "true");
    setShowPopup(false);
  };

  return (
    <div>
      {!hideLayout && <Navbar />}
      <div className={!hideLayout ? "pt-16" : ""}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AuthPage" element={<AuthPage />} />
          <Route path="/About" element={<About />} />
          <Route path="/Marketplace" element={<MarketplaceImarticus />} />
          <Route path="/marketplace-new" element={<MarketplaceImarticus />} />
          <Route path="/marketplace-redesign" element={<MarketplaceRedesign />} />
          <Route path="/Courses" element={<Courses />} />
          <Route path="/Universities" element={<Universities />} />
          <Route path="/trainer/:id" element={<TrainerProfile />} />
          <Route path="/university/:id" element={<UniversityDetail />} />
          <Route path="/university/:universityId/course/:courseId" element={<CourseDetail />} />
          <Route path="/university/:universityId/course/:courseId/enhanced" element={<EnhancedCourseDetail />} />
          <Route path="/test-specializations" element={<TestSpecializations />} />
          <Route path="/IndustryTrainer" element={<IndustryTrainer />} />
          <Route path="/SkilledWorkforce" element={<SkilledWorkforce />} />
          <Route path="/FullStackTeams" element={<FullStackTeams />} />
          <Route path="/Portfolio" element={<Portfolio />} />

          {/* ✅ Dynamic course details page */}
          <Route path="/course/:id" element={<CourseDetailWrapper />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/mock-login" element={<MockAdminLogin />} />
          <Route path="/admin/dashboard" element={<EnhancedAdminDashboard />} />
          <Route path="/admin/simple-dashboard" element={<SimpleAdminDashboard />} />
          <Route path="/admin/old-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/course-specializations" element={<CourseSpecializationsPage />} />
          
          {/* Simple Auth routes */}
          <Route path="/simple-login" element={<SimpleLogin />} />
          <Route path="/simple-dashboard" element={<SimpleDashboard />} />
        </Routes>
      </div>

      {showPopup && location.pathname === "/" && (
        <EnquiryPopup
          onClose={() => setShowPopup(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {!hideLayout && <LiveChatWidget />}
      {!hideLayout && <Footer />}
    </div>
  );
};

// ✅ Wrapper to fetch course by ID
const CourseDetailWrapper = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courses = await allCourses();
        const foundCourse = courses.find((c) => c.id === parseInt(id));
        setCourse(foundCourse);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return <CourseDetailPage course={course} />;
};

const App = () => (
  <HashRouter>
    <AuthProvider>
      <MockAuthProvider>
        <AppContent />
      </MockAuthProvider>
    </AuthProvider>
  </HashRouter>
);

export default App;
