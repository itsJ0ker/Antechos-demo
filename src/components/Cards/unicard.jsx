import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Star, MapPin } from "lucide-react";
import { getUniversities } from "../../lib/supabase";
import { motion } from "framer-motion";
import { generatePlaceholder } from "../../utils/imageFallback";

const UniversityCards = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(6);
  const [expanded, setExpanded] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const { data, error } = await getUniversities();
        if (error) {
          console.error('Error fetching universities:', error);
        } else {
          setUniversities(data || []);
        }
      } catch (error) {
        console.error('Error fetching universities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  const toggleShowMore = () => {
    setVisibleCount(expanded ? 6 : universities.length);
    setExpanded(!expanded);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-50 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
        >
          Top Partner <span className="text-orange-400">Universities</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg text-blue-100 max-w-3xl mx-auto"
        >
          Discover India's premier educational institutions with world-class
          facilities and global recognition
        </motion.p>
      </div>

      {/* University Cards Grid */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {loading ? (
            <div className="col-span-full text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
              <p className="mt-4 text-white">Loading universities...</p>
            </div>
          ) : (
            universities.slice(0, visibleCount).map((university) => (
            <motion.div
              key={university.code}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="relative group rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-orange-500/20"
            >
              {/* University Image */}
              <div className="aspect-w-16 aspect-h-9 h-64 w-full">
                <img
                  src={university.image_url || university.image || generatePlaceholder('🎓', 400, 300)}
                  alt={`${university.name} Campus`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = generatePlaceholder('🎓', 400, 300);
                  }}
                />
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
                    {university.name}
                  </h3>
                  <div className="flex items-center text-blue-100 text-sm mb-2">
                    <MapPin className="mr-1" size={14} />
                    <span>{university.location}</span>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={
                          i < Math.floor(university.rating) ? "#fbbf24" : "none"
                        }
                        className={
                          i < Math.floor(university.rating)
                            ? "text-yellow-400"
                            : "text-gray-400"
                        }
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() =>
                    navigate(`/university/${university.id}`, {
                      state: { university },
                    })
                  }
                  className="w-full hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                >
                  View Details
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          )))
        }
        </motion.div>

        {/* Show More/Less Button */}
        {universities.length > 6 && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={toggleShowMore}
              className="flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              {expanded ? (
                <>
                  <ChevronUp size={18} className="text-blue-700" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown size={18} className="text-blue-700" />
                  Show More ({universities.length - 6} More Universities)
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UniversityCards;
