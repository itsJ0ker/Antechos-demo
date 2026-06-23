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
import UniversityPage from "./pages/UniversityPage";
import UniversityPageNew from "./pages/UniversityPageNew";
import MarketplaceImarticus from "./pages/MarketplaceImarticus";
import MarketplaceRedesign from "./pages/MarketplaceRedesign";
import MarketplacePremium from "./pages/MarketplacePremium";
import MarketplaceV2 from "./pages/MarketplaceV2";
import TrainerProfile from "./components/sections/Trainerprofile";
import UniversityDetail from "./components/sections/UniversityDetails";
import CourseDetail from "./pages/CourseDetail";
import EnhancedCourseDetail from "./pages/EnhancedCourseDetail";
import TestSpecializations from "./pages/TestSpecializations";
import IndustryTrainer from "./components/sections/Industrytrainer";
import SkilledWorkforce from "./components/sections/SkilledWorkforce";
import FullStackTeams from "./components/sections/FullStackTeams";
import CoursesNewV2 from "./pages/CoursesNewV2";
import PremiumCourseDetail from "./pages/PremiumCourseDetail";
import CoursesPremium from "./pages/CoursesPremium";
import CoursesNewTry from "./pages/CoursesNewTry";
import CoursePremiumDetail from "./pages/CoursePremiumDetail";
import ScrollToTop from "./components/Layout/ScrollToTop";
import EnquiryPopup from "./components/sections/PopupForm";
import LiveChatWidget from "./components/common/LiveChatWidget";
import Portfolio from "./components/port/Portfolio";
import allCourses from "./data/allCourses"; // ✅ your dataset
import CourseDetailPage from "./components/sections/coursedetails";
// ✅ detail page component

// User Authentication
import UserDashboard from "./pages/UserDashboard";
import { UserAuthProvider } from "./contexts/UserAuthContext";
import ProtectedUserRoute from "./components/auth/ProtectedUserRoute";
import DatabaseTest from "./pages/DatabaseTest";

// Admin Panel — unified auth
import { AdminAuthProvider } from "./contexts/AdminAuth";
import { ThemeProvider } from "./contexts/ThemeContext";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminIndex from "./pages/admin/AdminIndex";
import EnhancedAdminDashboard from "./pages/admin/EnhancedAdminDashboard";

// Analytics tracking
import { trackPageVisit, updateSessionDuration } from "./utils/analytics";

const AppContent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  const hideLayout = ["/AuthPage", "/admin/login", "/admin/dashboard", "/user-dashboard"].includes(location.pathname);

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
    <div className="overflow-x-clip max-w-full">
      {!hideLayout && <Navbar />}
      <div className={!hideLayout ? "pt-16" : ""}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AuthPage" element={<AuthPage />} />
          <Route path="/About" element={<About />} />
          <Route path="/Marketplace" element={<MarketplaceV2 />} />
          <Route path="/marketplace-new" element={<MarketplaceImarticus />} />
          <Route path="/marketplace-redesign" element={<MarketplaceRedesign />} />
          <Route path="/marketplace-premium" element={<MarketplacePremium />} />
          <Route path="/Courses" element={<Courses />} />
          <Route path="/courses-new" element={<CoursesNewV2 />} />
          <Route path="/courses-new/:id" element={<PremiumCourseDetail />} />
          <Route path="/courses-new-try" element={<CoursesNewTry />} />
          <Route path="/courses-premium" element={<CoursesPremium />} />{/*New*/}
          <Route path="/courses-premium/:slug" element={<CoursePremiumDetail />} />
          <Route path="/Universities-mainbutnotinusenow" element={<UniversityPage />} />{/*maim*/}
          <Route path="/universities" element={<UniversityPageNew />} />
          <Route path="/trainer/:id" element={<TrainerProfile />} />
          <Route path="/university/:id" element={<UniversityDetail />} />
          <Route path="/university/:universityId/course/:courseId" element={<EnhancedCourseDetail />} />
          <Route path="/university/:universityId/course/:courseId/old" element={<CourseDetail />} />
          <Route path="/test-specializations" element={<TestSpecializations />} />
          <Route path="/IndustryTrainer" element={<IndustryTrainer />} />
          <Route path="/SkilledWorkforce" element={<SkilledWorkforce />} />
          <Route path="/FullStackTeams" element={<FullStackTeams />} />
          <Route path="/Portfolio" element={<Portfolio />} />

          {/* ✅ Dynamic course details page */}
          <Route path="/course/:id" element={<CourseDetailWrapper />} />

          {/* User Dashboard */}
          <Route path="/user-dashboard" element={
            <ProtectedUserRoute>
              <UserDashboard />
            </ProtectedUserRoute>
          } />

          {/* Database Test */}
          <Route path="/database-test" element={<DatabaseTest />} />

          {/* ========= Admin Routes ========= */}
          {/* /admin → auto-redirect to login or dashboard */}
          <Route path="/admin" element={<AdminIndex />} />

          {/* /admin/login → login page */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* /admin/dashboard → protected dashboard */}
          <Route path="/admin/dashboard" element={
            <AdminProtectedRoute>
              <EnhancedAdminDashboard />
            </AdminProtectedRoute>
          } />
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
        console.log('Fetching course details for ID:', id);

        // First try to get from database
        const { supabase } = await import('./lib/supabase');
        const { data: courseData, error } = await supabase
          .from('courses')
          .select('*')
          .eq('id', parseInt(id))
          .eq('is_active', true)
          .single();

        if (error) {
          console.error('Database error, trying fallback:', error);
          // Fallback to static data
          const courses = await allCourses();
          const foundCourse = courses.find((c) => c.id === parseInt(id));
          setCourse(foundCourse);
        } else {
          console.log('Course loaded from database:', courseData);
          setCourse(courseData);
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        // Final fallback to static data
        try {
          const courses = await allCourses();
          const foundCourse = courses.find((c) => c.id === parseInt(id));
          setCourse(foundCourse);
        } catch (fallbackError) {
          console.error('Fallback error:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <CourseDetailPage course={course} />;
};

const App = () => (
  <HashRouter>
    <UserAuthProvider>
      <AdminAuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AdminAuthProvider>
    </UserAuthProvider>
  </HashRouter>
);

export default App;
