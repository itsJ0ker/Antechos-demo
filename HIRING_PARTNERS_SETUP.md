# Hiring Partners System Setup Guide

## Overview
The hiring partners system allows you to manage a global list of hiring partner companies and assign them to universities. Partners are displayed in a beautiful dual-line auto-scrolling carousel on university detail pages.

## Features
- ✅ Global hiring partners database (master list)
- ✅ University-specific partner selection
- ✅ Dual-line auto-scrolling carousel (first line scrolls left, second line scrolls right)
- ✅ Hover to pause animation
- ✅ Click logos to visit partner websites
- ✅ Admin panel for managing partners
- ✅ Similar system to accreditations

## Database Setup

### Step 1: Run the Schema
Execute the SQL file to create the necessary tables:

```bash
# In Supabase SQL Editor, run:
supabase/hiring-partners-schema.sql
```

This creates:
- `hiring_partners` - Global master list of all hiring partners
- `university_hiring_partners_new` - Junction table linking universities to partners

### Step 2: Verify Tables
Check that the following tables exist:
- ✅ hiring_partners
- ✅ university_hiring_partners_new

## Admin Panel Usage

### Managing Global Hiring Partners

1. **Access Admin Panel**
   - Navigate to Admin Dashboard
   - Click on "Hiring Partners" tab

2. **Add New Partner**
   - Fill in partner details:
     - Name (required)
     - Logo URL
     - Website URL
     - Industry (e.g., Technology, Finance)
     - Description
   - Click "Add Hiring Partner"

3. **Edit Partner**
   - Click edit icon on any partner
   - Update details
   - Click "Save"

4. **Toggle Active Status**
   - Click the Active/Inactive button
   - Only active partners appear in selection lists

5. **Delete Partner**
   - Click trash icon
   - Confirm deletion

### Assigning Partners to Universities

1. **Access University Manager**
   - Go to Admin Dashboard
   - Click "Enhanced Universities" tab
   - Select a university

2. **Select Hiring Partners**
   - Click "Hiring Partners" tab
   - Browse available partners
   - Click on partners to select/deselect
   - Selected partners appear in the "Selected Hiring Partners" section

3. **Save Changes**
   - Click "Save" button
   - Partners are now assigned to the university

## Frontend Display

### University Details Page
The hiring partners section displays:
- **Header**: Purple gradient background with icon
- **First Row**: Auto-scrolls from right to left
- **Second Row**: Auto-scrolls from left to right
- **Hover Effect**: Pauses animation
- **Click**: Opens partner website in new tab

### Carousel Features
- Seamless infinite loop
- 30-second animation duration
- Responsive design
- Hover to pause
- Purple theme matching the design

## Sample Data
The schema includes 24 pre-populated hiring partners:
- Google, Microsoft, Amazon, IBM
- Accenture, Deloitte, TCS, Infosys
- Wipro, Cognizant, HCL, Tech Mahindra
- And more...

## Customization

### Change Animation Speed
Edit `src/index.css`:
```css
.animate-marquee {
  animation: marquee 30s linear infinite; /* Change 30s to desired speed */
}

.animate-marquee-reverse {
  animation: marquee-reverse 30s linear infinite; /* Change 30s to desired speed */
}
```

### Change Colors
Edit `src/components/sections/UniversityDetails.jsx`:
- Replace `purple` with your preferred color
- Update gradient classes: `from-white to-purple-50`
- Update border colors: `border-purple-100`

### Adjust Logo Size
Edit the carousel section:
```jsx
<div className="w-32 h-32 ..."> {/* Change w-32 h-32 to desired size */}
```

## Migration from Old System

If you have existing hiring partners in the old `university_hiring_partners` table:

1. The new system will automatically fall back to the old system if no new partners are found
2. Gradually migrate partners to the new system through the admin panel
3. Once migrated, the new dual-line carousel will be used

## Troubleshooting

### Partners Not Showing
1. Check if partners are marked as active in the database
2. Verify university has partners assigned in admin panel
3. Check browser console for errors

### Carousel Not Scrolling
1. Verify CSS animations are loaded (check `src/index.css`)
2. Check if `animate-marquee` and `animate-marquee-reverse` classes are applied
3. Clear browser cache

### Logo Not Displaying
1. Verify logo URL is accessible
2. Check CORS settings if loading from external sources
3. Fallback text will display if image fails to load

## API Endpoints

### Fetch University Hiring Partners
```javascript
const { data } = await supabase
  .from('university_hiring_partners_new')
  .select(`
    id,
    display_order,
    hiring_partner:hiring_partners(
      id,
      name,
      logo_url,
      website_url,
      industry,
      description
    )
  `)
  .eq('university_id', universityId)
  .order('display_order');
```

### Fetch All Active Partners
```javascript
const { data } = await supabase
  .from('hiring_partners')
  .select('*')
  .eq('is_active', true)
  .order('name');
```

## Files Modified/Created

### New Files
- `supabase/hiring-partners-schema.sql` - Database schema
- `src/components/admin/HiringPartnersManager.jsx` - Admin component
- `HIRING_PARTNERS_SETUP.md` - This guide

### Modified Files
- `src/components/sections/UniversityDetails.jsx` - Added dual-line carousel
- `src/components/admin/EnhancedUniversityManager.jsx` - Added partner selection
- `src/pages/admin/SimpleAdminDashboard.jsx` - Added tab
- `src/pages/admin/EnhancedAdminDashboard.jsx` - Added tab
- `src/index.css` - Added marquee animations

## Support
For issues or questions, check:
1. Browser console for errors
2. Supabase logs for database issues
3. Network tab for API call failures
