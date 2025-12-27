import { useState, useEffect, useRef } from 'react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogCarousel = ({ blogs = [], autoPlay = true, autoPlayInterval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && !isHovered && blogs.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % blogs.length);
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, isHovered, blogs.length]);

  // Reset to first slide when blogs change
  useEffect(() => {
    setCurrentIndex(0);
  }, [blogs]);

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No blog posts available</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const handleBlogClick = (blog) => {
    // You can customize this to navigate to blog detail page
    console.log('Blog clicked:', blog);
    // Example: navigate(`/blog/${blog.slug}`);
  };

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Carousel Container */}
      <div className="overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {blogs.map((blog, index) => (
            <div key={blog.id} className="w-full flex-shrink-0">
              <motion.div
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                onClick={() => handleBlogClick(blog)}
              >
                {/* Background Image */}
                {blog.featured_image_url && (
                  <div className="absolute inset-0">
                    <img
                      src={blog.featured_image_url}
                      alt={blog.title}
                      className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 p-8 md:p-12 min-h-[400px] flex flex-col justify-end">
                  {/* Category Badge */}
                  {blog.category && (
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-purple-600/80 text-white text-sm font-semibold rounded-full backdrop-blur-sm">
                        {blog.category}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-purple-300 transition-colors duration-300">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  {blog.excerpt && (
                    <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                      {truncateText(blog.excerpt, 150)}
                    </p>
                  )}

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm mb-6">
                    {blog.author_name && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{blog.author_name}</span>
                      </div>
                    )}
                    {blog.published_at && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(blog.published_at)}</span>
                      </div>
                    )}
                    {blog.content && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{calculateReadTime(blog.content)}</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded backdrop-blur-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More Button */}
                  <div className="flex items-center gap-2 text-purple-400 font-semibold group-hover:text-purple-300 transition-colors duration-300">
                    <span>Read More</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      {blogs.length > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {blogs.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-purple-500 w-8 shadow-lg shadow-purple-500/50'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to blog ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Blog Counter */}
      <div className="text-center mt-4">
        <span className="text-gray-400 text-sm">
          {currentIndex + 1} of {blogs.length}
        </span>
      </div>
    </div>
  );
};

export default BlogCarousel;