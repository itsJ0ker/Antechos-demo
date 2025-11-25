# Marketplace Industry Professionals Feature

## Overview
Added "Meet Our Industry Professionals" section to the Marketplace page, displaying professional instructors/experts with their credentials, expertise, and LinkedIn profiles.

## Database Setup

### 1. Run the SQL Migration
Execute the SQL file to create the professionals table:

```bash
# In Supabase SQL Editor, run:
supabase/add-marketplace-professionals.sql
```

This creates:
- `marketplace_professionals` table with fields:
  - name, title, company
  - bio (description)
  - image_url, linkedin_url
  - expertise (array of skills)
  - years_experience
  - display_order, is_active

### 2. Sample Data
The migration includes 4 sample professionals:
- Dr. Rajesh Kumar (Data Scientist)
- Priya Sharma (Marketing Director)
- Amit Patel (VP of Engineering)
- Sneha Reddy (Financial Analytics Lead)

## Features

### Frontend Display (MarketplaceImarticus.jsx)
- **Card Layout**: 4-column grid (responsive)
- **Professional Image**: With fallback to initials
- **Experience Badge**: Shows years of experience
- **Company Info**: With building icon
- **Bio**: Truncated to 3 lines
- **Expertise Tags**: Shows up to 3 skills
- **LinkedIn Link**: Direct connection option
- **Animations**: Smooth fade-in on scroll

### Admin Panel (MarketplaceImarticusManager.jsx)
New "Professionals" tab with:
- Add new professionals
- Edit inline:
  - Name and job title
  - Company name
  - Bio/description
  - Image URL
  - LinkedIn URL
  - Years of experience
  - Expertise (comma-separated)
- Delete professionals
- Auto-save on field change

## Usage

### Adding a Professional
1. Go to Admin Dashboard → Marketplace Manager
2. Click "Professionals" tab
3. Click "Add Professional"
4. Fill in the details:
   - **Name**: Full name
   - **Title**: Job title (e.g., "Senior Data Scientist")
   - **Company**: Company name
   - **Bio**: Brief description (2-3 sentences)
   - **Image URL**: Professional photo URL
   - **LinkedIn URL**: Full LinkedIn profile URL
   - **Years Experience**: Number (e.g., 15)
   - **Expertise**: Comma-separated skills (e.g., "AI, Machine Learning, Python")

### Display Order
Professionals are displayed in `display_order` sequence. To reorder, update the `display_order` field in the database.

## Styling
- Cards have hover effects (border color change, shadow, image zoom)
- Responsive grid: 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)
- Blue accent color matching the site theme
- Professional badges and tags for visual hierarchy

## Integration
The section appears between:
- **Above**: Services section
- **Below**: Features section

## Notes
- All fields are editable inline in the admin panel
- Changes save automatically on blur
- Expertise is stored as PostgreSQL array
- LinkedIn links open in new tab
- Images should be square format (recommended: 400x400px minimum)
