# Marketplace Redesign - System Architecture

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        USER LAYER                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────┐         ┌──────────────────┐         │
│  │  Public Visitors │         │  Admin Users     │         │
│  │  (Read Only)     │         │  (Read + Write)  │         │
│  └────────┬─────────┘         └────────┬─────────┘         │
│           │                             │                    │
└───────────┼─────────────────────────────┼───────────────────┘
            │                             │
            ▼                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React Application (Vite + React Router)             │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │                                                        │  │
│  │  ┌─────────────────┐    ┌─────────────────────────┐ │  │
│  │  │  Public Routes  │    │  Admin Routes           │ │  │
│  │  ├─────────────────┤    ├─────────────────────────┤ │  │
│  │  │                 │    │                         │ │  │
│  │  │ MarketplaceRe-  │    │ EnhancedAdminDashboard │ │  │
│  │  │ design.jsx      │    │ ├─ MarketplaceRedesign-│ │  │
│  │  │                 │    │ │  Manager.jsx         │ │  │
│  │  │ ├─ Hero         │    │ │  ├─ HeroManager      │ │  │
│  │  │ ├─ Partners     │    │ │  ├─ PartnersManager  │ │  │
│  │  │ ├─ Banner       │    │ │  ├─ BannerManager    │ │  │
│  │  │ ├─ Features     │    │ │  ├─ FeaturesManager  │ │  │
│  │  │ ├─ Slides       │    │ │  ├─ SlidesManager    │ │  │
│  │  │ ├─ Metrics      │    │ │  ├─ MetricsManager   │ │  │
│  │  │ ├─ Resources    │    │ │  ├─ ResourcesManager │ │  │
│  │  │ ├─ Business     │    │ │  ├─ BusinessManager  │ │  │
│  │  │ ├─ Hire Blocks  │    │ │  ├─ HireBlocksManager│ │  │
│  │  │ ├─ Professionals│    │ │  ├─ ProfessionalsMan │ │  │
│  │  │ ├─ Testimonials │    │ │  ├─ TestimonialsMan  │ │  │
│  │  │ ├─ Solutions    │    │ │  ├─ SolutionsManager │ │  │
│  │  │ └─ Teams        │    │ │  └─ TeamsManager     │ │  │
│  │  │                 │    │ │                       │ │  │
│  │  └─────────────────┘    └─────────────────────────┘ │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
└───────────────────────────┬──────────────────────────────────┘
                            │
                            │ Supabase Client
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND LAYER                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Supabase (PostgreSQL + Auth + RLS)                  │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │                                                        │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │  Authentication & Authorization                  │ │  │
│  │  │  ├─ User Authentication                          │ │  │
│  │  │  ├─ Admin Role Check (is_admin flag)            │ │  │
│  │  │  └─ Session Management                           │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  │                                                        │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │  Row Level Security (RLS) Policies              │ │  │
│  │  │  ├─ Public Read: SELECT for all users           │ │  │
│  │  │  └─ Admin Write: INSERT/UPDATE/DELETE for admin │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
└───────────────────────────┬──────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  PostgreSQL Database (13 Tables)                     │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │                                                        │  │
│  │  ┌────────────────────┐  ┌────────────────────────┐ │  │
│  │  │ Single Row Tables  │  │ Multiple Row Tables    │ │  │
│  │  ├────────────────────┤  ├────────────────────────┤ │  │
│  │  │ • hero             │  │ • partners             │ │  │
│  │  │ • resources        │  │ • banner               │ │  │
│  │  │ • business_deserves│  │ • features             │ │  │
│  │  │                    │  │ • slides               │ │  │
│  │  │                    │  │ • metrics              │ │  │
│  │  │                    │  │ • hire_blocks          │ │  │
│  │  │                    │  │ • professionals        │ │  │
│  │  │                    │  │ • testimonials         │ │  │
│  │  │                    │  │ • solutions            │ │  │
│  │  │                    │  │ • teams                │ │  │
│  │  └────────────────────┘  └────────────────────────┘ │  │
│  │                                                        │  │
│  │  Common Fields:                                        │  │
│  │  • id (UUID)                                          │  │
│  │  • order_index (INTEGER)                              │  │
│  │  • is_active (BOOLEAN)                                │  │
│  │  • created_at (TIMESTAMPTZ)                           │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### Public Page (Read Flow)

