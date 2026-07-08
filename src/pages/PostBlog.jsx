import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  PenTool, 
  Eye, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  Info,
  Calendar,
  Clock,
  Lock,
  Unlock,
  Trash2,
  Edit,
  RotateCcw,
  Search,
  PlusCircle,
  FileText,
  Upload,
  Image as ImageIcon,
  User as UserIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPost, fetchPosts, updatePost, deletePost } from "../lib/sanity";
import SEOMeta from "../components/common/SEOMeta";

const CATEGORIES = ["Higher Education", "Technology", "Career Advice", "General"];

const SUGGESTED_COVER_IMAGES = [
  { name: "Education & Campus", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80" },
  { name: "Tech & Coding", url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&q=80" },
  { name: "Business & Office", url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" },
  { name: "Remote Study & Laptop", url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80" },
];

const SUGGESTED_AUTHORS = [
  { name: "Ananya Verma", role: "Career Advisor", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
  { name: "Shivam Jha", role: "Tech Lead", img: "https://i.ibb.co/S7s5ncHK/image.png" },
  { name: "Pawan Kumar", role: "Academic Dean", img: "https://i.ibb.co/BHjmfn0W/image.png" },
  { name: "Meera Reddy", role: "Industry Expert", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
];

const CORRECT_PIN = "8888";

// Image compression and resize utility
const compressAndResizeImage = (file, maxWidth, maxHeight) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions keeping aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to compressed jpeg data URL (quality 0.7)
        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

const PostBlog = () => {
  const navigate = useNavigate();

  // PIN Gate State
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(
    sessionStorage.getItem("antechos_blog_studio_unlocked") === "true"
  );

  // Form States
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("Higher Education");
  const [coverImage, setCoverImage] = useState(SUGGESTED_COVER_IMAGES[0].url);
  const [customCoverImage, setCustomCoverImage] = useState("");
  const [selectedAuthorIndex, setSelectedAuthorIndex] = useState(0);
  const [customAuthorName, setCustomAuthorName] = useState("");
  const [customAuthorImage, setCustomAuthorImage] = useState("");

  // Upload progress / status states
  const [coverUploading, setCoverUploading] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);

  // Edit Mode State
  const [editingPostId, setEditingPostId] = useState(null);

  // Manage Posts list state
  const [allExistingPosts, setAllExistingPosts] = useState([]);
  const [manageSearchTerm, setManageSearchTerm] = useState("");
  const [postListLoading, setPostListLoading] = useState(false);

  // UI States
  const [activeTab, setActiveTab] = useState("edit"); // edit / preview / manage
  const [publishing, setPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState(null); // { success, method, errorDetails }

  // Load existing posts for management
  const loadExistingPosts = async () => {
    try {
      setPostListLoading(true);
      const data = await fetchPosts();
      setAllExistingPosts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setPostListLoading(false);
    }
  };

  useEffect(() => {
    if (isUnlocked) {
      loadExistingPosts();
    }
  }, [isUnlocked]);

  // Keypad PIN entry handler
  const handleKeypadPress = (num) => {
    setPinError(false);
    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);
      if (nextPin === CORRECT_PIN) {
        // Unlock Success
        setTimeout(() => {
          setIsUnlocked(true);
          sessionStorage.setItem("antechos_blog_studio_unlocked", "true");
        }, 300);
      } else if (nextPin.length === 4) {
        // Unlock Fail
        setTimeout(() => {
          setPinError(true);
          setPin("");
        }, 300);
      }
    }
  };

  const handleBackspace = () => {
    setPinError(false);
    setPin(pin.slice(0, -1));
  };

  const handleClear = () => {
    setPinError(false);
    setPin("");
  };

  // Image Upload Handler
  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCoverUploading(true);
    try {
      // Compress to max 800px width/height
      const compressedDataUrl = await compressAndResizeImage(file, 800, 500);
      setCustomCoverImage(compressedDataUrl);
    } catch (err) {
      console.error("Failed to process cover image", err);
      alert("Error compressing cover image. Please try again.");
    } finally {
      setCoverUploading(false);
    }
  };

  // Avatar Upload Handler
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarUploading(true);
    try {
      // Compress to max 150px width/height for avatar
      const compressedDataUrl = await compressAndResizeImage(file, 150, 150);
      setCustomAuthorImage(compressedDataUrl);
    } catch (err) {
      console.error("Failed to process avatar image", err);
      alert("Error compressing avatar image. Please try again.");
    } finally {
      setAvatarUploading(false);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title || !body) {
      alert("Title and content body are required.");
      return;
    }

    setPublishing(true);
    setPublishStatus(null);

    const author = customAuthorName 
      ? { name: customAuthorName, image: customAuthorImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80" }
      : { name: SUGGESTED_AUTHORS[selectedAuthorIndex].name, image: SUGGESTED_AUTHORS[selectedAuthorIndex].img };

    const cover = customCoverImage || coverImage;

    const postData = {
      title,
      excerpt: excerpt || title.substring(0, 100) + "...",
      body,
      category,
      coverImage: cover,
      authorName: author.name,
      authorImage: author.image
    };

    try {
      let result;
      if (editingPostId) {
        // Update Mode
        result = await updatePost(editingPostId, postData);
      } else {
        // Creation Mode
        result = await createPost(postData);
      }
      setPublishStatus(result);
      // Reload posts
      loadExistingPosts();
      
      // If successful update, exit edit mode and clear form
      if (result.success && editingPostId) {
        handleResetForm();
      }
    } catch (error) {
      console.error("Failed to save blog", error);
      setPublishStatus({
        success: false,
        errorDetails: error.message
      });
    } finally {
      setPublishing(false);
    }
  };

  const handleEditClick = (post) => {
    setEditingPostId(post._id);
    setTitle(post.title);
    setExcerpt(post.excerpt || "");
    setBody(post.body || "");
    setCategory(post.category || "Higher Education");
    
    // Check if cover matches suggested ones
    const isSuggestedCover = SUGGESTED_COVER_IMAGES.some(img => img.url === post.coverImage);
    if (isSuggestedCover) {
      setCoverImage(post.coverImage);
      setCustomCoverImage("");
    } else {
      setCustomCoverImage(post.coverImage);
    }

    // Check if author matches suggested ones
    const authorIdx = SUGGESTED_AUTHORS.findIndex(auth => auth.name === post.authorName);
    if (authorIdx !== -1) {
      setSelectedAuthorIndex(authorIdx);
      setCustomAuthorName("");
      setCustomAuthorImage("");
    } else {
      setCustomAuthorName(post.authorName);
      setCustomAuthorImage(post.authorImage);
    }

    // Switch tab to Edit form
    setActiveTab("edit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = async (postId, title) => {
    if (window.confirm(`Are you sure you want to delete the article: "${title}"?`)) {
      try {
        const result = await deletePost(postId);
        if (result.success) {
          alert("Article successfully deleted.");
          loadExistingPosts();
          if (editingPostId === postId) {
            handleResetForm();
          }
        } else {
          alert(`Failed to delete: ${result.errorDetails}`);
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred while deleting.");
      }
    }
  };

  const handleResetForm = () => {
    setEditingPostId(null);
    setTitle("");
    setExcerpt("");
    setBody("");
    setCategory("Higher Education");
    setCoverImage(SUGGESTED_COVER_IMAGES[0].url);
    setCustomCoverImage("");
    setSelectedAuthorIndex(0);
    setCustomAuthorName("");
    setCustomAuthorImage("");
  };

  const currentCover = customCoverImage || coverImage;
  const currentAuthorName = customAuthorName || SUGGESTED_AUTHORS[selectedAuthorIndex].name;
  const currentAuthorImage = customAuthorImage || SUGGESTED_AUTHORS[selectedAuthorIndex].img;

  // Filtered posts for manage list
  const filteredManagePosts = allExistingPosts.filter(p =>
    p.title.toLowerCase().includes(manageSearchTerm.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(manageSearchTerm.toLowerCase()))
  );

  // If locked, render the PIN pad Lock screen
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 relative overflow-hidden text-white font-sans">
        <SEOMeta title="Studio Access Required" description="Enter credentials to access Antechos India's secure blog editor." />
        {/* Floating gradient blobs */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-[#161C24]/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl flex flex-col items-center"
        >
          {/* Lock Icon Banner */}
          <div className="relative mb-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
              pinError ? "bg-red-500/20 text-red-500 border border-red-500/30" : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
            }`}>
              {pinError ? <Lock className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
            </div>
            {pinError && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1 border-2 border-[#161C24]"
              >
                <AlertCircle className="w-3.5 h-3.5" />
              </motion.div>
            )}
          </div>

          <h2 className="text-xl font-extrabold tracking-tight mb-2">Authoring Studio Access</h2>
          <p className="text-xs text-gray-400 text-center mb-6 leading-relaxed">
            Enter the 4-digit PIN to access the blog publisher.
            <br />
            <span className="text-gray-500 italic mt-1 inline-block">Hint: The default PIN is 8888</span>
          </p>

          {/* PIN Indicators */}
          <div className={`flex justify-center gap-4 mb-8 ${pinError ? "animate-shake" : ""}`}>
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={`w-4.5 h-4.5 rounded-full border-2 transition-all duration-200 ${
                  pinError 
                    ? "border-red-500 bg-red-500/20" 
                    : pin.length > idx 
                      ? "border-[#38BDF8] bg-[#38BDF8]" 
                      : "border-slate-700 bg-transparent"
                }`}
              />
            ))}
          </div>

          {/* Virtual Numeric Keypad */}
          <div className="grid grid-cols-3 gap-3.5 w-full max-w-[280px] mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleKeypadPress(num.toString())}
                className="h-14 rounded-full bg-slate-900 border border-slate-800 text-lg font-bold hover:bg-slate-800 hover:border-slate-700 active:scale-95 transition-all cursor-pointer flex items-center justify-center text-white"
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleClear}
              className="h-14 rounded-full bg-transparent text-gray-500 text-xs font-bold hover:text-white transition-colors cursor-pointer flex items-center justify-center"
            >
              Clear
            </button>
            <button
              onClick={() => handleKeypadPress("0")}
              className="h-14 rounded-full bg-slate-900 border border-slate-800 text-lg font-bold hover:bg-slate-800 hover:border-slate-700 active:scale-95 transition-all cursor-pointer flex items-center justify-center text-white"
            >
              0
            </button>
            <button
              onClick={handleBackspace}
              className="h-14 rounded-full bg-transparent text-gray-500 text-xs font-bold hover:text-white transition-colors cursor-pointer flex items-center justify-center"
            >
              Back
            </button>
          </div>

          {pinError && (
            <span className="text-xs text-red-500 font-semibold mb-2">Invalid PIN. Please try again.</span>
          )}

          <button 
            onClick={() => navigate("/blogs")}
            className="text-xs text-gray-400 hover:text-white underline cursor-pointer flex items-center gap-1 mt-2"
          >
            <ArrowLeft className="w-3 h-3" /> Return to Blogs
          </button>
        </motion.div>

        {/* Shake Keyframe animation styles */}
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-6px); }
            40%, 80% { transform: translateX(6px); }
          }
          .animate-shake {
            animation: shake 0.3s ease-in-out;
          }
        `}</style>
      </div>
    );
  }

  // Unlocked: Render Full Authoring Studio
  return (
    <div className="min-h-screen bg-slate-50 text-[#0A0C0F] pb-24 font-sans">
      <SEOMeta title={editingPostId ? "Edit Article Details" : "Blog Authoring Studio"} description="Access the secure Antechos India Blog Authoring Studio to compose, modify, preview, and delete blog posts." />
      {/* Header bar */}
      <div className="bg-[#0A0C0F] text-white py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button 
            onClick={() => navigate("/blogs")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer text-sm font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </button>
          <div className="flex items-center gap-2">
            <PenTool className="w-5 h-5 text-[#38BDF8]" />
            <h1 className="font-extrabold text-lg sm:text-xl font-sans tracking-tight">Blog Authoring Studio</h1>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem("antechos_blog_studio_unlocked");
              setIsUnlocked(false);
              setPin("");
            }}
            className="px-4 py-2 border border-slate-800 text-gray-400 hover:text-white hover:bg-slate-900 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Lock Studio
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        
        {/* Alerts / Publish Status */}
        {publishStatus && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 border ${
              publishStatus.method === "sanity"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-amber-50 border-amber-200 text-amber-800"
            }`}
          >
            {publishStatus.method === "sanity" ? (
              <CheckCircle className="w-8 h-8 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0" />
            )}
            <div>
              <h3 className="font-bold text-base mb-1">
                {publishStatus.method === "sanity" 
                  ? "Article saved to Sanity.io successfully!" 
                  : "Article saved to Local Storage Fallback!"}
              </h3>
              <p className="text-sm opacity-90 leading-relaxed mb-3">
                {publishStatus.method === "sanity"
                  ? "Your blog post has been successfully synced to the cloud in your Sanity dataset. It is now live!"
                  : `Your blog post is saved locally in this browser. However, the Sanity API returned a permission error: "${publishStatus.errorDetails}".`}
              </p>
              {publishStatus.method === "local" && (
                <div className="bg-white/60 p-4 rounded-xl border border-amber-300/40 text-xs font-sans text-amber-900 leading-relaxed flex gap-2">
                  <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Developer Tip:</strong> Your Sanity API token (Robot blogs) does not have write access. To fix this, navigate to your <a href="https://manage.sanity.io" target="_blank" rel="noopener noreferrer" className="underline font-bold text-amber-950 hover:text-black">Sanity Management Console</a>, select your project, go to APIs, and change the token role to <strong>Editor</strong> or <strong>Contributor</strong>.
                  </div>
                </div>
              )}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => navigate("/blogs")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
                    publishStatus.method === "sanity"
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-amber-700 text-white hover:bg-amber-800"
                  }`}
                >
                  View in Blogs Listing
                </button>
                <button
                  onClick={() => setPublishStatus(null)}
                  className="px-4 py-2 text-xs font-bold bg-transparent border border-current rounded-lg cursor-pointer hover:bg-black/5 transition-colors"
                >
                  Dismiss Message
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab Selector (Desktop & Mobile) */}
        <div className="flex bg-white border border-gray-200 rounded-2xl p-1 mb-8 max-w-lg mx-auto shadow-sm">
          <button
            onClick={() => setActiveTab("edit")}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all ${
              activeTab === "edit" ? "bg-slate-900 text-white shadow-sm" : "text-gray-500 hover:text-slate-800"
            }`}
          >
            <PenTool className="w-4 h-4" /> {editingPostId ? "Edit Post" : "Write Post"}
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all ${
              activeTab === "preview" ? "bg-slate-900 text-white shadow-sm" : "text-gray-500 hover:text-slate-800"
            }`}
          >
            <Eye className="w-4 h-4" /> Visual Preview
          </button>
          <button
            onClick={() => {
              setActiveTab("manage");
              loadExistingPosts();
            }}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all ${
              activeTab === "manage" ? "bg-slate-900 text-white shadow-sm" : "text-gray-500 hover:text-slate-800"
            }`}
          >
            <FileText className="w-4 h-4" /> Manage Posts ({allExistingPosts.length})
          </button>
        </div>

        {/* Studio Workspace Sections */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* TAB 1: FORM EDITOR */}
          <form 
            onSubmit={handlePublish}
            className={`bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 md:col-span-7 ${
              activeTab !== "edit" ? "hidden" : "block"
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="font-extrabold text-xl font-sans text-slate-800 flex items-center gap-2">
                <PenTool className="w-5 h-5 text-[#38BDF8]" />
                {editingPostId ? "Edit Article Details" : "Compose Article"}
              </h2>
              {editingPostId && (
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer bg-red-50 hover:bg-red-100/70 px-3 py-1.5 rounded-lg border border-red-200 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Cancel Edit Mode
                </button>
              )}
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Title</label>
              <input
                type="text"
                placeholder="e.g. Master the Skills for Autonomous Agent Systems"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-slate-900 placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] focus:bg-white text-sm transition-all"
              />
            </div>

            {/* Category & Excerpt */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-4 space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-3 text-slate-900 focus:outline-none focus:border-[#38BDF8] focus:bg-white text-sm cursor-pointer transition-all"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-8 space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Excerpt / Brief Summary</label>
                <input
                  type="text"
                  placeholder="e.g. A deep dive into multi-agent systems and orchestrator design."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-slate-900 placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] focus:bg-white text-sm transition-all"
                />
              </div>
            </div>

            {/* Cover Image Selector & Upload */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block flex items-center justify-between">
                <span>Cover Image</span>
                {customCoverImage && (
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-100">
                    Uploaded custom cover
                  </span>
                )}
              </label>
              
              {/* Presets Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SUGGESTED_COVER_IMAGES.map((img) => (
                  <button
                    key={img.name}
                    type="button"
                    onClick={() => {
                      setCoverImage(img.url);
                      setCustomCoverImage("");
                    }}
                    className={`p-1 rounded-xl border-2 overflow-hidden aspect-video relative group transition-all cursor-pointer ${
                      coverImage === img.url && !customCoverImage
                        ? "border-[#38BDF8] ring-2 ring-[#38BDF8]/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover rounded-lg" />
                    <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-[10px] font-bold text-white text-center px-1">
                      {img.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Upload Input & URL input row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* File Upload Button */}
                <div className="space-y-1">
                  <span className="text-[11px] text-gray-500 font-bold block">Upload Cover Image file:</span>
                  <label className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-[#38BDF8]/50 bg-slate-50 hover:bg-[#38BDF8]/5 p-3 rounded-xl cursor-pointer transition-all">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleCoverUpload}
                      className="hidden" 
                    />
                    {coverUploading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#38BDF8] border-t-transparent" />
                    ) : (
                      <Upload className="w-4 h-4 text-[#38BDF8]" />
                    )}
                    <span className="text-xs font-bold text-slate-700">
                      {coverUploading ? "Compressing Image..." : "Choose Image File"}
                    </span>
                  </label>
                </div>

                {/* URL Direct Entry */}
                <div className="space-y-1">
                  <span className="text-[11px] text-gray-500 font-bold block">Or enter cover Image URL:</span>
                  <div className="relative">
                    <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={customCoverImage.startsWith("data:") ? "" : customCoverImage}
                      onChange={(e) => setCustomCoverImage(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] focus:bg-white text-xs transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Author Profile Selector & Upload */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block flex items-center justify-between">
                <span>Author Profile</span>
                {customAuthorImage && (
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-100">
                    Uploaded custom avatar
                  </span>
                )}
              </label>
              
              {/* Presets Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SUGGESTED_AUTHORS.map((author, index) => (
                  <button
                    key={author.name}
                    type="button"
                    onClick={() => {
                      setSelectedAuthorIndex(index);
                      setCustomAuthorName("");
                      setCustomAuthorImage("");
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl border-2 bg-slate-50 transition-all text-left cursor-pointer ${
                      selectedAuthorIndex === index && !customAuthorName
                        ? "border-[#38BDF8] ring-2 ring-[#38BDF8]/20 bg-white"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img src={author.img} alt={author.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{author.name}</p>
                      <p className="text-[9px] text-gray-400 truncate">{author.role}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Upload Input & Custom Author Info row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {/* Custom Name */}
                <div className="space-y-1">
                  <span className="text-[11px] text-gray-500 font-bold block">Custom Author Name:</span>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g. Dr. John Doe"
                      value={customAuthorName}
                      onChange={(e) => setCustomAuthorName(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] focus:bg-white text-xs transition-all"
                    />
                  </div>
                </div>

                {/* Upload Avatar File */}
                <div className="space-y-1">
                  <span className="text-[11px] text-gray-500 font-bold block">Upload Author Avatar:</span>
                  <label className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-[#38BDF8]/50 bg-slate-50 hover:bg-[#38BDF8]/5 p-2 rounded-xl cursor-pointer transition-all">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleAvatarUpload}
                      className="hidden" 
                    />
                    {avatarUploading ? (
                      <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-[#38BDF8] border-t-transparent" />
                    ) : (
                      <Upload className="w-3.5 h-3.5 text-[#38BDF8]" />
                    )}
                    <span className="text-xs font-bold text-slate-700">
                      {avatarUploading ? "Processing..." : "Select Avatar File"}
                    </span>
                  </label>
                </div>

                {/* Custom Avatar URL */}
                <div className="space-y-1">
                  <span className="text-[11px] text-gray-500 font-bold block">Or Avatar Image URL:</span>
                  <div className="relative">
                    <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="url"
                      placeholder="https://..."
                      value={customAuthorImage.startsWith("data:") ? "" : customAuthorImage}
                      onChange={(e) => setCustomAuthorImage(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] focus:bg-white text-xs transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Markdown Body Editor */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Article Content (Markdown / Text)</label>
              <textarea
                rows={12}
                placeholder="Write your blog post body here. Support empty lines for new paragraphs, headings with # symbol, and bullet points."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-slate-900 placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] focus:bg-white text-sm font-mono leading-relaxed transition-all"
              />
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-medium">
                {editingPostId ? "Modifying existing article" : "Autosaved to browser memory"}
              </span>
              <button
                type="submit"
                disabled={publishing || coverUploading || avatarUploading}
                className="px-6 py-3 bg-[#0A0C0F] hover:bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {publishing ? (
                  <>
                    <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
                    Saving...
                  </>
                ) : editingPostId ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                    Update Article
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-3.5 h-3.5 text-[#38BDF8]" />
                    Publish Article
                  </>
                )}
              </button>
            </div>
          </form>

          {/* TAB 2: VISUAL PREVIEW */}
          <div 
            className={`space-y-8 md:col-span-5 ${
              activeTab !== "preview" ? "hidden" : "block"
            }`}
          >
            <h2 className="font-extrabold text-xl font-sans text-slate-800 flex items-center gap-2 pb-4 border-b border-gray-100 md:border-0 md:pb-0">
              <Eye className="w-5 h-5 text-[#38BDF8]" />
              Live Visual Preview
            </h2>

            {/* 1. Blog Card Preview */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Listing Card Render:</span>
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img src={currentCover} alt="Cover Preview" className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-[#0A0C0F]/80 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded">
                    {category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-gray-400 text-[10px] mb-2 font-mono">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#38BDF8]" /> {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#38BDF8]" /> 4 min read</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base leading-snug line-clamp-2 mb-2 font-sans">
                    {title || "Untitled Blog Post"}
                  </h3>
                  <p className="text-gray-500 text-xs line-clamp-3 leading-relaxed mb-4 font-sans">
                    {excerpt || "Add an excerpt to summarize the main point of your article here."}
                  </p>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-2">
                      <img src={currentAuthorImage} alt="Author Avatar" className="w-6 h-6 rounded-full object-cover bg-gray-100" />
                      <span className="text-[10px] font-bold text-slate-700">{currentAuthorName}</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-xs">
                      <ArrowLeft className="w-3 h-3 rotate-180" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Blog Body Content Preview */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block">Detail Modal Reading Render:</span>
              <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg max-h-[400px] overflow-y-auto">
                <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl mb-4 leading-tight border-b border-gray-100 pb-3">
                  {title || "Untitled Blog Post"}
                </h3>
                <div className="flex items-center gap-3 mb-6">
                  <img src={currentAuthorImage} alt="Author" className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">{currentAuthorName}</p>
                    <p className="text-[9px] text-[#38BDF8] font-bold uppercase tracking-wider">Contributor</p>
                  </div>
                </div>
                {excerpt && (
                  <div className="bg-slate-50 border-l-4 border-[#38BDF8] p-3 rounded-r-lg mb-4 text-xs italic text-slate-600 leading-relaxed">
                    {excerpt}
                  </div>
                )}
                <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-sans space-y-3">
                  {body || "Write some content in the editor to see it pre-rendered in this view."}
                </div>
              </div>
            </div>
          </div>

          {/* TAB 3: MANAGEMENT DASHBOARD */}
          <div 
            className={`bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 md:col-span-12 ${
              activeTab !== "manage" ? "hidden" : "block"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <h2 className="font-extrabold text-xl font-sans text-slate-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#38BDF8]" />
                Manage Published Articles
              </h2>
              {/* Manage search */}
              <div className="relative flex items-center bg-slate-50 border border-gray-200 rounded-xl px-3 py-1.5 focus-within:border-[#38BDF8] focus-within:bg-white max-w-xs transition-all">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Filter existing posts..."
                  value={manageSearchTerm}
                  onChange={(e) => setManageSearchTerm(e.target.value)}
                  className="bg-transparent border-0 text-xs text-slate-900 placeholder-gray-400 focus:ring-0 outline-none w-full"
                />
              </div>
            </div>

            {postListLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#38BDF8]"></div>
              </div>
            ) : filteredManagePosts.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-sm">
                No matching articles found in storage.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      <th className="pb-3 pl-4">Cover / Title</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Author</th>
                      <th className="pb-3">Publish Date</th>
                      <th className="pb-3">Storage / Status</th>
                      <th className="pb-3 pr-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-xs text-slate-700">
                    {filteredManagePosts.map((post) => {
                      const isLocal = post._id.startsWith("post-");
                      const isMock = post._id.startsWith("mock-");
                      
                      return (
                        <tr key={post._id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 pl-4 font-bold flex items-center gap-3">
                            <img src={post.coverImage} alt="" className="w-12 aspect-[16/10] rounded object-cover flex-shrink-0 bg-slate-100" />
                            <span className="line-clamp-2 pr-4">{post.title}</span>
                          </td>
                          <td className="py-4">
                            <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold uppercase tracking-wider text-slate-600">
                              {post.category}
                            </span>
                          </td>
                          <td className="py-4 font-semibold text-slate-900">{post.authorName}</td>
                          <td className="py-4 text-gray-500 font-mono">
                            {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </td>
                          <td className="py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                              isMock 
                                ? "bg-slate-100 text-slate-600" 
                                : isLocal 
                                  ? "bg-amber-100 text-amber-800" 
                                  : "bg-blue-100 text-blue-800"
                            }`}>
                              {isMock ? "Mock Presets" : isLocal ? "Local Storage" : "Sanity Cloud"}
                            </span>
                          </td>
                          <td className="py-4 pr-4 text-right space-x-1.5">
                            <button
                              onClick={() => handleEditClick(post)}
                              className="p-2 bg-slate-100 hover:bg-[#38BDF8]/10 text-slate-700 hover:text-[#38BDF8] rounded-lg transition-colors cursor-pointer border border-transparent hover:border-[#38BDF8]/20"
                              title="Edit Article"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(post._id, post.title)}
                              className="p-2 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-red-200"
                              title="Delete Article"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostBlog;
