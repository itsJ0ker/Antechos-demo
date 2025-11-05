import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { PiUsersThreeDuotone, PiClockDuotone } from "react-icons/pi";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
    }

    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-yellow-400 text-sm" />
      );
    }

    while (stars.length < 5) {
      stars.push(
        <FaRegStar key={stars.length} className="text-yellow-400 text-sm" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out border border-gray-200 w-full max-w-xs md:max-w-sm lg:max-w-sm xl:max-w-sm mx-auto">
      {/* Image */}
      <img
        src={course.image_url || course.image || 'https://via.placeholder.com/400x300?text=Course+Image'}
        alt={course.title}
        className="w-full h-44 md:h-48 object-cover rounded-t-2xl"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x300?text=Course+Image';
        }}
      />

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900">
          {course.title}
        </h3>

        {/* Rating + Level Badge */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500 font-semibold text-sm">
              {course.rating}
            </span>
            <div className="flex">{renderStars(course.rating)}</div>
          </div>
          <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded">
            Beginner
          </span>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <PiUsersThreeDuotone className="text-green-700 text-base" />
            <span>3.6K+ Learners</span>
          </div>
          <div className="flex items-center gap-1">
            <PiClockDuotone className="text-blue-700 text-base" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span className="text-blue-500 font-bold text-xl">
              {course.price}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-red-500  text-lg ">
              {course.negoprice}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => navigate(`/course/${course.id}`)}
            className="w-1/2 border border-blue-500 text-blue-500 font-semibold py-2 rounded hover:bg-blue-500 hover:text-white transition transform hover:scale-105 duration-200"
          >
            View Course
          </button>
          <button className="w-1/2 bg-orange-500 text-white font-semibold py-2 rounded hover:bg-white hover:text-orange-500 border border-orange-500 transition transform hover:scale-105 duration-200">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
