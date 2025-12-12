# Foundation Curriculum Migration Guide

## Overview
This migration adds support for foundation curriculum (Semester 1 & 2) at the course level, which will be shared across all specializations.

## Database Changes Required

### 1. Run the Migration SQL
Execute the following SQL file in your Supabase SQL editor:

```bash
supabase/add-foundation-curriculum-column.sql
```

This will:
- Add `foundation_curriculum` JSONB column to `university_courses` table
- Set default foundation curriculum structure for existing courses
- Add appropriate comments for documentation

### 2. Verify Migration
After running the SQL, verify the changes:

```sql
-- Check if column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'university_courses' 
AND column_name = 'foundation_curriculum';

-- Check sample data
SELECT id, course_name, foundation_curriculum 
FROM university_courses 
LIMIT 3;
```

### 3. Enable Foundation Curriculum in Code
After successful migration, uncomment the foundation_curriculum line in the code:

**File:** `src/components/admin/UnifiedUniversitySpecializationsManager.jsx`
**Line:** Around line 2940 in the `courseData` object

Change from:
```javascript
// foundation_curriculum: formData.foundation_curriculum || [] // TODO: Add after running migration
```

To:
```javascript
foundation_curriculum: formData.foundation_curriculum || []
```

## Data Structure

The `foundation_curriculum` column stores a JSON array with this structure:

```json
[
  {
    "semester": "SEM 1",
    "description": "Foundation Semester 1", 
    "subjects": ["Subject 1", "Subject 2", "..."]
  },
  {
    "semester": "SEM 2",
    "description": "Foundation Semester 2",
    "subjects": ["Subject 1", "Subject 2", "..."]
  }
]
```

## Benefits After Migration

1. **Eliminates Duplication**: Foundation semesters defined once per course
2. **Logical Structure**: Specializations only manage Semester 3+ content
3. **Easier Management**: Update foundation curriculum once for all specializations
4. **Better Organization**: Clear separation between common and specialized content

## Testing After Migration

1. Create a new course with foundation curriculum
2. Add specializations to the course
3. Verify specialization curriculum starts from Semester 3
4. Edit existing courses to add foundation curriculum
5. Confirm data persistence across page refreshes

## Rollback (if needed)

If you need to rollback the migration:

```sql
-- Remove the column (WARNING: This will delete all foundation curriculum data)
ALTER TABLE university_courses DROP COLUMN foundation_curriculum;
```

## Support

If you encounter issues:
1. Check Supabase logs for detailed error messages
2. Verify your database permissions
3. Ensure the migration SQL ran completely without errors
4. Check that the column appears in the table schema