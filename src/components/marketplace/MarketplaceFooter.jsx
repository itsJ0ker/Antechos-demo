import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Platform: ['Find Talent', 'Post a Project', 'Enterprise', 'Pricing', 'AI Matching'],
  Resources: ['Blog', 'Help Center', 'API Docs', 'Community', 'Case Studies'],
  Company: ['About Us', 'Careers', 'Press', 'Contact', 'Partners'],
  Legal: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Security'],
};

const MarketplaceFooter = () => (
  <footer className="relative pt-16 pb-8 overflow-hidden"
    style={{ background: 'linear-gradient(180deg, var(--mp-surface-0), var(--mp-violet-950))' }}>

    {/* Top divider */}
    <div className="mp-section-divider mb-16" />

    <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-16">
        {Object.entries(footerLinks).map(([category, links], ci) => (
          <motion.div key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-sm font-bold text-white/60 mb-4 uppercase tracking-wider"
              style={{ fontFamily: 'var(--mp-font-display)', fontSize: '11px' }}>
              {category}
            </h4>
            <ul className="space-y-2.5">
              {links.map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/30 hover:text-white/70 transition-colors flex items-center gap-1 group"
                    style={{ fontFamily: 'var(--mp-font-body)' }}>
                    {link}
                    <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--mp-violet-600), var(--mp-violet-500))' }}>
            <span className="text-xs font-bold text-white" style={{ fontFamily: 'var(--mp-font-display)' }}>A</span>
          </div>
          <span className="text-sm font-semibold text-white/50" style={{ fontFamily: 'var(--mp-font-display)' }}>Antechos</span>
        </div>

        <p className="text-xs text-white/20" style={{ fontFamily: 'var(--mp-font-mono)' }}>
          © {new Date().getFullYear()} Antechos. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default MarketplaceFooter;
