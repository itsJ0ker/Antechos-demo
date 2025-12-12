# Foundation Curriculum Troubleshooting Guide

## Issue: Semester 1 & 2 subjects are not saving

### Quick Fixes Applied:

1. **✅ Enabled foundation_curriculum field** in the save function
2. **✅ Added debugging logs** to track data flow
3. **✅ Enhanced error handling** to catch specific database issues

### Debugging Steps:

#### 1. Check Browser Console
Open browser developer tools (F12) and look for:
- `Foundation Curriculum Data:` - Shows the data being prepared for save
- `Complete Course Data being saved:` - Shows the full object being sent to database
- `Updated/Inserted course data:` - Shows the response from database
- Any error messages

#### 2. Verify Database Column Exists
Run this SQL in Supabase SQL Editor:
```sql
-- Check if foundation_curriculum column exists
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'university_courses' 
AND column_name = 'foundation_curriculum';
```

**Expected Result:** Should return one row showing the column exists as JSONB type.

#### 3. Test Database Permissions
Run the test file: `supabase/test-foundation-curriculum-save.sql`

#### 4. Check Form Data Structure
In browser console, when adding subjects, you should see the foundation_curriculum array updating with this structure:
```javascript
[
  {
    semester: "SEM 1",
    description: "Foundation Semester 1",
    subjects: ["Subject 1", "Subject 2", ...]
  },
  {
    semester: "SEM 2", 
    description: "Foundation Semester 2",
    subjects: ["Subject 3", "Subject 4", ...]
  }
]
```

### Common Issues & Solutions:

#### Issue 1: Column doesn't exist
**Solution:** Run the migration:
```sql
-- Execute: supabase/add-foundation-curriculum-column.sql
```

#### Issue 2: Permission denied
**Solution:** Check RLS policies on university_courses table:
```sql
-- Check existing policies
SELECT * FROM pg_policies WHERE tablename = 'university_courses';

-- If needed, add policy for foundation_curriculum
-- (This should already be covered by existing policies)
```

#### Issue 3: Data not persisting after save
**Symptoms:** 
- Save appears successful
- Data disappears after page refresh
- No error messages

**Solution:** Check if the data is actually being saved:
```sql
-- Check if data was saved
SELECT id, course_name, foundation_curriculum 
FROM university_courses 
WHERE foundation_curriculum IS NOT NULL 
AND foundation_curriculum != '[]'::jsonb;
```

#### Issue 4: Form not updating state
**Symptoms:**
- Adding subjects doesn't show in UI
- Console shows empty subjects array

**Solution:** Check if the form functions are working:
1. Click "Add Subject" button
2. Check browser console for state updates
3. Verify the `addSubjectToFoundationSemester` function is being called

### Testing Checklist:

- [ ] Database column exists (run check query)
- [ ] Can add subjects to Semester 1 in UI
- [ ] Can add subjects to Semester 2 in UI  
- [ ] Console shows foundation_curriculum data when saving
- [ ] No error messages in console
- [ ] Data persists after page refresh
- [ ] Can edit existing courses and see foundation curriculum

### If Still Not Working:

1. **Check Network Tab** in browser dev tools for the actual API request
2. **Verify Supabase URL and Key** in environment variables
3. **Check Supabase Dashboard** for any error logs
4. **Try manual database insert** using the test SQL file

### Contact Information:
If issues persist, provide:
1. Browser console logs
2. Network request details
3. Database column check results
4. Supabase error logs (if any)