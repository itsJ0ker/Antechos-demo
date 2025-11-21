# Marketplace Imarticus Setup Guide

## Overview
Complete Imarticus-style marketplace/homepage with full admin control. All sections are database-driven and editable.

## Features Included

### Frontend Sections:
1. **Hero Section** - Dark gradient with stats
2. **Stats Bar** - Key metrics display
3. **Programs Grid** - Course/program cards with pricing
4. **Features Section** - Why choose us
5. **Testimonials** - Student success stories
6. **Partners** - Company logos
7. **CTA Section** - Call to action

### Admin Features:
- Hero content editor
- Programs CRUD (Create, Read, Update, Delete)
- Stats management
- Features management
- Testimonials management
- Partners management
- All with inline editing

## Setup Steps

### 1. Run Database Schema

Execute in Supabase SQL Editor:
```sql
supabase/marketplace-imarticus-schema.sql
```

This creates:
- `marketplace_hero` - Hero section
- `marketplace_hero_stats` - Hero stats
- `marketplace_programs` - Programs/courses
- `marketplace_program_features` - Program features
- `marketplace_stats` - Stats bar
- `marketplace_features` - Features section
- `marketplace_testimonials` - Testimonials
- `marketplace_partners` - Partner logos
- `marketplace_faqs` - FAQs (future use)
- `marketplace_cta_sections` - CTA sections (future use)

### 2. Access the Pages

**Frontend:**
- Visit: `/#/marketplace-new`
- Public-facing Imarticus-style page

**Admin:**
1. Login: `/#/admin/login`
2. Go to admin dashboard
3. Click "Marketplace (New)" in sidebar

## Admin Usage

### Hero Section
1. Edit title, subtitle, description
2. Set CTA button text and links
3. Add hero image URL
4. Manage hero stats (value + label)
5. Click "Save Hero Section"

### Programs
1. Click "Add Program" to create new
2. Fill in:
   - Title
   - Short description
   - Category
   - Duration
   - Price & original price
   - Level (Beginner/Intermediate/Advanced)
3. Toggle visibility with eye icon
4. Edit or delete existing programs

### Stats Bar
1. Click "Add Stat" for new stat
2. Edit inline:
   - Value (e.g., "50,000+")
   - Label (e.g., "Students Trained")
   - Description (optional)
3. Delete with trash icon

### Features
1. Click "Add Feature"
2. Edit:
   - Icon (emoji)
   - Title
   - Description
3. Changes save automatically

### Testimonials
1. Click "Add Testimonial"
2. Fill in:
   - Name, role, company
   - Content (testimonial text)
   - Image URL
   - Rating (1-5 stars)
3. Edit inline, saves automatically

### Partners
1. Click "Add Partner"
2. Enter:
   - Company name
   - Logo URL
   - Website URL
3. Logo preview shows automatically

## Design Features

### Imarticus-Style Elements:
✅ Dark gradient hero (blue to purple)
✅ White clean sections
✅ Professional typography
✅ Hover effects and animations
✅ Responsive grid layouts
✅ Stats with large numbers
✅ Testimonial cards with quotes
✅ Partner logo grid
✅ Gradient CTA section

### Responsive Design:
- Mobile: Single column
- Tablet: 2 columns
- Desktop: 3-4 columns

## Sample Data

The schema includes sample data:
- 1 Hero section
- 4 Hero stats
- 4 Programs
- 4 Stats
- 4 Features
- 3 Testimonials

You can edit or delete these and add your own.

## Customization Tips

### Colors
- Hero background: Edit in database or code
- Default: Blue to purple gradient
- Matches Imarticus branding

### Images
- Use high-quality images
- Recommended sources:
  - Unsplash
  - Pexels
  - Your own branded images
- Ensure URLs are publicly accessible

### Content
- Keep titles concise
- Use compelling descriptions
- Highlight key benefits
- Include social proof (testimonials)

## Troubleshooting

### Page not loading?
1. Check if SQL schema ran successfully
2. Verify tables exist in Supabase
3. Check browser console for errors

### Admin not saving?
1. Ensure you're logged in
2. Check Supabase connection
3. Verify RLS policies are enabled

### Images not showing?
1. Verify image URLs are public
2. Check CORS settings
3. Use HTTPS URLs

## Files Created

```
supabase/
  └── marketplace-imarticus-schema.sql    # Database schema

src/
  ├── pages/
  │   └── MarketplaceImarticus.jsx        # Frontend page
  └── components/admin/
      └── MarketplaceImarticusManager.jsx # Admin manager
```

## Next Steps

1. ✅ Run SQL schema
2. ✅ Visit `/marketplace-new` to see page
3. ✅ Login to admin
4. ✅ Customize content
5. ✅ Add your own images
6. ✅ Update programs/courses
7. ✅ Add testimonials
8. ✅ Add partner logos

## Advanced Features (Future)

- FAQ section management
- Multiple CTA sections
- Program categories filter
- Search functionality
- Enrollment forms
- Payment integration

---

**Your Imarticus-style marketplace is ready!** 🎉

Visit `/#/marketplace-new` to see it live!
