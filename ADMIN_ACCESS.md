# 🔐 Admin Dashboard Access Guide

## Current Issue: CORS Error

You're experiencing a CORS error when trying to login. This is because Supabase needs to be configured to allow requests from `localhost:5173`.

---

## 🚀 Quick Solution: Use Mock Login (Immediate Access)

### Access the Mock Login Page

**URL**: `http://localhost:5173/#/admin/mock-login`

### Steps:
1. Open your browser
2. Go to: `http://localhost:5173/#/admin/mock-login`
3. Enter **any email** (e.g., `admin@test.com`)
4. Enter **any password** (e.g., `password123`)
5. Click **Sign In**
6. You'll be redirected to the admin dashboard

### Features:
- ✅ No CORS issues
- ✅ No Supabase required
- ✅ Instant access
- ✅ Full dashboard functionality
- ⚠️ Mock authentication (not secure for production)

---

## 🔧 Permanent Solution: Fix Supabase CORS

### Step 1: Configure Supabase

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to **Authentication** → **URL Configuration**
4. Set **Site URL** to: `http://localhost:5173`
5. Add to **Redirect URLs**:
   ```
   http://localhost:5173/**
   http://localhost:5173
   ```
6. Click **Save**

### Step 2: Restart Dev Server

```bash
# Stop the server (Ctrl+C)
npm run dev
```

### Step 3: Clear Browser Cache

- Open incognito/private window, OR
- Clear browser cache and cookies

### Step 4: Try Regular Login

Go to: `http://localhost:5173/#/admin/login`

---

## 📋 All Admin Access Options

### Option 1: Mock Login (Recommended for Now)
- **URL**: `http://localhost:5173/#/admin/mock-login`
- **Pros**: Works immediately, no configuration needed
- **Cons**: Not secure for production

### Option 2: Simple Login
- **URL**: `http://localhost:5173/#/simple-login`
- **Pros**: Alternative mock system
- **Cons**: Different dashboard interface

### Option 3: Regular Admin Login (After CORS Fix)
- **URL**: `http://localhost:5173/#/admin/login`
- **Pros**: Real authentication, secure
- **Cons**: Requires Supabase configuration

---

## 🎯 Quick Access Links

Once your dev server is running:

| Page | URL | Status |
|------|-----|--------|
| Mock Admin Login | `http://localhost:5173/#/admin/mock-login` | ✅ Works Now |
| Regular Admin Login | `http://localhost:5173/#/admin/login` | ⚠️ CORS Issue |
| Simple Login | `http://localhost:5173/#/simple-login` | ✅ Works Now |
| Admin Dashboard | `http://localhost:5173/#/admin/dashboard` | ✅ After Login |

---

## 🐛 Troubleshooting

### Mock Login Not Working?

1. Make sure dev server is running:
   ```bash
   npm run dev
   ```

2. Check console for errors (F12)

3. Try clearing localStorage:
   ```javascript
   // In browser console
   localStorage.clear();
   location.reload();
   ```

### Still Can't Access Dashboard?

1. Check if you're logged in:
   ```javascript
   // In browser console
   console.log(localStorage.getItem('mockUser'));
   ```

2. Try accessing dashboard directly:
   ```
   http://localhost:5173/#/admin/dashboard
   ```

3. Check browser console for errors

---

## 📚 Additional Resources

- **CORS Fix Guide**: See `CORS_FIX_GUIDE.md`
- **Supabase Setup**: See `SUPABASE_SETUP.md`
- **Deployment Guide**: See `DEPLOYMENT_GUIDE.md`

---

## ⚠️ Important Notes

### For Development:
- Mock login is fine for local development
- Use it to test and build features
- No security concerns on localhost

### For Production:
- **DO NOT** use mock login in production
- Always use real Supabase authentication
- Configure proper CORS settings
- Use environment variables

---

## 🎉 You're All Set!

Just go to: **`http://localhost:5173/#/admin/mock-login`**

Enter any credentials and start managing your content!

---

**Need Help?** Check the console (F12) for any error messages.
