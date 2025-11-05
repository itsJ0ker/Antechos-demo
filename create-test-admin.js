// Test Admin Creation Script
// Run this in your browser console on the admin login page

async function createTestAdmin() {
  try {
    console.log('Creating test admin user...');
    
    // Import supabase (adjust path if needed)
    const { supabase } = await import('./src/lib/supabase.js');
    
    const testEmail = 'admin@antechos.com';
    const testPassword = 'admin123456';
    
    // Try to sign up the user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          full_name: 'Test Admin'
        }
      }
    });
    
    if (signUpError && !signUpError.message.includes('already registered')) {
      console.error('Sign up error:', signUpError);
      return;
    }
    
    console.log('User created or already exists');
    
    // Try to sign in
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword
    });
    
    if (signInError) {
      console.error('Sign in error:', signInError);
      return;
    }
    
    console.log('Signed in successfully:', signInData.user.email);
    
    // Create or update profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: signInData.user.id,
        email: testEmail,
        full_name: 'Test Admin',
        role: 'admin'
      })
      .select()
      .single();
    
    if (profileError) {
      console.error('Profile error:', profileError);
      return;
    }
    
    console.log('Admin profile created:', profileData);
    console.log('✅ Test admin created successfully!');
    console.log('Email:', testEmail);
    console.log('Password:', testPassword);
    console.log('You can now login with these credentials');
    
  } catch (error) {
    console.error('Error creating test admin:', error);
  }
}

// Run the function
createTestAdmin();