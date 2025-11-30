import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ArrowRight, Check, Star, Sparkles, Shield, Zap, Clock, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Marketplace = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('marketplace_services')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {/* Modern Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left Content */}
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-bold mb-6 w-fit border border-blue-500/30">
                  <Sparkles className="w-4 h-4" />
                  Premium Services
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Transform
                  </span>
                  <br />
                  <span className="text-white">Your Business</span>
                </h1>
                
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  From web development to AI automation, we provide comprehensive solutions for your digital transformation journey
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-200">
                    Get Started Today
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                  <button className="inline-flex items-center justify-center bg-gray-800 border-2 border-gray-700 text-gray-300 px-8 py-4 rounded-xl font-bold hover:border-blue-500 hover:shadow-md transition-all duration-200">
                    View Portfolio
                  </button>
                </div>
              </div>

              {/* Right Stats */}
              <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-12 lg:p-16 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                  {[
                    { value: '500+', label: 'Projects Completed' },
                    { value: '98%', label: 'Client Satisfaction' },
                    { value: '24/7', label: 'Support Available' },
                    { value: '50+', label: 'Expert Team' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-blue-100">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Services Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-bold mb-4 border border-blue-500/30">
            <Star className="w-4 h-4" />
            Our Services
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Comprehensive <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Solutions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tailored services designed to accelerate your business growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 hover:border-blue-500"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {service.name}
              </h3>
              <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                {service.short_description}
              </p>
              {service.price_starting > 0 && (
                <div className="mb-6 pb-6 border-b border-gray-700">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Starting at</span>
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    ₹{service.price_starting.toLocaleString()}
                  </p>
                </div>
              )}
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modern Why Choose Us */}
      <section className="relative bg-gradient-to-b from-white via-blue-50 to-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Award className="w-4 h-4" />
              Why Choose Us
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Excellence in <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Every Project</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine expertise, quality, and dedication to deliver outstanding results
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: 'Expert Team', 
                desc: 'Skilled professionals with years of experience', 
                icon: <Users className="w-8 h-8" />,
                color: 'from-blue-500 to-indigo-500'
              },
              { 
                title: 'Quality Assured', 
                desc: 'Rigorous testing and quality control', 
                icon: <Check className="w-8 h-8" />,
                color: 'from-green-500 to-emerald-500'
              },
              { 
                title: '24/7 Support', 
                desc: 'Round-the-clock customer support', 
                icon: <Clock className="w-8 h-8" />,
                color: 'from-purple-500 to-pink-500'
              },
              { 
                title: 'Affordable Pricing', 
                desc: 'Competitive rates without compromising quality', 
                icon: <Star className="w-8 h-8" />,
                color: 'from-amber-500 to-orange-500'
              },
              { 
                title: 'Fast Delivery', 
                desc: 'Quick turnaround times for all projects', 
                icon: <Zap className="w-8 h-8" />,
                color: 'from-yellow-500 to-red-500'
              },
              { 
                title: 'Satisfaction Guaranteed', 
                desc: '100% satisfaction or money back', 
                icon: <Shield className="w-8 h-8" />,
                color: 'from-cyan-500 to-blue-500'
              },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-300"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <div className="text-white">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            Let's Work Together
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto">
            Contact us today and let's discuss how we can help your business grow with our comprehensive digital solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="group bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2">
              Contact Us Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-200">
              View Our Work
            </button>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-white/90">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span className="text-sm">Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span className="text-sm">Custom Solutions</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span className="text-sm">Dedicated Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span className="text-sm">Money-back Guarantee</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Marketplace;
