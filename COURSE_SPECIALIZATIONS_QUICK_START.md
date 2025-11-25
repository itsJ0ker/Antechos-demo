# Course Specializations - Quick Start Guide

## ⚡ Quick Setup (3 Steps)

### Step 1: Create Database Table
1. Open Supabase SQL Editor
2. Copy and paste the contents of: `supabase/course-specializations-table-only.sql`
3. Click "Run"
4. You should see: "Course specializations table created successfully!"

### Step 2: Add to Admin Dashboard
Add the Course Specializations Manager to your admin dashboard.

Find your admin dashboard file (e.g., `src/pages/admin/EnhancedAdminDashboard.jsx`) and add:

```jsx
import CourseSpecializationsManager from '../../components/admin/CourseSpecializationsManager';

// In your tabs/sections array, add:
{
  id: 'course-specializations',
  label: 'Course Specializations',
  icon: GraduationCap, // or any icon
  component: <CourseSpecializationsManager />
}
```

### Step 3: Add Your First Specialization
1. Go to Admin Dashboard
2. Click on "Course Specializations" tab
3. Select a University from dropdown
4. Select a Course from dropdown
5. Click "Add New Specialization"
6. Fill in the form:
   - **Name**: e.g., "MBA in Finance"
   - **Description**: Brief description
   - **Duration**: e.g., "2 Years"
   - **Fees**: e.g., "₹5,00,000"
   - **Eligibility**: e.g., "Bachelor's degree with 50% marks"
7. Click "Save Specialization"

## ✅ Testing

### Test Frontend:
1. Go to any university page
2. Find a course that has specializations
3. Click "View Program Details"
4. You should see the course detail page with all specializations

### Test Admin Panel:
1. Go to Admin Dashboard → Course Specializations
2. Select university and course
3. You should see the list of specializations
4. Try editing, deleting, or toggling active status

## 🎯 Example: Adding MBA Specializations

Let's say you have:
- University: "ABC Business School" (ID: 5)
- Course: "MBA" (ID: 12)

Add these specializations:

1. **MBA in Finance**
   - Description: "Specialization in Financial Management and Investment Banking"
   - Duration: "2 Years"
   - Fees: "₹5,00,000"
   - Eligibility: "Bachelor's degree with 50% marks"

2. **MBA in Marketing**
   - Description: "Specialization in Digital Marketing and Brand Management"
   - Duration: "2 Years"
   - Fees: "₹5,00,000"
   - Eligibility: "Bachelor's degree with 50% marks"

3. **MBA in HR**
   - Description: "Specialization in Human Resource Management"
   - Duration: "2 Years"
   - Fees: "₹5,00,000"
   - Eligibility: "Bachelor's degree with 50% marks"

## 🔧 Troubleshooting

### Error: "Foreign key constraint violation"
**Problem**: Trying to insert data with IDs that don't exist.

**Solution**: 
- Don't run the sample INSERT statements
- Use the Admin Panel to add specializations
- Make sure you have universities and courses in your database first

### Specializations not showing on frontend
**Check**:
1. Is the specialization marked as "Active"?
2. Is the parent course active?
3. Is the university active?
4. Check browser console for errors

### Can't see Course Specializations in Admin
**Check**:
1. Did you import the component?
2. Did you add it to the tabs/sections array?
3. Is the user authenticated?

## 📝 Routes

- **Course Detail Page**: `/university/:universityId/course/:courseId`
- **Admin Panel**: Your admin dashboard URL + Course Specializations tab

## 🎨 Customization

### Change Card Layout
Edit `src/pages/CourseDetail.jsx` - line ~150 (specializations grid)

### Change Admin Form Fields
Edit `src/components/admin/CourseSpecializationsManager.jsx` - line ~200 (form section)

### Add More Fields
1. Update database schema (add column)
2. Update admin form
3. Update frontend display

## 📚 Full Documentation
See `COURSE_SPECIALIZATIONS_SETUP.md` for complete details.
