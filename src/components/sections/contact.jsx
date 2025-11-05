import { useState } from "react";
import img from "../../assets/illustrations/I-4.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    course: "",
    education: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formBody = new URLSearchParams(formData);

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycby_jfhRLN3n9EofcdftUoQxH7nvi1xOoxLHhYYEBprfWoTvRyeTqBYuLJVZJyRhstNy/exec",
      {
        method: "POST",
        body: formBody,
      }
    );

    if (response.ok) {
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        course: "",
        education: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 3000);
    } else {
      alert("Failed to submit, please try again.");
    }
  } catch (error) {
    console.error(error);
    alert("Error submitting the form.");
  }
};


  return (
    <section className="bg-white py-12 px-6 md:px-20" id="contact">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center text-transparent bg-gradient-to-r from-blue-900 to-blue-300 bg-clip-text mb-10">
          Contact <span className="text-orange-500">Us</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Student Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-6 rounded-xl shadow-md shadow-blue-500/50 bg-white"
          >
            {/* Name & Email */}
            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Full Name"
                name="name"
                type="text"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={handleChange}
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Phone & DOB */}
            <div className="grid md:grid-cols-2 gap-4">
              <InputField
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
              <InputField
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Address */}
            <TextareaField
              label="Address"
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
            />

            {/* City, State, Zip */}
            <div className="grid md:grid-cols-3 gap-4">
              <InputField
                label="City"
                name="city"
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
              <InputField
                label="State"
                name="state"
                type="text"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
              />
              <InputField
                label="Zip Code"
                name="zip"
                type="text"
                placeholder="Zip Code"
                value={formData.zip}
                onChange={handleChange}
              />
            </div>

            {/* Course & Education */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">Course Interested In</label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Course</option>
                  <option value="web-development">Web Development</option>
                  <option value="data-science">Data Science</option>
                  <option value="ai-ml">AI & ML</option>
                  <option value="digital-marketing">Digital Marketing</option>
                </select>
              </div>
              <InputField
                label="Education Background"
                name="education"
                type="text"
                placeholder="High School, Bachelor's..."
                value={formData.education}
                onChange={handleChange}
              />
            </div>

            {/* Additional Message */}
            <TextareaField
              label="Additional Message"
              name="message"
              placeholder="Any additional info or questions"
              value={formData.message}
              onChange={handleChange}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-lg"
            >
              Submit
            </button>

            {submitted && (
              <p className="text-green-500 mt-2 text-center">
                Form submitted successfully!
              </p>
            )}
          </form>

          {/* Illustration */}
          <div className="flex items-center justify-center p-6 rounded-xl">
            <img src={img} alt="Student Illustration" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Capitalized Components
const InputField = ({ label, name, type, placeholder, value, onChange }) => (
  <div>
    <label className="block mb-1 text-gray-700 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
);

const TextareaField = ({ label, name, placeholder, value, onChange }) => (
  <div>
    <label className="block mb-1 text-gray-700 font-medium">{label}</label>
    <textarea
      rows="3"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    ></textarea>
  </div>
);

export default Contact;
