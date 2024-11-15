// import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import image from '../../assets/images/neswSelter-01.png';

const NewsletterSignup = () => {
  return (
    <div className="bg-[#86c7d2] text-white py-12 px-6 mt-8">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center gap-8">
        {/* Text and Form Section */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4 sm:text-2xl">
            Subscribe to our Newsletter
          </h2>
          <p className="text-lg mb-6 sm:text-base">
            Stay up-to-date with our latest products, special offers, and accessibility tips.
          </p>
          <form className="flex flex-wrap items-center gap-4">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-grow px-4 py-2 rounded-full text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center bg-white hover:bg-blue-500 text-black px-6 py-2 rounded-full transition"
            >
              <FaEnvelope className="mr-2" />
              Subscribe
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <img
            src={image}
            alt="Newsletter Illustration"
            className="max-w-sm mx-auto sm:max-w-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
