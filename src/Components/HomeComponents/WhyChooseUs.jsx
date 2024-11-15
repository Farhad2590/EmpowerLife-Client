// import React from 'react';
import { FaCheckCircle, FaHeadset, FaWrench } from 'react-icons/fa';
import DynamicHeader from '../SharedComponets/DynamicHeader';

const WhyChooseUs = () => {
  return (
    <div className="">
      <DynamicHeader title="Why Choose Us" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Feature 1 */}
        <div className="bg-[#86c7d2] p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <FaCheckCircle className="text-3xl text-white" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Reliable Support Commitment</h3>
            <p className="text-white">
              Our experienced team is dedicated to providing excellent customer support.
            </p>
          </div>
        </div>
        
        {/* Feature 2 */}
        <div className="bg-[#86c7d2] p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <FaHeadset className="text-3xl text-white" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Specialized Products</h3>
            <p className="text-white">
              We offer a wide range of specialized assistive technology products.
            </p>
          </div>
        </div>
        
        {/* Feature 3 */}
        <div className="bg-[#86c7d2] p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <FaWrench className="text-3xl text-white" />
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Customization Options</h3>
            <p className="text-white">
              Our products can be customized to meet your specific needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
