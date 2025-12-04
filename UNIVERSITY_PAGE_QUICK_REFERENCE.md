# 🎓 University Page - Quick Reference Card

## 🚀 5-Minute Setup

```bash
# 1. Run schema in Supabase SQL Editor
supabase/university-page-schema.sql

# 2. (Optional) Add sample data
supabase/university-page-seed.sql

# 3. Start dev server
npm run dev

# 4. Visit page
http://localhost:5173/#/universities-new

# 5. Login to admin
http://localhost:5173/#/admin/login
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `supabase/university-page-schema.sql` | Database schema (13 tables) |
| `supabase/university-page-seed.sql` | Sample data |
| `src/pages/UniversityPage.jsx` | Public page component |
| `src/components/admin/UniversityPageManager.jsx` | Admin manager |

## 🎨 Page Sections

| Section | Admin Tab | Features |
|---------|-----------|----------|
| Hero | Hero Section | Background, title, CTA |
| Navigation | Navigation Tabs | Top menu items |
| Featured Courses | Featured Courses | Colored course cards |
| Universities | Universities to Explore | University cards with logos |
| Course Grid | Discover Courses | Categories and courses |
| Testimonials | Real Stories | Before/after stories |
| CTA | Talk to Expert | Call-to-action button |
| Blogs | Blogs | Blog post cards |

## 🗄️ Database Tables

```
university_hero                    - Hero section
university_hero_tabs               - Navigation tabs
university_featured_courses        - Featured courses
university_explore_section         - Explore settings
university_explore_cards           - University cards
university_discover_section        - Discover settings
university_course_categories       - Course categories
university_course_cards            - Course cards
university_stories_section         - Stories settings
university_testimonials            - Testimonials
university_expert_cta              - CTA section
university_blogs_section           - Blogs settings
university_blogs                   - Blog posts
```

## 🎯 Admin Panel Access

```
1. Login: /admin/login
2. Click: "University Page" in sidebar
3. Select tab: Hero, Tabs, Featured, etc.
4. Edit content
5. Click: "Save"
```

## 🖼️ Image Sizes

| Element | Recommended Size |
|---------|-----------------|
| Hero Background | 1920x1080px |
| University Logo | 150x60px |
| Course Image | 400x300px |
| Blog Image | 400x300px |
| Testimonial Photo | 200x200px |

## 🎨 Color Customization

All colors editable in admin panel:
- Hero overlay opacity (0-1)
- Featured course backgrounds
- Featured course text colors
- CTA section background
- CTA section text color

## 📱 Responsive Design

- **Mobile** (< 768px): Single column
- **Tablet** (768-1024px): 2 columns
- **Desktop** (> 1024px): Full layout

## ✨ Key Features

✅ 100% admin editable
✅ No code changes needed
✅ Drag & drop reordering
✅ Image upload support
✅ Color customization
✅ Responsive design
✅ SEO optimized
✅ Fast performance

## 🔧 Common Tasks

### Add New University
```
1. Admin → University Page → Universities to Explore
2. Click "Add University"
3. Fill in details (name, logo, image, stats)
4. Click "Save"
```

### Add Featured Course
```
1. Admin → University Page → Featured Courses
2. Click "Add Course"
3. Enter course details
4. Choose colors
5. Click "Save"
```

### Add Testimonial
```
1. Admin → University Page → Real Stories
2. Click "Add Testimonial"
3. Enter student details
4. Add before/after info
5. Write story
6. Click "Save"
```

### Add Blog Post
```
1. Admin → University Page → Blogs
2. Click "Add Blog"
3. Enter title, excerpt, image
4. Set author and metadata
5. Click "Save"
```

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Images not loading | Check HTTPS URLs, verify CORS |
| Admin not saving | Check Supabase auth, verify RLS |
| Layout broken | Clear cache, check Tailwind |
| Carousel not working | Check console, verify JavaScript |

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `UNIVERSITY_PAGE_README.md` | Main overview |
| `UNIVERSITY_PAGE_SETUP.md` | Quick setup guide |
| `UNIVERSITY_PAGE_COMPLETE_GUIDE.md` | Full documentation |
| `UNIVERSITY_PAGE_SECTIONS.md` | Section breakdown |
| `UNIVERSITY_PAGE_CHECKLIST.md` | Implementation checklist |
| `UNIVERSITY_PAGE_QUICK_REFERENCE.md` | This file |

## 🎯 URLs

| Page | URL |
|------|-----|
| Public Page | `/#/universities-new` |
| Admin Login | `/#/admin/login` |
| Admin Dashboard | `/#/admin/dashboard` |

## 📊 Success Metrics

- Page load < 3 seconds
- Mobile score > 90
- Zero console errors
- All images loading
- Admin response < 1 second

## 🎉 Quick Wins

1. **5 minutes**: Run schema, view page
2. **10 minutes**: Add sample data, test admin
3. **30 minutes**: Replace with real content
4. **1 hour**: Customize colors, upload images
5. **2 hours**: Full content population
6. **Deploy**: Push to production

## 💡 Pro Tips

- Use WebP images for better performance
- Compress images before uploading
- Keep titles under 60 characters
- Test on mobile devices
- Update content regularly
- Monitor analytics

## 🔗 Quick Links

- **Schema**: `supabase/university-page-schema.sql`
- **Seed**: `supabase/university-page-seed.sql`
- **Page**: `src/pages/UniversityPage.jsx`
- **Admin**: `src/components/admin/UniversityPageManager.jsx`

---

**Need help?** Check the full documentation files or review the schema file for database structure.

**Ready to go?** Run the schema and start editing! 🚀
