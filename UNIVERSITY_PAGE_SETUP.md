# University Page - Quick Setup Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Run Database Schema
1. Open Supabase Dashboard
2. Go to SQL Editor
3. Copy and paste the content from `supabase/university-page-schema.sql`
4. Click "Run"
5. Wait for success message

### Step 2: Add Sample Data (Optional)
1. In SQL Editor
2. Copy and paste the content from `supabase/university-page-seed.sql`
3. Click "Run"
4. This adds sample data for testing

### Step 3: Access the Page
1. Start your development server: `npm run dev`
2. Visit: `http://localhost:5173/#/universities-new`
3. You should see the new University page with sample data

### Step 4: Access Admin Panel
1. Login to admin: `http://localhost:5173/#/admin/login`
2. Click "University Page" in the sidebar
3. Start editing content!

## 📋 What You Can Edit

### From Admin Panel:
- ✅ Hero Section (title, subtitle, background image, CTA)
- ✅ Navigation Tabs (add/edit/reorder tabs)
- ✅ Featured Courses (add courses with custom colors)
- ✅ Universities to Explore (add universities with logos)
- ✅ Discover Courses (create categories and add courses)
- ✅ Real Stories (add testimonials with before/after)
- ✅ Talk to Expert CTA (customize text and colors)
- ✅ Blogs (add blog posts with images)

## 🎨 Design Features

Based on your image, the page includes:

1. **Hero with Tabs** - Navigation at top (XX Courses, Alumni, Universities, Travel Excella)
2. **Featured Courses Carousel** - Colored cards with course codes (MBA, BCA, MSN, BBA)
3. **Universities Slider** - Horizontal scrollable cards (Amity, Manipal, Sharda, BVP)
4. **Course Grid** - Organized by categories (Online MBA/MCA, Online BBA/BCA)
5. **Testimonials** - Before/After transformation stories
6. **CTA Section** - "Talk to Expert" button
7. **Blogs Slider** - Latest blog posts

## 🔧 Customization Tips

### Images
- Hero background: 1920x1080px recommended
- University logos: 150x60px recommended
- Course images: 400x300px recommended
- Blog images: 400x300px recommended

### Colors
- Use the color picker in admin panel
- Featured courses support custom background colors
- CTA section has customizable background

### Content
- Keep titles under 60 characters
- Descriptions under 150 characters
- Use high-quality images
- Optimize images before uploading

## 📱 Responsive Design

The page is fully responsive:
- Mobile: Stacked layout, touch-friendly
- Tablet: 2-column grid
- Desktop: Full layout with carousels

## 🐛 Troubleshooting

### Page Not Loading?
- Check Supabase connection in `.env`
- Verify schema was run successfully
- Check browser console for errors

### Images Not Showing?
- Verify image URLs are valid
- Check CORS settings in Supabase
- Use HTTPS URLs for images

### Admin Panel Not Saving?
- Check Supabase authentication
- Verify RLS policies are set
- Check browser console for errors

## 📚 Next Steps

1. **Replace Sample Data** - Add your real universities and courses
2. **Upload Images** - Use your own images for hero, courses, etc.
3. **Customize Colors** - Match your brand colors
4. **Add Content** - Write compelling descriptions
5. **Test on Mobile** - Ensure responsive design works
6. **Go Live** - Deploy to production

## 🎯 Key Features

- ✅ 100% Admin Editable
- ✅ No Code Changes Needed
- ✅ Drag & Drop Reordering
- ✅ Image Upload Support
- ✅ Color Customization
- ✅ Responsive Design
- ✅ SEO Optimized
- ✅ Fast Performance

## 📞 Support

If you need help:
1. Check `UNIVERSITY_PAGE_COMPLETE_GUIDE.md` for detailed docs
2. Review the schema file for database structure
3. Check component files for customization options

## 🎉 You're Done!

Your University page is now fully editable from the admin panel. No more code changes needed - just login and edit!

Visit: `http://localhost:5173/#/universities-new`
Admin: `http://localhost:5173/#/admin/login`
