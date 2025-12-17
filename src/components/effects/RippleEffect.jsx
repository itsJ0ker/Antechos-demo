import { useEffect, useRef } from 'react';
import './LaserFlow.css';

/**
 * Interactive ripple effect on mouse click
 * Creates expanding rings where user clicks
 */
export const RippleEffect = ({
  className,
  style,
  color = '#3B82F6',
  intensity = 0.6,
  maxRipples = 5
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const ripplesRef = useRef([]);

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

    // Click handler
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripplesRef.current.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.max(canvas.offsetWidth, canvas.offsetHeight) * 0.5,
        life: 1
      });

      // Limit ripples
      if (ripplesRef.current.length > maxRipples) {
        ripplesRef.current.shift();
      }
    };

    canvas.addEventListener('click', handleClick);

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, w, h);

      // Update and draw ripples
      ripplesRef.current.forEach((ripple) => {
        ripple.radius += ripple.maxRadius * 0.02;
        ripple.life *= 0.97;

        const alpha = intensity * ripple.life;

        // Draw multiple rings for depth
        for (let i = 0; i < 3; i++) {
          const offset = i * 10;
          const ringAlpha = alpha * (1 - i * 0.3);

          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius + offset, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${ringAlpha})`;
          ctx.lineWidth = 3 - i;
          ctx.stroke();

          // Add glow
          ctx.shadowBlur = 15;
          ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${ringAlpha * 0.5})`;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      });

      // Remove dead ripples
      ripplesRef.current = ripplesRef.current.filter(r => r.life > 0.01 && r.radius < r.maxRadius);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color, intensity, maxRipples]);

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
        pointerEvents: 'auto',
        cursor: 'pointer'
      }}
    />
  );
};

export default RippleEffect;
