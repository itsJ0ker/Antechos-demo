# Teams Section Category Carousel Update

## Overview
Updated the Teams section in MarketplaceRedesign.jsx to include a category filter on the left side and a two-row carousel layout on the right side.

## Changes Made

### 1. Database Schema Update
- **File**: `supabase/add-teams-category.sql`
- Added `category` column to `marketplace_teams` table
- Updated existing teams with sample categories
- Added sample team data with different categories

### 2. Component Updates
- **File**: `src/pages/MarketplaceRedesign.jsx`
- Added `selectedTeamCategory` state for category filtering
- Replaced the entire Teams section with new layout

### 3. New Layout Features

#### Left Side - Category Selector
- Displays all available categories plus "All" option
- Shows count of team members in each category
- Active category highlighted with blue background
- Smooth hover effects

#### Right Side - Two-Row Carousel
- Grid layout: 2 rows × 2 columns (4 cards per page)
- Compact card design (220px height)
- Category badge on each card
- Pagination controls for multiple pages
- Smooth transitions between pages

### 4. Key Features
- **Responsive Design**: Works on all screen sizes
- **Category Filtering**: Filter teams by department/role
- **Pagination**: Navigate through multiple pages of team members
- **Visual Feedback**: Hover effects and smooth animations
- **Empty State**: Shows message when no team members match filter

### 5. Sample Categories
- Leadership (CEO, CTO, VP roles)
- Engineering (Developers, Engineers)
- Design (UX/UI Designers)
- Marketing (Sales, Marketing, Business)
- Operations (Managers, Coordinators)
- General (Default category)

## Usage
1. Run the SQL script to add category support:
   ```sql
   -- Execute supabase/add-teams-category.sql
   ```

2. The component will automatically:
   - Load team members with categories
   - Display category filter on the left
   - Show team cards in 2×2 grid on the right
   - Handle pagination for large teams

## Technical Details
- **State Management**: Uses `selectedTeamCategory` and `currentTeamSlide`
- **Filtering Logic**: Filters teams based on selected category
- **Pagination**: 4 items per page (2 rows × 2 columns)
- **Responsive**: Adjusts layout for different screen sizes
- **Performance**: Efficient filtering and rendering

## Benefits
- Better organization of team members
- Improved user experience with filtering
- Compact display showing more information
- Professional category-based navigation
- Scalable for large teams