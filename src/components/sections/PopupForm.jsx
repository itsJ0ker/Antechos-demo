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
          className="relative bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2rem] p-6 md:p-8 max-w-2xl w-full border border-slate-100 max-h-[95dvh] overflow-x-hidden overflow-y-auto hide-scrollbar"
        >
          {/* Background Accent */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-50 rounded-full blur-3xl pointer-events-none opacity-60"></div>

          {!isInline && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-slate-400 hover:text-slate-900 transition-all bg-slate-50 hover:bg-slate-100 p-2 rounded-full z-[110]"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="relative mb-6 pr-4 md:pr-0">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-4">
              <ShieldCheck className="w-3 h-3" />
              <span>Secure Portal</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 font-display leading-tight">
              Executive <span className="text-blue-600">Consultation</span>
            </h2>
            <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed">
              Connect with our experts to map your educational trajectory.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group relative w-full">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10" />
                <input
                  type="text"
                  name="name"
                  placeholder="FULL NAME"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full text-ellipsis overflow-hidden whitespace-nowrap bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-600/10 focus:bg-white focus:border-blue-500 transition-all placeholder:text-slate-400 placeholder:uppercase"
                />
              </div>

              <div className="group relative w-full">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10" />
                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL ADDRESS"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full text-ellipsis overflow-hidden whitespace-nowrap bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-600/10 focus:bg-white focus:border-blue-500 transition-all placeholder:text-slate-400 placeholder:uppercase"
                />
              </div>

              <div className="group relative w-full">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="PHONE NUMBER"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full text-ellipsis overflow-hidden whitespace-nowrap bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-600/10 focus:bg-white focus:border-blue-500 transition-all placeholder:text-slate-400 placeholder:uppercase"
                />
              </div>

              <div className="group relative w-full">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10" />
                <input
                  type="text"
                  name="country"
                  placeholder="COUNTRY / LOCATION"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full text-ellipsis overflow-hidden whitespace-nowrap bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-600/10 focus:bg-white focus:border-blue-500 transition-all placeholder:text-slate-400 placeholder:uppercase"
                />
              </div>
            </div>

            <div className="group relative w-full">
              <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10" />
              <input
                type="text"
                name="course"
                placeholder="TARGET ACADEMIC PROGRAM"
                required
                value={formData.course}
                onChange={handleChange}
                className="w-full text-ellipsis overflow-hidden whitespace-nowrap bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold text-slate-900 outline-none focus:ring-4 focus:ring-blue-600/10 focus:bg-white focus:border-blue-500 transition-all placeholder:text-slate-400 placeholder:uppercase"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-slate-900 hover:bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg hover:shadow-blue-600/20 transition-all flex items-center justify-center gap-3 text-[10px] tracking-widest uppercase group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Submit Request</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 pt-2 opacity-50">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-slate-500" />
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">256-Bit SSL</span>
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
              className="absolute top-4 right-4 md:top-8 md:right-8 text-slate-400 hover:text-slate-900 transition-all bg-slate-100 hover:bg-slate-200 p-2 md:p-2 rounded-full z-[110]"
              aria-label="Close popup"
            >
              <X className="w-5 h-5 md:w-5 md:h-5" />
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
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex justify-center items-center z-[1000] p-4 pt-16 sm:pt-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      {formContent}
    </div>
  );
}
