import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  Globe, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Headphones
} from "lucide-react";
import { submitEnquiry } from "../../lib/supabase";

export default function EnquiryPopup({ onClose, onSubmit, isInline = false }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    country: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const enquiryData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        course_interest: formData.course,
        country: formData.country,
        source: 'executive_consulting_popup'
      };
      
      const { error } = await submitEnquiry(enquiryData);
      
      if (error) throw error;
      
      setSubmitted(true);
      if (onSubmit) onSubmit(formData);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);

    } catch (error) {
      console.error('Submission Error:', error);
      alert('Security Verification: We encountered a temporary sync issue. Please retry in a moment.');
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="enquiry-form"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.95 }}
            className="relative bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] rounded-[2.5rem] md:rounded-[3rem] p-6 sm:p-10 md:p-12 max-w-xl w-full border border-slate-100 overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-50 rounded-full blur-3xl pointer-events-none opacity-50"></div>
            
            {!isInline && (
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-slate-400 hover:text-slate-900 transition-all bg-slate-100/50 hover:bg-slate-100 p-3 md:p-2 rounded-full z-[110]"
              aria-label="Close popup"
            >
              <X className="w-6 h-6 md:w-5 md:h-5" />
            </button>
            )}

            <div className="relative mb-12">
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-6">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Secure Intelligence Portal</span>
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-4 font-display leading-[1.1]">
                Executive Academic <span className="text-indigo-600">Consultation</span>
              </h2>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                Connect with our senior architects to design your optimized educational trajectory.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="group relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <input
                    type="text"
                    name="name"
                    placeholder="FULL NAME"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-5 pl-14 pr-6 text-xs font-black text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all placeholder:text-slate-300 placeholder:uppercase"
                  />
                </div>
                <div className="group relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    placeholder="EMAIL ADDRESS"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-5 pl-14 pr-6 text-xs font-black text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all placeholder:text-slate-300 placeholder:uppercase"
                  />
                </div>
              </div>

              <div className="group relative">
                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="TELEPHONE CONTACT"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-5 pl-14 pr-6 text-xs font-black text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all placeholder:text-slate-300 placeholder:uppercase"
                />
              </div>

              <div className="group relative">
                <BookOpen className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="text"
                  name="course"
                  placeholder="TARGET ACADEMIC PROGRAM"
                  required
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-5 pl-14 pr-6 text-xs font-black text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all placeholder:text-slate-300 placeholder:uppercase"
                />
              </div>

              <div className="group relative">
                <Globe className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="text"
                  name="country"
                  placeholder="GEOGRAPHIC LOCATION"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-5 pl-14 pr-6 text-xs font-black text-slate-900 outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all placeholder:text-slate-300 placeholder:uppercase"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-6 rounded-[2rem] transition-all flex items-center justify-center gap-4 text-xs tracking-[0.3em] uppercase group"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Initialize Handshake</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-6 pt-6 opacity-30">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3" />
                  <span className="text-[8px] font-black uppercase tracking-widest">256-Bit SSL</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3" />
                  <span className="text-[8px] font-black uppercase tracking-widest">UGC Compliant</span>
                </div>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success-message"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-white p-12 md:p-20 rounded-[3rem] md:rounded-[4rem] text-center max-w-lg w-full border border-slate-100 shadow-2xl shadow-indigo-500/10"
          >
            {!isInline && (
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-slate-400 hover:text-slate-900 transition-all bg-slate-100/50 hover:bg-slate-100 p-3 md:p-2 rounded-full z-[110]"
              aria-label="Close popup"
            >
              <X className="w-6 h-6 md:w-5 md:h-5" />
            </button>
            )}

            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10 text-green-500 border border-green-100">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-4xl font-black text-slate-900 mb-6 font-display">Communication Live</h3>
            <p className="text-slate-500 font-semibold text-lg leading-relaxed mb-10">
              Handshake initialized successfully. An executive admissions partner will penetrate your contact orbit shortly.
            </p>
            {!isInline && (
            <button 
              onClick={onClose}
              className="px-12 py-5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-slate-800 transition-all"
            >
              Monitor Dashboard
            </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
  );

  if (isInline) {
    return <div className="w-full">{formContent}</div>;
  }

  return (
    <div 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl flex justify-center items-center z-[1000] p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      {formContent}
    </div>
  );
}
