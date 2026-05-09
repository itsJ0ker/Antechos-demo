import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown, Globe, Shield } from 'lucide-react';

export const NavbarV2 = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Find Talent', href: '#', hasDropdown: true },
    { name: 'Find Work', href: '#', hasDropdown: true },
    { name: 'Solutions', href: '#', hasDropdown: false },
    { name: 'Pricing', href: '#', hasDropdown: false },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      scrolled ? 'py-3' : 'py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`relative flex items-center justify-between px-4 py-2 rounded-2xl transition-all duration-300 ${
          scrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/50 border border-slate-200/50' 
          : 'bg-transparent'
        }`}>
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-black text-xl">A</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Antechos</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="group flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={14} className="text-slate-400 group-hover:text-indigo-400 transition-colors" />}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors px-4 py-2">
              Log in
            </button>
            <button className="v2-btn v2-btn-primary !px-5 !py-2.5">
              Sign up
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 p-6 bg-white border-b border-slate-200 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} className="text-lg font-bold text-slate-800">
                  {link.name}
                </a>
              ))}
              <hr className="border-slate-100" />
              <div className="flex flex-col gap-3">
                <button className="v2-btn v2-btn-secondary w-full py-3">Log in</button>
                <button className="v2-btn v2-btn-primary w-full py-3">Sign up</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