```
User visits /#/marketplace-redesign
         │
         ▼
MarketplaceRedesign.jsx loads
         │
         ▼
useEffect() triggers fetchAllData()
         │
         ▼
13 Parallel Supabase Queries
         │
         ├─► marketplace_hero.select('*').single()
         ├─► marketplace_partners.select('*').eq('is_active', true)
         ├─► marketplace_banner.select('*').eq('is_active', true)
         ├─► marketplace_features.select('*').eq('is_active', true)
         ├─► marketplace_slides.select('*').eq('is_active', true)
         ├─► marketplace_metrics.select('*').eq('is_active', true)
         ├─► marketplace_resources.select('*').single()
         ├─► marketplace_business_deserves.select('*').single()
         ├─► marketplace_hire_blocks.select('*').eq('is_active', true)
         ├─► marketplace_professionals.select('*').eq('is_active', true)
         ├─► marketplace_testimonials.select('*').eq('is_active', true)
         ├─► marketplace_solutions.select('*').eq('is_active', true)
         └─► marketplace_teams.select('*').eq('is_active', true)
         │
         ▼
RLS Policy Check: Public Read ✅
         │
         ▼
Data returned to frontend
         │
         ▼
State updated with setData()
         │
         ▼
Components render with data
         │
         ▼
Page displayed to user
```

### Admin Panel (Write Flow)

```
Admin logs in
         │
         ▼
Navigate to /#/admin/dashboard
         │
         ▼
Auth check: is_admin = true ✅
         │
         ▼
Click "Marketplace Redesign"
         │
         ▼
MarketplaceRedesignManager.jsx loads
         │
         ▼
Select tab (e.g., "Partners")
         │
         ▼
PartnersManager.jsx loads
         │
         ▼
fetchData() queries marketplace_partners
         │
         ▼
RLS Policy Check: Admin Read ✅
         │
         ▼
Display existing items
         │
         ▼
Admin fills form and clicks "Save"
         │
         ▼
handleSave() triggered
         │
         ├─► If editing: UPDATE query
         └─► If new: INSERT query
         │
         ▼
RLS Policy Check: Admin Write ✅
         │
         ▼
Database updated
         │
         ▼
fetchData() refreshes list
         │
         ▼
Success message shown
         │
         ▼
Admin refreshes public page
         │
         ▼
New content displayed
```

## 🔐 Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Layer 1: Authentication                                     │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Supabase Auth                                       │    │
│  │ • Email/Password authentication                     │    │
│  │ • Session management                                │    │
│  │ • JWT tokens                                        │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  Layer 2: Authorization                                      │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Admin Role Check                                    │    │
│  │ • profiles.is_admin = true                          │    │
│  │ • Checked in RLS policies                           │    │
│  │ • Required for write operations                     │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  Layer 3: Row Level Security (RLS)                          │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Public Read Policy                                  │    │
│  │ • SELECT allowed for all users                      │    │
│  │ • Only active items (is_active = true)             │    │
│  │ • No authentication required                        │    │
│  └────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Admin Write Policy                                  │    │
│  │ • INSERT/UPDATE/DELETE for admin only              │    │
│  │ • Checks: auth.uid() AND is_admin = true           │    │
│  │ • Prevents unauthorized modifications               │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  Layer 4: Input Validation                                  │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Frontend Validation                                 │    │
│  │ • Required field checks                             │    │
│  │ • URL format validation                             │    │
│  │ • Number range validation                           │    │
│  │ • Prevents malformed data                           │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Component Hierarchy

