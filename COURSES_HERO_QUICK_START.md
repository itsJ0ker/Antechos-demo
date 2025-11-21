# Courses Hero Section - Quick Start

## ✅ What's Been Created

Your courses page now has a **database-driven, admin-editable hero section** matching your design!

## 🚀 Quick Setup (3 Steps)

### 1. Run Database Schema
```sql
-- In Supabase SQL Editor, run:
supabase/courses-hero-schema.sql
```

### 2. Access Admin Panel
```
1. Go to: /admin/login
2. Login with your credentials
3. Click "Courses Hero" in sidebar
```

### 3. Customize Content
Edit these fields:
- Title (blue text)
- Subtitle (dark text)
- Description
- Button text & link
- Background color
- Images
- Features (checkmarks)
- Statistics (400+, 100%, 1:1)

Click **Save Changes** when done!

## 📋 What You Can Edit

### Main Content
| Field | Example | Description |
|-------|---------|-------------|
| Title | "Secure Payments" | Blue text, first line |
| Subtitle | "Made Simple" | Dark text, second line |
| Description | "Process transactions..." | Paragraph text |
| Button Text | "Get a Callback" | CTA button label |
| Button Link | "/contact" | Where button goes |
| Background Color | #93B5F1 | Hero background |
| Hero Image | URL | Person/product image |

### Features (Checkmarks)
- ✓ Instant processing
- ✓ No-Cost EMI
- ✓ No Hidden Fees

### Statistics
- **400+** Hiring Partners
- **100%** Placement Assistance
- **1:1** Mentorship

## 🎨 Design Features

✅ Matches your provided design exactly
✅ Responsive (mobile, tablet, desktop)
✅ Two-column layout (content + image)
✅ Stats bar with white card background
✅ Smooth animations
✅ Color customization
✅ Image support

## 📁 Files Created

```
supabase/
  └── courses-hero-schema.sql          # Database tables

src/
  ├── components/admin/
  │   └── CoursesHeroManager.jsx       # Admin editor
  └── pages/
      └── CoursesNew.jsx               # Updated to use DB data
```

## 🔍 Preview

The hero section appears at the top of `/courses` page with:
- Left side: Title, description, features, button
- Right side: Hero image
- Bottom: Statistics bar (white card)

## 💡 Pro Tips

1. **Images**: Use high-quality images from Unsplash or your brand assets
2. **Colors**: Match your brand colors using the color picker
3. **Features**: Keep to 3-5 items for best visual impact
4. **Stats**: Use compelling numbers with "+" or "%" symbols

## 🆘 Need Help?

Check `COURSES_HERO_SETUP.md` for detailed documentation.

---

**Ready to go!** Just run the SQL schema and start editing in the admin panel. 🎉
