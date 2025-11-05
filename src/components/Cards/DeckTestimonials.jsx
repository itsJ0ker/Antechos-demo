import { useState, useEffect } from 'react';
import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { ChevronLeft, ChevronRight, X, Quote, User } from 'lucide-react';

// Fallback for missing images
const fallbackImage = (name) => {
  // You can replace this with a default image import if you have one
  return null;
};

const testimonials = [
  {
    name: 'Kashish Narula',
    profession: 'Software Engineer',
    company: 'TechCorp Solutions',
    feedback:
      "This platform completely transformed my approach to software development. The courses are well-structured with practical examples I could apply at work. The community support is exceptional, and I've grown my professional network significantly.",
  },
  {
    name: 'Nandini Marwah',
    profession: 'Business Analyst',
    company: 'Global Analytics Inc.',
    feedback:
      "As a business analyst, I found the data visualization courses particularly valuable. The instructors explain complex concepts clearly, and hands-on projects helped me apply techniques directly in my reports. Highly recommended!",
  },
  {
    name: 'Bhumika Goyal',
    profession: 'Financial Analyst',
    company: 'Prime Financial Services',
    feedback:
      "The financial modeling courses exceeded my expectations. Real-world case studies and ready-made templates saved me countless hours at work. I've already recommended this platform to several colleagues.",
  },
  {
    name: 'Ashmeet Kaur',
    profession: 'Web Developer',
    company: 'Digital Creations LLC',
    feedback:
      "I was skeptical about online platforms, but this one changed my mind. The web development track had up-to-date frameworks, and mentor code reviews were extremely helpful. My productivity has increased by at least 30%.",
  },
  {
    name: 'Bhoomi',
    profession: 'Data Analyst',
    company: 'Data Insights Co.',
    feedback:
      "The data science curriculum is comprehensive and perfectly paced. I appreciated the balance of theory and practical application. After two courses, I automated reports that earlier took hours to complete.",
  },
  {
    name: 'Aditya Lakhanpal',
    profession: 'Product Manager',
    company: 'InnovateTech',
    feedback:
      "The product management courses gave me invaluable insights into agile and user-centered design. Case studies from real companies helped me optimize processes, improving team delivery speed by 40%.",
  },
];

// Generate initials from name
const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

// Generate a color based on name for consistent avatar background
const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

// Animation helpers
const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
  opacity: 1,
});
const from = () => ({ x: 0, rot: 0, scale: 1.2, y: -1000, opacity: 0 });
const trans = (r, s) =>
  `perspective(1500px) rotateX(8deg) rotateY(${r / 12}deg) rotateZ(${r}deg) scale(${s})`;

