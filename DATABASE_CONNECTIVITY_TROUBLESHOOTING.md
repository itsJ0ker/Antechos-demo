# 🔧 Database Connectivity Troubleshooting Guide

## 🚨 Quick Diagnosis

Visit this URL in your browser to run comprehensive connectivity tests:
```
http://localhost:5173/#/database-test
```

This will test:
- ✅ Environment variables
- ✅ Supabase client initialization
- ✅ Database connection
- ✅ Authentication system
- ✅ Table access
- ✅ User authentication tables

## 🔍 Common Issues & Solutions

### 1. **Environment Variables Missing**
**Symptoms:** "Supabase not configured" errors

**Check your `.env` file:**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Solutions:**
- Verify the URL and key are correct
- Restart your development server after changes
- Check for typos in variable names

### 2. **Connection Timeout/Network Issues**
**Symptoms:** Connection timeouts, network errors

**Solutions:**
- Check your internet connection
- Verify Supabase project is active
- Check if your IP is blocked by firewall
- Try accessing Supabase dashboard directly

### 3. **Authentication Errors**
**Symptoms:** Auth-related errors, session issues

**Solutions:**
- Check if authentication is enabled in Supabase
- Verify RLS policies are not blocking access
- Check if email confirmation is required

### 4. **Table Access Issues**
**Symptoms:** "relation does not exist", permission denied

**Solutions:**
- Run the schema files to create missing tables
- Check RLS policies
- Verify user permissions

### 5. **User Authentication Tables Missing**
**Symptoms:** "user_profiles does not exist"

**Solution:**
Run the user authentication schema:
```sql
-- In Supabase SQL Editor:
supabase/user-auth-schema-only.sql
```

## 🛠️ Step-by-Step Diagnosis

### Step 1: Check Environment
```bash
# In your terminal, check if variables are loaded:
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY
```

### Step 2: Verify Supabase Project
1. Go to https://supabase.com/dashboard
2. Check if your project is active
3. Verify the URL and keys match your .env

### Step 3: Test Database Connection
1. Go to your Supabase dashboard
2. Try running a simple query in SQL Editor:
```sql
SELECT NOW();
```

### Step 4: Check Browser Console
1. Open browser developer tools (F12)
2. Look for Supabase-related errors
3. Check network tab for failed requests

## 🔧 Manual Connection Test

Create a simple test in your browser console:
```javascript
// Test if Supabase is loaded
console.log('Supabase client:', window.supabase);

// Test environment variables
console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Key:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing');
```

## 📊 Database Schema Status

### Required Tables for User Authentication:
- `user_profiles` - User profile information
- `user_course_enrollments` - Course enrollment tracking
- `user_bookmarks` - User bookmarks
- `user_achievements` - User achievements
- `user_learning_paths` - Learning paths
- `user_notifications` - Notifications
- `user_sessions` - Session tracking

### Check if tables exist:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE 'user_%';
```

## 🚀 Quick Fixes

### Fix 1: Restart Development Server
```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### Fix 2: Clear Browser Cache
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Or clear browser cache completely

### Fix 3: Verify .env File Location
- Must be in project root (same level as package.json)
- Must start with `VITE_` for Vite to load them
- No spaces around the `=` sign

### Fix 4: Check Supabase Project Status
1. Login to Supabase dashboard
2. Check if project is paused (free tier limitation)
3. Check if you've exceeded usage limits

## 🆘 Emergency Fallback

If all else fails, the app has offline mode:
- Static data will be used instead of database
- Authentication will be disabled
- Core functionality will still work

## 📞 Getting Help

If issues persist:
1. Run the diagnostic test at `/database-test`
2. Check browser console for errors
3. Verify Supabase dashboard shows active project
4. Try creating a new Supabase project as a test

## ✅ Success Indicators

You'll know it's working when:
- ✅ No console errors about Supabase
- ✅ Login button appears in navbar
- ✅ Can access user dashboard
- ✅ Database queries return data
- ✅ Authentication flows work properly