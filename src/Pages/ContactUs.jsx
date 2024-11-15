import { useState } from 'react';
import { FaEnvelope, FaUser, FaCommentDots } from 'react-icons/fa';
import DynamicHeader from '../Components/SharedComponets/DynamicHeader';
import Lottie from 'lottie-react';
import contactAnimation from '../assets/annimation/AnimationMail.json';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div>
      <DynamicHeader title="Contact Us" />
      <div className="max-w-6xl mx-auto py-8 px-4 flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Left Section: Contact Form */}
        <div className="w-full md:w-1/2 border-2 border-[#68b5c2] rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="flex items-center gap-3">
              <FaUser className="text-[#68b5c2] text-lg" />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#498b97] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#68b5c2]"
              />
            </div>

            {/* Email Field */}
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-[#68b5c2] text-lg" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#68b5c2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#68b5c2]"
              />
            </div>

            {/* Message Field */}
            <div className="flex items-start gap-3">
              <FaCommentDots className="text-[#68b5c2] text-lg mt-2" />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#68b5c2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#68b5c2]"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#68b5c2] text-white py-2 rounded-lg font-bold hover:bg-teal-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Section: Lottie Animation */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Lottie
            animationData={contactAnimation}
            loop={true}
            className="w-full max-w-sm shadow-lg rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;