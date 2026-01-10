# 🚀 Deployment Guide

## Quick Deploy to Vercel

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Vercel**
```bash
npx vercel --prod
```

3. **Set environment variables in Vercel dashboard:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Database Setup

1. Create a Supabase project
2. Run SQL files in this order:
   - `supabase/schema.sql` (main schema)
   - `supabase/seed.sql` (sample data)
   - Any additional schema files as needed

## Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Other Platforms

For other hosting platforms:
1. Build: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables
4. Set up SPA redirects (all routes to index.html)

That's it! Your app should be live and ready to use.