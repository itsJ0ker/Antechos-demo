import React, { useEffect, useState } from "react";
import { getWorkforce } from "../../data/workforcedata";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SkilledWorkforce = () => {
  const [workforce, setWorkforce] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getWorkforce().then((data) => setWorkforce(data));
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-gradient-to-r from-indigo-950 via-black to-indigo-950 text-white py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">
            Skilled{" "}
            <span className="bg-gradient-to-r from-blue-300 to-blue-600 bg-clip-text text-transparent">
              Workforce
            </span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Discover talented professionals with proven expertise and skills ready 
            to contribute to your organization's success.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {workforce.map((worker) => (
            <motion.div
              key={worker.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="bg-white/5 border border-blue-500/20 backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-blue-500/30 transition-all duration-300 flex flex-col h-full"
            >
              {/* Cover */}
              <img
                src={worker.coverPhoto}
                alt={worker.name}
                className="w-full h-40 object-cover"
              />

              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-6 mb-4">
                    <img
                      src={worker.photo}
                      alt={worker.name}
                      className="w-12 h-12 rounded-full object-cover border border-white/20"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {worker.name}
                      </h2>
                      <p className="text-sm text-gray-400">{worker.profile}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                    {worker.bio}
                  </p>

                  <div className="text-sm text-gray-200 mb-2">
                    <span className="font-semibold text-white">Skills:</span>{" "}
                    {worker.skills.slice(0, 3).join(", ")}...
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="text-yellow-400 font-medium">
                    {worker.ratings} ★
                  </div>
                  <button
                    className="text-blue-400 text-sm hover:underline"
                    onClick={() => navigate(`/workforce/${worker.id}`)}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SkilledWorkforce;