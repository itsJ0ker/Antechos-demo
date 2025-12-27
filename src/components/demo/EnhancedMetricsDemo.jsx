import React from 'react';
import { motion } from 'framer-motion';
import { Target, Star, Zap, Shield, Code, Users, Briefcase } from 'lucide-react';

const EnhancedMetricsDemo = () => {
  // Sample metrics data for demonstration
  const sampleMetrics = [
    {
      id: 1,
      primary_percentage: 95,
      label: 'Success Rate',
      color: '#10b981'
    },
    {
      id: 2,
      primary_percentage: 98,
      label: 'Client Satisfaction',
      color: '#f59e0b'
    },
    {
      id: 3,
      primary_percentage: 87,
      label: 'Team Efficiency',
      color: '#8b5cf6'
    },
    {
      id: 4,
      primary_percentage: 92,
      label: 'Quality Assurance',
      color: '#3b82f6'
    }
  ];

  const EnhancedDonutChart = ({ percentage, label, color = '#a855f7', description, icon }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    
    // Generate gradient colors based on the main color
    const getGradientColors = (baseColor) => {
      const colors = {
        '#a855f7': ['#a855f7', '#c084fc', '#e879f9'], // Purple gradient
        '#3b82f6': ['#3b82f6', '#60a5fa', '#93c5fd'], // Blue gradient
        '#10b981': ['#10b981', '#34d399', '#6ee7b7'], // Green gradient
        '#f59e0b': ['#f59e0b', '#fbbf24', '#fcd34d'], // Yellow gradient
        '#ef4444': ['#ef4444', '#f87171', '#fca5a5'], // Red gradient
        '#8b5cf6': ['#8b5cf6', '#a78bfa', '#c4b5fd'], // Violet gradient
      };
      return colors[baseColor] || colors['#a855f7'];
    };

    const gradientColors = getGradientColors(color);
    const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <motion.div 
        className="group relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Background glow effect */}
        <div 
          className="absolute inset-0 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{ 
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            transform: 'scale(1.5)'
          }}
        />
        
        {/* Main card container */}
        <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 group-hover:transform group-hover:scale-105 shadow-xl">
          {/* Icon at top if provided */}
          {icon && (
            <div className="flex justify-center mb-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${color}20, ${color}40)`,
                  border: `1px solid ${color}60`
                }}
              >
                {React.createElement(icon, { 
                  className: "w-6 h-6", 
                  style: { color: color }
                })}
              </div>
            </div>
          )}

          {/* Enhanced SVG Chart */}
          <div className="flex justify-center mb-4">
            <div className="relative w-36 h-36">
              <svg className="transform -rotate-90 w-36 h-36" viewBox="0 0 120 120">
                {/* Define gradient */}
                <defs>
                  <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={gradientColors[0]} />
                    <stop offset="50%" stopColor={gradientColors[1]} />
                    <stop offset="100%" stopColor={gradientColors[2]} />
                  </linearGradient>
                  
                  {/* Glow filter */}
                  <filter id={`glow-${gradientId}`}>
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Background circle */}
                <circle 
                  cx="60" 
                  cy="60" 
                  r={radius} 
                  stroke="rgba(139, 92, 246, 0.15)" 
                  strokeWidth="8" 
                  fill="none" 
                />
                
                {/* Progress circle */}
                <motion.circle
                  cx="60" 
                  cy="60" 
                  r={radius} 
                  stroke={`url(#${gradientId})`}
                  strokeWidth="8" 
                  fill="none"
                  strokeDasharray={circumference} 
                  strokeDashoffset={circumference}
                  strokeLinecap="round"
                  filter={`url(#glow-${gradientId})`}
                  initial={{ strokeDashoffset: circumference }}
                  whileInView={{ strokeDashoffset: offset }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  viewport={{ once: true }}
                  className="drop-shadow-lg"
                />
                
                {/* Inner decorative circle */}
                <circle 
                  cx="60" 
                  cy="60" 
                  r="25" 
                  stroke={color} 
                  strokeWidth="1" 
                  fill="none" 
                  opacity="0.3"
                />
              </svg>
              
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  className="text-3xl font-bold text-white"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  {percentage}%
                </motion.span>
                <div 
                  className="w-8 h-0.5 mt-1 rounded-full"
                  style={{ background: color }}
                />
              </div>
            </div>
          </div>

          {/* Label and description */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-white mb-2 leading-tight">
              {label}
            </h3>
            {description && (
              <p className="text-sm text-gray-400 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Animated progress bar at bottom */}
          <div className="mt-4 w-full bg-gray-700/50 rounded-full h-1.5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${gradientColors[0]}, ${gradientColors[1]})` }}
              initial={{ width: 0 }}
              whileInView={{ width: `${percentage}%` }}
              transition={{ duration: 1.2, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20">
      {/* Enhanced Metrics Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Dynamic gradient background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
              linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)
            `
          }}
        />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-10 w-20 h-20 border border-purple-500/20 rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-16 h-16 border border-blue-500/20 rotate-45 animate-bounce" style={{ animationDuration: '3s' }} />
          <div className="absolute bottom-32 left-1/4 w-12 h-12 border border-green-500/20 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Section header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Impact</span> in Numbers
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Measurable results that showcase our commitment to excellence and innovation
            </p>
            
            {/* Decorative line */}
            <div className="flex justify-center mt-6">
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
            </div>
          </motion.div>

          {/* Enhanced metrics grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {sampleMetrics.map((metric, index) => {
              // Define enhanced metric data with icons and descriptions
              const enhancedMetrics = {
                'Success Rate': { 
                  icon: Target, 
                  description: 'Projects completed successfully',
                  color: '#10b981'
                },
                'Client Satisfaction': { 
                  icon: Star, 
                  description: 'Happy clients worldwide',
                  color: '#f59e0b'
                },
                'Team Efficiency': { 
                  icon: Zap, 
                  description: 'Faster delivery times',
                  color: '#8b5cf6'
                },
                'Quality Assurance': { 
                  icon: Shield, 
                  description: 'Bug-free deployments',
                  color: '#3b82f6'
                }
              };

              // Get enhanced data or use defaults
              const metricKey = Object.keys(enhancedMetrics).find(key => 
                metric.label.toLowerCase().includes(key.toLowerCase())
              ) || 'default';
              
              const enhanced = enhancedMetrics[metricKey] || {
                icon: Briefcase,
                description: 'Professional excellence',
                color: metric.color || '#a855f7'
              };

              return (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                >
                  <EnhancedDonutChart
                    percentage={metric.primary_percentage}
                    label={metric.label}
                    color={enhanced.color}
                    description={enhanced.description}
                    icon={enhanced.icon}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Additional stats bar */}
          <motion.div 
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {[
              { label: 'Projects Delivered', value: '500+', color: '#10b981' },
              { label: 'Years Experience', value: '10+', color: '#3b82f6' },
              { label: 'Team Members', value: '50+', color: '#f59e0b' },
              { label: 'Countries Served', value: '25+', color: '#8b5cf6' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <motion.div 
                  className="text-3xl font-bold text-white mb-1"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-400">{stat.label}</div>
                <motion.div 
                  className="w-full h-1 rounded-full mt-2 mx-auto"
                  style={{ background: `linear-gradient(90deg, ${stat.color}40, ${stat.color})` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedMetricsDemo;