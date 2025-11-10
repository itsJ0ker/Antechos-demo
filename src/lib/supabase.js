import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug environment variables
console.log('🔧 Supabase Config:', {
  url: supabaseUrl ? 'Set' : 'Missing',
  key: supabaseAnonKey ? 'Set (hidden)' : 'Missing',
});

// Create Supabase client only if environment variables are available
let supabase = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });
  console.log('✅ Supabase client initialized successfully');
} else {
  console.warn('⚠️ Supabase environment variables missing. Running in offline mode with static data.');
}

export { supabase }

// Auth helpers
export const signIn = async (email, password) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } };
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signUp = async (email, password, userData = {}) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } };
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })
  return { data, error }
}

export const signOut = async () => {
  if (!supabase) {
    return { error: { message: 'Supabase not configured' } };
  }
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  if (!supabase) {
    return null;
  }
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Database helpers
export const getCourses = async (filters = {}) => {
  if (!supabase) {
    return { data: [], error: { message: 'Supabase not configured' } };
  }
  
  let query = supabase
    .from('courses')
    .select(`
      *,
      course_skills(skill_name),
      course_tools(tool_name),
      course_modules(
        id,
        title,
        description,
        order_index,
        course_module_details(detail, order_index)
      )
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (filters.category) {
    query = query.eq('category', filters.category)
  }

  if (filters.skill_level) {
    query = query.eq('skill_level', filters.skill_level)
  }

  const { data, error } = await query
  return { data, error }
}

// Helper function to check if Supabase is available
const checkSupabase = () => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured - using static data fallback' } };
  }
  return null;
};

export const getCourseById = async (id) => {
  const check = checkSupabase();
  if (check) return check;
  
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      course_skills(skill_name),
      course_tools(tool_name),
      course_modules(
        id,
        title,
        description,
        order_index,
        course_module_details(detail, order_index)
      )
    `)
    .eq('id', id)
    .eq('is_active', true)
    .single()

  return { data, error }
}

export const getUniversities = async () => {
  const check = checkSupabase();
  if (check) return check;
  
  const { data, error } = await supabase
    .from('universities')
    .select(`
      *,
      university_programs(program_name),
      university_collaborations(collaboration_name),
      university_approvals(approval_name, logo_url),
      university_courses(
        course_name,
        description,
        specializations,
        fees,
        duration
      ),
      university_faqs(question, answer, order_index)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return { data, error }
}

export const getUniversityById = async (id) => {
  const check = checkSupabase();
  if (check) return check;
  
  const { data, error } = await supabase
    .from('universities')
    .select(`
      *,
      university_programs(program_name),
      university_collaborations(collaboration_name),
      university_approvals(approval_name, logo_url, display_order),
      university_accreditations(
        id,
        display_order,
        accreditation:accreditations(
          id,
          name,
          full_name,
          logo_url,
          description
        )
      ),
      university_courses(
        id,
        course_name,
        description,
        specializations,
        fees,
        duration,
        image_url
      ),
      university_faqs(question, answer, order_index),
      university_campus_images(image_url, caption, display_order),
      university_benefits(benefit_number, title, description, icon, display_order),
      university_admission_steps(step_number, title, subtitle, description, display_order),
      university_career_stats(stat_label, stat_value, icon, display_order),
      university_hiring_partners(partner_name, logo_url, website_url, display_order)
    `)
    .eq('id', id)
    .eq('is_active', true)
    .single()

  return { data, error }
}

export const getTrainers = async () => {
  const check = checkSupabase();
  if (check) return check;
  
  const { data, error } = await supabase
    .from('trainers')
    .select(`
      *,
      trainer_skills(skill_name),
      trainer_expertise(expertise_area),
      trainer_certifications(certification_name, issuing_organization),
      trainer_achievements(achievement_text),
      trainer_projects(title, description, technologies, impact),
      trainer_education(degree, institution, year),
      trainer_tools(tool_name)
    `)
    .eq('is_active', true)
    .order('rating', { ascending: false })

  return { data, error }
}

export const getTrainerById = async (id) => {
  const check = checkSupabase();
  if (check) return check;
  
  const { data, error } = await supabase
    .from('trainers')
    .select(`
      *,
      trainer_skills(skill_name),
      trainer_expertise(expertise_area),
      trainer_certifications(certification_name, issuing_organization),
      trainer_achievements(achievement_text),
      trainer_projects(title, description, technologies, impact),
      trainer_education(degree, institution, year),
      trainer_tools(tool_name)
    `)
    .eq('id', id)
    .eq('is_active', true)
    .single()

  return { data, error }
}

export const getWorkforce = async () => {
  const check = checkSupabase();
  if (check) return check;
  
  const { data, error } = await supabase
    .from('workforce')
    .select(`
      *,
      workforce_skills(skill_name),
      workforce_expertise(expertise_area),
      workforce_certifications(certification_name, issuing_organization),
      workforce_achievements(achievement_text),
      workforce_education(degree, institution, year),
      workforce_tools(tool_name)
    `)
    .eq('is_active', true)
    .order('rating', { ascending: false })

  return { data, error }
}

export const getWorkforceById = async (id) => {
  const check = checkSupabase();
  if (check) return check;
  
  const { data, error } = await supabase
    .from('workforce')
    .select(`
      *,
      workforce_skills(skill_name),
      workforce_expertise(expertise_area),
      workforce_certifications(certification_name, issuing_organization),
      workforce_achievements(achievement_text),
      workforce_education(degree, institution, year),
      workforce_tools(tool_name)
    `)
    .eq('id', id)
    .eq('is_active', true)
    .single()

  return { data, error }
}

export const getTestimonials = async (featured = false) => {
  const check = checkSupabase();
  if (check) return check;
  
  let query = supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (featured) {
    query = query.eq('is_featured', true)
  }

  const { data, error } = await query
  return { data, error }
}

export const getBlogPosts = async () => {
  const check = checkSupabase();
  if (check) return check;
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  return { data, error }
}

export const getBlogPostBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  return { data, error }
}

export const getStatistics = async () => {
  const check = checkSupabase();
  if (check) return check;
  
  const { data, error } = await supabase
    .from('statistics')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  return { data, error }
}

export const submitEnquiry = async (enquiryData) => {
  const check = checkSupabase();
  if (check) return check;
  
  const { data, error } = await supabase
    .from('enquiries')
    .insert([enquiryData])
    .select()

  return { data, error }
}

export const getSettings = async (key = null) => {
  let query = supabase.from('settings').select('*')

  if (key) {
    query = query.eq('key', key).single()
  }

  const { data, error } = await query
  return { data, error }
}

// Admin-specific functions
export const getAllCourses = async () => {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      course_skills(skill_name),
      course_tools(tool_name),
      course_modules(
        id,
        title,
        description,
        order_index,
        course_module_details(detail, order_index)
      )
    `)
    .order('created_at', { ascending: false })

  return { data, error }
}

export const getAllUniversities = async () => {
  const { data, error } = await supabase
    .from('universities')
    .select(`
      *,
      university_programs(program_name),
      university_collaborations(collaboration_name),
      university_approvals(approval_name, logo_url),
      university_courses(
        course_name,
        description,
        specializations,
        fees,
        duration
      ),
      university_faqs(question, answer, order_index)
    `)
    .order('created_at', { ascending: false })

  return { data, error }
}

export const getAllTrainers = async () => {
  const { data, error } = await supabase
    .from('trainers')
    .select(`
      *,
      trainer_skills(skill_name),
      trainer_expertise(expertise_area),
      trainer_certifications(certification_name, issuing_organization),
      trainer_achievements(achievement_text),
      trainer_projects(title, description, technologies, impact),
      trainer_education(degree, institution, year),
      trainer_tools(tool_name)
    `)
    .order('created_at', { ascending: false })

  return { data, error }
}

export const getAllWorkforce = async () => {
  const { data, error } = await supabase
    .from('workforce')
    .select(`
      *,
      workforce_skills(skill_name),
      workforce_expertise(expertise_area),
      workforce_certifications(certification_name, issuing_organization),
      workforce_achievements(achievement_text),
      workforce_education(degree, institution, year),
      workforce_tools(tool_name)
    `)
    .order('created_at', { ascending: false })

  return { data, error }
}

export const getAllTestimonials = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })

  return { data, error }
}

export const getAllEnquiries = async () => {
  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false })

  return { data, error }
}

// Update enquiry status
export const updateEnquiryStatus = async (id, status) => {
  const { data, error } = await supabase
    .from('enquiries')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()

  return { data, error }
}

// Check if user has admin role
export const checkAdminRole = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()

  return { data, error }
}