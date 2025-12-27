# ServiceCarousel Component

A responsive carousel component that displays services in a traditional card format with images and interactive buttons.

## Features

- **Responsive Design**: Adapts to different screen sizes (1 card on mobile, 2 on tablet, 3 on desktop)
- **Interactive Cards**: Hover effects with smooth animations
- **Service Images**: Displays service images with fallback gradients
- **Category Badges**: Shows service categories as overlay badges
- **View Details Button**: Interactive button with hover effects
- **Navigation Controls**: Previous/Next buttons and dot indicators
- **Smooth Animations**: Framer Motion powered transitions

## Usage

```jsx
import ServiceCarousel from '../components/ServiceCarousel/ServiceCarousel';

const services = [
  {
    id: 1,
    title: 'Web Development',
    category: 'Development',
    description: 'Professional web development services...',
    image_url: '/path/to/image.jpg'
  },
  // ... more services
];

<ServiceCarousel
  services={services}
  onViewDetails={(service) => {
    console.log('View details for:', service.title);
    // Handle view details action
  }}
/>
```

## Props

### services (array, required)
Array of service objects with the following structure:
```javascript
{
  id: string | number,           // Unique identifier
  title: string,                 // Service title
  category?: string,             // Service category (optional)
  description?: string,          // Service description (optional)
  image_url?: string            // Service image URL (optional)
}
```

### onViewDetails (function, optional)
Callback function called when "View Service Details" button is clicked:
```javascript
onViewDetails: (service) => void
```

## Responsive Behavior

- **Desktop (≥1024px)**: Shows 3 cards per view
- **Tablet (640px-1024px)**: Shows 2 cards per view  
- **Mobile (<640px)**: Shows 1 card per view

## Card Features

### Image Handling
- Displays service image if `image_url` is provided
- Shows gradient background with first letter if no image
- Hover effect scales image slightly

### Category Badge
- Displays in top-left corner if `category` is provided
- Purple gradient background with backdrop blur

### Content
- Service title with hover color change
- Description with 3-line clamp for consistent height
- Service details (type and availability)
- Interactive "View Service Details" button

### Animations
- Card hover: Lifts up and scales slightly
- Button hover: Arrow slides right
- Image hover: Scales up
- Smooth transitions throughout

## Navigation

### Arrow Controls
- Previous/Next buttons on sides
- Only shown when there are multiple slides
- Hover effects with border color change

### Dot Indicators
- Shows current slide position
- Clickable to jump to specific slide
- Active dot is wider with purple color

## Styling

The component uses:
- **Tailwind CSS**: For responsive design and utilities
- **Custom CSS**: For advanced effects and animations
- **Framer Motion**: For smooth animations
- **Gradient Backgrounds**: Purple/pink theme consistency

## Accessibility

- **ARIA Labels**: Navigation buttons have descriptive labels
- **Keyboard Navigation**: Supports tab navigation
- **Screen Reader**: Proper semantic structure
- **Focus States**: Visible focus indicators

## Integration

The ServiceCarousel integrates seamlessly with:
- MarketplaceRedesign page
- Existing service data structure
- ChainCarouselWithCards component (complementary)
- Overall marketplace theme and styling

## Customization

Easy to customize:
- Colors via Tailwind classes
- Animations via Framer Motion props
- Layout via responsive grid classes
- Content via service data structure