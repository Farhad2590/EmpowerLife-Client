import { useEffect, useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import { use } from 'react';

const CheckoutForm = ({ orderData }) => {
    const [error, setError] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const price = orderData.totalAmount;
     const navigate = useNavigate(); 
     const {  user } = useAuth();

    useEffect(() => {
        if (price > 0) {
            axios.post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [price]);

    const deleteProductsFromDatabase = async (productIds) => {
        console.log(productIds);
        
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/cartData`, {
                data: { productIds }
            });
            console.log('Products deleted:', response.data);
        } catch (error) {
            console.error('Error deleting products:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const cardNumber = elements.getElement(CardNumberElement);
        if (!cardNumber) return;

        const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardNumber,
        });

        if (paymentError) {
            setError(paymentError.message);
            return;
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (confirmError) {
            setError(confirmError.message);
            return;
        }

        setTransactionId(paymentIntent.id);

        // Save the payment to the database
        const paymentDetails = {
            transactionId: paymentIntent.id,
            amount: price,
            address: orderData.deliveryAddress,
            deliveryCharge: orderData.deliveryCharge,
            orderDate: orderData.orderDate,
            products: orderData.products,
            email : user.email,
            name: user.displayName
        };

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/savePayment`, paymentDetails);
            console.log('Payment saved successfully.');

            // After payment is successful, delete the products from the database
            const productIds = orderData.products.map(product => product.productId);
            deleteProductsFromDatabase(productIds);
            toast.success('Payment successfull')
            navigate('/dashboard/paymentHistory');
        } catch (err) {
            console.error('Error saving payment:', err);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                    <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-[#68b5c2]">
                        <CardNumberElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': { color: '#aab7c4' },
                                    },
                                    invalid: { color: '#9e2146' },
                                },
                            }}
                        />
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Expiration Date</label>
                        <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-[#68b5c2]">
                            <CardExpiryElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': { color: '#aab7c4' },
                                        },
                                        invalid: { color: '#9e2146' },
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">CVC</label>
                        <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-[#68b5c2]">
                            <CardCvcElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': { color: '#aab7c4' },
                                        },
                                        invalid: { color: '#9e2146' },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#68b5c2] text-white font-bold py-3 rounded-md hover:bg-[#56a3af] transition disabled:bg-gray-400"
                    disabled={!stripe || !clientSecret}
                >
                    Pay ${price}
                </button>
                {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
                {transactionId && (
                    <p className="text-green-600 text-sm mt-4">
                        Payment successful! Transaction ID: {transactionId}
                    </p>
                )}
            </form>
        </div>
    );
};

export default CheckoutForm;
