import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = ({ faqs = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const defaultFaqs = [
    {
      question: 'What are the prerequisites for enrolling?',
      answer: 'Most of our programs are designed for beginners to intermediate learners. Basic computer knowledge and enthusiasm to learn are the main prerequisites. Specific requirements vary by program.'
    },
    {
      question: 'Do you provide placement assistance?',
      answer: 'Yes! We offer 100% placement assistance with our dedicated placement team. We have partnerships with 500+ companies and provide resume building, interview preparation, and job referrals.'
    },
    {
      question: 'What is the duration of the programs?',
      answer: 'Program duration varies from 3 to 6 months depending on the course. All programs include live classes, recorded sessions, hands-on projects, and lifetime access to course materials.'
    },
    {
      question: 'Are EMI options available?',
      answer: 'Yes, we offer flexible EMI options starting from ₹5,000/month. We also provide scholarships and early bird discounts. Contact our counselors for personalized payment plans.'
    },
    {
      question: 'Will I get a certificate?',
      answer: 'Yes, upon successful completion, you will receive an industry-recognized certificate that you can add to your LinkedIn profile and resume. Our certificates are valued by top companies.'
    },
    {
      question: 'Can I access course materials after completion?',
      answer: 'Absolutely! You get lifetime access to all course materials, including video lectures, assignments, projects, and any future updates to the curriculum.'
    }
  ];

  const faqList = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Got questions? We've got answers!
          </p>
        </div>

        <div className="space-y-4">
          {faqList.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:border-blue-300 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-bold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all hover:shadow-lg">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
