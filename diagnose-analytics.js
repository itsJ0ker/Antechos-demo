// Analytics Diagnostic Script
// Run this in browser console to diagnose analytics issues

console.log('🔍 Starting Analytics Diagnostics...\n');

// Test 1: Check Environment Variables
console.log('1️⃣ Checking Environment Variables:');
const hasUrl = !!import.meta.env.VITE_SUPABASE_URL;
const hasKey = !!import.meta.env.VITE_SUPABASE_ANON_KEY;
console.log('  VITE_SUPABASE_URL:', hasUrl ? '✅ Set' : '❌ Missing');
console.log('  VITE_SUPABASE_ANON_KEY:', hasKey ? '✅ Set' : '❌ Missing');

if (!hasUrl || !hasKey) {
  console.error('  ⚠️ Environment variables missing! Check your .env file');
}

// Test 2: Check Supabase Client
console.log('\n2️⃣ Checking Supabase Client:');
import { supabase } from './src/lib/supabase.js';
console.log('  Supabase client:', supabase ? '✅ Initialized' : '❌ Not initialized');

if (!supabase) {
  console.error('  ⚠️ Supabase client not initialized!');
  console.log('  💡 Fix: Ensure .env file has correct credentials and restart dev server');
}

// Test 3: Test Database Connection
console.log('\n3️⃣ Testing Database Connection:');
if (supabase) {
  supabase
    .from('analytics')
    .select('count')
    .limit(1)
    .then(({ data, error }) => {
      if (error) {
        console.error('  ❌ Database connection failed:', error.message);
        console.log('  💡 Possible issues:');
        console.log('     - Analytics table doesn\'t exist');
        console.log('     - RLS policies not configured');
        console.log('     - Wrong Supabase credentials');
      } else {
        console.log('  ✅ Database connection successful');
      }
    });
}

// Test 4: Test Tracking Function
console.log('\n4️⃣ Testing Tracking Function:');
if (supabase) {
  import('./src/utils/analytics.js').then(({ trackPageVisit }) => {
    console.log('  Attempting to track test visit...');
    trackPageVisit('/diagnostic-test')
      .then(result => {
        if (result) {
          console.log('  ✅ Tracking successful!', result);
        } else {
          console.error('  ❌ Tracking failed (returned null)');
          console.log('  💡 Check browser console for error messages');
        }
      })
      .catch(error => {
        console.error('  ❌ Tracking error:', error);
      });
  });
}

// Test 5: Check RLS Policies
console.log('\n5️⃣ Checking RLS Policies:');
console.log('  Run this SQL in Supabase:');
console.log('  SELECT * FROM pg_policies WHERE tablename = \'analytics\';');

// Test 6: Manual Insert Test
console.log('\n6️⃣ Manual Insert Test:');
if (supabase) {
  const testData = {
    page_path: '/diagnostic-manual-test',
    page_url: window.location.href,
    device: 'Desktop',
    browser: 'Chrome',
    visited_at: new Date().toISOString()
  };
  
  console.log('  Attempting manual insert...');
  supabase
    .from('analytics')
    .insert([testData])
    .select()
    .then(({ data, error }) => {
      if (error) {
        console.error('  ❌ Manual insert failed:', error.message);
        console.log('  💡 Common causes:');
        console.log('     - RLS policy doesn\'t allow anonymous inserts');
        console.log('     - Table structure mismatch');
        console.log('     - Required fields missing');
      } else {
        console.log('  ✅ Manual insert successful!', data);
      }
    });
}

// Summary
console.log('\n📊 Diagnostic Summary:');
console.log('  If all tests pass, analytics should be working.');
console.log('  If any test fails, follow the fix suggestions above.');
console.log('\n  Next steps:');
console.log('  1. Fix any failed tests');
console.log('  2. Visit a public page (not admin)');
console.log('  3. Check admin analytics dashboard');
console.log('  4. Look for data in Supabase Table Editor');

console.log('\n✅ Diagnostics complete!');
