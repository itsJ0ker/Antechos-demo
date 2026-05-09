export const mockTalent = [
  {
    id: 't1',
    name: 'Sarah Chen',
    role: 'Senior Product Designer',
    experience: '8+ years',
    skills: ['Framer', 'Product Strategy', 'UI Engineering'],
    matchScore: 98,
    availability: 'Available Now',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    hourlyRate: '$120',
    verified: true,
    lastActive: '2m ago',
    bio: 'Ex-Apple, Ex-Linear. Specialized in building complex design systems and high-fidelity prototypes.'
  },
  {
    id: 't2',
    name: 'Marcus Thorne',
    role: 'Full Stack Engineer',
    experience: '6 years',
    skills: ['Next.js', 'PostgreSQL', 'TypeScript'],
    matchScore: 94,
    availability: '2 weeks',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    hourlyRate: '$95',
    verified: true,
    lastActive: '15m ago',
    bio: 'Core contributor to several open-source libraries. Heavy focus on performance and scalable architecture.'
  },
  {
    id: 't3',
    name: 'Elena Rodriguez',
    role: 'AI / ML Engineer',
    experience: '5 years',
    skills: ['PyTorch', 'LLMs', 'Python'],
    matchScore: 91,
    availability: 'Available Now',
    location: 'Madrid, ES',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
    hourlyRate: '$150',
    verified: true,
    lastActive: '1h ago',
    bio: 'Helping startups integrate intelligent features using state-of-the-art language models.'
  },
  {
    id: 't4',
    name: 'David Kim',
    role: 'Growth Marketer',
    experience: '7 years',
    skills: ['SEO', 'Paid Ads', 'Analytics'],
    matchScore: 89,
    availability: 'Available Now',
    location: 'Seoul, KR',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    hourlyRate: '$80',
    verified: false,
    lastActive: '4h ago',
    bio: 'Data-driven marketer with experience scaling D2C brands from 0 to $10M ARR.'
  },
  {
    id: 't5',
    name: 'Aisha Jallow',
    role: 'Mobile Developer',
    experience: '4 years',
    skills: ['React Native', 'Swift', 'Kotlin'],
    matchScore: 87,
    availability: '1 month',
    location: 'Berlin, DE',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop',
    hourlyRate: '$110',
    verified: true,
    lastActive: '30m ago',
    bio: 'Building world-class mobile experiences with a focus on smooth animations and accessibility.'
  }
];

export const mockProjects = [
  {
    id: 'p1',
    title: 'Design System for Fintech Startup',
    budget: '$5,000 - $8,000',
    duration: '2 months',
    proposals: 12,
    urgency: 'High',
    category: 'Design',
    posted: '2h ago',
    status: 'Active',
    location: 'Remote',
    description: 'We need a senior designer to audit our current UI and build a scalable design system in Figma.'
  },
  {
    id: 'p2',
    title: 'AI-Powered Search Integration',
    budget: '$10,000+',
    duration: '3 months',
    proposals: 8,
    urgency: 'Medium',
    category: 'Development',
    posted: '5h ago',
    status: 'Active',
    location: 'Remote (US Timezone)',
    description: 'Integration of vector database and LLM for sematic search across internal documentation.'
  },
  {
    id: 'p3',
    title: 'SaaS Platform Redesign',
    budget: '$15,000 - $20,000',
    duration: '4 months',
    proposals: 24,
    urgency: 'Normal',
    category: 'Product',
    posted: '1d ago',
    status: 'Reviewing',
    location: 'New York, US',
    description: 'Complete overhaul of our B2B dashboard for better user retention and engagement.'
  }
];

export const categoriesV2 = [
  { id: 'all', name: 'All Talent', count: 1240 },
  { id: 'design', name: 'Design', count: 420 },
  { id: 'dev', name: 'Development', count: 580 },
  { id: 'marketing', name: 'Marketing', count: 150 },
  { id: 'product', name: 'Product', count: 90 },
];
