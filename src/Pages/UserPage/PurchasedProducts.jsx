import { useState, useEffect } from "react";
import axios from "axios";
import DynamicHeader from "../../Components/SharedComponets/DynamicHeader";
import useAuth from "../../hooks/useAuth";

const PurchasedProducts = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const{user} = useAuth()
  
//   const userEmail = "mohammadyonus629@gmail.com";  // The user's email you want to filter by
  
useEffect(() => {
    if (user && user.email) {
      fetchPaymentHistory();
    }
  }, [user]);

  const fetchPaymentHistory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/purchasedProducts/${user.email}`);
      setPayments(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching payment history:', error);
      setError(error);
      setIsLoading(false);
    }
  };

  // Filter payments for the specified user
  const filteredPayments = payments.filter(payment => payment.email === user.email);
  
  return (
    <div>
      <DynamicHeader title="Purchased Products" />
      
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader">Loading...</div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mt-4">{error.message}</div>
      ) : (
        <div className="w-full overflow-x-auto">
          {filteredPayments.length === 0 ? (
            <div className="text-center text-xl text-gray-500">No products found for {user.Email}</div>
          ) : (
            filteredPayments.map((payment, index) => (
              <div key={payment._id} className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Payment #{index + 1} - {new Date(payment.orderDate).toLocaleDateString()}</h3>
                <div className="space-y-4">
                  {payment.products.map((product, productIndex) => (
                    <div key={product.productId} className="flex items-center border-b py-4">
                      <img
                        src={product.productImage}
                        alt={product.productName}
                        className="w-24 h-24 object-cover mr-4"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{product.productName}</p>
                        <p className="text-sm text-gray-500">Price: ${product.unitPrice} x {product.quantity}</p>
                        <p className="text-sm text-gray-500">Total: ${product.totalPrice}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PurchasedProducts;
