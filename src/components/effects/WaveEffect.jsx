import { useEffect, useRef } from 'react';
import './LaserFlow.css';

/**
 * Animated wave effect with multiple layers
 * Creates a flowing, liquid-like animation
 */
export const WaveEffect = ({
  className,
  style,
  color = '#3B82F6',
  intensity = 0.6,
  speed = 1,
  waveCount = 3
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

      // Draw multiple wave layers
      for (let wave = 0; wave < waveCount; wave++) {
        ctx.beginPath();
        
        const waveOffset = (wave / waveCount) * Math.PI * 2;
        const amplitude = 30 + wave * 10;
        const frequency = 0.02 - wave * 0.003;
        const yOffset = h * 0.5 + wave * 20;
        
        for (let x = 0; x <= w; x += 5) {
          const y = yOffset + Math.sin(x * frequency + time + waveOffset) * amplitude;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        // Create gradient fill
        const gradient = ctx.createLinearGradient(0, yOffset - amplitude, 0, yOffset + amplitude);
        const alpha = intensity * (0.3 - wave * 0.08);
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        gradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`);
        gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Add glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
        ctx.stroke();
        ctx.shadowBlur = 0;
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
  }, [color, intensity, speed, waveCount]);

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

export default WaveEffect;
