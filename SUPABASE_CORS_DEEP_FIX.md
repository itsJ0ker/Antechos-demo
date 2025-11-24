# 🔧 Supabase CORS - Deep Fix Guide

## The Real Problem

Supabase is blocking your localhost requests. This happens even after setting Site URL because there are **multiple places** where CORS needs to be configured.

---

## ✅ Complete Fix - Step by Step

### Step 1: Verify Supabase Project Status

1. Go to: https://supabase.com/dashboard/project/nvmtymwbtjupqlptrslu
2. Check if project shows **"Active"** (not Paused)
3. If paused, click **"Restore"** or **"Resume"**

### Step 2: Configure Authentication URLs (You did this, but let's verify)

1. Go to **Authentication** → **URL Configuration**
2. **Site URL** should be EXACTLY:
   ```
   http://localhost:5173
   ```
   ⚠️ No trailing slash!
   ⚠️ Must be http (not https) for localhost

3. **Redirect URLs** - Add ALL of these:
   ```
   http://localhost:5173
   http://localhost:5173/**
   http://localhost:5173/admin/login
   http://localhost:5173/admin/dashboard
   http://127.0.0.1:5173
   http://127.0.0.1:5173/**
   ```

4. Click **Save**

### Step 3: Check Additional Redirect URLs

1. Still in **Authentication** → **URL Configuration**
2. Scroll down to **"Additional Redirect URLs"** section
3. Make sure localhost URLs are there
4. If not, add them again

### Step 4: Disable Email Confirmation (For Testing)

1. Go to **Authentication** → **Providers**
2. Click on **Email** provider
3. Find **"Confirm email"** toggle
4. **Turn it OFF** (for testing)
5. Click **Save**

This ensures you can login without email verification.

### Step 5: Check API Settings

1. Go to **Settings** → **API**
2. Find **"API URL"** - should be: `https://nvmtymwbtjupqlptrslu.supabase.co`
3. Find **"anon public"** key - copy it
4. Verify it matches your `.env` file

### Step 6: Create a Test User

You might not have any users yet! Let's create one:

1. Go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Enter:
   - Email: `admin@antechos.com`
   - Password: `Admin@123456` (or your choice)
   - Auto Confirm User: **YES** ✅
4. Click **"Create user"**

### Step 7: Update Environment Variables

Make sure your `.env` file is correct:

```env
VITE_SUPABASE_URL=https://nvmtymwbtjupqlptrslu.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52bXR5bXdidGp1cHFscHRyc2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwODUzMjUsImV4cCI6MjA3NzY2MTMyNX0.B3bVeBjtNN_yQrYwDmm8VA1Fw-UFuMbuI3d7tNyWYjY
```

### Step 8: Clear Everything and Restart

```bash
# Stop dev server (Ctrl+C)

# Clear browser cache
# Open DevTools (F12) → Application → Clear storage → Clear site data

# Or use incognito window

# Restart dev server
npm run dev
```

### Step 9: Test with Browser Console

Open browser console (F12) and run:

```javascript
// Test if Supabase is reachable
fetch('https://nvmtymwbtjupqlptrslu.supabase.co/rest/v1/', {
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52bXR5bXdidGp1cHFscHRyc2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwODUzMjUsImV4cCI6MjA3NzY2MTMyNX0.B3bVeBjtNN_yQrYwDmm8VA1Fw-UFuMbuI3d7tNyWYjY',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52bXR5bXdidGp1cHFscHRyc2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwODUzMjUsImV4cCI6MjA3NzY2MTMyNX0.B3bVeBjtNN_yQrYwDmm8VA1Fw-UFuMbuI3d7tNyWYjY'
  }
})
.then(r => r.json())
.then(d => console.log('✅ Supabase REST API works:', d))
.catch(e => console.error('❌ Supabase REST API error:', e));
```

If this works but auth doesn't, it's an auth-specific CORS issue.

---

## 🔍 Advanced Troubleshooting

### Check 1: Verify CORS Headers

In browser console, check the actual CORS error:

```javascript
// Try a direct auth request
fetch('https://nvmtymwbtjupqlptrslu.supabase.co/auth/v1/token?grant_type=password', {
  method: 'POST',
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52bXR5bXdidGp1cHFscHRyc2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwODUzMjUsImV4cCI6MjA3NzY2MTMyNX0.B3bVeBjtNN_yQrYwDmm8VA1Fw-UFuMbuI3d7tNyWYjY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'admin@antechos.com',
    password: 'Admin@123456'
  })
})
.then(r => r.json())
.then(d => console.log('Auth response:', d))
.catch(e => console.error('Auth error:', e));
```

### Check 2: Network Tab

1. Open DevTools (F12)
2. Go to **Network** tab
3. Try to login
4. Look for the failed request
5. Click on it
6. Check **Headers** tab
7. Look for **Response Headers** - should include:
   - `access-control-allow-origin: http://localhost:5173`
   - `access-control-allow-credentials: true`

If these headers are missing, Supabase hasn't applied your settings yet.

### Check 3: Wait Longer

Sometimes Supabase takes up to **10 minutes** to propagate CORS changes globally. 

- Save settings
- Wait 10 minutes
- Try again

### Check 4: Try Different Port

Maybe port 5173 is blocked. Try:

```bash
# Stop current server
# Edit vite.config.js to use port 3000
npm run dev -- --port 3000
```

Then update Supabase Site URL to: `http://localhost:3000`

---

## 🚨 If Still Not Working - Contact Supabase

This might be a Supabase-side issue. Contact them:

1. **Supabase Discord**: https://discord.supabase.com
2. **Support Email**: support@supabase.com
3. **GitHub Issues**: https://github.com/supabase/supabase/issues

Provide them:
- Project ID: `nvmtymwbtjupqlptrslu`
- Error: "CORS policy blocking auth requests from localhost:5173"
- What you've tried: "Configured Site URL and Redirect URLs"

---

## 🔄 Alternative: Use Supabase Local Development

If Supabase cloud keeps blocking you, use local Supabase:

```bash
# Install Supabase CLI
npm install -g supabase

# Initialize local Supabase
supabase init

# Start local Supabase
supabase start
```

This gives you a local Supabase instance with no CORS issues.

---

## 📝 Checklist

Before contacting support, verify:

- [ ] Project is Active (not Paused)
- [ ] Site URL is `http://localhost:5173` (no trailing slash)
- [ ] Redirect URLs include localhost variants
- [ ] Email confirmation is disabled
- [ ] Test user exists with confirmed email
- [ ] Environment variables are correct
- [ ] Browser cache is cleared
- [ ] Tried incognito window
- [ ] Waited 10+ minutes after saving settings
- [ ] REST API works (tested in console)
- [ ] Network tab shows CORS headers missing

---

## 💡 Why This Happens

Supabase has **very strict CORS policies** because:
1. Security - prevents unauthorized access
2. They want you to use their client libraries
3. Auth endpoints are extra protected
4. Settings take time to propagate globally

This is a known issue with Supabase and localhost development.

---

**Next Steps**: Follow this guide step by step. If it still doesn't work after 10 minutes, contact Supabase support - it might be a platform issue.
