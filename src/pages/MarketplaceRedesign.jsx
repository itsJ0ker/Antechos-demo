import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { ArrowRight, Download, ChevronLeft, ChevronRight, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MarketplaceRedesign = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    hero: null,
    partners: [],
    banner: [],
    features: [],
    slides: [],
    metrics: [],
    resources: null,
    businessDeserves: null,
    hireBlocks: [],
    professionals: [],
    testimonials: [],
    solutions: [],
    teams: []
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAllSolutions, setShowAllSolutions] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [
        heroRes, partnersRes, bannerRes, featuresRes, slidesRes,
        metricsRes, resourcesRes, businessRes, hireRes, profRes,
        testimonialsRes, solutionsRes, teamsRes
      ] = await Promise.all([
        supabase.from('marketplace_hero').select('*').single(),
        supabase.from('marketplace_partners').select('*').eq('is_active', true).order('order_index'),
        supabase.from('marketplace_banner').select('*').eq('is_active', true).order('order_index'),
        supabase.from('marketplace_features').select('*').eq('is_active', true).order('order_index'),
        supabase.from('marketplace_slides').select('*').eq('is_active', true).order('order_index'),
        supabase.from('marketplace_metrics').select('*').eq('is_active', true).order('order_index'),
        supabase.from('marketplace_resources').select('*').eq('is_active', true).single(),
        supabase.from('marketplace_business_deserves').select('*').eq('is_active', true).single(),
        supabase.from('marketplace_hire_blocks').select('*').eq('is_active', true).order('order_index'),
        supabase.from('marketplace_professionals').select('*').eq('is_active', true).order('order_index'),
        supabase.from('marketplace_testimonials').select('*').eq('is_active', true).order('order_index'),
        supabase.from('marketplace_solutions').select('*').eq('is_active', true).order('order_index'),
        supabase.from('marketplace_teams').select('*').eq('is_active', true).order('order_index')
      ]);

      setData({
        hero: heroRes.data,
        partners: partnersRes.data || [],
        banner: bannerRes.data || [],
        features: featuresRes.data || [],
        slides: slidesRes.data || [],
        metrics: metricsRes.data || [],
        resources: resourcesRes.data,
        businessDeserves: businessRes.data,
        hireBlocks: hireRes.data || [],
        professionals: profRes.data || [],
        testimonials: testimonialsRes.data || [],
        solutions: solutionsRes.data || [],
        teams: teamsRes.data || []
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const DonutChart = ({ percentage, label, color = '#3b82f6' }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle cx="64" cy="64" r={radius} stroke="#374151" strokeWidth="10" fill="none" />
            <circle
              cx="64" cy="64" r={radius} stroke={color} strokeWidth="10" fill="none"
              strokeDasharray={circumference} strokeDashoffset={offset}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{percentage}%</span>
          </div>
        </div>
        <p className="mt-3 text-sm font-semibold text-gray-300 text-center">{label}</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const visibleSolutions = showAllSolutions ? data.solutions : data.solutions.filter(s => s.is_visible_initially);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      {data.hero && (
        <section 
          className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: data.hero.background_image_url ? `url(${data.hero.background_image_url})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left Image */}
            {data.hero.left_image_url && (
              <div className="hidden lg:block">
                <img src={data.hero.left_image_url} alt="Left" className="rounded-2xl shadow-2xl w-full h-64 object-cover" />
              </div>
            )}

            {/* Center Content */}
            <div className="text-center text-white lg:col-span-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.hero.title}</h1>
              {data.hero.subtitle && (
                <p className="text-2xl font-semibold mb-6">{data.hero.subtitle}</p>
              )}
              {data.hero.bullet_points && data.hero.bullet_points.length > 0 && (
                <ul className="space-y-3 text-lg">
                  {data.hero.bullet_points.map((point, idx) => (
                    <li key={idx} className="flex items-center justify-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Right Image */}
            {data.hero.right_image_url && (
              <div className="hidden lg:block">
                <img src={data.hero.right_image_url} alt="Right" className="rounded-2xl shadow-2xl w-full h-64 object-cover" />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Partners Section */}
      {data.partners.length > 0 && (
        <section className="py-12 bg-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-8 text-white">
              Benefit of Network of {data.partners.length}+ Partners
            </h2>
            <div className="overflow-x-auto">
              <div className="flex gap-8 justify-center items-center min-w-max px-4">
                {data.partners.map((partner) => (
                  <div key={partner.id} className="flex-shrink-0">
                    <img src={partner.logo_url} alt={partner.name} className="h-16 object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Banner Section */}
      {data.banner.length > 0 && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-6">
            {data.banner.map((banner) => (
              <div key={banner.id} className="rounded-2xl overflow-hidden shadow-lg">
                <img src={banner.image_url} alt="Banner" className="w-full h-64 md:h-96 object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features Section */}
      {data.features.length > 0 && (
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Accept the change that make it grow</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.features.map((feature) => (
                <div key={feature.id} className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-900/50 flex items-center justify-center overflow-hidden">
                    <img src={feature.icon_url} alt={feature.title} className="w-12 h-12 object-contain" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Slider Section */}
      {data.slides.length > 0 && (
        <section className="py-16 bg-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="bg-gray-700 p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-white">{data.slides[currentSlide]?.heading}</h3>
                <p className="text-gray-300 leading-relaxed">{data.slides[currentSlide]?.body}</p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={data.slides[currentSlide]?.image_url} 
                  alt={data.slides[currentSlide]?.heading}
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-4 mt-8">
              <button 
                onClick={() => setCurrentSlide((prev) => (prev - 1 + data.slides.length) % data.slides.length)}
                className="p-2 rounded-full bg-gray-700 shadow-md hover:bg-gray-600 text-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex gap-2">
                {data.slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === currentSlide ? 'bg-blue-500 w-8' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setCurrentSlide((prev) => (prev + 1) % data.slides.length)}
                className="p-2 rounded-full bg-gray-700 shadow-md hover:bg-gray-600 text-white"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Metrics Section */}
      {data.metrics.length > 0 && (
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-12">
              {data.metrics.map((metric) => (
                <DonutChart
                  key={metric.id}
                  percentage={metric.primary_percentage}
                  label={metric.label}
                  color={metric.color}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Resources Section */}
      {data.resources && (
        <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-white">{data.resources.heading}</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">{data.resources.description}</p>
                <a
                  href={data.resources.download_url}
                  download
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all"
                >
                  <Download className="w-5 h-5" />
                  {data.resources.button_text}
                </a>
              </div>
              {data.resources.image_url_9_16 && (
                <div className="flex justify-center">
                  <div className="relative">
                    <img 
                      src={data.resources.image_url_9_16} 
                      alt="Resource"
                      className="rounded-2xl shadow-2xl w-80 h-[560px] object-cover"
                    />
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="w-12 h-12 text-blue-500" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Business Deserves Section */}
      {data.businessDeserves && (
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">{data.businessDeserves.main_heading}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Left: Numbered List */}
              <div className="space-y-4">
                {data.businessDeserves.left_points && data.businessDeserves.left_points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-gray-300 pt-1">{point}</p>
                  </div>
                ))}
              </div>

              {/* Center: Image */}
              {data.businessDeserves.center_image_url_9_16 && (
                <div className="flex justify-center">
                  <img 
                    src={data.businessDeserves.center_image_url_9_16} 
                    alt="Business"
                    className="rounded-2xl shadow-2xl w-64 h-[448px] object-cover"
                  />
                </div>
              )}

              {/* Right: Description */}
              <div>
                <h3 className="text-2xl font-bold mb-3 text-white">{data.businessDeserves.right_heading}</h3>
                <p className="text-lg text-gray-300 mb-4">{data.businessDeserves.right_subheading}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hire Blocks Section with Featured Professionals after first block */}
      {data.hireBlocks.length > 0 && (
        <>
          <section className="py-16 bg-gray-800">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">Hire the Best for your Perfect Project</h2>
              <div className="space-y-16">
                {/* First Hire Block */}
                {data.hireBlocks[0] && (
                  <div 
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                      data.hireBlocks[0].image_position === 'right' ? 'lg:grid-flow-dense' : ''
                    }`}
                  >
                    <div className={data.hireBlocks[0].image_position === 'right' ? 'lg:col-start-2' : ''}>
                      <img 
                        src={data.hireBlocks[0].image_url} 
                        alt={data.hireBlocks[0].category_name}
                        className="rounded-2xl shadow-lg w-full h-80 object-cover"
                      />
                    </div>
                    <div className={data.hireBlocks[0].image_position === 'right' ? 'lg:col-start-1 lg:row-start-1' : ''}>
                      <h3 className="text-2xl font-bold mb-2 text-white">{data.hireBlocks[0].category_name}</h3>
                      <p className="text-xl text-gray-300 mb-4">{data.hireBlocks[0].description_title}</p>
                      <ul className="space-y-2">
                        {data.hireBlocks[0].bullet_points && data.hireBlocks[0].bullet_points.map((point, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-400">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Featured Professionals */}
          {data.professionals.length > 0 && (
            <section className="py-16 bg-gray-900">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-white">Featured Professionals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {data.professionals.map((prof) => (
                    <div key={prof.id} className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-700">
                      <img src={prof.image_url} alt={prof.name} className="w-full h-64 object-cover" />
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-1 text-white">{prof.name}</h3>
                        <p className="text-blue-400 text-sm mb-3">{prof.role}</p>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{prof.short_bio}</p>
                        <button
                          onClick={() => setSelectedProfessional(prof)}
                          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Second Hire Block (Skilled Workforce) */}
          {data.hireBlocks.length > 1 && (
            <section className="py-16 bg-gray-800">
              <div className="max-w-7xl mx-auto px-6">
                <div className="space-y-16">
                  <div 
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                      data.hireBlocks[1].image_position === 'right' ? 'lg:grid-flow-dense' : ''
                    }`}
                  >
                    <div className={data.hireBlocks[1].image_position === 'right' ? 'lg:col-start-2' : ''}>
                      <img 
                        src={data.hireBlocks[1].image_url} 
                        alt={data.hireBlocks[1].category_name}
                        className="rounded-2xl shadow-lg w-full h-80 object-cover"
                      />
                    </div>
                    <div className={data.hireBlocks[1].image_position === 'right' ? 'lg:col-start-1 lg:row-start-1' : ''}>
                      <h3 className="text-2xl font-bold mb-2 text-white">{data.hireBlocks[1].category_name}</h3>
                      <p className="text-xl text-gray-300 mb-4">{data.hireBlocks[1].description_title}</p>
                      <ul className="space-y-2">
                        {data.hireBlocks[1].bullet_points && data.hireBlocks[1].bullet_points.map((point, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-gray-400">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Teams Section */}
          {data.teams.length > 0 && (
            <section className="py-16 bg-gray-900">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-12 text-white">Teams that make it possible</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {data.teams.map((member) => (
                    <div key={member.id} className="text-center">
                      <img 
                        src={member.image_url} 
                        alt={member.name}
                        className="w-32 h-32 mx-auto rounded-full object-cover mb-4 shadow-lg"
                      />
                      <h4 className="font-bold text-white">{member.name}</h4>
                      <p className="text-sm text-gray-400">{member.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Remaining Hire Blocks (3rd onwards) */}
          {data.hireBlocks.length > 2 && (
            <section className="py-16 bg-gray-800">
              <div className="max-w-7xl mx-auto px-6">
                <div className="space-y-16">
                  {data.hireBlocks.slice(2).map((block) => (
                    <div 
                      key={block.id}
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                        block.image_position === 'right' ? 'lg:grid-flow-dense' : ''
                      }`}
                    >
                      <div className={block.image_position === 'right' ? 'lg:col-start-2' : ''}>
                        <img 
                          src={block.image_url} 
                          alt={block.category_name}
                          className="rounded-2xl shadow-lg w-full h-80 object-cover"
                        />
                      </div>
                      <div className={block.image_position === 'right' ? 'lg:col-start-1 lg:row-start-1' : ''}>
                        <h3 className="text-2xl font-bold mb-2 text-white">{block.category_name}</h3>
                        <p className="text-xl text-gray-300 mb-4">{block.description_title}</p>
                        <ul className="space-y-2">
                          {block.bullet_points && block.bullet_points.map((point, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-gray-400">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Testimonials Carousel */}
      {data.testimonials.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">What our clients say about us</h2>
            <div className="relative h-96 overflow-hidden">
              <div 
                ref={testimonialsRef}
                className="animate-scroll-up space-y-6"
              >
                {[...data.testimonials, ...data.testimonials].map((testimonial, idx) => (
                  <div key={`${testimonial.id}-${idx}`} className="bg-gray-700 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto border border-gray-600">
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={testimonial.avatar_url} 
                        alt={testimonial.client_name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-white">{testimonial.client_name}</h4>
                        <p className="text-sm text-gray-400">{testimonial.company}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Comprehensive Solutions / Services */}
      {data.solutions.length > 0 && (
        <section id="services" className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Our <span className="text-blue-500">Services</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Professional services designed to accelerate your career growth
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleSolutions.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 border-2 border-gray-700 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-2xl transition-all duration-300 group"
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
                        <span className="px-3 py-1 bg-blue-900/50 text-blue-400 rounded-full text-xs font-bold">
                          {service.category}
                        </span>
                      )}
                      {service.rating && service.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-bold text-gray-300">{service.rating}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 mb-6 line-clamp-2">
                      {service.short_description || service.description}
                    </p>
                    {service.price > 0 && (
                      <div className="mb-4 pb-4 border-b border-gray-700">
                        <div className="text-sm text-gray-500 mb-1">Price starting from</div>
                        {service.original_price && service.original_price > service.price && (
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-gray-500 line-through text-sm">
                              ₹{service.original_price.toLocaleString()}
                            </span>
                            <span className="px-2 py-0.5 bg-green-900/50 text-green-400 text-xs font-bold rounded">
                              {Math.round(((service.original_price - service.price) / service.original_price) * 100)}% OFF
                            </span>
                          </div>
                        )}
                        <div className="text-3xl font-bold text-white">
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
            {data.solutions.length > visibleSolutions.length && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAllSolutions(!showAllSolutions)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
                >
                  {showAllSolutions ? 'Show Less' : 'View More Services'}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Professional Modal */}
      <AnimatePresence>
        {selectedProfessional && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProfessional(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl max-w-2xl w-full p-8 relative border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProfessional(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex flex-col md:flex-row gap-6">
                <img 
                  src={selectedProfessional.image_url} 
                  alt={selectedProfessional.name}
                  className="w-48 h-48 rounded-2xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-white">{selectedProfessional.name}</h3>
                  <p className="text-blue-400 font-semibold mb-4">{selectedProfessional.role}</p>
                  <p className="text-gray-300 mb-4">{selectedProfessional.short_bio}</p>
                  {selectedProfessional.website_url && (
                    <a
                      href={selectedProfessional.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:underline"
                    >
                      Visit Website <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scroll-up {
          animation: scroll-up 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MarketplaceRedesign;
