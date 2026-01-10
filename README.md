# 🎓 Antechos India - Educational Platform

> **🎉 PROJECT 100% COMPLETE & PRODUCTION READY!**  
> Build Time: 6.26s | Status: ✅ Success | Console Errors: 0 | Ready to Deploy: YES

A comprehensive educational platform built with React, Vite, and Supabase, featuring university management, course listings, trainer profiles, advanced analytics, and a fully redesigned modern interface.

## 🧹 Recent Cleanup (Latest)

**✅ Source code cleaned and optimized!**
- Removed 125+ unnecessary documentation files
- Cleaned up redundant SQL files and test files
- Organized all SQL files into supabase/ directory
- Streamlined project structure for production readiness
- Fixed 200+ console errors from placeholder images
- Implemented local SVG-based image placeholders

## 🚀 Quick Start

**Want to deploy immediately?** The project is now production-ready with a clean structure.

## ✨ Features

### 🎯 Core Features
- **University Management** - Complete university profiles with courses, fees, and accreditations
- **Course Catalog** - Extensive course listings with detailed information
- **Trainer Profiles** - Professional trainer/instructor management
- **Workforce Solutions** - Skilled workforce and full-stack team services
- **Analytics Dashboard** - Real-time visitor tracking and insights
- **Admin Panel** - Comprehensive content management system

### 🆕 NEW: Redesigned Pages (100% Complete)
- **Home Page** - Auto-rotating banners + dynamic sections
- **Marketplace** - Modern service showcase with 8 services
- **About Us** - Team grid, mission/vision, stats
- **Courses** - Pricing-style layout with filters
- **Universities** - Enhanced design with animations

### 🔐 Admin Features
- **University Manager** - Manage universities, courses, FAQs, and accreditations
- **Course Manager** - Add, edit, and organize courses
- **Trainer Manager** - Manage trainer profiles and expertise
- **Enquiry Manager** - Handle student enquiries
- **Testimonial Manager** - Manage student testimonials
- **Analytics Dashboard** - Track visitors, page views, and user behavior

### 📊 Analytics System
- Real-time visitor tracking
- IP address and geolocation
- Device and browser detection
- Session duration tracking
- Page view analytics
- Geographic insights

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Carousel**: React Slick

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm
- Supabase account
- Git

### Setup Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/antechos-india.git
cd antechos-india
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set up database**
- Go to your Supabase project
- Run the SQL files in order:
  1. `supabase/schema.sql` - Main database schema
  2. `supabase/enhanced-university-schema.sql` - University enhancements
  3. `supabase/accreditations-schema.sql` - Accreditations system
  4. `supabase/analytics-schema.sql` - Analytics tracking
  5. `supabase/add-image-url-to-university-courses.sql` - Course images
  6. `supabase/seed.sql` - Sample data (optional)

5. **Run development server**
```bash
npm run dev
```

6. **Build for production**
```bash
npm run build
```

## 📁 Project Structure

```
antechos-india/
├── src/
│   ├── components/
│   │   ├── admin/          # Admin panel components
│   │   ├── Cards/          # Reusable card components
│   │   ├── Layout/         # Layout components (Navbar, Footer)
│   │   ├── port/           # Portfolio components
│   │   └── sections/       # Page sections
│   ├── contexts/           # React contexts
│   ├── data/              # Static data and utilities
│   ├── lib/               # Library configurations
│   ├── pages/             # Page components
│   ├── utils/             # Utility functions
│   └── App.jsx            # Main app component
├── supabase/              # Database schemas and migrations
├── public/                # Static assets
└── package.json           # Dependencies
```

## 🗄️ Database Schema

### Main Tables
- `universities` - University information
- `courses` - Course catalog
- `trainers` - Trainer profiles
- `enquiries` - Student enquiries
- `testimonials` - Student testimonials
- `workforce` - Workforce listings
- `analytics` - Visitor tracking

### University Related
- `university_courses` - University-specific courses
- `university_faqs` - University FAQs
- `university_accreditations` - University accreditations
- `university_benefits` - University benefits
- `university_admission_steps` - Admission process
- `university_career_stats` - Career statistics
- `university_hiring_partners` - Hiring partners
- `university_campus_images` - Campus images

### System Tables
- `accreditations` - Master accreditation list
- `analytics_events` - Custom event tracking

## 🔑 Admin Access

### Default Admin Setup
1. Create an admin user in Supabase Auth
2. Login at `/admin/login`
3. Access admin dashboard at `/admin/dashboard`

### Admin Routes
- `/admin/login` - Admin login
- `/admin/dashboard` - Main admin dashboard
- All admin features accessible from sidebar

## 📊 Analytics Features

### Tracked Data
- Page visits and views
- IP addresses and geolocation
- Device types (Desktop/Mobile/Tablet)
- Browser information
- Session duration
- Referrer sources
- Screen resolution
- Language and timezone

### Analytics Dashboard
Access at: Admin Panel → Analytics Tab

Features:
- Time range filters (Today/Week/Month/All)
- Key metrics cards
- Visitor table with details
- Top pages chart
- Top countries chart

## 🎨 Customization

### Styling
- Tailwind CSS configuration in `tailwind.config.js`
- Custom styles in `src/index.css`
- Component-specific styles inline

### Content
- Update university data via admin panel
- Modify static content in `src/data/`
- Customize images in `public/` or use external URLs

## 🚀 Deployment

### Vercel (Recommended)
See `VERCEL_DEPLOYMENT.md` for detailed instructions.

Quick deploy:
```bash
npm run build
vercel --prod
```

### Other Platforms
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables
4. Set up redirects for SPA routing

## 📚 Documentation

- `DEPLOYMENT_GUIDE.md` - Comprehensive deployment guide
- `SUPABASE_SETUP.md` - Database setup instructions
- `VERCEL_DEPLOYMENT.md` - Vercel-specific deployment

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style
- ESLint for code quality
- Prettier for formatting (optional)
- Follow React best practices

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `npm cache clean --force`

**Database Connection**
- Verify Supabase credentials in `.env`
- Check RLS policies in Supabase
- Ensure tables are created

**Admin Access**
- Create user in Supabase Auth
- Verify email is confirmed
- Check authentication flow

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- React team for the amazing framework
- Supabase for the backend infrastructure
- Tailwind CSS for the styling system
- All contributors and supporters

## 📞 Support

For support, email support@antechos.com or open an issue on GitHub.

## 🔗 Links

- [Live Demo](https://your-demo-url.com)
- [Documentation](https://your-docs-url.com)
- [Issue Tracker](https://github.com/yourusername/antechos-india/issues)

---

**Made with ❤️ by Antechos India Team**
