import { useEffect, useRef } from 'react';
import './LaserFlow.css';

/**
 * Vertical laser beam effect with scanning animation
 * Perfect for hero sections and dramatic reveals
 */
export const LaserBeamEffect = ({
  className,
  style,
  color = '#3B82F6',
  intensity = 0.6,
  speed = 1,
  beamCount = 3
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

      // Draw elegant radial pulses from center
      for (let i = 0; i < beamCount; i++) {
        const angle = (i / beamCount) * Math.PI * 2;
        const pulse = (Math.sin(time * 2 + i) * 0.5 + 0.5);
        const radius = (pulse * 0.3 + 0.2) * Math.min(w, h);
        
        const centerX = w / 2 + Math.cos(time * 0.5 + angle) * (w * 0.1);
        const centerY = h / 2 + Math.sin(time * 0.5 + angle) * (h * 0.1);
        
        // Create radial gradient
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.6})`);
        gradient.addColorStop(0.3, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.3})`);
        gradient.addColorStop(0.7, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.1})`);
        gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      // Add flowing light streaks
      for (let i = 0; i < beamCount * 3; i++) {
        const angle = (i / (beamCount * 3)) * Math.PI * 2 + time;
        const distance = ((time * 0.5 + i * 0.1) % 1) * Math.max(w, h) * 0.6;
        
        const x = w / 2 + Math.cos(angle) * distance;
        const y = h / 2 + Math.sin(angle) * distance;
        
        const size = 4 + Math.sin(time * 3 + i) * 2;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
        particleGradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.8})`);
        particleGradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.4})`);
        particleGradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        ctx.fillStyle = particleGradient;
        ctx.fill();
      }

      // Add subtle connecting lines
      ctx.globalAlpha = intensity * 0.2;
      for (let i = 0; i < beamCount; i++) {
        const angle1 = (i / beamCount) * Math.PI * 2 + time * 0.5;
        const angle2 = ((i + 1) / beamCount) * Math.PI * 2 + time * 0.5;
        const radius = Math.min(w, h) * 0.3;
        
        const x1 = w / 2 + Math.cos(angle1) * radius;
        const y1 = h / 2 + Math.sin(angle1) * radius;
        const x2 = w / 2 + Math.cos(angle2) * radius;
        const y2 = h / 2 + Math.sin(angle2) * radius;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.3})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color, intensity, speed, beamCount]);

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

export default LaserBeamEffect;
