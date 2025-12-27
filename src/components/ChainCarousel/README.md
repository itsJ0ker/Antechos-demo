# ChainCarouselWithCards Component

A combined interactive component that features both a chain carousel and animated card swap functionality. Perfect for showcasing services or products with detailed information cards.

## Features

- **Chain Carousel**: Interactive circular carousel showing service items
- **Card Swap**: Animated 3D card stack with GSAP animations
- **Responsive Design**: Adapts to different screen sizes
- **Auto-scroll**: Automatic progression with pause/resume controls
- **Interactive Selection**: Click any chain item to view detailed card
- **Customizable Content**: Support for custom card content per item

## Usage

```jsx
import ChainCarouselWithCards from '../components/ChainCarousel/ChainCarouselWithCards';
import { Code, Briefcase, Users } from 'lucide-react';

const services = [
  {
    id: 1,
    name: 'Web Development',
    icon: Code,
    details: 'Full-stack Development',
    logo: '/path/to/logo.png',
    cardContent: (
      <div>
        <h4 className="text-xl font-bold text-white mb-4">Web Development</h4>
        <p className="text-gray-300">Custom web applications built with modern technologies.</p>
      </div>
    )
  },
  // ... more services
];

<ChainCarouselWithCards
  items={services}
  scrollSpeedMs={2000}
  visibleItemCount={7}
  width={450}
  height={350}
  delay={4000}
  pauseOnHover={true}
  onChainSelect={(service, index) => {
    console.log('Selected:', service.name);
  }}
/>
```

## Props

### ChainCarousel Props
- `items` (array): Array of service/chain items
- `scrollSpeedMs` (number): Auto-scroll speed in milliseconds (default: 1500)
- `visibleItemCount` (number): Number of visible items in carousel (default: 7)
- `className` (string): Additional CSS classes
- `onChainSelect` (function): Callback when chain item is selected

### CardSwap Props
- `width` (number): Card width in pixels (default: 500)
- `height` (number): Card height in pixels (default: 400)
- `cardDistance` (number): Horizontal spacing between cards (default: 60)
- `verticalDistance` (number): Vertical spacing between cards (default: 70)
- `delay` (number): Animation delay in milliseconds (default: 5000)
- `pauseOnHover` (boolean): Pause animation on hover (default: false)
- `onCardClick` (function): Callback when card is clicked
- `skewAmount` (number): Card skew amount (default: 6)
- `easing` (string): Animation easing ('elastic' or 'smooth', default: 'elastic')

## Item Structure

Each item in the `items` array should have:

```javascript
{
  id: string | number,           // Unique identifier
  name: string,                  // Display name
  icon: LucideIcon,             // Icon component
  details?: string,             // Optional subtitle
  logo?: string,                // Optional logo URL
  cardContent?: ReactNode       // Optional custom card content
}
```

## Responsive Behavior

- **Desktop (1024px+)**: Full size with all features
- **Tablet (768px-1024px)**: 90% scale with adjusted spacing
- **Mobile (640px-768px)**: 80% scale with smaller fonts
- **Small Mobile (<640px)**: 75% scale with compact layout

## Dependencies

- React 18+
- Framer Motion
- GSAP
- Lucide React (for icons)

## Files

- `ChainCarouselWithCards.jsx` - Main component
- `CardSwap.css` - Styling and animations
- `README.md` - This documentation