# 🔧 Step-by-Step Debug Guide

Since you've already created the auth user but still see `User: None`, let's debug this systematically.

## 🚀 Step 1: Use the Debug Tools

1. **Go to** `/admin/login` page
2. **Click "🔍 Full Debug Test"** button
3. **Check browser console** for detailed output
4. **Look for these key items:**
   - Environment variables are set
   - Supabase connection works
   - Admin profile exists
   - Current session status
   - Auth user status
   - ID matching between auth user and profile

## 🔍 Step 2: Check What the Debug Shows

**Expected Results:**
```
1. Environment: ✅ All variables set
2. Supabase connection: ✅ Working
3. Admin profile: ✅ Found with role 'admin'
4. Current session: ❌ Probably null/empty
5. Current user: ❌ Probably null/empty
6. ID Match: ❌ Can't match if no auth user
```

## 🎯 Step 3: Try Quick Login Test

1. **Click "🚀 Quick Login Test"** button
2. **This will attempt to login with:**
   - Email: `admin@antechos.com`
   - Password: `admin123456`
3. **Check console output**

**If Quick Login Fails:**
- Wrong password → Reset password in Supabase Dashboard
- User doesn't exist → Create auth user again
- Other error → Check console for details

## 🧹 Step 4: Clear Cache (If Needed)

1. **Click "🧹 Clear Cache & Reload"** button
2. **This clears all browser storage and reloads**
3. **Try the debug tests again**

## 🔧 Step 5: Manual Verification

### Check Auth User Exists:
1. **Supabase Dashboard** → Authentication → Users
2. **Look for** `admin@antechos.com`
3. **Note the User ID** (UUID)

### Check Profile Matches:
1. **Supabase Dashboard** → Table Editor → profiles
2. **Find row with** `email = 'admin@antechos.com'`
3. **Check if `id` matches** the auth user ID from above

### If IDs Don't Match:
```sql
-- Update profile to match auth user ID
UPDATE public.profiles 
SET id = 'AUTH_USER_ID_HERE'::uuid,
    updated_at = NOW()
WHERE email = 'admin@antechos.com';
```

## 🎯 Step 6: Test Login Flow

1. **Enter credentials** in login form:
   - Email: `admin@antechos.com`
   - Password: `your_actual_password`
2. **Click "Sign In to Dashboard"**
3. **Watch browser console** for detailed logs
4. **Check debug component** after login attempt

## 🔍 Step 7: Common Issues & Fixes

### Issue: Environment Variables Not Loading
**Fix:**
```bash
# Check .env file exists in project root
# Restart dev server after adding .env
npm run dev
```

### Issue: Auth User Password Wrong
**Fix:**
1. Supabase Dashboard → Authentication → Users
2. Find admin user → Click "..." → Reset Password
3. Set new password and try again

### Issue: Profile ID Mismatch
**Fix:**
```sql
-- Get auth user ID first
SELECT id, email FROM auth.users WHERE email = 'admin@antechos.com';

-- Update profile with correct ID
UPDATE public.profiles 
SET id = 'CORRECT_AUTH_USER_ID'::uuid
WHERE email = 'admin@antechos.com';
```

### Issue: RLS Policies Blocking Access
**Fix:**
```sql
-- Check if policies exist
SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- Temporarily disable RLS for testing
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Test login, then re-enable
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
```

## 📋 Checklist

After following the steps above, verify:

- [ ] Environment variables are set correctly
- [ ] Supabase connection works
- [ ] Auth user exists with correct email
- [ ] Profile exists with role='admin'
- [ ] Auth user ID matches profile ID
- [ ] Quick login test succeeds
- [ ] Debug component shows user info
- [ ] Login redirects to dashboard

## 🆘 If Still Not Working

**Collect this information:**

1. **Full Debug Test output** (from browser console)
2. **Quick Login Test result** (from browser console)
3. **Auth user details** (from Supabase Dashboard)
4. **Profile details** (from Supabase Dashboard)
5. **Environment variables** (without sensitive values)

**Then try:**

1. **Create completely new auth user** with different email
2. **Test with that new user**
3. **If new user works**, the issue is with the original user setup

## 🎯 Most Likely Solution

Based on the symptoms, the most likely issue is:

1. **Auth user exists** ✅
2. **Profile exists** ✅  
3. **But IDs don't match** ❌

**Quick Fix:**
1. Get auth user ID from Supabase Dashboard
2. Update profile ID to match
3. Test login again

Try the debug tools first, then follow the steps based on what you find!