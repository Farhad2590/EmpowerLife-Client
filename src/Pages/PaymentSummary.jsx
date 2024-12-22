import { useLocation } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './WriterPages/CheckoutForm';

const PaymentSummary = () => {
    const location = useLocation();
    const { orderData } = location.state || {};

    if (!orderData) {
        return <p>No order data available.</p>;
    }
    const stripePromise = loadStripe('pk_test_51QYXGWQHVUyF64UNohlIbOkTFuLMm5mwMA6gKALVCEffU28MS0t9N0PUB2mhNVdr9SsEtIGrrI2dC6RDPEwVyCFp00ZhSc9uTI');

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Payment Summary</h1>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 text-[#68b5c2]">Order Details</h2>
                <p><strong>Delivery Address:</strong> {orderData.deliveryAddress}</p>
                <p><strong>Total Amount:</strong> ${orderData.totalAmount}</p>
                <p><strong>Delivery Charge:</strong> ${orderData.deliveryCharge}</p>
                {orderData.couponApplied && (
                    <>
                        <p><strong>Coupon Code:</strong> {orderData.couponApplied.code}</p>
                        <p><strong>Discount:</strong> {orderData.couponApplied.discount}%</p>
                    </>
                )}
                <h3 className="text-lg font-semibold mt-4">Products:</h3>
                <ul className="list-disc pl-5">
                    {orderData.products.map((product, index) => (
                        <li key={index}>
                            {product.productName} - ${product.totalPrice} (Quantity: {product.quantity})
                        </li>
                    ))}
                </ul>
                <p className="mt-4"><strong>Order Date:</strong> {new Date(orderData.orderDate).toLocaleString()}</p>
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    totalAmount={orderData.totalAmount}
                    products={orderData.products}
                />
            </Elements>
        </div>
    );
};

export default PaymentSummary;