```
App.jsx
├─ HashRouter
│  ├─ AuthProvider
│  │  └─ AppContent
│  │     ├─ Navbar
│  │     ├─ Routes
│  │     │  ├─ / → Home
│  │     │  ├─ /marketplace-redesign → MarketplaceRedesign
│  │     │  │  ├─ Hero Section
│  │     │  │  ├─ Partners Section
│  │     │  │  ├─ Banner Section
│  │     │  │  ├─ Features Section
│  │     │  │  ├─ Slider Section
│  │     │  │  ├─ Metrics Section (DonutChart × N)
│  │     │  │  ├─ Resources Section
│  │     │  │  ├─ Business Deserves Section
│  │     │  │  ├─ Hire Blocks Section
│  │     │  │  ├─ Professionals Section (Modal)
│  │     │  │  ├─ Testimonials Section
│  │     │  │  ├─ Solutions Section
│  │     │  │  └─ Teams Section
│  │     │  │
│  │     │  └─ /admin/dashboard → EnhancedAdminDashboard
│  │     │     └─ MarketplaceRedesignManager
│  │     │        ├─ Tab Navigation
│  │     │        └─ Tab Content
│  │     │           ├─ HeroManager
│  │     │           ├─ PartnersManager
│  │     │           ├─ BannerManagerMP
│  │     │           ├─ FeaturesManager
│  │     │           ├─ SlidesManager
│  │     │           ├─ MetricsManager
│  │     │           ├─ ResourcesManager
│  │     │           ├─ BusinessDeservesManager
│  │     │           ├─ HireBlocksManager
│  │     │           ├─ ProfessionalsManager
│  │     │           ├─ TestimonialsManager
│  │     │           ├─ SolutionsManager
│  │     │           └─ TeamsManager
│  │     │
│  │     ├─ LiveChatWidget
│  │     └─ Footer
│  │
│  └─ (Other routes...)
```

## 🗄️ Database Schema

```
marketplace_hero (Single Row)
├─ id: UUID (PK)
├─ title: TEXT
├─ subtitle: TEXT
├─ bullet_points: JSONB
├─ left_image_url: TEXT
├─ right_image_url: TEXT
├─ background_image_url: TEXT
├─ created_at: TIMESTAMPTZ
└─ updated_at: TIMESTAMPTZ

marketplace_partners (Multiple Rows)
├─ id: UUID (PK)
├─ name: TEXT
├─ logo_url: TEXT
├─ order_index: INTEGER
├─ is_active: BOOLEAN
└─ created_at: TIMESTAMPTZ

marketplace_banner (Multiple Rows)
├─ id: UUID (PK)
├─ image_url: TEXT
├─ link_url: TEXT
├─ is_active: BOOLEAN
├─ order_index: INTEGER
└─ created_at: TIMESTAMPTZ

marketplace_features (Multiple Rows)
├─ id: UUID (PK)
├─ title: TEXT
├─ description: TEXT
├─ icon_url: TEXT
├─ order_index: INTEGER
├─ is_active: BOOLEAN
└─ created_at: TIMESTAMPTZ

marketplace_slides (Multiple Rows)
├─ id: UUID (PK)
├─ heading: TEXT
├─ body: TEXT
├─ image_url: TEXT
├─ order_index: INTEGER
├─ is_active: BOOLEAN
└─ created_at: TIMESTAMPTZ

marketplace_metrics (Multiple Rows)
├─ id: UUID (PK)
├─ label: TEXT
├─ primary_percentage: INTEGER
├─ secondary_percentage: INTEGER
├─ color: TEXT
├─ order_index: INTEGER
├─ is_active: BOOLEAN
└─ created_at: TIMESTAMPTZ

marketplace_resources (Single Row)
├─ id: UUID (PK)
├─ heading: TEXT
├─ description: TEXT
├─ image_url_9_16: TEXT
├─ download_url: TEXT
├─ button_text: TEXT
├─ is_active: BOOLEAN
└─ created_at: TIMESTAMPTZ

marketplace_business_deserves (Single Row)
├─ id: UUID (PK)
├─ main_heading: TEXT
├─ sub_heading: TEXT
├─ center_image_url_9_16: TEXT
├─ right_heading: TEXT
├─ right_subheading: TEXT
├─ left_points: JSONB
├─ is_active: BOOLEAN
└─ created_at: TIMESTAMPTZ

marketplace_hire_blocks (Multiple Rows)
├─ id: UUID (PK)
├─ category_name: TEXT
├─ image_position: TEXT (left/right)
├─ image_url: TEXT
├─ description_title: TEXT
├─ bullet_points: JSONB
├─ order_index: INTEGER
├─ is_active: BOOLEAN
└─ created_at: TIMESTAMPTZ

marketplace_professionals (Multiple Rows)
├─ id: UUID (PK)
├─ name: TEXT
├─ role: TEXT
├─ image_url: TEXT
├─ short_bio: TEXT
├─ website_url: TEXT
├─ order_index: INTEGER
├─ is_active: BOOLEAN
└─ created_at: TIMESTAMPTZ

marketplace_testimonials (Multiple Rows)
├─ id: UUID (PK)
├─ client_name: TEXT
├─ company: TEXT
├─ quote: TEXT
├─ avatar_url: TEXT
├─ order_index: INTEGER
├─ is_active: BOOLEAN
└─ created_at: TIMESTAMPTZ

marketplace_solutions (Multiple Rows)
├─ id: UUID (PK)
├─ title: TEXT
├─ icon_url: TEXT
├─ description: TEXT
├─ order_index: INTEGER
├─ is_visible_initially: BOOLEAN
├─ is_active: BOOLEAN
└─ created_at: TIMESTAMPTZ

marketplace_teams (Multiple Rows)
├─ id: UUID (PK)
├─ name: TEXT
├─ role: TEXT
├─ image_url: TEXT
├─ order_index: INTEGER
├─ is_active: BOOLEAN
└─ created_at: TIMESTAMPTZ
```

