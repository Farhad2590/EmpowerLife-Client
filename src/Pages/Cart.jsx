import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaCheck } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom'; // Add this import

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const { user } = useAuth();
  const navigate = useNavigate(); // Add this hook

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart/${user.email}`);
      setCartItems(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map(item => item._id)));
    }
  };

  const toggleSelectItem = (itemId) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  const calculateTotal = () => {
    return cartItems
      .filter(item => selectedItems.has(item._id))
      .reduce((total, item) => total + item.totalPrice, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    if (selectedItems.size === 0) {
      alert('Please select items to checkout');
      return;
    }

    const selectedProducts = cartItems.filter(item => selectedItems.has(item._id));

    // Include product IDs in the data passed to the checkout page
    const selectedProductsWithIds = selectedProducts.map(item => ({
      productId: item._id, 
      productImage : item.productImage,
      productName: item.productName,
      totalPrice: item.totalPrice,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
    }));

    // Navigate to checkout page with selected products data
    navigate('/checkout', {
      state: {
        selectedProducts: selectedProductsWithIds,
        totalAmount: calculateTotal(),
      },
    });
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-600">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="mb-4 flex items-center">
            <button
              onClick={toggleSelectAll}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <div className={`w-5 h-5 border rounded flex items-center justify-center
                ${selectedItems.size === cartItems.length ? 'bg-[#68b5c2] border-[#68b5c2]' : 'border-gray-300'}`}
              >
                {selectedItems.size === cartItems.length && (
                  <FaCheck className="text-white text-sm" />
                )}
              </div>
              <span>Select All Items</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                <div className="p-4 flex items-center">
                  <button
                    onClick={() => toggleSelectItem(item._id)}
                    className="flex items-center justify-center"
                  >
                    <div className={`w-5 h-5 border rounded flex items-center justify-center
                      ${selectedItems.has(item._id) ? 'bg-[#68b5c2] border-[#68b5c2]' : 'border-gray-300'}`}
                    >
                      {selectedItems.has(item._id) && (
                        <FaCheck className="text-white text-sm" />
                      )}
                    </div>
                  </button>
                </div>

                <div className="relative h-48">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-[#68b5c2] text-white px-3 py-1 rounded-full text-sm">
                    {item.productCategory}
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{item.productName}</h3>

                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-600">
                      Unit Price: <span className="font-semibold text-green-600">${item.unitPrice}</span>
                    </div>
                    <div className="text-gray-600">
                      Total: <span className="font-semibold text-green-600">${item.totalPrice}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => {/* Add remove item handler */ }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Cart Summary</h2>
              <div className="text-xl font-bold text-green-600">
                Total: ${calculateTotal()}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Selected Items:</span>
                <span>{selectedItems.size}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={selectedItems.size === 0}
                className={`w-full py-3 rounded-lg text-white transition-colors
                  ${selectedItems.size === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#68b5c2] hover:bg-blue-700'}`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;