import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, GraduationCap, MapPin, ExternalLink } from 'lucide-react';

// Custom styles
const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes slideInUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .gradient-bg {
    background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
    background-size: 400% 400%;
    animation: gradient-shift 15s ease infinite;
  }
  
  .card-hover-lift {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .card-hover-lift:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;

// University data with links
const universities = [
  {
    id: 1,
    name: 'Galgotias University',
    location: 'Greater Noida, Uttar Pradesh',
    description: 'Known for technical and management education with strong industry connections.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
    rating: 4.1,
    link: 'https://cvadm.com/vEjYUq',
    programs: ['Engineering', 'Law', 'MBA', 'Media Studies'],
    established: '2011'
  },
  {
    id: 2,
    name: 'Andhra University',
    location: 'Visakhapatnam, Andhra Pradesh',
    description: 'One of the oldest universities with strong research programs.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop',
    rating: 4.2,
    link: 'https://cvadm.com/em1Okj',
    programs: ['Engineering', 'Science', 'Arts', 'Law', 'Pharmacy'],
    established: '1926'
  },
  {
    id: 3,
    name: 'UPES',
    location: 'Dehradun, Uttarakhand',
    description: 'Industry-focused programs with global rankings and recognition.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
    rating: 4.6,
    link: 'https://cvadm.com/tWu4Ay',
    programs: ['BBA', 'BCA', 'MBA', 'MCA', 'Engineering'],
    established: '2003'
  },
  {
    id: 4,
    name: 'SRM University',
    location: 'Chennai, Tamil Nadu',
    description: 'Top private university with focus on innovation and placements.',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=600&fit=crop',
    rating: 4.6,
    link: 'https://cvadm.com/dRdcc4',
    programs: ['Engineering', 'Medical', 'Law', 'MBA'],
    established: '1985'
  },
  {
    id: 5,
    name: 'GLA University',
    location: 'Mathura, Uttar Pradesh',
    description: 'Strong emphasis on research and innovation with modern infrastructure.',
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&h=600&fit=crop',
    rating: 4.0,
    link: 'https://cvadm.com/wrsEfe',
    programs: ['Engineering', 'Pharmacy', 'Management', 'Science'],
    established: '1998'
  },
  {
    id: 6,
    name: 'D Y Patil University',
    location: 'Mumbai, Maharashtra',
    description: 'Professional education with strong industry connections and placements.',
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&h=600&fit=crop',
    rating: 4.1,
    link: 'https://cvadm.com/euYZ7D',
    programs: ['Engineering', 'Management', 'Pharmacy', 'Architecture'],
    established: '2014'
  },
  {
    id: 7,
    name: 'VGU',
    location: 'Jaipur, Rajasthan',
    description: 'Modern university with focus on holistic education and skill development.',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&h=600&fit=crop',
    rating: 4.3,
    link: 'https://cvadm.com/jSAJxr',
    programs: ['Engineering', 'Management', 'Design', 'Law'],
    established: '2012'
  },
  {
    id: 8,
    name: 'Manipal University Jaipur',
    location: 'Jaipur, Rajasthan',
    description: 'UGC-entitled programs with industry-aligned curriculum and global recognition.',
    image: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=600&fit=crop',
    rating: 4.7,
    link: 'https://cvadm.com/7QTNnF',
    programs: ['BBA', 'BCA', 'MBA', 'B.Com', 'M.Com', 'MA', 'MCA', 'B.Tech'],
    established: '2011'
  },
  {
    id: 9,
    name: 'MAHE',
    location: 'Manipal, Karnataka',
    description: 'Deemed university with focus on global education and research excellence.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
    rating: 4.6,
    link: 'https://cvadm.com/ek32fs',
    programs: ['Medical', 'Engineering', 'Pharmacy', 'Law'],
    established: '1953'
  },
  {
    id: 10,
    name: 'SMU',
    location: 'Gangtok, Sikkim',
    description: 'Blend of conventional and distance education with quality programs.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop',
    rating: 4.0,
    link: 'https://cvadm.com/64dA1p',
    programs: ['Engineering', 'MBA', 'Medical', 'IT'],
    established: '1995'
  },
  {
    id: 11,
    name: 'Parul University',
    location: 'Vadodara, Gujarat',
    description: 'Emerging university with strong academic focus and modern facilities.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
    rating: 4.2,
    link: 'https://cvadm.com/OSjCO2',
    programs: ['Engineering', 'Law', 'MBA', 'Medical'],
    established: '2015'
  },
  {
    id: 12,
    name: 'Amity University',
    location: 'Noida, Uttar Pradesh',
    description: 'Leading private university offering UGC-entitled online degrees.',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=600&fit=crop',
    rating: 4.4,
    link: 'https://cvadm.com/xBg72Q',
    programs: ['BBA', 'BCA', 'MBA', 'B.Com', 'M.Com'],
    established: '2005'
  },
  {
    id: 13,
    name: 'Amrita University',
    location: 'Coimbatore, Tamil Nadu',
    description: 'NAAC A++ accredited university with focus on value-based education.',
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&h=600&fit=crop',
    rating: 4.7,
    link: 'https://cvadm.com/xK9KaM',
    programs: ['B.Tech', 'MBA', 'Medical', 'Arts'],
    established: '1994'
  },
  {
    id: 14,
    name: 'LPU',
    location: 'Phagwara, Punjab',
    description: 'Largest private university in India with global exposure.',
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&h=600&fit=crop',
    rating: 4.3,
    link: 'https://cvadm.com/TZ4e3j',
    programs: ['Engineering', 'Management', 'Law', 'Design'],
    established: '2005'
  },
  {
    id: 15,
    name: 'Uttaranchal University',
    location: 'Dehradun, Uttarakhand',
    description: 'NAAC A+ accredited with comprehensive online and offline programs.',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&h=600&fit=crop',
    rating: 4.2,
    link: 'https://cvadm.com/buT2Ip',
    programs: ['Engineering', 'Management', 'Law', 'Pharmacy'],
    established: '2013'
  },
  {
    id: 16,
    name: 'NMIMS',
    location: 'Mumbai, Maharashtra',
    description: 'Leading management and multidisciplinary university.',
    image: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&h=600&fit=crop',
    rating: 4.5,
    link: 'https://cvadm.com/2i2WdH',
    programs: ['MBA', 'Engineering', 'Law', 'Design'],
    established: '1981'
  },
  {
    id: 17,
    name: 'Shoolini University',
    location: 'Solan, Himachal Pradesh',
    description: 'Research-focused private university with excellent facilities.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
    rating: 4.3,
    link: 'https://cvadm.com/9xEqyX',
    programs: ['Biotech', 'Pharmacy', 'MBA', 'Engineering'],
    established: '2009'
  },
  {
    id: 18,
    name: 'Andhra University',
    location: 'Visakhapatnam, Andhra Pradesh',
    description: 'Historic university with comprehensive academic programs.',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop',
    rating: 4.2,
    link: 'https://cvadm.com/WDOMd4',
    programs: ['Engineering', 'Science', 'Arts', 'Law'],
    established: '1926'
  },
  {
    id: 19,
    name: 'Kurukshetra University',
    location: 'Kurukshetra, Haryana',
    description: 'One of the oldest universities in Haryana with diverse programs.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
    rating: 4.1,
    link: 'https://cvadm.com/Uk4vYF',
    programs: ['Arts', 'Science', 'Law', 'Management'],
    established: '1956'
  }
];

const UniversityPageNew = () => {
  const [showAll, setShowAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 4;

  const handleNext = () => {
    const maxIndex = universities.length - itemsPerPage;
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
    setCurrentIndex(0); // Reset to first page when toggling
  };

  // Get universities to display
  const getDisplayedUniversities = () => {
    if (showAll) {
      return universities; // Show all universities
    } else {
      // Show paginated view (4 at a time)
      return universities.slice(currentIndex, currentIndex + itemsPerPage);
    }
  };

  const displayedUniversities = getDisplayedUniversities();

  return (
    <div className="min-h-screen bg-gray-50">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Hero Section */}
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80)' }}
        ></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/85 to-blue-900/90"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Discover Top Universities
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Explore world-class institutions and transform your career with quality education
          </p>
          <div className="flex items-center justify-center gap-8 text-white">
            <div className="text-center">
              <div className="text-4xl font-bold">{universities.length}+</div>
              <div className="text-sm opacity-90">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">100+</div>
              <div className="text-sm opacity-90">Programs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">50K+</div>
              <div className="text-sm opacity-90">Students</div>
            </div>
          </div>
        </div>
      </div>

      {/* Universities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Explore Our Partner Universities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully selected universities offering quality education and excellent career opportunities
            </p>
          </div>

          {/* University Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {displayedUniversities.map((university) => (
              <div
                key={university.id}
                onClick={() => handleUniversityClick(university.link)}
                className="card-hover-lift bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-blue-500 cursor-pointer group"
              >
                {/* University Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={university.image} 
                    alt={university.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Logo Badge */}
                  <div className="absolute top-3 right-3 bg-white rounded-lg p-2 shadow-lg">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                  </div>
                  
                  {/* Rating Badge */}
                  {university.rating && (
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-800">{university.rating}</span>
                    </div>
                  )}
                </div>

                {/* University Info */}
                <div className="p-5 space-y-3">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-2 min-h-[3.5rem] group-hover:text-blue-600 transition-colors">
                    {university.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="line-clamp-1">{university.location}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
                    {university.description}
                  </p>
                  
                  {/* Programs */}
                  <div className="flex flex-wrap gap-1">
                    {university.programs.slice(0, 3).map((program, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded"
                      >
                        {program}
                      </span>
                    ))}
                    {university.programs.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{university.programs.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Established Year */}
                  <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                    Established: {university.established}
                  </div>
                  
                  {/* Apply Button */}
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg">
                    <span>Apply Now</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          {!showAll && (
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed rounded-full p-3 shadow-lg transition-all duration-200"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(universities.length / itemsPerPage) }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx * itemsPerPage)}
                    className={`transition-all duration-300 rounded-full ${
                      Math.floor(currentIndex / itemsPerPage) === idx 
                        ? 'w-8 h-3 bg-blue-600' 
                        : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={handleNext}
                disabled={currentIndex + itemsPerPage >= universities.length}
                className="bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed rounded-full p-3 shadow-lg transition-all duration-200"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          )}

          {/* View All Button */}
          <div className="text-center">
            <button
              onClick={handleViewAllToggle}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>{showAll ? 'Show Less' : 'View All Universities'}</span>
              <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${showAll ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Connect with our expert counsellors to find the perfect university and program for your career goals
          </p>
          <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
            Talk to Expert Counsellor
          </button>
        </div>
      </section>
    </div>
  );
};

export default UniversityPageNew;
