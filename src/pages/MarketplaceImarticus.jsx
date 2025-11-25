import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  ArrowRight, Check, Star, Play, ChevronRight,
  Quote, Building2, Linkedin, Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollProgress from '../components/common/ScrollProgress';
import BackToTop from '../components/common/BackToTop';
import Newsletter from '../components/common/Newsletter';
import FAQSection from '../components/common/FAQSection';

const MarketplaceImarticus = () => {
  const [hero, setHero] = useState(null);
  const [heroStats, setHeroStats] = useState([]);
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState([]);
  const [features, setFeatures] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [partners, setPartners] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      // Fetch hero
      const { data: heroData } = await supabase
        .from('marketplace_hero')
        .select('*')
        .eq('is_active', true)
        .single();
      
      if (heroData) {
        setHero(heroData);
        
        // Fetch hero stats
        const { data: statsData } = await supabase
          .from('marketplace_hero_stats')
          .select('*')
          .eq('hero_id', heroData.id)
          .order('display_order');
        setHeroStats(statsData || []);
      }

      // Fetch services
      const { data: servicesData } = await supabase
        .from('marketplace_programs')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      setServices(servicesData || []);

      // Fetch stats
      const { data: statsData } = await supabase
        .from('marketplace_stats')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      setStats(statsData || []);

      // Fetch features
      const { data: featuresData } = await supabase
        .from('marketplace_features')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      setFeatures(featuresData || []);

      // Fetch professionals
      const { data: professionalsData } = await supabase
        .from('marketplace_professionals')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      setProfessionals(professionalsData || []);

      // Fetch testimonials
      const { data: testimonialsData } = await supabase
        .from('marketplace_testimonials')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      setTestimonials(testimonialsData || []);

      // Fetch partners
      const { data: partnersData } = await supabase
        .from('marketplace_partners')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      setPartners(partnersData || []);

      // Fetch FAQs
      const { data: faqsData } = await supabase
        .from('marketplace_faqs')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      setFaqs(faqsData || []);

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      {/* Hero Section - Imarticus Style */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {hero?.title || 'Transform Your Career with Industry-Leading Services'}
              </h1>
              <p className="text-xl text-blue-100 mb-4">
                {hero?.subtitle || 'Expert Services, Professional Certification, Career Growth'}
              </p>
              <p className="text-lg text-blue-200 mb-8">
                {hero?.description || 'Join thousands of professionals who have upskilled'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a
                  href={hero?.cta_primary_link || '#services'}
                  className="inline-flex items-center justify-center bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl"
                >
                  {hero?.cta_primary_text || 'Explore Services'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
                <a
                  href={hero?.cta_secondary_link || '#contact'}
                  className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all"
                >
                  {hero?.cta_secondary_text || 'Talk to Counselor'}
                </a>
              </div>

              {/* Hero Stats */}
              {heroStats.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {heroStats.map((stat) => (
                    <div key={stat.id} className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-blue-200">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right Image/Video */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {hero?.hero_image ? (
                <img
                  src={hero.hero_image}
                  alt="Hero"
                  className="w-full rounded-2xl shadow-2xl"
                />
              ) : (
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center">
                  <Play className="w-24 h-24 mx-auto text-white/50 mb-4" />
                  <p className="text-white/70">Video Placeholder</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      {stats.length > 0 && (
        <section className="bg-gray-50 border-y border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">{stat.label}</div>
                  {stat.description && (
                    <div className="text-xs text-gray-600">{stat.description}</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {services.length > 0 && (
        <section id="services" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our <span className="text-blue-600">Services</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional services designed to accelerate your career growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-2xl transition-all duration-300 group"
                >
                  {service.is_featured && (
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-center py-2 text-sm font-bold">
                      ⭐ Most Popular
                    </div>
                  )}

                  {service.image_url && (
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {service.category && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                          {service.category}
                        </span>
                      )}
                      {service.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-bold">{service.rating}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 mb-6 line-clamp-2">
                      {service.short_description}
                    </p>

                    {service.price > 0 && (
                      <div className="mb-4 pb-4 border-b border-gray-200">
                        <div className="text-sm text-gray-500 mb-1">Price starting from</div>
                        {service.original_price && service.original_price > service.price && (
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-gray-400 line-through text-sm">
                              ₹{service.original_price.toLocaleString()}
                            </span>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded">
                              {Math.round(((service.original_price - service.price) / service.original_price) * 100)}% OFF
                            </span>
                          </div>
                        )}
                        <div className="text-3xl font-bold text-gray-900">
                          ₹{service.price.toLocaleString()}
                        </div>
                      </div>
                    )}

                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                      View Details
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Industry Professionals Section */}
      {professionals.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Meet Our <span className="text-blue-600">Industry Professionals</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Learn from experienced professionals who are leaders in their fields
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {professionals.map((professional, index) => (
                <motion.div
                  key={professional.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Professional Image */}
                  <div className="relative h-64 bg-gradient-to-br from-blue-100 to-indigo-100 overflow-hidden">
                    {professional.image_url ? (
                      <img
                        src={professional.image_url}
                        alt={professional.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                          {professional.name.charAt(0)}
                        </div>
                      </div>
                    )}
                    {professional.years_experience && (
                      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {professional.years_experience}+ Years
                      </div>
                    )}
                  </div>

                  {/* Professional Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {professional.name}
                    </h3>
                    <p className="text-sm font-semibold text-blue-600 mb-1">
                      {professional.title}
                    </p>
                    {professional.company && (
                      <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {professional.company}
                      </p>
                    )}

                    {professional.bio && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {professional.bio}
                      </p>
                    )}

                    {/* Expertise Tags */}
                    {professional.expertise && professional.expertise.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {professional.expertise.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Links */}
                    <div className="flex flex-col gap-2">
                      {professional.linkedin_url && (
                        <a
                          href={professional.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                        >
                          <Linkedin className="w-4 h-4" />
                          Connect on LinkedIn
                        </a>
                      )}
                      {professional.website_url && (
                        <a
                          href={professional.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all"
                        >
                          Visit Website
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {features.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose <span className="text-blue-600">Us</span>
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to succeed in your learning journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Success <span className="text-blue-600">Stories</span>
              </h2>
              <p className="text-xl text-gray-600">
                Hear from our successful students
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                >
                  <Quote className="w-10 h-10 text-blue-600 mb-4" />
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  
                  <div className="flex items-center gap-4">
                    {testimonial.image_url ? (
                      <img
                        src={testimonial.image_url}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      {testimonial.company && (
                        <div className="text-sm text-blue-600 font-semibold">{testimonial.company}</div>
                      )}
                    </div>
                  </div>

                  {testimonial.rating && (
                    <div className="flex gap-1 mt-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partners Section */}
      {partners.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Our <span className="text-blue-600">Hiring Partners</span>
              </h2>
              <p className="text-gray-600">Trusted by leading companies worldwide</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
              {partners.map((partner) => (
                <div key={partner.id} className="flex items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all">
                  {partner.logo_url ? (
                    <img
                      src={partner.logo_url}
                      alt={partner.name}
                      className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all"
                    />
                  ) : (
                    <Building2 className="w-12 h-12 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />

      {/* Newsletter Section */}
      <Newsletter />

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of successful professionals. Start your journey today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-xl">
              Enroll Now
            </button>
            <button className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all">
              Download Brochure
            </button>
          </div>

          <div className="flex items-center justify-center gap-8 mt-12 text-white/90">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>100% Placement Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>EMI Options Available</span>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
};

export default MarketplaceImarticus;
