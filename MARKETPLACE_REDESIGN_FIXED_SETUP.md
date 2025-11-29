# 🔧 Marketplace Redesign - CORRECTED Setup Guide

## ⚠️ Important: Admin Access Fix

Your database uses `role` field (not `is_admin`) in the profiles table. Use the corrected commands below.

---

## 🚀 Quick Start (5 Minutes) - CORRECTED

### Step 1: Run Database Schema (2 minutes)

1. Open your Supabase Dashboard
2. Go to **SQL Editor**
3. Copy and paste the contents of `supabase/marketplace-redesign-schema.sql`
4. Click **Run**
5. Wait for "Success" message

✅ This creates 13 tables with seed data and sets up security policies.

---

### Step 2: Set Admin Access (1 minute) - CORRECTED ✅

**Option A: Set by Email (Recommended)**

In Supabase SQL Editor, run:

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-admin-email@example.com';
```

Replace `your-admin-email@example.com` with your actual admin email.

**Option B: Set by User ID**

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE id = 'your-user-uuid-here';
```

**Option C: Use the Fix Script**

Run the file: `supabase/fix-marketplace-admin-access.sql`

**Verify Admin Access:**

```sql
SELECT id, email, role, full_name 
FROM profiles 
WHERE role = 'admin';
```

You should see your user with `role = 'admin'`.

---

### Step 3: View the Public Page (30 seconds)

Navigate to: `http://localhost:5173/#/marketplace-redesign`

You should see the fully populated marketplace page with seed data!

---

### Step 4: Access Admin Panel (1 minute)

1. Navigate to: `http://localhost:5173/#/admin/dashboard`
2. Login with your admin credentials
3. Click **"Marketplace Redesign"** in the left sidebar
4. You'll see 13 tabs for managing different sections

---

### Step 5: Edit Content (30 seconds)

1. Click any tab (e.g., "Hero")
2. Edit the text fields
3. Click **Save**
4. Refresh the public page to see changes!

---

## 🔐 Understanding Your Admin System

Your database uses the `profiles` table with a `role` field:

```sql
CREATE TYPE user_role AS ENUM ('admin', 'instructor', 'student', 'workforce');

CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role user_role DEFAULT 'student',
    ...
);
```

**Admin Access Check:**
```sql
-- The RLS policies check:
EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
```

---

## 🐛 Troubleshooting

### Problem: "Column profiles.is_admin does not exist"
**Solution**: ✅ FIXED! The schema now uses `role = 'admin'` instead of `is_admin = true`

### Problem: Can't edit in admin panel
**Solution**: Run Step 2 to set `role = 'admin'` for your user

### Problem: Content not showing
**Solution**: Check if `is_active` is set to `true` in admin panel

### Problem: Images not loading
**Solution**: Use HTTPS URLs, test URL in browser first

### Problem: Changes not appearing
**Solution**: Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

---

## 📋 Complete Setup Checklist

- [ ] Run `marketplace-redesign-schema.sql` in Supabase
- [ ] Set admin role: `UPDATE profiles SET role = 'admin' WHERE email = '...'`
- [ ] Verify admin: `SELECT * FROM profiles WHERE role = 'admin'`
- [ ] Visit public page: `/#/marketplace-redesign`
- [ ] Login to admin: `/#/admin/dashboard`
- [ ] Click "Marketplace Redesign" in sidebar
- [ ] Test editing one section
- [ ] Refresh public page to see changes
- [ ] ✅ You're ready!

---

## 🎯 Quick Commands Reference

### Set Admin Role
```sql
-- By email (recommended)
UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';

-- By user ID
UPDATE profiles SET role = 'admin' WHERE id = 'your-uuid';

-- Verify
SELECT id, email, role FROM profiles WHERE role = 'admin';
```

### Check Current User
```sql
-- See all users and their roles
SELECT id, email, role, full_name, created_at 
FROM profiles 
ORDER BY created_at DESC;
```

### Reset a User to Student
```sql
UPDATE profiles SET role = 'student' WHERE email = 'user@example.com';
```

---

## 📚 Next Steps

1. ✅ Replace seed data with your real content
2. ✅ Upload your own images
3. ✅ Customize colors and styling
4. ✅ Test on mobile devices
5. ✅ Share the public URL!

---

## 🎉 All Fixed!

The marketplace redesign now works correctly with your existing database structure. The RLS policies use `role = 'admin'` instead of `is_admin = true`.

**Files Updated:**
- ✅ `supabase/marketplace-redesign-schema.sql` - Fixed RLS policies
- ✅ `supabase/fix-marketplace-admin-access.sql` - New helper script
- ✅ `MARKETPLACE_REDESIGN_FIXED_SETUP.md` - This corrected guide

**Ready to use!** 🚀
