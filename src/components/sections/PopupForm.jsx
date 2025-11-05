import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaBook, FaGlobe } from "react-icons/fa";
import { submitEnquiry } from "../../lib/supabase";

export default function EnquiryPopup({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    country: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Submit to Supabase
      const enquiryData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        course_interest: formData.course,
        country: formData.country,
        source: 'popup_form'
      };
      
      const { data, error } = await submitEnquiry(enquiryData);
      
      if (error) {
        console.error('Error submitting enquiry:', error);
        alert('There was an error submitting your enquiry. Please try again.');
        return;
      }
      
      setSubmitted(true); // ✅ show thank-you box
      onSubmit(formData);

      // Optional: reset form after submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        country: "",
      });

      // Optional: hide thank-you message after 4s
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      alert('There was an error submitting your enquiry. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-gradient-to-br from-indigo-50 to-white shadow-2xl rounded-2xl p-6 sm:p-8 max-w-lg w-full"
      >
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
         Get In Touch With Us
        </h2>

        {/* ✅ Thank you message */}
        {submitted && (
          <div className="text-center py-3 mb-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-green-600">
              🎉 Thank You!
            </h3>
            <p className="text-gray-600 text-sm">
              Your enquiry has been submitted successfully. Our team will
              contact you soon.
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
            <FaUser className="text-indigo-500 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
            <FaEnvelope className="text-indigo-500 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
            <FaPhone className="text-indigo-500 mr-2" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Course Interest */}
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
            <FaBook className="text-indigo-500 mr-2" />
            <input
              type="text"
              name="course"
              placeholder="Course / Program of Interest"
              value={formData.course}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Country */}
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
            <FaGlobe className="text-indigo-500 mr-2" />
            <input
              type="text"
              name="country"
              placeholder="Your Country"
              value={formData.country}
              onChange={handleChange}
              className="w-full outline-none"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md"
          >
            Submit Enquiry
          </button>
        </form>
      </motion.div>
    </div>
  );
}
