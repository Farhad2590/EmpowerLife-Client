import toast from "react-hot-toast";
import DynamicHeader from "../SharedComponets/DynamicHeader";
import { useEffect, useState } from "react";
import axios from "axios";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  
  useEffect(() => {
    fetchAllCoupons();
  }, []);

  const fetchAllCoupons = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cupons`);
      setCoupons(data);
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      toast.success(`Coupon code "${code}" has been copied to your clipboard!`);
    }).catch((err) => {
      console.error('Failed to copy coupon code: ', err);
    });
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-6">
        <DynamicHeader title="Exclusive Coupons" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="card bg-white shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 rounded-lg border border-gray-200 overflow-hidden"
            >
              <div className="card-body p-6">
                <h3 className="text-lg font-semibold text-[#68b5c2]">{coupon.title}</h3>
                <p className="text-gray-600 text-sm">{coupon.expiry}</p>
                <div className="mt-4">
                  <span className="bg-[#68b5c2] text-white py-2 px-4 rounded-lg text-sm font-semibold">
                    Code: <span className="font-bold ml-1">{coupon.code}</span>
                  </span>
                </div>
                <button
                  className="mt-4 w-full py-2 px-4 bg-[#68b5c2] text-white rounded-lg hover:bg-[#58a1b1] transition duration-300"
                  onClick={() => handleCopyCode(coupon.code)}
                >
                  Redeem Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Coupons;
