# Vercel Deployment Guide

## Quick Fix for White Screen Issue

The white screen issue on Vercel is caused by missing Supabase environment variables. The app has been updated to work without Supabase (using static data) when environment variables are missing.

## Option 1: Deploy Without Supabase (Recommended for Demo)

The app will automatically use static data when Supabase environment variables are not configured. This is perfect for demo purposes.

**No additional configuration needed** - just deploy to Vercel and it will work with static data.

## Option 2: Deploy With Supabase (Full Functionality)

If you want full database functionality, add these environment variables in Vercel:

### Environment Variables to Add in Vercel Dashboard:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### How to Get Supabase Credentials:

1. Go to [supabase.com](https://supabase.com)
2. Create a new project or use existing one
3. Go to Settings → API
4. Copy the Project URL and anon/public key

## Current Status

✅ **App works without Supabase** - Uses static data for:
- University listings and details
- Trainer profiles  
- Course information
- All pages and routing

✅ **Professional styling applied**
✅ **All routing issues fixed**
✅ **Build errors resolved**

## Testing

- **Local**: `npm run dev` - Works with or without .env file
- **Production**: Deployed app works with static data by default

## Static Data Available

The app includes comprehensive static data:
- 3+ Universities with full details
- 2 Trainer profiles
- Course listings
- All page content

This makes it perfect for demonstrations and showcases without requiring database setup.