import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const DynamicHomeSection = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from('home_sections')
        .select(`
          *,
          home_section_items(*)
        `)
        .eq('is_active', true)
        .order('display_order');
      
      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || sections.length === 0) return null;

  return (
    <>
      {sections.map((section) => (
        <section
          key={section.id}
          className="py-20"
          style={{ backgroundColor: section.background_color || '#ffffff' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            {(section.title || section.subtitle) && (
              <div className="text-center mb-16">
                {section.title && (
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                )}
                {section.subtitle && (
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    {section.subtitle}
                  </p>
                )}
              </div>
            )}

            {/* Section Content */}
            {section.layout_type === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.home_section_items?.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
                  >
                    {item.icon && (
                      <div className="text-4xl mb-4">{item.icon}</div>
                    )}
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    {item.title && (
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p className="text-gray-600 mb-4">{item.description}</p>
                    )}
                    {item.link_url && (
                      <a
                        href={item.link_url}
                        className="text-blue-600 font-semibold hover:text-blue-700"
                      >
                        Learn More →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            {section.layout_type === 'list' && (
              <div className="space-y-6">
                {section.home_section_items?.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-6 shadow-lg flex items-start gap-6"
                  >
                    {item.icon && (
                      <div className="text-4xl flex-shrink-0">{item.icon}</div>
                    )}
                    <div className="flex-1">
                      {item.title && (
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                      )}
                      {item.description && (
                        <p className="text-gray-600">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </>
  );
};

export default DynamicHomeSection;