## 🎨 Styling Architecture

```
Tailwind CSS Utility Classes
├─ Layout
│  ├─ Container: max-w-7xl mx-auto px-6
│  ├─ Grid: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
│  └─ Flex: flex items-center justify-between
│
├─ Colors
│  ├─ Primary: bg-blue-600 text-blue-600
│  ├─ Secondary: bg-indigo-600 text-indigo-600
│  ├─ Accent: bg-purple-600 text-purple-600
│  └─ Neutral: bg-gray-50 text-gray-900
│
├─ Typography
│  ├─ Headings: text-3xl font-bold
│  ├─ Body: text-base text-gray-600
│  └─ Small: text-sm text-gray-500
│
├─ Spacing
│  ├─ Sections: py-16
│  ├─ Cards: p-6 gap-6
│  └─ Elements: mb-4 mt-2
│
├─ Effects
│  ├─ Shadows: shadow-lg hover:shadow-2xl
│  ├─ Rounded: rounded-2xl
│  ├─ Transitions: transition-all duration-300
│  └─ Hover: hover:scale-105 hover:bg-blue-700
│
└─ Responsive
   ├─ Mobile: (default)
   ├─ Tablet: md: (768px+)
   └─ Desktop: lg: (1024px+)
```

## 🔄 State Management

```
React State (useState)
├─ MarketplaceRedesign.jsx
│  ├─ loading: boolean
│  ├─ data: object
│  │  ├─ hero: object
│  │  ├─ partners: array
│  │  ├─ banner: array
│  │  ├─ features: array
│  │  ├─ slides: array
│  │  ├─ metrics: array
│  │  ├─ resources: object
│  │  ├─ businessDeserves: object
│  │  ├─ hireBlocks: array
│  │  ├─ professionals: array
│  │  ├─ testimonials: array
│  │  ├─ solutions: array
│  │  └─ teams: array
│  ├─ currentSlide: number
│  ├─ showAllSolutions: boolean
│  └─ selectedProfessional: object | null
│
└─ Each Manager Component
   ├─ items: array
   ├─ loading: boolean
   ├─ saving: boolean
   ├─ editingId: string | null
   └─ formData: object
```

## 📦 Dependencies

```
Production Dependencies
├─ react: ^19.1.0
├─ react-dom: ^19.1.0
├─ react-router-dom: ^7.6.0
├─ @supabase/supabase-js: ^2.78.0
├─ framer-motion: ^12.15.0
├─ lucide-react: ^0.511.0
└─ tailwindcss: ^4.1.7

Development Dependencies
├─ vite: ^6.3.5
├─ @vitejs/plugin-react: ^4.4.1
└─ eslint: ^9.25.0
```

---

**This architecture provides a scalable, secure, and maintainable solution for the marketplace page with full admin control.**
