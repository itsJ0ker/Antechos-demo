import React, { useState, useEffect, useRef, useCallback, cloneElement, isValidElement, useMemo } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import './CardSwap.css';

/* ---------- Card Component ---------- */
export const Card = React.forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

/* ---------- Chain Card Component ---------- */
const ChainCarouselItem = ({ chain, isActive, onClick }) => {
  const { name, details, logo, icon: Icon } = chain;

  return (
    <motion.div
      className={`flex items-center gap-4 px-5 py-4 rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-sm ${
        isActive
          ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-400/50 shadow-xl shadow-blue-500/20'
          : 'bg-white/5 hover:bg-white/10 border border-white/10'
      }`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: isActive ? '0 20px 40px rgba(99, 102, 241, 0.3)' : '0 10px 30px rgba(255, 255, 255, 0.1)'
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        minWidth: '250px', // Fixed width to prevent overlap
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className={`p-2.5 rounded-full transition-all duration-300 ${
        isActive ? 'bg-gradient-to-br from-blue-500 to-purple-500' : 'bg-white/20'
      }`}>
        {logo ? (
          <img src={logo} className="w-8 h-8 rounded-full object-cover" alt={name} />
        ) : (
          <Icon className={`w-8 h-8 ${isActive ? 'text-white' : 'text-gray-300'}`} />
        )}
      </div>
      <div className="text-right flex-1">
        <div className={`font-bold text-lg whitespace-nowrap ${
          isActive ? 'text-white' : 'text-gray-200'
        }`}>{name}</div>
        {details && (
          <div className={`text-sm mt-1 ${isActive ? 'text-blue-200' : 'text-gray-400'}`}>{details}</div>
        )}
      </div>
    </motion.div>
  );
};

/* ---------- Main Combined Component ---------- */
const ChainCarouselWithCards = ({
  items = [],
  scrollSpeedMs = 1500,
  visibleItemCount = 7,
  className = '',
  onChainSelect,
  width = 400,
  height = 420, // Reduced from 480
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selectedChainIndex, setSelectedChainIndex] = useState(0);
  
  const total = items.length;

  /* Auto Scroll for Carousel */
  useEffect(() => {
    if (paused || total === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % total);
    }, scrollSpeedMs);
    return () => clearInterval(timer);
  }, [paused, total, scrollSpeedMs]);

  /* CardSwap Animation Logic */
  const config = useMemo(() =>
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        },
    [easing]
  );

  const childArr = useMemo(
    () =>
      items.map((item, index) => (
        <Card
          key={`card-${item.id}-${index}`}
          customClass={`card-${index}`}
          style={{
            background: index === selectedChainIndex
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          }}
        >
          <div className="card-content">
            <div className="card-header">
              <div className="flex items-center gap-4">
                {item.logo ? (
                  <img src={item.logo} className="w-12 h-12 rounded-full object-cover" alt={item.name} />
                ) : (
                  <item.icon className="w-12 h-12 text-white" />
                )}
                <div>
                  <h3 className="text-2xl font-bold text-white">{item.name}</h3>
                  {item.details && <p className="text-gray-300">{item.details}</p>}
                </div>
              </div>
            </div>
            
            <div className="card-body">
              {item.cardContent || (
                <div className="text-gray-200">
                  <p className="mb-3">This is the card content for {item.name}.</p>
                  <p>You can customize this per service item.</p>
                </div>
              )}
            </div>
            
            <div className="card-footer">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Active</span>
                <span className="text-sm text-white bg-green-500/20 px-3 py-1 rounded-full">
                  Service #{index + 1}
                </span>
              </div>
            </div>
          </div>
        </Card>
      )),
    [items, selectedChainIndex]
  );

  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);

  const makeSlot = useCallback((i, distX, distY, total) => ({
    x: i * distX,
    y: -i * distY,
    z: -i * distX * 1.5,
    zIndex: total - i,
  }), []);

  const placeNow = useCallback((el, slot, skew) => {
    if (!el) return;
    gsap.set(el, {
      x: slot.x,
      y: slot.y,
      z: slot.z,
      xPercent: -50,
      yPercent: -50,
      skewY: skew,
      transformOrigin: 'center center',
      zIndex: slot.zIndex,
      force3D: true,
    });
  }, []);

  /* CardSwap Animation Effect */
  useEffect(() => {
    if (refs.length === 0) return;
    
    const total = refs.length;
    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
      }
    });

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front]?.current;
      if (!elFront) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx]?.current;
        if (!el) return;
        
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    // Initial swap
    swap();
    intervalRef.current = window.setInterval(swap, delay);

    // Pause on hover logic
    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
        setPaused(true);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
        setPaused(false);
      };
      
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }

    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, config, refs, makeSlot, placeNow]);

  /* Get Visible Items for Carousel - FIXED OVERLAPPING */
  const getVisibleItems = useCallback(() => {
    const list = [];
    if (!total) return list;

    const count = visibleItemCount % 2 ? visibleItemCount : visibleItemCount + 1;
    const half = Math.floor(count / 2);

    for (let i = -half; i <= half; i++) {
      let index = currentIndex + i;
      if (index < 0) index += total;
      if (index >= total) index -= total;

      // Calculate proper z-index based on distance from center
      const distance = Math.abs(i);
      const zIndex = 1000 - distance * 100; // Higher z-index for center items
      
      list.push({
        ...items[index],
        originalIndex: index,
        distanceFromCenter: i,
        zIndex: zIndex,
      });
    }

    return list.sort((a, b) => b.zIndex - a.zIndex); // Sort by z-index so center renders on top
  }, [currentIndex, items, total, visibleItemCount]);

  /* Handle Chain Selection */
  const handleChainSelect = useCallback((chain, index) => {
    setSelectedChainIndex(index);
    setCurrentIndex(index);
    onChainSelect?.(chain, index);
    onCardClick?.(index);
  }, [onChainSelect, onCardClick]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: `rendered-${i}`,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e);
            handleChainSelect(items[i], i);
          },
        })
      : child
  );

  if (!items || items.length === 0) {
    return (
      <div className={`py-20 ${className}`}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">No services available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-16 ${className}`}> {/* Reduced from py-20 */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"> {/* Reduced gap from 12 to 8 */}
          {/* Left Side - Chain Carousel - FIXED LAYOUT */}
          <motion.div 
            className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-visible"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div 
              className="relative w-full h-full flex items-center justify-center"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl backdrop-blur-sm" />
              
              {/* Container for carousel items with proper positioning */}
              <div className="relative w-full h-full flex items-center justify-center">
                {getVisibleItems().map((chain, i) => {
                  const distance = Math.abs(chain.distanceFromCenter);
                  const isActive = chain.originalIndex === selectedChainIndex;
                  
                  // Calculate position based on distance from center
                  const xOffset = -distance * 80; // Increased spacing
                  const yOffset = chain.distanceFromCenter * 60; // Reduced vertical spread
                  const scale = 1 - distance * 0.15; // Less scaling difference
                  const opacity = 1 - distance * 0.3; // Better opacity gradient
                  const zIndex = chain.zIndex;
                  
                  return (
                    <motion.div
                      key={`${chain.id}-${chain.distanceFromCenter}-${i}`}
                      className="absolute carousel-item"
                      style={{
                        zIndex: zIndex,
                        left: '50%',
                        transformOrigin: 'center center',
                      }}
                      animate={{
                        opacity: opacity,
                        scale: scale,
                        x: xOffset,
                        y: yOffset,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: 'easeInOut',
                        type: 'spring',
                        stiffness: 100,
                        damping: 20,
                      }}
                    >
                      <ChainCarouselItem
                        chain={chain}
                        isActive={isActive}
                        onClick={() => handleChainSelect(chain, chain.originalIndex)}
                      />
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Center Highlight - moved to background */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-72 h-72 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-3xl" />
              </div>
            </div>
            
            {/* Auto-scroll Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-2 text-white/50">
                <span className="text-sm">{paused ? 'Paused' : 'Auto-scrolling'}</span>
                <div className={`w-2 h-2 rounded-full ${paused ? 'bg-red-500' : 'bg-green-500'}`} />
              </div>
            </div>
          </motion.div>

          {/* Right Side - CardSwap */}
          <motion.div 
            className="relative flex flex-col"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Header Section - Fixed at top */}
            <div className="mb-8 relative z-20 bg-gray-900/80 backdrop-blur-sm rounded-lg p-4">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                {items[selectedChainIndex]?.name || 'Service Details'}
              </h2>
              <p className="text-gray-400 text-sm md:text-base">
                Click on any service to view its detailed information
              </p>
            </div>
            
            {/* Card Container - Reduced size */}
            <div className="relative flex-1 min-h-[420px]">
              <div 
                ref={container} 
                className="card-swap-container" 
                style={{ 
                  width: typeof window !== 'undefined' ? Math.min(width, window.innerWidth - 100) : width, 
                  height: 420, // Reduced height
                  position: 'relative',
                  zIndex: 10
                }}
              >
                {rendered}
              </div>
            </div>
            
            {/* Controls Section - Fixed at bottom */}
            <div className="mt-8 relative z-20 bg-gray-900/80 backdrop-blur-sm rounded-lg p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() => setPaused(!paused)}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors text-sm"
                >
                  {paused ? 'Resume' : 'Pause'} Animation
                </button>
                <div className="text-sm text-gray-400">
                  {selectedChainIndex + 1} of {total} services selected
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ChainCarouselWithCards;