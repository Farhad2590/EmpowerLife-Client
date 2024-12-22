import { useState } from 'react';
import { FaEnvelope, FaUser, FaCommentDots } from 'react-icons/fa';
import DynamicHeader from '../Components/SharedComponets/DynamicHeader';
import Lottie from 'lottie-react';
import contactAnimation from '../assets/annimation/AnimationMail.json';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState({
    show: false,
    success: false,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      // Create FormData object
      const form = new FormData();
      form.append('access_key', '8c3e5655-15a7-49ed-8dba-2ac610dca926');
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('message', formData.message);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: form,
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          show: true,
          success: true,
          message: 'Message sent successfully!',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.message || 'Submission failed.');
      }
    } catch (error) {
      setStatus({
        show: true,
        success: false,
        message: error.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus({ show: false, success: false, message: '' }), 5000);
    }
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
              disabled={isSubmitting}
              className={`w-full py-2 rounded-lg font-bold transition ${
                isSubmitting ? 'bg-gray-400' : 'bg-[#68b5c2] hover:bg-teal-600'
              } text-white`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {status.show && (
            <div
              className={`mt-4 p-3 rounded ${
                status.success ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
              }`}
            >
              {status.message}
            </div>
          )}
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
