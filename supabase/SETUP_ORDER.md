# Database Setup Order

## ⚠️ IMPORTANT: Run these files in the correct order!

### Step 1: Create the Schema First
Run this file to create all the tables and functions:
```sql
-- Run this FIRST
\i supabase/user-auth-schema.sql
```

### Step 2: Add Sample Data (Optional)
Only run this AFTER the schema is created:
```sql
-- Run this SECOND (optional for testing)
\i supabase/sample-user-data.sql
```

## Alternative: Combined Setup File
I'll create a single file that does both steps in the correct order.