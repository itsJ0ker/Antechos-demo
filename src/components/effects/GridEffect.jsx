import { useEffect, useRef } from 'react';
import './LaserFlow.css';

/**
 * Animated grid effect with perspective
 * Creates a cyberpunk/retro-futuristic look
 */
export const GridEffect = ({
  className,
  style,
  color = '#3B82F6',
  intensity = 0.6,
  speed = 1,
  gridSize = 40
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

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

    const animate = () => {
      time += 0.01 * speed;
      
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, w, h);

      // Draw perspective grid
      const vanishingY = h * 0.3;
      const offset = (time * 20) % gridSize;

      // Horizontal lines
      for (let i = 0; i < 20; i++) {
        const y = vanishingY + (i * gridSize) - offset;
        if (y > h) continue;
        
        const progress = (y - vanishingY) / (h - vanishingY);
        const alpha = intensity * (0.5 - progress * 0.3);
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
        ctx.lineWidth = 1 + progress * 2;
        ctx.stroke();
      }

      // Vertical lines with perspective
      const lineCount = Math.floor(w / gridSize) + 2;
      for (let i = -1; i < lineCount; i++) {
        const x = i * gridSize;
        
        ctx.beginPath();
        ctx.moveTo(x, vanishingY);
        
        // Draw line with perspective
        for (let y = vanishingY; y < h; y += 10) {
          const progress = (y - vanishingY) / (h - vanishingY);
          const perspectiveX = x + (x - w / 2) * progress * 0.5;
          ctx.lineTo(perspectiveX, y);
        }
        
        const alpha = intensity * 0.3;
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Add glowing nodes at intersections
      for (let i = 0; i < 10; i++) {
        const x = (Math.sin(time + i) * 0.5 + 0.5) * w;
        const y = vanishingY + (Math.cos(time * 0.7 + i) * 0.5 + 0.5) * (h - vanishingY);
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.8})`);
        gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x - 15, y - 15, 30, 30);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color, intensity, speed, gridSize]);

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

export default GridEffect;
