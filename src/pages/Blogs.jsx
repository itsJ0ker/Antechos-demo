import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowRight, 
  X, 
  Sparkles, 
  ChevronRight, 
  User, 
  ChevronDown, 
  Globe, 
  TrendingUp, 
  GraduationCap, 
  Briefcase,
  Award,
  ShieldCheck,
  Target,
  PenTool,
  Bookmark
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchPosts } from "../lib/sanity";
import SEOMeta from "../components/common/SEOMeta";

const CATEGORIES = ["All", "Higher Education", "Technology", "Career Advice", "General"];

const SectionLabel = ({ children, icon: Icon }) => (
  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[rgba(56,189,248,0.08)] border border-[rgba(56,189,248,0.2)] rounded-full text-[10px] font-black uppercase text-[#38BDF8] tracking-[0.15em] mb-4">
    {Icon && <Icon className="w-3.5 h-3.5" />}
    <span>{children}</span>
  </div>
);

const TRUST_BADGES = [
  { title: "UGC Entitled Insights", label: "Approved Equivalency", icon: <ShieldCheck className="w-5 h-5" /> },
  { title: "Verified Placement Reports", label: "Real Corporate Data", icon: <Award className="w-5 h-5" /> },
  { title: "Expert Vetted Advice", label: "Vetted by Academicians", icon: <GraduationCap className="w-5 h-5" /> },
  { title: "100% Free Career Support", label: "Guidance at Every Step", icon: <Target className="w-5 h-5" /> }
];

const Blogs = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Dynamic JSON-LD Schema (GEO / AEO) for Search Assistants & Bots
  const seoSchema = useMemo(() => {
    if (selectedPost) {
      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": selectedPost.title,
        "description": selectedPost.excerpt,
        "image": selectedPost.coverImage,
        "datePublished": selectedPost.publishedAt,
        "dateModified": selectedPost.publishedAt,
        "author": {
          "@type": "Person",
          "name": selectedPost.authorName,
          "image": selectedPost.authorImage
        },
        "publisher": {
          "@type": "Organization",
          "name": "Antechos India",
          "logo": {
            "@type": "ImageObject",
            "url": "https://antechosindia.com/favicon.svg"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://antechosindia.com/#/blogs"
        }
      };
    } else {
      return {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Antechos India Blog Chronicles",
        "description": "Expert insights on online universities, career transformations, and technology specializations.",
        "publisher": {
          "@type": "Organization",
          "name": "Antechos India",
          "logo": {
            "@type": "ImageObject",
            "url": "https://antechosindia.com/favicon.svg"
          }
        },
        "blogPost": posts.slice(0, 10).map(p => ({
          "@type": "BlogPosting",
          "headline": p.title,
          "description": p.excerpt,
          "image": p.coverImage,
          "datePublished": p.publishedAt,
          "author": {
            "@type": "Person",
            "name": p.authorName
          }
        }))
      };
    }
  }, [selectedPost, posts]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        console.error("Failed to load posts", err);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  // Filtered posts based on search & category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.body && post.body.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        activeCategory === "All" ||
        post.category?.toLowerCase() === activeCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, activeCategory]);

  // Separate the very first post in the filtered list as "Featured Spotlight"
  const featuredPost = useMemo(() => {
    return filteredPosts.length > 0 ? filteredPosts[0] : null;
  }, [filteredPosts]);

  // The rest of the posts go in the grid
  const gridPosts = useMemo(() => {
    return filteredPosts.length > 1 ? filteredPosts.slice(1) : [];
  }, [filteredPosts]);

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Reading time estimator
  const getReadingTime = (text) => {
    if (!text) return "3 min read";
    const wordsPerMinute = 200;
    const numberOfWords = text.split(/\s/g).length;
    const minutes = Math.ceil(numberOfWords / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="min-h-screen bg-[#FFF] text-slate-900 font-sans antialiased">
      <SEOMeta
        title={selectedPost ? selectedPost.title : "Educational Blogs & Career Transition Insights"}
        description={selectedPost ? selectedPost.excerpt : "Stay ahead with professional guidance on UGC-approved online MBA, MCA, BCA degree equivalence, Generative AI upskilling, and non-tech transitions."}
        ogImage={selectedPost ? selectedPost.coverImage : undefined}
        schema={seoSchema}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Sora:wght@300;400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
        .blog-header { font-family: 'Sora', sans-serif; }
        .blog-body { font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-20 pb-16 lg:pt-28 lg:pb-24 bg-[#1e293b] flex items-center justify-center overflow-hidden">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 bg-slate-900/85 z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 z-10"></div>
        <div className="absolute inset-0 opacity-40 z-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')" }}></div>
        
        <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center mt-6 sm:mt-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 bg-white/10 border border-white/20 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white mb-6 sm:mb-8 backdrop-blur-md">
            <span className="text-[#38BDF8] font-black text-xs sm:text-sm leading-none">{"//"}</span> Free Resources
          </div>

          {/* Title */}
          <h1 className="blog-header text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 sm:mb-8 leading-tight tracking-tight">
            Insights, Guides & <br /> 
            <span className="relative inline-block mt-1 sm:mt-2">
              Career Intelligence
              <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 text-[#4ade80]/70" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M2 6.5C30 3.5 100 0.5 198 3" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p className="blog-body text-slate-300 text-sm sm:text-base max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed px-2">
            Master career skills with free tutorials on Data Science, AI, Cyber Security, Software Engineering, Data Engineering, and Business Analytics. Written by Industry experts from Microsoft, Cisco, and top industry experts.
          </p>

          {/* Categories Pills */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-[850px]">
            {[
              { name: "Data Science", icon: Target },
              { name: "Data Engineering", icon: Globe },
              { name: "Backend Development Engineering", icon: Briefcase },
              { name: "Cyber Security", icon: ShieldCheck },
              { name: "AI", icon: Sparkles },
              { name: "Investment Banking", icon: TrendingUp },
              { name: "Motivational", icon: Award }
            ].map((cat, idx) => (
              <button key={idx} className="px-4 py-2 sm:py-2.5 bg-white/5 hover:bg-white/15 border border-white/10 rounded-full text-slate-300 hover:text-white text-[10px] sm:text-[11px] font-semibold transition-all duration-300 backdrop-blur-md flex items-center gap-2 cursor-pointer">
                <cat.icon className="w-3.5 h-3.5 opacity-70" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#38BDF8]"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 text-slate-500">No articles found.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Main Column */}
            <div className="lg:col-span-8 flex flex-col gap-12">
              
              {/* Featured Post */}
              {featuredPost && (
                <div 
                  className="flex flex-col cursor-pointer group"
                  onClick={() => setSelectedPost(featuredPost)}
                >
                  <div className="flex items-center text-[10px] sm:text-[11px] font-bold text-slate-500 mb-4 tracking-wide uppercase">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Bookmark className="w-3.5 h-3.5 text-[#38BDF8]" />
                      FEATURED
                    </span>
                    <span className="mx-2 sm:mx-3 text-slate-300">|</span>
                    <span className="text-slate-500">{featuredPost.category || "General"}</span>
                    <span className="mx-2 sm:mx-3 text-slate-300">|</span>
                    <span className="text-slate-500">{featuredPost.authorName}</span>
                  </div>
                  
                  <h1 className="blog-header text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-slate-900 group-hover:text-[#38BDF8] transition-colors leading-tight mb-4">
                    {featuredPost.title}
                  </h1>
                  
                  <p className="blog-body text-slate-500 text-sm sm:text-base leading-relaxed mb-4">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center text-[11px] text-slate-400 font-medium mb-8">
                    {formatDate(featuredPost.publishedAt)}
                    <span className="mx-2">•</span>
                    {getReadingTime(featuredPost.body)}
                  </div>
                  
                  <div className="w-full aspect-[16/9] sm:aspect-[2/1] rounded-2xl overflow-hidden bg-slate-100">
                    <img 
                      src={featuredPost.coverImage} 
                      alt={featuredPost.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                </div>
              )}
              
              {/* Standard Posts List */}
              <div className="flex flex-col">
                {gridPosts.map(post => (
                  <div 
                    key={post._id} 
                    className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-8 cursor-pointer group py-8 border-b border-slate-100 last:border-0" 
                    onClick={() => setSelectedPost(post)}
                  >
                    {/* Left Content */}
                    <div className="flex-1 w-full flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center text-[10px] sm:text-[11px] font-semibold text-slate-500 mb-3">
                          <BookOpen className="w-3.5 h-3.5 mr-1.5 text-[#38BDF8]" />
                          <span>in <span className="text-slate-800">{post.category || "General"}</span></span>
                          <span className="mx-1.5 text-slate-300">by</span>
                          <span className="text-slate-800">{post.authorName}</span>
                        </div>
                        
                        <h2 className="blog-header text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-2.5 group-hover:text-[#38BDF8] transition-colors">
                          {post.title}
                        </h2>
                        
                        <p className="blog-body text-slate-500 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3 text-[10px] sm:text-[11px] text-slate-400 font-medium mt-auto">
                        <span className="text-[#38BDF8] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span className="text-slate-300">|</span>
                        <span>{getReadingTime(post.body)}</span>
                      </div>
                    </div>
                    
                    {/* Right Image */}
                    <div className="w-full sm:w-[160px] sm:h-[160px] shrink-0 rounded-[1.25rem] overflow-hidden bg-slate-100">
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button matching Image 2 */}
              {gridPosts.length > 0 && (
                <div className="flex justify-center pt-8 pb-4">
                  <button className="flex items-center gap-2 px-8 py-3.5 bg-[#2A3B52] hover:bg-[#1E293B] text-white text-[11px] font-bold rounded-full transition-colors uppercase tracking-wider">
                    <span>Load More</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
            
            {/* Right Sidebar (LATEST ARTICLES) */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-7 sticky top-24">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-800 mb-6 flex items-center gap-2">
                  Latest Articles
                </h3>
                
                <div className="flex flex-col gap-6">
                  {posts.slice(0, 5).map(post => (
                    <div 
                      key={post._id} 
                      className="flex gap-4 cursor-pointer group" 
                      onClick={() => setSelectedPost(post)}
                    >
                      <div className="w-20 h-14 shrink-0 rounded-xl overflow-hidden bg-slate-100">
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="blog-header text-xs font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-[#38BDF8] transition-colors mb-1.5">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[9px] text-slate-400 font-medium">
                          <Calendar className="w-3 h-3 text-slate-300" /> 
                          {formatDate(post.publishedAt)}
                          <span className="text-slate-200">•</span>
                          <span>{getReadingTime(post.body)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        )}
      </div>

      {/* DETAILED SCHOLARLY READING MODAL */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-y-auto z-10 flex flex-col"
            >
              {/* Header Close button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 rounded-full bg-slate-900/10 hover:bg-slate-900/20 text-slate-800 transition-colors z-20 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Cover Image */}
              <div className="relative w-full aspect-[21/9] sm:aspect-[21/8] overflow-hidden bg-slate-950">
                <img
                  src={selectedPost.coverImage}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  {selectedPost.category && (
                    <span className="inline-block bg-[#38BDF8] text-[#0A0C0F] text-[9px] font-black uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-lg mb-3">
                      {selectedPost.category}
                    </span>
                  )}
                  <h2 className="blog-header text-white text-xl sm:text-2xl lg:text-4xl font-extrabold leading-tight max-w-3xl">
                    {selectedPost.title}
                  </h2>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6 sm:p-10 md:p-12 flex-grow">
                {/* Author & Meta bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedPost.authorImage}
                      alt={selectedPost.authorName}
                      className="w-10 h-10 rounded-full object-cover bg-slate-50 border border-slate-100"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800 blog-body">
                        {selectedPost.authorName}
                      </span>
                      <span className="text-[9px] text-[#38BDF8] font-bold uppercase tracking-wider blog-body">
                        Verified Contributor
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-500 text-xs blog-body font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(selectedPost.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {getReadingTime(selectedPost.body)}
                    </span>
                  </div>
                </div>

                {/* Excerpt Summary Alert */}
                {selectedPost.excerpt && (
                  <div className="bg-slate-50 border-l-4 border-[#38BDF8] p-5 rounded-r-2xl mb-8">
                    <p className="blog-body text-slate-600 italic text-sm sm:text-base leading-relaxed">
                      {selectedPost.excerpt}
                    </p>
                  </div>
                )}

                {/* Body Text */}
                <div className="blog-body text-slate-800 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line space-y-6">
                  {selectedPost.body}
                </div>
              </div>

              {/* Newsletter strip inside detail modal */}
              <div className="border-t border-slate-100 bg-slate-50 px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 blog-body">© 2026 Antechos India</span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Close Reader
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blogs;
