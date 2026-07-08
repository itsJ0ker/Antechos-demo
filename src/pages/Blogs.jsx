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
    <div className="min-h-screen bg-[#FFF] text-[#0A0C0F] font-sans antialiased">
      <SEOMeta
        title={selectedPost ? selectedPost.title : "Educational Blogs & Career Transition Insights"}
        description={selectedPost ? selectedPost.excerpt : "Stay ahead with professional guidance on UGC-approved online MBA, MCA, BCA degree equivalence, Generative AI upskilling, and non-tech transitions."}
        ogImage={selectedPost ? selectedPost.coverImage : undefined}
        schema={seoSchema}
      />
      {/* Inline styles for fonts, grids, and keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Sora:wght@300;400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
        
        .blog-header {
          font-family: 'Sora', sans-serif;
        }
        .blog-body {
          font-family: 'DM Sans', sans-serif;
        }
        .grid-pattern-blog {
          position: absolute; inset: 0; 
          background-image: linear-gradient(rgba(56,189,248,0.02) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(56,189,248,0.02) 1px, transparent 1px);
          background-size: 50px 50px; pointer-events: none;
        }
        @keyframes marquee { 
          from { transform: translateX(0); } 
          to { transform: translateX(-50%); } 
        }
        .animate-marquee-blog { 
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite; 
          will-change: transform;
        }
        .marquee-container-blog {
          width: 100%;
          overflow: hidden !important;
          contain: layout paint;
          position: relative;
          pointer-events: auto;
        }
        .gold-gradient-text {
          background: linear-gradient(135deg, #FAF0D7 0%, #D4AF37 50%, #FFDF73 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white flex flex-col justify-between">
        <div className="grid-pattern-blog absolute inset-0 opacity-40" />
        <div className="absolute top-[-25%] left-[-15%] w-[60%] h-[70%] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18)_0%,transparent_70%)] blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-25%] right-[-15%] w-[60%] h-[70%] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />

        {/* Hero Top Branding */}
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 relative z-10 text-center flex-grow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel icon={Sparkles}>Antechos Chronicles</SectionLabel>
            <h1 className="blog-header text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-none mb-6">
              Insights for <span className="text-[#38BDF8]">Future Leaders</span>
            </h1>
            <p className="blog-body text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Explore the latest in higher education, industry specializations, technological innovations, and professional career transitions.
            </p>
          </motion.div>

          {/* Search bar inside Hero */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-xl mx-auto flex items-center justify-center gap-4"
          >
            <div className="relative flex-grow flex items-center bg-[#161C24]/80 border border-slate-800 focus-within:border-[#38BDF8]/40 rounded-2xl p-1 shadow-2xl transition-all duration-300">
              <Search className="w-5 h-5 text-slate-500 ml-4 mr-2" />
              <input
                type="text"
                placeholder="Search articles by title, keywords or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-0 text-white placeholder-slate-500 py-3 pr-4 focus:ring-0 outline-none text-sm blog-body"
              />
            </div>
            
            {/* Custom Edit / Create Trigger */}
            <button
              onClick={() => navigate("/blogs/post")}
              className="px-5 py-3.5 bg-slate-900 border border-slate-850 hover:border-[#38BDF8]/30 text-white text-xs font-bold uppercase tracking-wider rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <PenTool className="w-3.5 h-3.5 text-[#38BDF8]" />
              Write
            </button>
          </motion.div>
        </div>

        {/* BOTTOM TICKER — Same as university page */}
        <div className="w-full bg-black/40 backdrop-blur-md border-t border-white/10 py-3.5 marquee-container-blog z-10 shrink-0">
          <div className="flex items-center gap-8 sm:gap-12 whitespace-nowrap animate-marquee-blog px-4">
            {[1, 2].map((repeat) => (
              <React.Fragment key={repeat}>
                <div className="flex items-center gap-3 shrink-0 px-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-ping shrink-0" />
                  <span className="text-white/80 text-[10px] font-black uppercase tracking-widest blog-body">
                    🔥 TRENDING: Navigating Online MBA ROI and Placement Support
                  </span>
                  <span className="text-white/20 ml-6 shrink-0">|</span>
                </div>
                <div className="flex items-center gap-3 shrink-0 px-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-ping shrink-0" />
                  <span className="text-white/80 text-[10px] font-black uppercase tracking-widest blog-body">
                    💡 TECH: Demystifying Agentic AI & Generative AI Skills Recruiters Demand
                  </span>
                  <span className="text-white/20 ml-6 shrink-0">|</span>
                </div>
                <div className="flex items-center gap-3 shrink-0 px-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-ping shrink-0" />
                  <span className="text-white/80 text-[10px] font-black uppercase tracking-widest blog-body">
                    🎓 CAREERS: Pivoting into Tech from Non-Technical Backgrounds
                  </span>
                  <span className="text-white/20 ml-6 shrink-0">|</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 2. FILTER & ARTICLES WORKSPACE */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Category Filter Pills (Same styling as university categories selector) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer blog-body border ${
                activeCategory === category
                  ? "bg-[#38BDF8] border-[#38BDF8] text-[#0A0C0F] font-bold shadow-lg shadow-[#38BDF8]/15"
                  : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#38BDF8] mb-4"></div>
            <p className="text-slate-400 text-sm blog-body">Syncing publications...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200 max-w-xl mx-auto px-6 shadow-inner">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="blog-header text-xl font-bold text-slate-800 mb-2">No Articles Found</h3>
            <p className="text-slate-500 blog-body text-sm">
              We couldn't find any articles matching your search query. Try adjusting your keywords or category.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            
            {/* 2A. SPOTLIGHT CARD (Featured Article - Split 50/50 on desktop) */}
            {featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="group grid grid-cols-1 lg:grid-cols-12 bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-[0_15px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.07)] hover:border-[#38BDF8]/20 transition-all duration-500"
              >
                {/* Visual Image half */}
                <div 
                  className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden cursor-pointer"
                  onClick={() => setSelectedPost(featuredPost)}
                >
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                    loading="eager"
                  />
                  {featuredPost.category && (
                    <span className="absolute top-6 left-6 bg-slate-950/85 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-[0.15em] px-4 py-2 rounded-xl border border-white/10 blog-body">
                      {featuredPost.category}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content half */}
                <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                  <div>
                    {/* Featured label */}
                    <div className="flex items-center gap-1.5 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Featured Spotlight</span>
                    </div>

                    {/* Title */}
                    <h2 
                      onClick={() => setSelectedPost(featuredPost)}
                      className="blog-header text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 group-hover:text-[#38BDF8] cursor-pointer transition-colors duration-300 mb-4 leading-tight"
                    >
                      {featuredPost.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="blog-body text-slate-500 text-sm sm:text-base leading-relaxed line-clamp-4 mb-6">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  {/* Meta & Author info footer */}
                  <div className="border-t border-slate-100 pt-6 space-y-4">
                    <div className="flex items-center gap-4 text-gray-400 text-xs blog-body">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
                        {formatDate(featuredPost.publishedAt)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                        {getReadingTime(featuredPost.body)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={featuredPost.authorImage}
                          alt={featuredPost.authorName}
                          className="w-10 h-10 rounded-full object-cover bg-slate-100 border border-slate-100"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-800 blog-body">
                            {featuredPost.authorName}
                          </span>
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider blog-body">
                            Verified Contributor
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedPost(featuredPost)}
                        className="bg-slate-900 hover:bg-[#38BDF8] flex items-center justify-center gap-2 pl-5 pr-4 py-3 rounded-full text-white hover:text-white font-black text-[9px] uppercase tracking-wider transition-all duration-300 shadow-md group-hover:shadow-lg cursor-pointer"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* 2B. TRUST STRIP (Badges between featured spotlight and other blogs) */}
            <div className="bg-[#0A0C0F] rounded-[2rem] py-8 px-6 sm:px-10 shadow-2xl relative overflow-hidden text-white">
              <div className="grid-pattern-blog opacity-10" />
              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                {TRUST_BADGES.map((badge, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0">
                      {badge.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-[11px] sm:text-xs text-white uppercase tracking-wider leading-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
                        {badge.title}
                      </h4>
                      <p className="text-[9px] text-slate-400 mt-1 font-semibold">
                        {badge.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2C. SECONDARY GRIDS (Remaining Articles) */}
            {gridPosts.length > 0 && (
              <div className="space-y-8">
                <h3 className="blog-header text-xl sm:text-2xl font-extrabold text-slate-800 border-l-4 border-[#38BDF8] pl-3">
                  Recent Insights & Articles
                </h3>

                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {gridPosts.map((post, idx) => (
                    <motion.article
                      layout
                      key={post._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="group flex flex-col bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_45px_rgb(0,0,0,0.05)] hover:border-[#38BDF8]/20 -translate-y-0 hover:-translate-y-1.5 transition-all duration-300"
                    >
                      {/* Image Container */}
                      <div 
                        className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-slate-100"
                        onClick={() => setSelectedPost(post)}
                      >
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                          loading="lazy"
                        />
                        {post.category && (
                          <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-lg border border-white/5 blog-body">
                            {post.category}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 sm:p-7 flex flex-col flex-grow">
                        {/* Meta */}
                        <div className="flex items-center gap-4 text-gray-400 text-[10px] sm:text-xs mb-3.5 blog-body font-mono">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
                            {formatDate(post.publishedAt)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                            {getReadingTime(post.body)}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 
                          onClick={() => setSelectedPost(post)}
                          className="blog-header text-lg font-extrabold text-slate-900 line-clamp-2 leading-snug cursor-pointer group-hover:text-[#38BDF8] transition-colors duration-300 mb-3"
                        >
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="blog-body text-gray-500 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6">
                          {post.excerpt}
                        </p>

                        {/* Footer (Author & Action) */}
                        <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-auto">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={post.authorImage}
                              alt={post.authorName}
                              className="w-8 h-8 rounded-full object-cover bg-slate-100"
                            />
                            <div className="flex flex-col">
                              <span className="text-[11px] font-bold text-slate-800 blog-body">
                                {post.authorName}
                              </span>
                              <span className="text-[9px] text-gray-400 blog-body font-semibold">
                                Contributor
                              </span>
                            </div>
                          </div>
                          <button 
                            onClick={() => setSelectedPost(post)}
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#38BDF8] text-[#0A0C0F] group-hover:text-white border border-slate-100 group-hover:border-transparent transition-all duration-300 cursor-pointer"
                          >
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </div>
            )}

          </div>
        )}
      </section>

      {/* 3. DETAILED SCHOLARLY READING MODAL */}
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
