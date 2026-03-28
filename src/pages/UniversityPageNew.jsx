import React, { useState, useEffect } from 'react';
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
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { universities } from '../data/universities';

const UniversityPageNew = () => {
  const [showAll, setShowAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isScrolled, setIsScrolled] = useState(false);

  const itemsPerPage = 6;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         uni.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || uni.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

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
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop)' }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/95 via-[#1E3A8A]/80 to-[#1E3A8A]/90"></div>
        </motion.div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay opacity-20 filter blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              x: [-20, 20, -20],
              y: [-20, 20, -20]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-overlay opacity-20 filter blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              x: [20, -20, 20],
              y: [20, -20, 20]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-blue-100 uppercase bg-blue-500/20 backdrop-blur-md rounded-full border border-blue-400/30">
              Transform Your Future
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Unlock Your Potential at <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">
                Premier Universities
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-50/90 mb-10 max-w-3xl mx-auto font-light">
              Antechos India brings you closer to your academic dreams with our handpicked network of world-class educational institutions.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white mt-12 bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="text-center">
                <Users className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <div className="text-3xl font-bold">{universities.length}</div>
                <div className="text-sm text-blue-200/80">Partner Unis</div>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <div className="text-3xl font-bold">100+</div>
                <div className="text-sm text-blue-200/80">Premium Courses</div>
              </div>
              <div className="text-center">
                <Building2 className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <div className="text-3xl font-bold">12+</div>
                <div className="text-sm text-blue-200/80">States Covered</div>
              </div>
              <div className="text-center">
                <Briefcase className="w-8 h-8 text-blue-300 mx-auto mb-2" />
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm text-blue-200/80">Successful Alums</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* University Search & Filter Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-20">
        <motion.div 
          className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-10 border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative flex-1 group w-full">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search by university name or location..." 
                className="w-full pl-14 pr-6 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-gray-700 text-lg shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative w-full">
                <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                <select 
                  className="w-full pl-14 pr-10 py-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-gray-700 text-lg shadow-inner appearance-none cursor-pointer"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat} Category</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Universities Grid Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-[#1E293B] mb-6 tracking-tight">
                Academic Excellence Near You
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Discover institutions that match your career goals. From historic public universities to modern innovative private campuses.
              </p>
            </div>
            {!showAll && filteredUniversities.length > itemsPerPage && (
              <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-lg border border-gray-100">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="p-3 rounded-xl bg-gray-50 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <div className="text-sm font-medium text-slate-400 px-4">
                   Page {Math.floor(currentIndex/itemsPerPage) + 1} of {Math.ceil(filteredUniversities.length / itemsPerPage)}
                </div>
                <button
                  onClick={handleNext}
                  disabled={currentIndex + itemsPerPage >= filteredUniversities.length}
                  className="p-3 rounded-xl bg-gray-50 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            )}
          </div>

          {filteredUniversities.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
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
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group"
                  >
                    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 border border-gray-100 flex flex-col h-full active:scale-[0.98]">
                      {/* Image Header */}
                      <div className="relative h-72 overflow-hidden flex-shrink-0">
                        <img 
                          src={university.image} 
                          alt={university.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        
                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                          <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold border border-white/20">
                            {university.category}
                          </span>
                        </div>

                        <div className="absolute top-6 right-6">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                            <GraduationCap className="w-6 h-6 text-blue-600" />
                          </div>
                        </div>
                        
                        <div className="absolute bottom-6 left-6 right-6">
                           <div className="flex items-center gap-2 mb-2">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-white font-bold text-lg">{university.rating}</span>
                            <span className="text-white/60 text-sm font-medium">/ 5.0</span>
                           </div>
                           <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
                            {university.name}
                           </h3>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 text-slate-500 mb-6 bg-slate-50 py-2 px-4 rounded-xl self-start">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">{university.location}</span>
                        </div>
                        
                        <p className="text-slate-500 text-base leading-relaxed mb-8 line-clamp-3">
                          {university.description}
                        </p>
                        
                        {/* Programs Tags */}
                        <div className="space-y-4 mb-8">
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Available Programs</div>
                          <div className="flex flex-wrap gap-2">
                            {university.programs.map((program, idx) => (
                              <span 
                                key={idx}
                                className="text-xs font-semibold bg-gray-50 text-slate-600 px-4 py-2 rounded-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"
                              >
                                {program}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* Established & Footer */}
                        <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">ESTABLISHED</span>
                            <span className="text-sm font-bold text-slate-600">{university.established}</span>
                          </div>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUniversityClick(university.link);
                            }}
                            className="bg-[#1E293B] hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-lg shadow-slate-200 group-hover:shadow-blue-500/20 group/btn"
                          >
                            <span>Apply Now</span>
                            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-40 flex flex-col items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">No Universities Found</h3>
              <p className="text-slate-500 max-w-sm">We couldn't find any results matching your search terms. Try adjusting your filters.</p>
              <button 
                onClick={() => { setSearchTerm(''); setFilterCategory('All'); }}
                className="text-blue-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          )}

          {/* View All Button */}
          <div className="mt-24 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewAllToggle}
              className="inline-flex items-center gap-4 bg-white hover:bg-[#1E293B] text-[#1E293B] hover:text-white font-bold px-12 py-6 rounded-3xl transition-all duration-300 shadow-2xl border-2 border-[#1E293B] group"
            >
              <span className="text-xl">{showAll ? 'Show Paginated View' : `View All ${filteredUniversities.length} Institutions`}</span>
              <div className={`p-1 rounded-full border-2 border-current transition-transform duration-500 ${showAll ? 'rotate-180' : ''}`}>
                <ChevronRight className="w-6 h-6" />
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Trust Quote Section */}
      <section className="py-32 bg-[#1E293B] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 leading-tight">
                "Education is the most powerful weapon which you can use to change the world."
              </h2>
              <div className="w-24 h-1 bg-blue-500 mx-auto mb-8 rounded-full"></div>
              <p className="text-xl text-blue-100/60 font-medium uppercase tracking-[0.2em]">Nelson Mandela</p>
            </motion.div>
          </div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
           <Building2 className="absolute -bottom-10 -left-10 w-96 h-96 text-white" />
           <GraduationCap className="absolute -top-10 -right-10 w-96 h-96 text-white" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-gradient-to-br from-[#1E3A8A] to-[#1E40AF] rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_40px_80px_-15px_rgba(30,58,138,0.4)]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Glossy overlay */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 leading-tight max-w-4xl mx-auto">
                Can't decide the right university for you?
              </h2>
              <p className="text-xl md:text-2xl text-blue-100/90 mb-14 max-w-2xl mx-auto font-light leading-relaxed">
                Connect with our expert education counsellors for a 1-on-1 session to map out your perfect academic journey.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="bg-white hover:bg-blue-50 text-[#1E3A8A] font-bold px-12 py-6 rounded-[2rem] transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-4 text-xl group">
                  <span>Get Free Counselling</span>
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </button>
                <button className="bg-[#1E293B] hover:bg-slate-800 text-white font-bold px-12 py-6 rounded-[2rem] transition-all duration-300 shadow-xl border border-white/10 text-xl">
                  Contact Support
                </button>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-1/2 left-10 -translate-y-1/2 opacity-10">
              <Users className="w-64 h-64 text-white" />
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
