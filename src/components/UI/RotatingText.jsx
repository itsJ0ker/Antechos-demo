import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const RotatingText = () => {
  const words = [
    "Tech Career",
    "Business Journey",
    "Startup Dream",
    "Creative Path",
    "AI Mastery"
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[index]}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="text-orange-500 hover:text-blue-400 inline-block min-w-[180px]"
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
};

export default RotatingText;
