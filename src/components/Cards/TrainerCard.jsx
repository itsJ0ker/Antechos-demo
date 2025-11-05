// Redesigned Trainer Card Carousel with dark theme, motion animations, and 3D hover effects

import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const DEFAULT_BEHIND_GRADIENT = "linear-gradient(135deg, #1e1e1e, #2c2c2c)";
const DEFAULT_INNER_GRADIENT = "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)";

const Card = ({ trainer }) => {
  const cardRef = useRef(null);
  const animationFrameRef = useRef(null);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/trainer/${trainer.id}`);
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const dx = (x - centerX) / centerX;
        const dy = (y - centerY) / centerY;

        const rotateX = dy * 10;
        const rotateY = -dx * 10;

        const distance = Math.sqrt(dx * dx + dy * dy);
        const pointerFromCenter = Math.min(distance, 1);

        card.style.setProperty("--pointer-x", `${x}px`);
        card.style.setProperty("--pointer-y", `${y}px`);
        card.style.setProperty("--rotate-x", `${rotateX}deg`);
        card.style.setProperty("--rotate-y", `${rotateY}deg`);
        card.style.setProperty("--pointer-from-center", `${pointerFromCenter}`);
      });
    };

    const handleMouseLeave = () => {
      card.style.setProperty("--rotate-x", "0deg");
      card.style.setProperty("--rotate-y", "0deg");
      card.style.setProperty("--pointer-from-center", "0");
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  if (!trainer) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative h-[420px] w-full max-w-[360px] mx-auto"
      style={{
        perspective: "1000px",
        perspectiveOrigin: "center",
        "--pointer-x": "50%",
        "--pointer-y": "50%",
        "--pointer-from-center": 0,
        "--card-opacity": 1,
        "--rotate-x": "0deg",
        "--rotate-y": "0deg",
        "--card-radius": "30px",
      }}
    >
      <div
        ref={cardRef}
        className="relative h-full w-full overflow-hidden rounded-[30px]"
        style={{
          transformStyle: "preserve-3d",
          transform:
            "translate3d(0, 0, 0) rotateX(var(--rotate-x)) rotateY(var(--rotate-y)) scale(1.02)",
          transition: "transform 0.5s ease",
        }}
      >
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundImage: DEFAULT_BEHIND_GRADIENT }}
        />
        <div
          className="absolute inset-[1px] rounded-[30px] bg-black/90"
          style={{ backgroundImage: DEFAULT_INNER_GRADIENT }}
        />
        <div
          className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay rounded-[30px]"
          style={{
            background:
              "radial-gradient(farthest-corner circle at var(--pointer-x) var(--pointer-y), hsl(248,25%,80%) 12%, hsla(207,40%,30%,0.8) 90%)",
            filter: "brightness(0.8) contrast(1.2)",
          }}
        />

        <div
          className="absolute bottom-0 left-0 w-full h-full flex items-end justify-center z-20"
          style={{
            transform: "translate3d(0, 0, 30px)",
            transformStyle: "preserve-3d",
            opacity: "calc(1.75 - var(--pointer-from-center))",
          }}
        >
          <img
            src={trainer.photo}
            alt="avatar"
            className="w-full h-auto max-h-[80%] object-contain"
            style={{ transform: "translateZ(20px)" }}
          />
        </div>

        <div className="absolute top-12 left-0 right-0 z-10 flex flex-col text-center space-y-5">
          <h3 className="text-2xl font-semibold bg-gradient-to-b from-white to-indigo-300 bg-clip-text text-transparent">
            {trainer.name}
          </h3>
          <p className="-mt-3 text-sm bg-gradient-to-b from-white to-indigo-500 bg-clip-text text-transparent">
            {trainer.bio?.split(" ").slice(0, 4).join(" ") || "Trainer"}
          </p>
        </div>

        <div className="absolute bottom-5 left-5 right-5 z-30 flex items-center justify-between rounded-[15px] border border-white/10 bg-white/10 backdrop-blur-md px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-white/10">
              <img
                src={trainer.photo}
                alt="mini avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xs font-medium text-white/90">
                @{trainer.name.toLowerCase()}
              </div>
              <div className="text-xs text-white/70">Online</div>
            </div>
          </div>
          <button
            className="rounded-md border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 transition hover:border-white/40 hover:-translate-y-1"
            onClick={handleViewDetails}
          >
            View details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const TrainerCard = ({ trainers }) => {
  const settings = {
    dots: true,
    infinite: true,
    centerMode: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Slider {...settings}>
        {trainers.map((trainer) => (
          <div key={trainer.id} className="px-3">
            <Card trainer={trainer} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrainerCard;
