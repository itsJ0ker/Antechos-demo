# 🚀 University Page - Quick Setup (2 Minutes)

## Step 1: Run the Schema

Open Supabase SQL Editor and run:

```sql
-- File: supabase/university-page-schema.sql
```

**Note**: The schema now includes `DROP TABLE IF EXISTS` so it will automatically clean up any existing tables.

## Step 2: Add Sample Data (Optional)

```sql
-- File: supabase/university-page-seed.sql
```

This adds sample data for hero, tabs, testimonials, and blogs.

## Step 3: View the Page

Visit: `http://localhost:5173/#/universities-new`

## Step 4: Edit from Admin

1. Login: `http://localhost:5173/#/admin/login`
2. Click: "University Page" in sidebar
3. Edit content and save

## ✅ What You'll See

### Automatically Populated (from existing data):
- **Featured Courses** - First 10 courses from `university_courses`
- **Universities to Explore** - First 8 universities from `universities`
- **Discover Courses** - All courses from `university_courses`, auto-categorized

### Editable from Admin:
- **Hero Section** - Background, title, CTA
- **Navigation Tabs** - Add/edit/reorder tabs
- **Section Titles** - Edit section headings
- **Testimonials** - Add student stories
- **CTA Section** - Customize call-to-action
- **Blogs** - Add blog posts

## 🔧 If You Get Errors

If you see "already exists" errors, run the cleanup script first:

```sql
-- File: supabase/university-page-cleanup.sql
```

Then run the schema again.

## 📊 Data Sources

- `universities` table → Universities to Explore
- `university_courses` table → Featured Courses & Discover Courses
- New tables → Hero, Tabs, Testimonials, Blogs

## 🎉 Done!

Your University page is now live and uses your existing data automatically!

**No data duplication. No manual syncing. Just works.** ✨
