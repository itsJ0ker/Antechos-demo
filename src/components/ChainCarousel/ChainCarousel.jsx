import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

/* ---------- Types ---------- */
// ChainItem interface:
// {
//   id: string | number;
//   name: string;
//   icon: LucideIcon;
//   details?: string;
//   logo?: string;
// }

/* ---------- Item Card ---------- */
const CarouselItemCard = ({ chain }) => {
  const { distanceFromCenter, name, details, logo, icon: Icon } = chain;
  const distance = Math.abs(distanceFromCenter);

  return (
    <motion.div
      className="absolute flex items-center gap-4 px-6 py-3"
      animate={{
        opacity: 1 - distance * 0.2,
        scale: 1 - distance * 0.08,
        y: distanceFromCenter * 85,
        x: -distance * 40,
      }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <div className="p-2 rounded-full bg-white">
        {logo ? (
          <img src={logo} className="w-8 h-8 rounded-full object-cover" alt={name} />
        ) : (
          <Icon className="w-8 h-8 text-gray-900" />
        )}
      </div>
      <div className="text-right">
        <div className="font-semibold text-white whitespace-nowrap">{name}</div>
        {details && (
          <div className="text-xs text-gray-400">{details}</div>
        )}
      </div>
    </motion.div>
  );
};

/* ---------- Main Component ---------- */
const ChainCarousel = ({
  items,
  scrollSpeedMs = 1500,
  visibleItemCount = 7,
  className = '',
  onChainSelect,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = items.length;

  /* Auto Scroll */
  useEffect(() => {
    if (paused || total === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % total);
    }, scrollSpeedMs);
    return () => clearInterval(timer);
  }, [paused, total, scrollSpeedMs]);

  /* Visible Items */
  const getVisibleItems = useCallback(() => {
    const list = [];
    if (!total) return list;

    const count = visibleItemCount % 2 ? visibleItemCount : visibleItemCount + 1;
    const half = Math.floor(count / 2);

    for (let i = -half; i <= half; i++) {
      let index = currentIndex + i;
      if (index < 0) index += total;
      if (index >= total) index -= total;

      list.push({
        ...items[index],
        originalIndex: index,
        distanceFromCenter: i,
      });
    }

    return list;
  }, [currentIndex, items, total, visibleItemCount]);

  /* Render */
  return (
    <div className={`relative h-[450px] ${className}`}>
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
      >
        {getVisibleItems().map((chain) => (
          <CarouselItemCard key={chain.id} chain={chain} />
        ))}
      </motion.div>
    </div>
  );
};

export default ChainCarousel;