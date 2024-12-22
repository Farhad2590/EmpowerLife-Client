import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedProducts, totalAmount } = location.state || { selectedProducts: [], totalAmount: 0 };

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [error, setError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [discountedTotal, setDiscountedTotal] = useState(null);

  const DELIVERY_CHARGE = 100;
  console.log(selectedProducts);
  

  const handleCouponSubmit = async () => {
    if (couponApplied) {
      setError('Coupon already applied');
      return;
    }

    if (!couponCode.trim()) {
      setError('Please enter a coupon code');
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/coupons/${couponCode}`);
      const couponData = response.data;

      if (couponData.isValid) {
        const discountPercentage = couponData.discountPercentage;

        if (discountPercentage === undefined || discountPercentage === null) {
          setError('Invalid coupon data');
          return;
        }

        const subtotal = parseFloat(totalAmount);
        const discount = (subtotal * discountPercentage) / 100;
        const newTotal = subtotal - discount;

        setCouponDiscount(discountPercentage);
        setDiscountedTotal(newTotal);
        setCouponApplied(true);
        setCouponSuccess('Coupon applied successfully!');
        setError('');
      } else {
        setError('Invalid coupon code');
        setCouponSuccess('');
      }
    } catch (error) {
      console.error('Error validating coupon:', error);
      setError('Error validating coupon');
      setCouponSuccess('');
    }
  };

  const calculateTotal = () => {
    const baseAmount = discountedTotal || parseFloat(totalAmount);
    return (baseAmount + DELIVERY_CHARGE).toFixed(2);
  };

  const handlePlaceOrder = () => {
    if (!deliveryAddress) {
      setError('Please enter a delivery address');
      return;
    }

    const orderData = {
      products: selectedProducts,
      deliveryAddress,
      totalAmount: calculateTotal(),
      couponApplied: couponApplied ? {
        code: couponCode,
        discount: couponDiscount
      } : null,
      deliveryCharge: DELIVERY_CHARGE,
      orderDate: new Date().toISOString()
    };

    // Navigate to the new page with orderData
    navigate('/payments', { state: { orderData } });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#68b5c2]">Order Summary</h2>
          <div className="space-y-4">
            {selectedProducts.map((product) => (
              <div key={product._id} className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{product.productName}</h3>
                    <p className="text-sm text-gray-600">{product.productCategory}</p>
                    <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-[#68b5c2]">${product.totalPrice}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery and Payment Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-[#68b5c2]">Delivery Information</h2>

          {/* Delivery Address */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Delivery Address</label>
            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#68b5c2]"
              rows="3"
              placeholder="Enter your full delivery address"
            />
          </div>

          {/* Coupon Code */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Coupon Code</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#68b5c2]"
                placeholder="Enter coupon code"
                disabled={couponApplied}
              />
              <button
                onClick={handleCouponSubmit}
                disabled={couponApplied}
                className={`px-4 py-2 rounded-lg ${couponApplied
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-[#68b5c2] hover:bg-[#5aa3af] text-white'
                  }`}
              >
                Apply
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {couponSuccess && <p className="text-green-500 text-sm mt-1">{couponSuccess}</p>}
          </div>

          {/* Order Summary */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${parseFloat(totalAmount).toFixed(2)}</span>
            </div>
            {couponApplied && (
              <div className="flex justify-between text-[#68b5c2]">
                <span>Coupon Discount ({couponDiscount}%)</span>
                <span>-${(parseFloat(totalAmount) * couponDiscount / 100).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600">
              <span>Delivery Charge</span>
              <span>${DELIVERY_CHARGE}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t pt-2">
              <span>Total</span>
              <span className="text-[#68b5c2]">${calculateTotal()}</span>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-[#68b5c2] hover:bg-[#5aa3af] text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;