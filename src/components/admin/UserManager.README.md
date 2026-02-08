# User Management Component

## Overview
The UserManager component provides comprehensive user management capabilities for administrators in the Antechos platform. It allows admins to view, search, filter, and manage all user accounts with detailed information and analytics.

## Features

### 📊 Dashboard Statistics
- **Total Users**: Complete count of registered users
- **Active Users**: Users with active status
- **Verified Users**: Users who have completed verification
- **New This Month**: Recently registered users

### 🔍 Search & Filtering
- **Search**: Find users by name, email, phone, or location
- **Status Filters**: Filter by active/inactive, verified/unverified
- **Sorting**: Sort by creation date, name, email, last sign-in, or enrollments
- **Pagination**: Navigate through large user lists efficiently

### 👤 User Information Display
- **Profile Details**: Name, email, phone, location, occupation
- **Account Status**: Active/inactive and verified/unverified status
- **Activity Tracking**: Creation date, last sign-in, session history
- **Learning Progress**: Course enrollments, completions, achievements
- **Points System**: Total points earned from achievements

### ⚡ Quick Actions
- **Activate/Deactivate**: Toggle user account status
- **Verify/Unverify**: Manage user verification status
- **View Details**: Access comprehensive user profile modal
- **Delete User**: Remove user account (with confirmation)

### 📱 User Detail Modal
The detailed view includes four tabs:

#### Profile Tab
- Complete user information
- Account status and timestamps
- Bio and personal details
- Quick action buttons

#### Courses Tab
- Enrollment statistics
- Course progress tracking
- Completion status
- Individual course details

#### Achievements Tab
- Earned achievements list
- Points breakdown
- Achievement icons and descriptions

#### Activity Tab
- Recent session history
- Login patterns
- Activity duration tracking

### 📤 Export Functionality
- Export filtered user data to CSV
- Includes all relevant user information
- Formatted for external analysis

## Technical Implementation

### Database Schema
The component works with several database tables:
- `user_profiles`: Extended user information
- `user_course_enrollments`: Course enrollment tracking
- `user_achievements`: Achievement system
- `user_sessions`: Activity tracking
- `user_bookmarks`: User bookmarks
- `user_learning_paths`: Custom learning paths
- `user_notifications`: User notifications

### Security & Permissions
- **Row Level Security (RLS)**: Implemented on all user tables
- **Admin Policies**: Special policies for admin access
- **Admin Function**: `is_admin()` function to verify admin privileges
- **Secure Operations**: All user modifications require admin verification

### API Integration
- **Supabase Auth**: Integration with Supabase authentication
- **Real-time Updates**: Automatic refresh after operations
- **Error Handling**: Comprehensive error management
- **Loading States**: User-friendly loading indicators

## Usage

### Adding to Admin Dashboard
```jsx
import UserManager from '../../components/admin/UserManager';

// In your admin dashboard component
{activeTab === 'users' && <UserManager />}
```

### Required Dependencies
```jsx
import { supabase } from '../../lib/supabase';
```

### Menu Item Configuration
```jsx
{ id: 'users', label: 'User Management', icon: Users, color: 'indigo' }
```

## Database Setup

### 1. Run User Schema
Execute the user authentication schema:
```sql
-- Run supabase/user-auth-schema.sql
```

### 2. Add Admin Policies
Execute the admin policies:
```sql
-- Run supabase/add-admin-user-policies.sql
```

### 3. Configure Admin Users
Update the `is_admin()` function to identify your admin users:
```sql
-- Modify the function to include your admin email addresses
```

## Customization

### Admin Identification
Modify the `is_admin()` function in the SQL file to match your admin identification logic:
- Email-based identification
- Role-based identification
- Custom metadata fields

### Styling
The component uses Tailwind CSS classes and can be customized by:
- Modifying color schemes in the `colors` object
- Adjusting responsive breakpoints
- Customizing card layouts and spacing

### Additional Fields
To add more user fields:
1. Update the database schema
2. Modify the component's data fetching
3. Add new display fields in the appropriate tabs

## Performance Considerations

### Pagination
- Default: 10 users per page
- Configurable via `usersPerPage` state
- Efficient for large user bases

### Data Loading
- Lazy loading of user details
- Efficient joins for related data
- Caching of statistics

### Search Optimization
- Client-side filtering for responsive search
- Debounced search input (can be added)
- Indexed database queries

## Security Notes

### Admin Access
- All operations require admin privileges
- RLS policies prevent unauthorized access
- Secure function execution with SECURITY DEFINER

### Data Privacy
- Sensitive data is properly protected
- Admin logs should be implemented
- User deletion requires confirmation

### Error Handling
- Graceful error messages
- No sensitive information in error logs
- Proper validation of admin actions

## Future Enhancements

### Potential Features
- **Bulk Operations**: Select and modify multiple users
- **Advanced Filters**: Date ranges, course-specific filters
- **User Communication**: Send messages to users
- **Audit Logs**: Track admin actions
- **User Impersonation**: Admin login as user (with proper safeguards)
- **Advanced Analytics**: User behavior insights
- **Export Options**: PDF reports, Excel format

### Performance Improvements
- **Virtual Scrolling**: For very large user lists
- **Search Debouncing**: Reduce API calls
- **Caching**: Redis integration for frequently accessed data
- **Background Jobs**: For bulk operations

## Troubleshooting

### Common Issues

#### Users Not Loading
- Check Supabase connection
- Verify admin policies are applied
- Ensure user has admin privileges

#### Permission Errors
- Verify `is_admin()` function includes your user
- Check RLS policies are enabled
- Confirm admin policies are created

#### Performance Issues
- Reduce page size for large datasets
- Add database indexes if needed
- Consider implementing search debouncing

### Debug Mode
Enable debug logging by adding console.log statements in:
- Data loading functions
- User action handlers
- Error catch blocks

## Support
For issues or questions about the User Management component:
1. Check the database schema setup
2. Verify admin permissions
3. Review error logs in browser console
4. Test with a smaller dataset first