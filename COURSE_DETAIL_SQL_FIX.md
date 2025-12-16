# Course Detail Manager - SQL Setup Fix

## 🚨 Issue
Error: `column "duration" of relation "course_modules" does not exist`

## ✅ Solution
The original SQL file had complex INSERT statements that could fail. Use the simplified setup instead.

## 🛠️ Fixed Setup Process

### Step 1: Use Simple Setup
Instead of `course-details-schema.sql`, use:
```sql
-- Execute this file in Supabase SQL Editor:
supabase/course-details-simple-setup.sql
```

### Step 2: Add Sample Data (Optional)
After the schema is set up, optionally add sample data:
```sql
-- Execute this file in Supabase SQL Editor:
supabase/course-details-sample-data.sql
```

## 📋 What Each File Does

### `course-details-simple-setup.sql`
- ✅ Adds new columns to existing `courses` table
- ✅ Creates all supporting tables (modules, skills, tools, reviews, etc.)
- ✅ Sets up indexes for performance
- ✅ Configures Row Level Security (RLS)
- ✅ Creates necessary policies
- ✅ No sample data (safer approach)

### `course-details-sample-data.sql`
- ✅ Adds 3 sample courses with full details
- ✅ Creates sample modules, skills, tools for each course
- ✅ Adds sample reviews and enrollments
- ✅ Updates ratings and enrollment counts
- ✅ Safe to run multiple times (uses ON CONFLICT DO NOTHING)

## 🔧 Manual Verification

After running the setup, verify in Supabase:

1. **Check Tables Created**:
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name LIKE 'course_%';
   ```

2. **Check New Columns**:
   ```sql
   SELECT column_name FROM information_schema.columns 
   WHERE table_name = 'courses' 
   AND column_name IN ('instructor_name', 'course_objectives', 'rating');
   ```

3. **Check Sample Data** (if added):
   ```sql
   SELECT title, instructor_name, rating, total_enrollments 
   FROM courses 
   WHERE instructor_name IS NOT NULL;
   ```

## 🎯 Access the Feature

Once setup is complete:
1. Go to `http://localhost:5173/#/admin`
2. Login with admin credentials
3. Click **"Course Details"** in the sidebar
4. Start managing courses!

## 🚨 Troubleshooting

### If you still get errors:
1. **Check existing schema**: Your `courses` table might have conflicts
2. **Run step by step**: Copy and paste sections of the SQL file individually
3. **Check permissions**: Ensure you have admin access in Supabase
4. **Clear cache**: Refresh your browser after SQL changes

### Common Issues:
- **Table already exists**: The `IF NOT EXISTS` clauses handle this
- **Column already exists**: The `ADD COLUMN IF NOT EXISTS` handles this
- **Permission denied**: Check your Supabase project permissions
- **RLS conflicts**: The policies are created with proper conditions

## ✅ Success Indicators

You'll know it worked when:
- ✅ No SQL errors in Supabase
- ✅ "Course Details" appears in admin sidebar
- ✅ Course Detail Manager loads without errors
- ✅ You can create/edit courses with new fields
- ✅ Statistics show on the dashboard

The simplified setup approach is much more reliable and easier to debug!