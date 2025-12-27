import React from "react";
import { ThreeDScrollTriggerContainer, ThreeDScrollTriggerRow } from "./ThreeDScrollTrigger";

const Testimonials = ({
  testimonials,
  title = "What our clients say about us",
  className = "",
}) => {
  if (!testimonials.length) return null;

  return (
    <section className={`py-12 bg-gradient-to-b from-gray-800 to-gray-900 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white">
          {title}
        </h2>
                
        <ThreeDScrollTriggerContainer>
          {/* First Row - Moves to the Right (positive direction) */}
          <div className="mb-8">
            <ThreeDScrollTriggerRow
              direction={1}
              baseVelocity={2}
              className="mb-4"
            >
              {testimonials.map((testimonial) => (
                <div
                  key={`row1-${testimonial.id}`}
                  className="inline-flex mx-6 w-[300px] sm:w-[320px] lg:w-[350px] flex-shrink-0"
                >
                  <TestimonialCard testimonial={testimonial} variant="primary" />
                </div>
              ))}
            </ThreeDScrollTriggerRow>
          </div>

          {/* Second Row - Moves to the Left (negative direction) */}
          <div className="relative">
            <ThreeDScrollTriggerRow
              direction={-1}
              baseVelocity={2}
              className="mt-4"
            >
              {testimonials.map((testimonial) => (
                <div
                  key={`row2-${testimonial.id}`}
                  className="inline-flex mx-6 w-[300px] sm:w-[320px] lg:w-[350px] flex-shrink-0"
                >
                  <TestimonialCard testimonial={testimonial} variant="secondary" />
                </div>
              ))}
            </ThreeDScrollTriggerRow>
          </div>
        </ThreeDScrollTriggerContainer>
      </div>
    </section>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial, variant }) => {
  const gradientClass = variant === 'primary'
    ? "bg-gradient-to-br from-blue-600/20 to-purple-600/20"
    : variant === 'secondary'
    ? "bg-gradient-to-br from-teal-600/20 to-cyan-600/20"
    : "bg-gradient-to-br from-gray-700 to-gray-800";

  return (
    <div className={`
      relative p-4 rounded-xl shadow-xl backdrop-blur-sm
      border border-gray-600/50 hover:border-blue-500/50
      transition-all duration-300 hover:scale-[1.02]
      w-full h-full min-h-[180px]
      ${gradientClass}
    `}>
      {/* Quote icon */}
      <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Content */}
      <div className="flex items-start gap-3 mb-3">
        <img 
          src={testimonial.avatar_url}
          alt={testimonial.client_name}
          className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
        />
        <div className="flex-1">
          <h4 className="font-bold text-white text-base">{testimonial.client_name}</h4>
          <p className="text-sm text-gray-300">{testimonial.company}</p>
          {testimonial.role && (
            <p className="text-xs text-gray-400">{testimonial.role}</p>
          )}
        </div>
      </div>

      <p className="text-gray-200 italic leading-relaxed line-clamp-3 text-sm">
        "{testimonial.quote}"
      </p>
    </div>
  );
};

export default Testimonials;