// import React from 'react';
import { FaTags, FaTruck } from 'react-icons/fa';
import DynamicHeader from '../SharedComponets/DynamicHeader';

const SpecialOffersAndDiscounts = () => {
  return (
    <div className="">
      <DynamicHeader title="Special Offers and Discounts" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
        {/* Offer 1 */}
        <div className="bg-[#86c7d2] p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Hearing Aid Discount</h3>
            <p className="text-white mb-4">
              Save 20% on our top-of-the-line hearing aids. Grab it Now.
            </p>
            <button className="bg-white text-[#68b5c2] font-bold py-2 px-4 rounded-full hover:bg-gray-200">
              Shop Now
            </button>
          </div>
          <FaTags className="text-6xl text-white" />
        </div>

        {/* Offer 2 */}
        <div className="bg-[#86c7d2] p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Free Shipping</h3>
            <p className="text-white mb-4">
              Enjoy free shipping on all orders over $50. Grab it Now.
            </p>
            <button className="bg-white text-[#68b5c2] font-bold py-2 px-4 rounded-full hover:bg-gray-200">
              Shop Now
            </button>
          </div>
          <FaTruck className="text-6xl text-white" />
        </div>
      </div>
    </div>
  );
};

export default SpecialOffersAndDiscounts;
