# Course Specializations Feature

## Overview
This feature allows universities to have main courses (like MBA, B.Tech) with multiple specializations (like MBA in Finance, MBA in Marketing, etc.). Users can click on a course to see all available specializations.

## Database Setup

### 1. Run the SQL Migration
Execute the SQL file in Supabase SQL Editor:

**Option A: Table Only (Recommended)**
```sql
-- Run this file: supabase/course-specializations-table-only.sql
```

**Option B: With Sample Data**
```sql
-- Run this file: supabase/course-specializations-schema.sql
-- Note: Sample data is commented out - you need to update IDs first
```

This creates:
- `course_specializations` table
- Proper indexes for performance
- Row Level Security policies

### 2. Important Notes
- **Do NOT use sample data** with placeholder IDs (1, 1)
- Add specializations through the Admin Panel after:
  1. Creating the table structure
  2. Having actual universities in your database
  3. Having actual courses in your database

### Table Structure
```sql
course_specializations (
  id,
  university_id,          -- Links to universities table
  parent_course_id,       -- Links to university_courses table
  name,                   -- e.g., "MBA in Finance"
  description,
  duration,
  fees,
  eligibility,
  curriculum,
  career_prospects,
  image_url,
  is_active,
  display_order,
  created_at,
  updated_at
)
```

## Frontend Components

### 1. Course Detail Page (`src/pages/CourseDetail.jsx`)
- **Route**: `/university/:universityId/course/:courseId`
- **Features**:
  - Displays course overview
  - Shows all specializations in a grid
  - Each specialization card shows:
    - Name, description
    - Duration and fees
    - Eligibility criteria
    - Apply Now button
  - Back navigation to university page

### 2. Updated University Details
- Course cards now link to the detail page
- "View Program Details" button navigates to `/university/:universityId/course/:courseId`

## Admin Panel

### Course Specializations Manager (`src/components/admin/CourseSpecializationsManager.jsx`)

**Features**:
1. **University & Course Selection**
   - Dropdown to select university
   - Dropdown to select course (filtered by university)

2. **Add/Edit Specializations**
   - Form with fields:
     - Name (required)
     - Description
     - Duration
     - Fees
     - Eligibility
     - Image URL
     - Display Order
     - Active/Inactive toggle

3. **Manage Specializations**
   - List all specializations for selected course
   - Edit existing specializations
   - Delete specializations
   - Toggle active/inactive status

### Adding to Admin Dashboard

Add the component to your admin dashboard:

```jsx
import CourseSpecializationsManager from '../components/admin/CourseSpecializationsManager';

// In your admin dashboard tabs/sections:
{
  id: 'specializations',
  label: 'Course Specializations',
  component: <CourseSpecializationsManager />
}
```

## Usage Flow

### For End Users:
1. Visit university details page
2. Browse available courses
3. Click "View Program Details" on any course
4. See all specializations for that course
5. Click "Apply Now" on desired specialization

### For Admins:
1. Go to Admin Dashboard
2. Navigate to "Course Specializations" section
3. Select a university from dropdown
4. Select a course from dropdown
5. Click "Add New Specialization"
6. Fill in the form and save
7. Manage existing specializations (edit/delete/toggle status)

## API Endpoints (Supabase)

All operations use Supabase client:

### Fetch Specializations
```javascript
const { data } = await supabase
  .from('course_specializations')
  .select('*')
  .eq('parent_course_id', courseId)
  .eq('is_active', true)
  .order('display_order');
```

### Create Specialization
```javascript
await supabase
  .from('course_specializations')
  .insert([specializationData]);
```

### Update Specialization
```javascript
await supabase
  .from('course_specializations')
  .update(specializationData)
  .eq('id', specId);
```

### Delete Specialization
```javascript
await supabase
  .from('course_specializations')
  .delete()
  .eq('id', specId);
```

## Example Data

### MBA Course with Specializations:
- **Main Course**: MBA (Master of Business Administration)
- **Specializations**:
  1. MBA in Finance
  2. MBA in Marketing
  3. MBA in Human Resources
  4. MBA in Operations
  5. MBA in Business Analytics

### B.Tech Course with Specializations:
- **Main Course**: B.Tech (Bachelor of Technology)
- **Specializations**:
  1. B.Tech in Computer Science
  2. B.Tech in Mechanical Engineering
  3. B.Tech in Electrical Engineering
  4. B.Tech in Civil Engineering

## Styling

The feature uses a formal, corporate design matching the university details page:
- Clean white backgrounds
- Gray borders
- Professional typography
- Minimal shadows
- Traditional academic look

## Future Enhancements

Potential additions:
1. Detailed curriculum for each specialization
2. Faculty information
3. Career prospects and placement data
4. Student testimonials per specialization
5. Comparison tool between specializations
6. Application form integration
7. Brochure download
8. Video introductions
9. Virtual tour links
10. Alumni network information

## Notes

- Ensure university_id and parent_course_id exist before adding specializations
- Sample data in SQL file uses ID 1 - update with your actual IDs
- Images are optional but recommended for better UX
- Display order determines the sequence of specializations
- Inactive specializations won't show on frontend but remain in database
