import { useState, useEffect } from "react";
import DynamicHeader from "../../Components/SharedComponets/DynamicHeader";
import { Star } from "lucide-react";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const fetchPaymentHistory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/payments`);
      setPayments(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching payment history:', error);
      setError(error);
      setIsLoading(false);
    }
  };

  const handleSubmitReview = async (paymentId) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, {
        paymentId,
        rating,
        review
      });
      // Reset form
      setRating(0);
      setReview("");
      setShowModal(false);
      setSelectedPayment(null);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const ReviewModal = ({ payment }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Review for {payment.productName}</h3>
          <button 
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 cursor-pointer ${
                  star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#68b5c2]"
            placeholder="Write your review here..."
            rows={4}
          />
          <button
            onClick={() => handleSubmitReview(payment._id)}
            className="px-4 py-2 bg-[#68b5c2] text-white rounded-md hover:bg-opacity-80 transition-colors"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <DynamicHeader title="Payment History" />
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader">Loading...</div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mt-4">{error.message}</div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-[#68b5c2] text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Product Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Transaction ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Review</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment, index) => (
                <tr key={payment._id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{index + 1}</td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">{payment.productName}</td>
                  <td className="px-6 py-4 text-sm">${payment.price}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 text-sm rounded-full bg-[#68b5c2] bg-opacity-20 text-[#68b5c2]">
                      {payment.transactionId}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => {
                        setSelectedPayment(payment);
                        setShowModal(true);
                      }}
                      className="px-4 py-2 rounded-md bg-[#68b5c2] text-white hover:bg-opacity-80 transition-colors flex items-center gap-2"
                    >
                      <Star className="w-4 h-4" />
                      Write Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showModal && selectedPayment && <ReviewModal payment={selectedPayment} />}
    </div>
  );
};

export default PaymentHistory;