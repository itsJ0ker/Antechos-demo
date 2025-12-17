/**
 * Color Palette Reference for LaserFlow Effects
 * Use this as a quick reference for consistent theming
 */

export const LaserFlowColors = {
  // Primary Effects
  hero: {
    color: '#3B82F6',
    name: 'Blue',
    usage: 'Hero sections, primary CTAs',
    intensity: 0.4,
    speed: 0.8
  },
  services: {
    color: '#6366F1',
    name: 'Indigo',
    usage: 'Service listings, feature sections',
    intensity: 0.2,
    speed: 0.5
  },
  professionals: {
    color: '#8B5CF6',
    name: 'Purple',
    usage: 'Team members, professionals, premium content',
    intensity: 0.25,
    speed: 0.6
  },
  resources: {
    color: '#10B981',
    name: 'Green',
    usage: 'Downloads, resources, success states',
    intensity: 0.3,
    speed: 0.7
  },
  testimonials: {
    color: '#F59E0B',
    name: 'Amber',
    usage: 'Testimonials, reviews, highlights',
    intensity: 0.15,
    speed: 0.4
  },

  // Additional Options
  error: {
    color: '#EF4444',
    name: 'Red',
    usage: 'Errors, urgent actions, alerts',
    intensity: 0.3,
    speed: 0.9
  },
  info: {
    color: '#06B6D4',
    name: 'Cyan',
    usage: 'Information, technology, innovation',
    intensity: 0.25,
    speed: 0.6
  },
  success: {
    color: '#22C55E',
    name: 'Lime Green',
    usage: 'Success messages, achievements',
    intensity: 0.35,
    speed: 0.7
  },
  premium: {
    color: '#EC4899',
    name: 'Pink',
    usage: 'Premium features, special offers',
    intensity: 0.4,
    speed: 0.8
  }
};

// Gradient combinations for buttons
export const GradientButtons = {
  primary: 'from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600',
  secondary: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
  success: 'from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700',
  premium: 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
  warning: 'from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700',
  danger: 'from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700'
};

// Shadow effects for hover states
export const GlowShadows = {
  blue: 'hover:shadow-blue-500/50',
  indigo: 'hover:shadow-indigo-500/50',
  purple: 'hover:shadow-purple-500/50',
  green: 'hover:shadow-green-500/50',
  amber: 'hover:shadow-amber-500/50',
  red: 'hover:shadow-red-500/50',
  cyan: 'hover:shadow-cyan-500/50',
  pink: 'hover:shadow-pink-500/50'
};

export default LaserFlowColors;