export default function DeckTestimonials() {
  const [gone] = useState(() => new Set());
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const [props, api] = useSprings(testimonials.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  // Responsive flag
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Drag/Swipe
  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) gone.add(index);

      api.start((i) => {
        if (i !== index) return;
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
        const rot = mx / 100 + (isGone ? dir * 12 * velocity : 0);
        const scale = down ? 1.05 : 1;
        return {
          x,
          rot,
          scale,
          opacity: isGone ? 0 : 1,
          config: { friction: 55, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });

      if (!down && gone.size === testimonials.length)
        setTimeout(() => {
          gone.clear();
          api.start((i) => to(i));
        }, 600);
    }
  );

  const nextTestimonial = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);

  const prevTestimonial = () =>
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section
      aria-label="Client Testimonials"
      className={`relative w-full ${
        isExpanded ? 'h-screen md:h-[700px]' : 'h-[520px] md:h-[620px]'
      } flex items-center justify-center overflow-hidden px-4 `}
    >
      {isExpanded ? (
        /* ---------- EXPANDED CAROUSEL ---------- */
        <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
          {/* Prev button */}
          {!isMobile && (
            <button
              onClick={prevTestimonial}
              className="absolute left-4 z-10 p-3 rounded-full bg-white shadow-md hover:bg-blue-100 transition transform hover:scale-105"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-blue-600" />
            </button>
          )}

          {/* Testimonial content */}
          <div className="w-full px-4 md:px-12">
            <article className="bg-white p-6 md:p-10 rounded-3xl shadow-xl flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-indigo-500" />
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-24 h-24 text-blue-400" />
              </div>
              
              {/* Avatar with fallback */}
              <div 
                className="w-20 h-20 md:w-28 md:h-28 rounded-full mb-4 flex items-center justify-center border-4 border-blue-100 shadow-lg text-white text-xl md:text-3xl font-bold"
                style={{ backgroundColor: stringToColor(testimonials[currentIndex].name) }}
              >
                {getInitials(testimonials[currentIndex].name)}
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                {testimonials[currentIndex].name}
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-2">
                <h5 className="text-sm md:text-md text-blue-600 font-medium">
                  {testimonials[currentIndex].profession}
                </h5>
                <span className="hidden md:inline text-gray-400">•</span>
                <p className="text-xs md:text-sm text-gray-600">
                  {testimonials[currentIndex].company}
                </p>
              </div>
              <p className="text-gray-700 mt-6 md:mt-8 text-base md:text-lg leading-relaxed max-w-3xl">
                "{testimonials[currentIndex].feedback}"
              </p>

              {/* Pagination dots */}
              <div className="flex mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? 'bg-blue-600 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </article>
          </div>

          {/* Next button */}
          {!isMobile && (
            <button
              onClick={nextTestimonial}
              className="absolute right-4 z-10 p-3 rounded-full bg-white shadow-md hover:bg-blue-100 transition transform hover:scale-105"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-blue-600" />
            </button>
          )}

          {/* Close */}
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
            aria-label="Close expanded view"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          {/* Mobile controls */}
          {isMobile && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-6">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white shadow-md hover:bg-blue-100"
              >
                <ChevronLeft className="w-5 h-5 text-blue-600" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white shadow-md hover:bg-blue-100"
              >
                <ChevronRight className="w-5 h-5 text-blue-600" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ---------- CARD DECK VIEW ---------- */
        <>
          

          {props.map(({ x, y, rot, scale, opacity }, i) => (
            <animated.div key={i} className="absolute" style={{ x, y }}>
              <animated.div
                {...bind(i)}
                onClick={() => {
                  setIsExpanded(true);
                  setCurrentIndex(i);
                }}
                style={{
                  transform: interpolate([rot, scale], trans),
                  opacity,
                }}
                className="bg-white p-5 md:p-6 w-72 md:w-80 h-[380px] md:h-[420px] rounded-2xl shadow-xl flex flex-col items-center text-center cursor-grab active:cursor-grabbing transition hover:shadow-2xl border border-blue-50"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="w-10 h-10 text-blue-400" />
                </div>
                
                {/* Avatar with fallback */}
                <div 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 flex items-center justify-center border-2 border-blue-100 shadow-md text-white text-lg md:text-xl font-bold"
                  style={{ backgroundColor: stringToColor(testimonials[i].name) }}
                >
                  {getInitials(testimonials[i].name)}
                </div>
                
                <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                  {testimonials[i].name}
                </h3>
                <p className="text-sm text-blue-600 font-medium">
                  {testimonials[i].profession}
                </p>
                <p className="text-xs md:text-sm text-gray-600">
                  {testimonials[i].company}
                </p>
                <p className="text-gray-600 mt-4 text-sm leading-relaxed line-clamp-5 md:line-clamp-6">
                  "{testimonials[i].feedback}"
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(true);
                    setCurrentIndex(i);
                  }}
                  className="mt-4 text-blue-600 text-sm hover:text-blue-800 flex items-center font-medium"
                  aria-label="Read full testimonial"
                >
                  Read Full Story
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </animated.div>
            </animated.div>
          ))}

          <div className="absolute bottom-6 text-center w-full">
            <p className="text-gray-500 text-xs md:text-sm">
              Swipe or drag cards to navigate
            </p>
          </div>
        </>
      )}
    </section>
  );
}