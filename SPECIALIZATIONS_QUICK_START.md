# Enhanced Specializations - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Database Setup (2 minutes)
1. Open Supabase SQL Editor
2. Copy and paste content from: `supabase/enhanced-course-specializations-schema.sql`
3. Click "Run"
4. ✅ Table created!

### Step 2: Access Admin Panel (1 minute)
1. Go to: `http://localhost:5173/#/admin/login` (or your domain)
2. Login with your admin credentials
3. Click **"Specializations (Enhanced)"** in the sidebar

### Step 3: Add Your First Specialization (2 minutes)
1. **Select University**: Choose from dropdown
2. **Select Course**: Choose from dropdown (e.g., MBA)
3. Click **"Add New Specialization"**
4. Fill in basic info:
   - Name: `MBA in Finance`
   - Description: `Comprehensive finance program`
   - Duration: `2 Years`
   - Fees: `₹5,00,000`
   - Eligibility: `Bachelor's degree with 50% marks`
5. Click **"Save Specialization"**

### Step 4: View on Frontend
Visit: `/university/{universityId}/course/{courseId}/enhanced`

## 📋 Sample Data Templates

### Copy-Paste Ready: Industry Insight Stats
```json
[
  {"label": "Job Growth", "value": "25%"},
  {"label": "Average Salary", "value": "₹12 LPA"},
  {"label": "Companies Hiring", "value": "500+"},
  {"label": "Placement Rate", "value": "95%"}
]
```

### Copy-Paste Ready: Program Highlights
```json
[
  {
    "title": "Industry-Relevant Curriculum",
    "description": "Learn from real-world case studies and industry best practices"
  },
  {
    "title": "Expert Faculty",
    "description": "Learn from experienced professionals with 15+ years in the industry"
  },
  {
    "title": "Hands-on Projects",
    "description": "Work on live projects and build your portfolio"
  },
  {
    "title": "Placement Support",
    "description": "Dedicated placement cell with 95% placement record"
  }
]
```

### Copy-Paste Ready: Curriculum (MBA Finance Example)
```json
[
  {
    "semester": "SEM 1",
    "description": "Foundation courses in business and finance",
    "subjects": [
      "Financial Accounting",
      "Managerial Economics",
      "Business Statistics",
      "Marketing Management",
      "Organizational Behavior"
    ]
  },
  {
    "semester": "SEM 2",
    "description": "Core finance specialization courses",
    "subjects": [
      "Corporate Finance",
      "Investment Analysis",
      "Financial Markets",
      "Risk Management",
      "Financial Modeling"
    ]
  },
  {
    "semester": "SEM 3",
    "description": "Advanced finance topics",
    "subjects": [
      "Mergers & Acquisitions",
      "Portfolio Management",
      "Derivatives & Options",
      "International Finance",
      "Financial Analytics"
    ]
  },
  {
    "semester": "SEM 4",
    "description": "Capstone and electives",
    "subjects": [
      "Strategic Financial Management",
      "Behavioral Finance",
      "FinTech & Innovation",
      "Capstone Project",
      "Industry Internship"
    ]
  }
]
```

### Copy-Paste Ready: Career Paths
```json
[
  {
    "title": "Financial Analyst",
    "description": "Analyze financial data, create reports, and provide investment recommendations to businesses and individuals",
    "salary_range": "₹6-12 LPA"
  },
  {
    "title": "Investment Banker",
    "description": "Facilitate mergers, acquisitions, and capital raising for corporations and governments",
    "salary_range": "₹10-20 LPA"
  },
  {
    "title": "Portfolio Manager",
    "description": "Manage investment portfolios for individuals and institutions to maximize returns",
    "salary_range": "₹12-25 LPA"
  },
  {
    "title": "Risk Manager",
    "description": "Identify, assess, and mitigate financial risks for organizations",
    "salary_range": "₹8-15 LPA"
  }
]
```

## 🎯 Quick Tips

### For Best Results:
1. **Start Simple**: Add basic info first, then expand sections
2. **Use Templates**: Copy the JSON templates above
3. **Test JSON**: Use [jsonlint.com](https://jsonlint.com) to validate
4. **Save Often**: Click save after each section
5. **Preview**: Check frontend after each major change

### Common Mistakes to Avoid:
❌ Single quotes in JSON → Use double quotes  
❌ Trailing commas in JSON → Remove them  
❌ Forgetting to mark as "Active" → Toggle the checkbox  
❌ Wrong university/course selection → Double-check dropdowns  

## 📱 What You'll See on Frontend

When a user visits the course page:
1. **Header**: University logo + Course name
2. **Specializations Grid**: All available specializations
3. **Click to Select**: User clicks a specialization card
4. **Dynamic Content**: All sections appear based on selected specialization
   - Program Overview
   - Industry Insight with stats
   - Program Highlights
   - Semester-wise Curriculum
   - Career Paths
   - Support & Alumni
   - Career Progression (Entry/Mid/Senior)
   - Book Your Seat CTA

## 🔧 Troubleshooting

### "Specializations not showing"
- ✅ Check "Active" checkbox is enabled
- ✅ Verify university and course IDs match
- ✅ Refresh the page

### "JSON error when saving"
- ✅ Validate JSON at jsonlint.com
- ✅ Use double quotes, not single
- ✅ Remove trailing commas

### "Images not loading"
- ✅ Use full HTTPS URLs
- ✅ Test URL in browser first
- ✅ Check CORS settings

## 📚 Full Documentation
For detailed information, see: `ENHANCED_SPECIALIZATIONS_GUIDE.md`

## 🎉 You're Ready!
Start adding specializations and watch your course pages come to life!
