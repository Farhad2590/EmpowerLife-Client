import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import DynamicHeader from '../Components/SharedComponets/DynamicHeader';

const Payments = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway);
    const location = useLocation();
    const { orderData } = location.state || {};

    if (!orderData) {
        return <p className="text-center text-red-500 mt-10">No order data found. Please try again.</p>;
    }

    const {
        products,
        deliveryAddress,
        totalAmount,
        couponApplied,
        deliveryCharge,
        orderDate,
    } = orderData;

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* <h1 className="text-3xl font-bold mb-8 text-gray-800">Payment</h1> */}
            <DynamicHeader title="Payments"/>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-[#68b5c2]">Order Summary</h2>
                    <p className="mb-2"><strong>Delivery Address:</strong> {deliveryAddress}</p>
                    <p className="mb-2"><strong>Total Amount:</strong> ${totalAmount}</p>
                    <p className="mb-2"><strong>Delivery Charge:</strong> ${deliveryCharge}</p>
                    <p className="mb-2"><strong>Order Date:</strong> {new Date(orderDate).toLocaleString()}</p>
                    {couponApplied && (
                        <p className="mb-2">
                            <strong>Coupon Applied:</strong> {couponApplied.code} ({couponApplied.discount}% discount)
                        </p>
                    )}
                    <h3 className="mt-6 text-lg font-semibold text-gray-700">Products:</h3>
                    <ul className="list-disc list-inside pl-4">
                        {products.map((product) => (
                            <li key={product._id} className="text-gray-600">
                                {product.productName} - ${product.totalPrice} (Qty: {product.quantity})
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Complete Payment */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-[#68b5c2]">Complete Payment</h2>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm orderData={orderData} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payments;
