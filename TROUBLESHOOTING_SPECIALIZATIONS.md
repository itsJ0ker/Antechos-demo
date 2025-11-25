# Troubleshooting Course Specializations

## Issue: Specializations not showing on page

### Step 1: Check if table exists
Run this in Supabase SQL Editor:
```sql
SELECT * FROM course_specializations LIMIT 5;
```

**Expected**: Should return rows or empty result (not an error)
**If error**: Run `supabase/course-specializations-table-only.sql` first

### Step 2: Check if data exists
Run this in Supabase SQL Editor:
```sql
SELECT 
  cs.*,
  uc.course_name,
  u.name as university_name
FROM course_specializations cs
LEFT JOIN university_courses uc ON cs.parent_course_id = uc.id
LEFT JOIN universities u ON cs.university_id = u.id;
```

**Expected**: Should show your specializations with course and university names
**If empty**: Add specializations through Admin Panel

### Step 3: Check browser console
1. Open the course detail page
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Look for these logs:
   - "Fetching course details for:"
   - "Course data:"
   - "Specializations data:"

**What to check**:
- Is `courseId` correct?
- Is `universityId` correct?
- Does "Specializations data" show an array?
- Are there any errors in red?

### Step 4: Verify IDs match
Run this to see your courses and their IDs:
```sql
SELECT 
  uc.id as course_id,
  uc.course_name,
  uc.university_id,
  u.name as university_name,
  COUNT(cs.id) as specialization_count
FROM university_courses uc
LEFT JOIN universities u ON uc.university_id = u.id
LEFT JOIN course_specializations cs ON cs.parent_course_id = uc.id
GROUP BY uc.id, uc.course_name, uc.university_id, u.name
ORDER BY u.name, uc.course_name;
```

**Check**:
- Do the IDs match what you see in the URL?
- Does the course have specializations (count > 0)?

### Step 5: Check RLS Policies
Run this to verify policies:
```sql
SELECT * FROM course_specializations WHERE is_active = true;
```

**If empty but data exists**:
```sql
-- Temporarily disable RLS to test
ALTER TABLE course_specializations DISABLE ROW LEVEL SECURITY;

-- Try fetching again, then re-enable:
ALTER TABLE course_specializations ENABLE ROW LEVEL SECURITY;
```

### Step 6: Verify Admin Panel saves correctly
1. Go to Admin Panel → Course Specializations
2. Select a university and course
3. Add a test specialization with ALL fields filled:
   - Name: "Test Specialization"
   - Description: "Test description"
   - Duration: "2 Years"
   - Fees: "₹1,00,000"
   - Eligibility: "Test eligibility"
4. Click Save
5. Check if it appears in the list below

**If it doesn't appear**:
- Check browser console for errors
- Check Network tab for failed requests

### Step 7: Test the route
1. Find a course ID from your database
2. Find its university ID
3. Manually navigate to: `/university/[universityId]/course/[courseId]`
4. Example: `/university/1/course/5`

**Expected**: Should show course detail page
**If 404**: Check if route is added in App.jsx

## Common Issues & Solutions

### Issue: "Table doesn't exist"
**Solution**: Run `supabase/course-specializations-table-only.sql`

### Issue: "Foreign key constraint violation"
**Solution**: 
- Don't use sample data with ID 1
- Use Admin Panel to add specializations
- Make sure university and course exist first

### Issue: Specializations show in admin but not on page
**Check**:
1. Is `is_active` set to true?
2. Are RLS policies correct?
3. Is the course ID correct in the URL?

### Issue: Can't save in Admin Panel
**Check**:
1. Are you logged in?
2. Is university selected?
3. Is course selected?
4. Is name field filled?
5. Check browser console for errors

### Issue: Page shows "No specializations available"
**Possible causes**:
1. No data in database
2. Wrong course ID in URL
3. All specializations are inactive
4. RLS policy blocking access

## Debug Queries

### See all specializations with details:
```sql
SELECT 
  cs.id,
  cs.name,
  cs.description,
  cs.duration,
  cs.fees,
  cs.is_active,
  uc.course_name,
  u.name as university_name
FROM course_specializations cs
JOIN university_courses uc ON cs.parent_course_id = uc.id
JOIN universities u ON cs.university_id = u.id
ORDER BY u.name, uc.course_name, cs.display_order;
```

### Count specializations per course:
```sql
SELECT 
  uc.id,
  uc.course_name,
  COUNT(cs.id) as spec_count
FROM university_courses uc
LEFT JOIN course_specializations cs ON cs.parent_course_id = uc.id AND cs.is_active = true
GROUP BY uc.id, uc.course_name
HAVING COUNT(cs.id) > 0;
```

### Find courses without specializations:
```sql
SELECT 
  uc.id,
  uc.course_name,
  u.name as university_name
FROM university_courses uc
JOIN universities u ON uc.university_id = u.id
LEFT JOIN course_specializations cs ON cs.parent_course_id = uc.id
WHERE cs.id IS NULL;
```

## Still Having Issues?

1. **Check all console logs** - Look for errors in browser console
2. **Verify database structure** - Make sure table exists and has correct columns
3. **Test with simple data** - Add one specialization manually via SQL
4. **Check authentication** - Make sure you're logged in for admin operations
5. **Clear cache** - Try hard refresh (Ctrl+Shift+R)

## Quick Test

Run this complete test:
```sql
-- 1. Check table exists
SELECT COUNT(*) as table_exists FROM information_schema.tables 
WHERE table_name = 'course_specializations';

-- 2. Check data exists
SELECT COUNT(*) as total_specializations FROM course_specializations;

-- 3. Check active specializations
SELECT COUNT(*) as active_specializations FROM course_specializations WHERE is_active = true;

-- 4. Check with course details
SELECT 
  cs.id,
  cs.name,
  cs.parent_course_id,
  uc.course_name
FROM course_specializations cs
LEFT JOIN university_courses uc ON cs.parent_course_id = uc.id
LIMIT 5;
```

Expected results:
- table_exists: 1
- total_specializations: > 0
- active_specializations: > 0
- Last query: Shows your specializations with course names
