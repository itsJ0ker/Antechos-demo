import { useEffect, useRef } from 'react';
import './LaserFlow.css';

// Simplified LaserFlow component using Canvas 2D for better compatibility
export const SimpleLaserFlow = ({
  className,
  style,
  color = '#3B82F6',
  intensity = 0.6,
  speed = 1
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Mobile optimization: reduce quality on smaller screens
    const isMobile = window.innerWidth < 768;
    const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio;
    
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * pixelRatio;
      canvas.height = canvas.offsetHeight * pixelRatio;
      ctx.scale(pixelRatio, pixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Parse color
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 59, g: 130, b: 246 };
    };

    const rgb = hexToRgb(color);
    let time = 0;
    let lastTime = 0;

    const animate = (currentTime) => {
      // Throttle animation on mobile for better performance
      if (isMobile && currentTime - lastTime < 33) { // ~30fps on mobile
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;
      
      time += 0.01 * speed;
      
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, w, h);

      // Reduce beam count on mobile
      const beamCount = isMobile ? 3 : 5;
      for (let i = 0; i < beamCount; i++) {
        const offset = (i / beamCount) * Math.PI * 2;
        const x = w / 2 + Math.sin(time + offset) * (w * 0.3);
        const y = h / 2 + Math.cos(time * 0.7 + offset) * (h * 0.3);
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, isMobile ? 100 : 150);
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.8})`);
        gradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.3})`);
        gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      // Reduce particle count on mobile
      const particleCount = isMobile ? 10 : 20;
      for (let i = 0; i < particleCount; i++) {
        const t = (time * 0.5 + i / particleCount) % 1;
        const x = w * t;
        const y = h / 2 + Math.sin(t * Math.PI * 4 + i) * (h * 0.2);
        
        ctx.beginPath();
        ctx.arc(x, y, isMobile ? 1.5 : 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color, intensity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`laser-flow-container ${className || ''}`}
      style={{
        ...style,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    />
  );
};

export default SimpleLaserFlow;
