import React from "react";
import { motion } from "framer-motion";

// Import all images directly
import I1 from "../../assets/illustrations/I-1.png";
import I2 from "../../assets/illustrations/I-2.png";
import I3 from "../../assets/illustrations/I-3.png";
import I4 from "../../assets/illustrations/I-4.png";
import I5 from "../../assets/illustrations/I-5.png";

const Blog = () => {
  // Sample blog post data
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React",
      excerpt:
        "Learn the basics of React and how to create your first component with modern hooks and context API.",
      date: "May 15, 2023",
      image: I1,
      height: "h-64",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Mastering Tailwind CSS",
      excerpt:
        "Discover how to build beautiful interfaces quickly with Tailwind CSS utility classes and advanced techniques.",
      date: "June 2, 2023",
      image: I2,
      height: "h-80",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "State Management in 2023",
      excerpt:
        "Comparing different state management solutions for modern React applications including Zustand, Jotai, and Redux Toolkit.",
      date: "June 10, 2023",
      image: I3,
      height: "h-48",
      readTime: "10 min read",
    },
    {
      id: 4,
      title: "Building Accessible Web Apps",
      excerpt:
        "Learn the best practices for creating web applications that everyone can use, with focus on ARIA and WCAG guidelines.",
      date: "June 18, 2023",
      image: I4,
      height: "h-96",
      readTime: "12 min read",
    },
    {
      id: 5,
      title: "The Future of JavaScript",
      excerpt:
        "Exploring upcoming features and trends in the JavaScript ecosystem including ES2023 features and runtime innovations.",
      date: "June 22, 2023",
      image: I5,
      height: "h-72",
      readTime: "7 min read",
    },
    {
      id: 6,
      title: "Optimizing React Performance",
      excerpt:
        "Tips and tricks to make your React applications run faster and smoother with memoization, code splitting, and virtualization.",
      date: "June 25, 2023",
      image: I1,
      height: "h-56",
      readTime: "9 min read",
    },
    {
      id: 7,
      title: "Server Components in Next.js",
      excerpt:
        "Understanding the revolutionary approach to component architecture in modern React frameworks.",
      date: "July 3, 2023",
      image: I4,
      height: "h-64",
      readTime: "11 min read",
    },
    {
      id: 8,
      title: "CSS Grid vs Flexbox",
      excerpt:
        "When to use each layout system and how to combine them for powerful responsive designs.",
      date: "July 10, 2023",
      image: I5,
      height: "h-80",
      readTime: "6 min read",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen  py-12 px-6 sm:px-8 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent mb-4">
            Latest <span className="text-orange-400">Blog</span>
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Latest articles and tutorials on web development, design, and more.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              whileHover="hover"
              className="break-inside-avoid border border-gray-700 rounded-lg overflow-hidden  hover:shadow-xl transition-shadow duration-300"
            >
              <motion.div
                className={`${post.height} w-full overflow-hidden relative`}
                variants={imageVariants}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback for missing images
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4OGEyZjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiByeT0iMiI+PC9yZWN0PjxjaXJjbGUgY3g9IjkiIGN5PSI5IiByPSIyIj48L2NpcmNsZT48cGF0aCBkPSJNMjEgMTVhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJWOGEyIDIgMCAwIDEgMi0yaDExYTIgMiAwIDAgMSAyIDJ6Ij48L3BhdGg+PC9zdmc+";
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <span className="text-white text-sm font-medium">
                    {post.readTime}
                  </span>
                </div>
              </motion.div>
              <div className="p-6">
                <div className="text-sm text-gray-400 mb-2">{post.date}</div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2  transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-800 mb-4">{post.excerpt}</p>
                <motion.button
                  whileHover={{ x: 3 }}
                  className="flex items-center text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;