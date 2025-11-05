import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdPhoneCallback } from "react-icons/md";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917057980564" // Replace with your number
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition duration-300 flex items-center gap-2 text-sm"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
       
      </a>

      {/* Request Callback Button (scroll to #contact) */}
      <a
        href="#contact"
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-full shadow-lg transition duration-300 flex items-center gap-2 text-sm"
        title="Request a Callback"
      >
        <MdPhoneCallback className="text-xl" />
        Request Callback
      </a>
    </div>
  );
};

export default FloatingButtons;
