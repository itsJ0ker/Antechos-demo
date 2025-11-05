import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

const dummyTeams = [
  {
    id: 1,
    name: "Nova Tech",
    domain: "Enterprise Web Applications",
    members: "8-12 members",
    projects: "Completed Projects: 24",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "CodeForge",
    domain: "AI + SaaS Development",
    members: "5-8 members",
    projects: "Completed Projects: 19",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "PixelCraft",
    domain: "UI/UX & Frontend Engineering",
    members: "4-6 members",
    projects: "Completed Projects: 17",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "CloudSync Labs",
    domain: "Cloud & DevOps Solutions",
    members: "6-10 members",
    projects: "Completed Projects: 22",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "QuantumStack",
    domain: "Big Data & Analytics",
    members: "7-9 members",
    projects: "Completed Projects: 28",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "CyberNest",
    domain: "Cybersecurity & Risk Management",
    members: "5-7 members",
    projects: "Completed Projects: 14",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?fit=crop&w=800&q=80",
  },
];

const DevelopmentTeamsCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-12">
      <Slider {...settings}>
        {dummyTeams.map((team) => (
          <div key={team.id} className="px-2 sm:px-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-[420px] w-full max-w-[360px] mx-auto"
              style={{
                perspective: "1000px",
                perspectiveOrigin: "center",
              }}
            >
              <div
                className="relative h-full w-full overflow-hidden rounded-[30px]"
                style={{
                  transformStyle: "preserve-3d",
                  background:
                    "radial-gradient(circle at center, #f0f4ff 0%, #ffffff 100%)",
                  boxShadow:
                    "0 8px 20px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.02)",
                }}
              >
                <img
                  src={team.image}
                  alt={team.name}
                  className="absolute top-0 left-0 w-full h-52 object-cover rounded-t-[30px]"
                />
                <div className="absolute top-52 left-0 right-0 px-6 pt-6 pb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                    {team.name}
                  </h3>
                  <p className="text-blue-600 mb-2 text-sm sm:text-base">
                    {team.domain}
                  </p>
                  <p className="text-sm text-gray-600">{team.members}</p>
                  <p className="text-sm text-gray-600">{team.projects}</p>
                  <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm">
                    View Profile
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DevelopmentTeamsCarousel;
