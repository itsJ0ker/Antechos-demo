import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  GraduationCap, 
  MapPin, 
  ExternalLink, 
  Search, 
  Filter, 
  Award, 
  Building2, 
  Briefcase,
  Users,
  X,
  CheckCircle2,
  ChevronDown,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { universities } from '../data/universities';

const UniversityPageNew = () => {
  const [showAll, setShowAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const itemsPerPage = 6;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Extract all unique programs for filtering
  const allPrograms = useMemo(() => {
    const programs = new Set();
    universities.forEach(uni => {
      uni.programs.forEach(p => programs.add(p));
    });
    return Array.from(programs).sort();
  }, []);

  const filteredUniversities = useMemo(() => {
    return universities.filter(uni => {
      const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           uni.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'All' || uni.category === filterCategory;
      const matchesPrograms = selectedPrograms.length === 0 || 
                             selectedPrograms.some(p => uni.programs.includes(p));
      return matchesSearch && matchesCategory && matchesPrograms;
    });
  }, [searchTerm, filterCategory, selectedPrograms]);

  const categories = ['All', ...new Set(universities.map(u => u.category))];

  const handleNext = () => {
    const maxIndex = filteredUniversities.length - itemsPerPage;
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const handleUniversityClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleViewAllToggle = () => {
    setShowAll(!showAll);
    setCurrentIndex(0);
  };

  const toggleProgram = (program) => {
    setSelectedPrograms(prev => 
      prev.includes(program) 
        ? prev.filter(p => p !== program) 
        : [...prev, program]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterCategory('All');
    setSelectedPrograms([]);
  };

  const displayedUniversities = showAll 
    ? filteredUniversities 
    : filteredUniversities.slice(currentIndex, currentIndex + itemsPerPage);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section - More Professional and Compact */}
      <div className="relative h-[450px] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop)' }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/95 via-[#1E3A8A]/85 to-[#1E3A8A]/90"></div>
        </motion.div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-blue-200 uppercase bg-blue-500/20 backdrop-blur-md rounded-full border border-blue-400/30">
              EXPLORE PREMIER INSTITUTIONS
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
              Colleges & Universities
            </h1>
            <p className="text-lg md:text-xl text-blue-50/80 mb-8 max-w-2xl mx-auto font-light">
              Find the perfect academic partner to shape your future career. Browse through our handpicked list of global-standard educational institutions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-blue-600" />
                  Filters
                </h3>
                {(searchTerm || filterCategory !== 'All' || selectedPrograms.length > 0) && (
                  <button 
                    onClick={clearFilters}
                    className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Search Within */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Search University</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="E.g. Galgotias..." 
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Institution Type</label>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${filterCategory === cat ? 'bg-blue-600 border-blue-600' : 'bg-slate-50 border-slate-200 group-hover:border-blue-300'}`}>
                        {filterCategory === cat && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <input 
                        type="radio" 
                        className="hidden" 
                        name="category"
                        checked={filterCategory === cat}
                        onChange={() => setFilterCategory(cat)}
                      />
                      <span className={`text-sm ${filterCategory === cat ? 'text-blue-600 font-bold' : 'text-slate-600'}`}>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Programs Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Popular Programs</label>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                  {allPrograms.map(prog => (
                    <label key={prog} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${selectedPrograms.includes(prog) ? 'bg-blue-600 border-blue-600' : 'bg-slate-50 border-slate-200 group-hover:border-blue-300'}`}>
                        {selectedPrograms.includes(prog) && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedPrograms.includes(prog)}
                        onChange={() => toggleProgram(prog)}
                      />
                      <span className={`text-sm ${selectedPrograms.includes(prog) ? 'text-blue-600 font-bold' : 'text-slate-600'}`}>{prog}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200 font-bold text-slate-700"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-blue-600" />
                Filters & Search
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-white mt-2 rounded-2xl border border-slate-200 shadow-xl"
                >
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Search</label>
                      <input 
                        type="text" 
                        className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    {/* ... other mobile filters can go here ... */}
                    <button 
                      onClick={() => setIsSidebarOpen(false)}
                      className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold"
                    >
                      Apply Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Main Content List */}
          <main className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {filteredUniversities.length} Institutions Found
                </h2>
                <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                  <Info className="w-4 h-4" />
                  <span>Showing top accredited universities in India</span>
                </div>
              </div>
              
              {!showAll && filteredUniversities.length > itemsPerPage && (
                <div className="flex items-center gap-3 bg-white p-1.5 rounded-xl shadow-sm border border-slate-200">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                  </button>
                  <div className="text-xs font-bold text-slate-500 px-2">
                    {Math.floor(currentIndex/itemsPerPage) + 1} / {Math.ceil(filteredUniversities.length / itemsPerPage)}
                  </div>
                  <button
                    onClick={handleNext}
                    disabled={currentIndex + itemsPerPage >= filteredUniversities.length}
                    className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-700" />
                  </button>
                </div>
              )}
            </div>

            {filteredUniversities.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={showAll ? 'all' : 'paged'}
              >
                <AnimatePresence mode="popLayout">
                  {displayedUniversities.map((university) => (
                    <motion.div
                      key={university.id}
                      variants={cardVariants}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group"
                    >
                      <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-200 flex flex-col h-full">
                        {/* Image Header with Badge Overlay */}
                        <div className="relative h-48 overflow-hidden flex-shrink-0">
                          <img 
                            src={university.image} 
                            alt={university.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                          
                          {/* Rating Badge - Like reference */}
                          <div className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 rounded-lg flex items-center gap-1.5 shadow-lg">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="text-sm font-bold">{university.rating}</span>
                          </div>

                          {/* Accreditation Mock - Professional touch */}
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-700 text-[10px] font-extrabold rounded-md shadow-sm border border-blue-100 uppercase tracking-wider">
                              NAAC A++
                            </span>
                          </div>

                          <div className="absolute bottom-4 left-4 right-4 text-white">
                             <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-1">
                               <Building2 className="w-3 h-3" />
                               {university.category}
                             </div>
                             <h3 className="text-xl font-bold leading-tight line-clamp-1">
                              {university.name}
                             </h3>
                          </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-5 flex flex-col flex-grow">
                          <div className="flex items-center gap-2 text-slate-500 mb-4 bg-slate-50 py-1.5 px-3 rounded-lg self-start">
                            <MapPin className="w-3.5 h-3.5 text-blue-500" />
                            <span className="text-xs font-semibold">{university.location}</span>
                          </div>
                          
                          <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">
                            {university.description}
                          </p>
                          
                          {/* Programs Tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {university.programs.slice(0, 3).map((program, idx) => (
                              <span 
                                key={idx}
                                className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md"
                              >
                                {program}
                              </span>
                            ))}
                            {university.programs.length > 3 && (
                               <span className="text-[10px] font-bold text-slate-400">+{university.programs.length - 3} more</span>
                            )}
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-3">
                              <button 
                                onClick={() => handleUniversityClick(university.link)}
                                className="text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 rounded-xl transition-all text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 group/details"
                              >
                                <span>View Details</span>
                                <ExternalLink className="w-3.5 h-3.5 group-hover/details:translate-x-0.5 group-hover/details:-translate-y-0.5 transition-transform" />
                              </button>
                              <button 
                                onClick={() => handleUniversityClick(university.link)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                              >
                                <span>Apply Now</span>
                              </button>
                            </div>
                            
                            {/* Compare Checkbox - Professional touch from reference */}
                            <label className="flex items-center gap-2 cursor-pointer self-center group/compare py-1 px-4 rounded-full hover:bg-slate-50 transition-colors mt-1">
                              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selectedPrograms.length > 5 ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-white'}`}>
                                <CheckCircle2 className="w-3 h-3 text-blue-600 opacity-0 group-hover/compare:opacity-40 transition-opacity" />
                              </div>
                              <span className="text-[10px] font-bold text-slate-400 group-hover/compare:text-slate-600 transition-colors uppercase tracking-widest">Compare Institutional Stats</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-32 flex flex-col items-center gap-6 bg-white rounded-[3rem] border border-slate-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">No Universities Found</h3>
                <p className="text-slate-500 max-w-sm">We couldn't find any results matching your search terms. Try adjusting your filters.</p>
                <button 
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}

            {/* View All / Load More Action */}
            {!showAll && filteredUniversities.length > itemsPerPage && (
              <div className="mt-16 text-center">
                <button
                  onClick={handleViewAllToggle}
                  className="inline-flex items-center gap-3 bg-white hover:bg-slate-50 text-slate-800 font-bold px-10 py-4 rounded-2xl transition-all shadow-lg border border-slate-200 group"
                >
                  <span>View All {filteredUniversities.length} Institutions</span>
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Counseling Section - Premium Redesign */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <span className="text-orange-400 font-bold uppercase tracking-widest text-xs mb-4 inline-block">Free Support</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-3xl mx-auto">
                Need help choosing the right university?
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto font-light">
                Our expert advisors are ready to guide you through the process of selecting and applying to your dream institution.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3">
                  <span>Get Free Counseling</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold px-10 py-4 rounded-2xl transition-all border border-white/10">
                  Talk to Expert
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <FooterSpacer />
    </div>
  );
};

const FooterSpacer = () => <div className="h-20 bg-white" />;

export default UniversityPageNew;
