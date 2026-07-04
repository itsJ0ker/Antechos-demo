import React from 'react';

const WhatCreatorsDo = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FFF5EB] relative px-4 sm:px-6">
      {/* Background Dots */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#d1d5db 2px, transparent 2px)',
          backgroundSize: '24px 24px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-gray-900 mb-12 md:mb-16 tracking-tight">
          What creators do on TagMango
        </h2>

        {/* Top Row: 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Courses */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
            <div className="bg-[#f8f9fa] rounded-2xl p-4 mb-6 flex justify-center items-center h-64 overflow-hidden">
              <img
                src="https://cdn.prod.website-files.com/63e9e777ca756dd1bcd0e4d1/69ce32feaccdbafd2d8a086c_image%20(28).avif"
                alt="Courses"
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Courses</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Offer interactive and engaging courses on various topics to a wide audience through our platform. Use assignments and forums to engage your learners.
            </p>
          </div>

          {/* Workshops */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
            <div className="bg-[#f8f9fa] rounded-2xl p-4 mb-6 flex justify-center items-center h-64 overflow-hidden">
              <img
                src="https://cdn.prod.website-files.com/63e9e777ca756dd1bcd0e4d1/69ce32808a1cb1c7932587ab_-2dad52836157d5b4f9eec9a45b7c8e42-9b6add5ef3d1015f3af951d5bde86705%2041%20(9).avif"
                alt="Workshops"
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Workshops</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Host Zoom webinars and meetings seamlessly integrated in the platform. Increase show up rate, mark attendance live and impart the best live learning experience.
            </p>
          </div>

          {/* Memberships */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
            <div className="bg-[#f8f9fa] rounded-2xl p-4 mb-6 flex justify-center items-center h-64 overflow-hidden">
              <img
                src="https://cdn.prod.website-files.com/63e9e777ca756dd1bcd0e4d1/69ce32e2cb16e58fa1cd9de8_image%20(27).avif"
                alt="Memberships"
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Contest</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Create exclusive, recurring revenue streams by offering members-only access to your content, resources, and community.
            </p>
          </div>
        </div>

        {/* Bottom Row: 2 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gamified Communities */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 flex flex-col sm:flex-row items-center gap-6 md:gap-8">
            <div className="w-full sm:w-[45%] h-full flex justify-center items-center overflow-hidden rounded-2xl">
              <img
                src="https://cdn.prod.website-files.com/63e9e777ca756dd1bcd0e4d1/69ce32c3870810f1b21b915a_image%20(26).avif"
                alt="Gamified Communities"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="w-full sm:w-[55%]">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Gamified Communities</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Build a game, let learning be the by product. Allocate points on interaction and participation, give badges, track leaderboards and watch your engagement skyrocket.
              </p>
            </div>
          </div>

          {/* 1:1 Consultations */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 flex flex-col sm:flex-row items-center gap-6 md:gap-8">
            <div className="w-full sm:w-[45%] h-full flex justify-center items-center overflow-hidden rounded-2xl">
              <img
                src="https://cdn.prod.website-files.com/63e9e777ca756dd1bcd0e4d1/69ce3313a36405a00c190aef_image%20(29).avif"
                alt="1:1 Consultations"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="w-full sm:w-[55%]">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">1:1 Consultations</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Seamlessly host 1 to 1 consultations by easily creating, cancelling and rescheduling calls.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhatCreatorsDo;
