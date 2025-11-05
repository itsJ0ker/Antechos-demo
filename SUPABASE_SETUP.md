# Supabase Backend Setup for Antechos Platform

This guide will help you set up the complete Supabase backend for the Antechos platform with an admin panel.

## 🚀 Quick Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new account
2. Create a new project
3. Note down your project URL and anon key

### 2. Environment Configuration

1. Copy `.env.example` to `.env`
2. Fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_EMAIL=admin@antechos.com
```

### 3. Database Setup

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run the schema file: Copy and paste the contents of `supabase/schema.sql`
4. Run the seed file: Copy and paste the contents of `supabase/seed.sql`

### 4. Install Dependencies

```bash
npm install @supabase/supabase-js
```

## 📊 Database Schema Overview

### Core Tables

1. **profiles** - User profiles extending Supabase auth
2. **courses** - Course catalog with modules, skills, and tools
3. **universities** - University partners with programs and details
4. **trainers** - Industry trainers with skills and experience
5. **workforce** - Skilled professionals for hire
6. **testimonials** - Customer testimonials and reviews
7. **enquiries** - Lead generation and contact forms
8. **blog_posts** - Content management for blog
9. **statistics** - Platform metrics and stats
10. **settings** - Admin configuration

### Relationships

- Courses have modules, skills, tools, and module details
- Universities have programs, collaborations, approvals, courses, and FAQs
- Trainers have skills, expertise, certifications, achievements, projects, education, and tools
- Workforce has similar structure to trainers
- All tables support soft deletes and timestamps

## 🔐 Authentication & Authorization

### Row Level Security (RLS)

- **Public Access**: Read access to active content (courses, universities, trainers, etc.)
- **Admin Access**: Full CRUD access to all tables
- **User Access**: Users can read/update their own profiles
- **Enquiry Submission**: Public can submit enquiries

### Admin Access

Admin users are identified by:
1. Email matching `VITE_ADMIN_EMAIL` environment variable
2. Email containing "admin"
3. Role set to "admin" in profiles table

## 🎛️ Admin Panel Features

### Dashboard Overview
- Statistics cards (courses, universities, trainers, enquiries)
- Recent enquiries list
- Platform metrics
- Quick actions

### Content Management
- **Courses**: Full CRUD with modules, skills, tools
- **Universities**: Manage university data, programs, FAQs
- **Trainers**: Trainer profiles with skills and experience
- **Workforce**: Skilled professionals management
- **Testimonials**: Customer reviews and ratings
- **Enquiries**: Lead management with status tracking

### Admin Routes
- `/admin/login` - Admin authentication
- `/admin/dashboard` - Main admin dashboard

## 🔄 Data Migration

### From Static to Dynamic

The platform automatically falls back to static data if Supabase is unavailable:

1. **Courses**: `allCourses.js` → `courses` table
2. **Trainers**: `dataservice.js` → `trainers` table
3. **Workforce**: `workforcedata.js` → `workforce` table
4. **Universities**: `universityData.js` → `universities` table

### Data Transformation

The system transforms Supabase relational data to match the existing flat structure:

```javascript
// Example: Trainer with related data
{
  id: 1,
  name: "John Doe",
  skills: ["JavaScript", "React"], // from trainer_skills table
  expertise: ["Frontend"], // from trainer_expertise table
  certifications: ["React Certified"], // from trainer_certifications table
  // ... other related data
}
```

## 📝 API Usage Examples

### Fetching Courses

```javascript
import { getCourses } from './lib/supabase';

// Get all active courses
const { data, error } = await getCourses();

// Get courses by category
const { data, error } = await getCourses({ category: 'Technology' });
```

### Submitting Enquiries

```javascript
import { submitEnquiry } from './lib/supabase';

const enquiryData = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+91-9876543210",
  course_interest: "Full Stack Development",
  country: "India"
};

const { data, error } = await submitEnquiry(enquiryData);
```

### Admin Operations

```javascript
import { supabase } from './lib/supabase';

// Update course status
await supabase
  .from('courses')
  .update({ is_active: false })
  .eq('id', courseId);

// Get enquiries with filters
const { data } = await supabase
  .from('enquiries')
  .select('*')
  .eq('status', 'new')
  .order('created_at', { ascending: false });
```

## 🛡️ Security Features

### Data Protection
- Row Level Security (RLS) enabled on all tables
- Admin-only access to sensitive operations
- Public read access to published content only
- Secure enquiry submission

### Input Validation
- Required field validation
- Email format validation
- Phone number validation
- XSS protection through Supabase

## 📈 Performance Optimization

### Indexes
- Category-based indexes for courses
- Status-based indexes for content filtering
- Date-based indexes for enquiries
- Active status indexes for all content

### Caching Strategy
- Static data fallback for reliability
- Client-side caching of frequently accessed data
- Optimized queries with selective field loading

## 🔧 Maintenance

### Regular Tasks
1. **Monitor Enquiries**: Check new leads daily
2. **Content Updates**: Keep courses and university data current
3. **User Management**: Review and approve new trainers/workforce
4. **Analytics**: Monitor platform statistics and performance

### Backup Strategy
- Supabase provides automatic backups
- Export critical data regularly
- Keep schema and seed files updated

## 🚨 Troubleshooting

### Common Issues

1. **Connection Errors**
   - Check environment variables
   - Verify Supabase project status
   - Confirm RLS policies

2. **Authentication Issues**
   - Verify admin email configuration
   - Check user roles in profiles table
   - Confirm auth policies

3. **Data Not Loading**
   - Check browser console for errors
   - Verify table permissions
   - Confirm data exists in tables

### Debug Mode

Enable debug logging:

```javascript
// In supabase.js
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    debug: true
  }
});
```

## 📞 Support

For issues with this setup:

1. Check the browser console for errors
2. Verify Supabase dashboard for data
3. Review RLS policies in Supabase
4. Check environment variables

## 🎯 Next Steps

After setup:

1. **Customize Admin Panel**: Add more management features
2. **Enhance Security**: Implement additional validation
3. **Add Analytics**: Track user behavior and conversions
4. **Optimize Performance**: Implement caching strategies
5. **Mobile Admin**: Create mobile-responsive admin interface

## 📋 Checklist

- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Database schema applied
- [ ] Seed data inserted
- [ ] Dependencies installed
- [ ] Admin login tested
- [ ] Data fetching verified
- [ ] Enquiry submission tested
- [ ] Admin panel accessible

Your Antechos platform is now powered by Supabase with a complete admin panel! 🎉