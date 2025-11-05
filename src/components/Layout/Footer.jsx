import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Send,
  Youtube,
  Globe,
  ChevronRight,
} from "lucide-react";
import logo from "../../assets/logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fillRule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        ></div>
      </div>

      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

      <div className="relative z-10 max-w-7xl mx-auto py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-4 md:col-span-2">
            <div className="group">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start mb-6 transition-transform duration-500 hover:scale-105">
                <div className="relative">
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-16 sm:h-20 w-auto mb-4 sm:mb-0 drop-shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="sm:ml-4 text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-blue-600">
                    ANTECHOS INDIA
                  </div>
                  <div className="text-sm sm:text-md text-orange-500 font-medium">
                    XI SERVICES PRIVATE LIMITED
                  </div>
                </div>
              </div>

              <p className="mb-6 text-gray-600 leading-relaxed text-center sm:text-left hover:text-gray-900 transition-colors duration-300">
                Empowering individuals with industry-relevant skills,
                personalized learning paths, and mentorship to transform careers
                and lives.
              </p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-6">
                {["Education", "Skill Development", "Career Growth", "Mentorship"].map(
                  (tag, i) => (
                    <span
                      key={i}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-3 py-1.5 rounded-full font-medium transform transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 cursor-default"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>

              <div className="flex justify-center sm:justify-start gap-3 mb-6">
                {[
                  { icon: <Linkedin size={18} />, link: "https://linkedin.com/company/antechos", color: "hover:bg-blue-600 hover:text-white hover:shadow-blue-500/50" },
                  { icon: <Facebook size={18} />, link: "https://facebook.com/antechos", color: "hover:bg-blue-700 hover:text-white hover:shadow-blue-700/50" },
                  { icon: <Instagram size={18} />, link: "https://instagram.com/antechos", color: "hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white hover:shadow-pink-500/50" },
                  { icon: <Twitter size={18} />, link: "https://twitter.com/antechos", color: "hover:bg-blue-500 hover:text-white hover:shadow-blue-500/50" },
                  { icon: <Youtube size={18} />, link: "https://youtube.com/antechos", color: "hover:bg-red-600 hover:text-white hover:shadow-red-500/50" },
                ].map(({ icon, link, color }, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-11 h-11 rounded-xl bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 ${color} transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:shadow-lg group`}
                  >
                    <div className="group-hover:scale-110 transition-transform duration-200">
                      {icon}
                    </div>
                  </a>
                ))}
              </div>

              <p className="text-gray-500 text-center sm:text-left text-sm leading-relaxed">
                Follow us on social media for updates, educational content, and success stories.
              </p>
            </div>
          </div>

          {/* Footer Sections */}
          <div className="lg:col-span-2"><FooterSection title="Quick Links" links={[{ label: "About Us", path: "/about" },{ label: "Courses", path: "/courses" },{ label: "Marketplace", path: "/marketplace" },{ label: "Universities", path: "/universities" },{ label: "Contact Us", path: "/contact" }]} /></div>
          <div className="lg:col-span-2"><FooterSection title="Resources" links={[{ label: "Blog", path: "/blog" },{ label: "Events", path: "/events" },{ label: "Success Stories", path: "/testimonials" },{ label: "FAQs", path: "/faq" },{ label: "Careers", path: "/career" }]} /></div>
          <div className="lg:col-span-2"><FooterSection title="Legal" links={[{ label: "Privacy Policy", path: "/privacy" },{ label: "Terms of Service", path: "/terms" },{ label: "Refund Policy", path: "/refund" },{ label: "Sitemap", path: "/sitemap" },{ label: "Accessibility", path: "/accessibility" }]} /></div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent relative">
              Contact Info
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"></div>
            </h3>
            <ul className="space-y-4">
              <FooterContact icon={<Mail size={16} />} label="connect@antechosindia.com" href="mailto:connect@antechos.com" />
              <FooterContact icon={<Phone size={16} />} label="+91-7057980564" href="tel:+917057980564" />
              <FooterContact icon={<MapPin size={16} />} label="New Delhi, India" />
              <FooterContact icon={<Globe size={16} />} label="Antechosindia.com" href="https://antechosindia.com" />
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 lg:p-8 border border-blue-200 shadow-lg">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h4 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Subscribe to our Newsletter
                </h4>
                <p className="text-gray-600 text-sm">Get the latest updates on courses, events, and career opportunities.</p>
              </div>
              <div className="flex-shrink-0">
                <div className="flex flex-col sm:flex-row items-stretch gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full sm:w-72 px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-sm"
                  />
                  <button
                    onClick={handleNewsletterSubmit}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                  >
                    <Send size={16} /> Subscribe
                  </button>
                </div>
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 p-3 bg-green-50 border border-green-300 rounded-lg shadow-sm"
                    >
                      <p className="text-green-700 text-sm font-medium text-center sm:text-left">
                        ✓ Thank you for subscribing!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-center md:text-left">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Antechos India XI Services Private Limited. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              Crafted with ❤️ for empowering careers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterSection = ({ title, links }) => (
  <div className="group">
    <h3 className="text-lg font-bold mb-6 text-gray-900 relative">
      {title}
      <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </h3>
    <ul className="space-y-3">
      {links.map(({ label, path }, i) => (
        <li key={i}>
          <Link
            to={path}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-all duration-300 hover:translate-x-2 group"
          >
            <ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue-600" />
            <span className="group-hover:font-medium transition-all duration-300">{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const FooterContact = ({ icon, label, href }) => (
  <li className="group">
    <div className="flex items-center gap-3 transition-all duration-300">
      <span className="text-orange-500 group-hover:text-orange-600 transition-colors duration-300 p-2 bg-orange-50 rounded-lg group-hover:scale-110">
        {icon}
      </span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-gray-900 transition-colors duration-300 font-medium hover:underline"
        >
          {label}
        </a>
      ) : (
        <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 font-medium">
          {label}
        </span>
      )}
    </div>
  </li>
);

export default Footer;