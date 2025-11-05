// Fix Admin Authentication Script
// Run this in your browser console on the admin login page

async function fixAdminAuth() {
  try {
    console.log('🔧 Fixing admin authentication...');
    
    // Import supabase
    const { supabase } = await import('./src/lib/supabase.js');
    
    const adminEmail = 'admin@antechos.com';
    const adminPassword = '123'; // You can change this
    
    console.log('📧 Creating auth user for:', adminEmail);
    
    // Try to create the auth user
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
      options: {
        data: {
          full_name: 'Admin User'
        }
      }
    });
    
    if (signUpError && !signUpError.message.includes('already registered')) {
      console.error('❌ Sign up error:', signUpError);
      
      // If user already exists, try to sign in
      console.log('🔑 Trying to sign in with existing user...');
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword
      });
      
      if (signInError) {
        console.error('❌ Sign in error:', signInError);
        console.log('💡 The user might exist with a different password.');
        console.log('💡 Try resetting the password in Supabase Dashboard → Authentication → Users');
        return;
      }
      
      console.log('✅ Signed in successfully!');
      console.log('👤 User ID:', signInData.user.id);
      
      // Update the existing profile with the correct user ID
      const { data: updateData, error: updateError } = await supabase
        .from('profiles')
        .update({ id: signInData.user.id })
        .eq('email', adminEmail)
        .select();
      
      if (updateError) {
        console.error('❌ Error updating profile:', updateError);
      } else {
        console.log('✅ Profile updated with correct user ID');
      }
      
      return;
    }
    
    if (signUpData.user) {
      console.log('✅ Auth user created successfully!');
      console.log('👤 New User ID:', signUpData.user.id);
      
      // Update the existing profile with the new user ID
      const { data: updateData, error: updateError } = await supabase
        .from('profiles')
        .update({ 
          id: signUpData.user.id,
          updated_at: new Date().toISOString()
        })
        .eq('email', adminEmail)
        .select();
      
      if (updateError) {
        console.error('❌ Error updating profile:', updateError);
        
        // If update fails, create new profile
        console.log('🆕 Creating new profile...');
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{
            id: signUpData.user.id,
            email: adminEmail,
            full_name: 'Admin User',
            role: 'admin'
          }])
          .select();
        
        if (createError) {
          console.error('❌ Error creating profile:', createError);
        } else {
          console.log('✅ New profile created');
        }
      } else {
        console.log('✅ Profile updated with new user ID');
      }
      
      // Sign in the user
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword
      });
      
      if (signInError) {
        console.error('❌ Auto sign-in error:', signInError);
      } else {
        console.log('✅ Auto signed in successfully!');
      }
    }
    
    console.log('🎉 Admin authentication fixed!');
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Password:', adminPassword);
    console.log('🔄 Refresh the page and try logging in');
    
  } catch (error) {
    console.error('❌ Error fixing admin auth:', error);
  }
}

// Run the function
fixAdminAuth();