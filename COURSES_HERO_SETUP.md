# Courses Hero Section Setup Guide

## Overview
The courses page now has a fully editable hero section that matches your design requirements. The hero section includes:
- Title and subtitle
- Description text
- Feature list with checkmarks
- CTA button
- Statistics bar (400+, 100%, 1:1)
- Background color/image customization
- Hero image (person/product)

## Database Setup

### Step 1: Run the SQL Schema
Execute the SQL file in your Supabase SQL Editor:

```bash
supabase/courses-hero-schema.sql
```

This will create three tables:
- `courses_hero` - Main hero content
- `courses_hero_features` - Feature list items
- `courses_hero_stats` - Statistics (400+, 100%, 1:1)

### Step 2: Verify Tables
Check that the tables were created successfully in Supabase:
1. Go to Supabase Dashboard
2. Navigate to Table Editor
3. Verify these tables exist:
   - courses_hero
   - courses_hero_features
   - courses_hero_stats

## Admin Panel Access

### Step 1: Login to Admin
1. Navigate to `/admin/login`
2. Login with your admin credentials

### Step 2: Access Courses Hero Manager
1. In the admin dashboard sidebar, click on "Courses Hero"
2. You'll see the Courses Hero Manager interface

## Editing the Hero Section

### Main Content
- **Title (Blue Text)**: The first line in blue (e.g., "Secure Payments")
- **Subtitle (Dark Text)**: The second line in dark text (e.g., "Made Simple")
- **Description**: The paragraph below the title
- **Button Text**: CTA button text (e.g., "Get a Callback")
- **Button Link**: Where the button should navigate (e.g., "/contact")
- **Background Color**: Use color picker or enter hex code (e.g., #93B5F1)
- **Hero Image URL**: Image of person/product on the right side
- **Background Image URL**: Optional background pattern/image

### Features (Checkmarks)
Click "Add Feature" to add new features:
- **Icon**: Emoji or symbol (default: ✓)
- **Feature Text**: The feature description
- Use up/down arrows to reorder
- Use trash icon to delete

### Statistics
Click "Add Stat" to add statistics:
- **Value**: The number/percentage (e.g., "400+", "100%", "1:1")
- **Label**: Description (e.g., "Hiring Partners", "Placement Assistance")
- Use up/down arrows to reorder
- Use trash icon to delete

### Preview
The preview section shows how your hero will look on the live site.

### Save Changes
Click "Save Changes" button at the top to publish your edits.

## Frontend Display

The courses page (`/courses`) will automatically fetch and display the hero section from the database.

### Features:
- Responsive design (mobile, tablet, desktop)
- Smooth animations
- Dynamic background colors
- Image support
- Stats bar with white background card

## Default Content

The schema includes sample data based on your design:
- Title: "Secure Payments"
- Subtitle: "Made Simple"
- Description: "Process transactions with confidence..."
- Features: Instant processing, No-Cost EMI, No Hidden Fees
- Stats: 400+ Hiring Partners, 100% Placement Assistance, 1:1 Mentorship

## Customization Tips

### Colors
- Use the color picker for easy selection
- Or enter hex codes directly (e.g., #93B5F1)
- Consider brand colors for consistency

### Images
- **Hero Image**: Use high-quality images (recommended: 500x500px or larger)
- **Background Image**: Use subtle patterns or gradients
- Recommended image sources:
  - Unsplash: https://unsplash.com
  - Pexels: https://pexels.com
  - Your own branded images

### Features
- Keep feature text concise (1-3 words)
- Use relevant icons/emojis
- Limit to 3-5 features for best visual impact

### Statistics
- Use compelling numbers
- Add "+" or "%" for impact
- Keep labels short and clear

## Troubleshooting

### Hero not showing?
1. Check if data exists in `courses_hero` table
2. Verify `is_active` is set to `true`
3. Check browser console for errors

### Images not loading?
1. Verify image URLs are publicly accessible
2. Check CORS settings if using external images
3. Use HTTPS URLs for security

### Changes not appearing?
1. Clear browser cache
2. Check if you clicked "Save Changes"
3. Verify Supabase connection in `.env` file

## Files Modified/Created

### New Files:
- `supabase/courses-hero-schema.sql` - Database schema
- `src/components/admin/CoursesHeroManager.jsx` - Admin component
- `COURSES_HERO_SETUP.md` - This guide

### Modified Files:
- `src/pages/CoursesNew.jsx` - Updated to fetch and display hero data
- `src/pages/admin/EnhancedAdminDashboard.jsx` - Added Courses Hero menu item

## Next Steps

1. Run the SQL schema in Supabase
2. Login to admin panel
3. Navigate to "Courses Hero"
4. Customize the content to match your brand
5. Add your own images
6. Save and preview on the courses page

## Support

If you encounter any issues:
1. Check Supabase connection
2. Verify RLS policies are enabled
3. Check browser console for errors
4. Ensure you're logged in as admin

Enjoy your new editable courses hero section! 🎉
