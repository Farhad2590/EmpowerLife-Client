import { useState, useEffect } from 'react';
import { FaCheckCircle, FaShippingFast, FaCog, FaRegCreditCard } from 'react-icons/fa';

const MyOrders = () => {
  const [orders, setOrders] = useState([
    {
      orderId: 'ORD123456',
      productName: 'Smartphone',
      paymentDate: '21/12/2024',
      status: 'Preparing',
      statusHistory: [
        { date: '21/12/2024', status: 'Payment Received', icon: <FaRegCreditCard /> },
        { date: '22/12/2024', status: 'Preparing', icon: <FaCog /> },
      ],
    },
    {
      orderId: 'ORD987654',
      productName: 'Laptop',
      paymentDate: '20/12/2024',
      status: 'In Transit',
      statusHistory: [
        { date: '20/12/2024', status: 'Payment Received', icon: <FaRegCreditCard /> },
        { date: '21/12/2024', status: 'Preparing', icon: <FaCog /> },
        { date: '22/12/2024', status: 'In Transit', icon: <FaShippingFast /> },
      ],
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) => {
        return prevOrders.map((order) => {
          const lastStatus = order.statusHistory[order.statusHistory.length - 1];
          let newStatus = '';
          const lastDate = new Date(lastStatus.date);
          const currentDate = new Date();

          if (lastDate.getDate() === currentDate.getDate()) return order;

          if (lastStatus.status === 'Payment Received') {
            newStatus = 'Preparing';
          } else if (lastStatus.status === 'Preparing') {
            newStatus = 'In Transit';
          } else if (lastStatus.status === 'In Transit') {
            newStatus = 'Received';
          }

          if (newStatus) {
            let icon = null;
            switch (newStatus) {
              case 'Preparing':
                icon = <FaCog />;
                break;
              case 'In Transit':
                icon = <FaShippingFast />;
                break;
              case 'Received':
                icon = <FaCheckCircle />;
                break;
              default:
                icon = <FaRegCreditCard />;
            }

            return {
              ...order,
              status: newStatus,
              statusHistory: [
                ...order.statusHistory,
                { date: currentDate.toLocaleDateString(), status: newStatus, icon: icon },
              ],
            };
          }
          return order;
        });
      });
    }, 86400000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <h1 className="text-4xl font-bold text-center text-[#68b5c2] mb-10">Track Your Orders</h1>
      <div className="space-y-10">
        {orders.map((order) => (
          <div key={order.orderId} className="bg-[#68b5c2] rounded-xl shadow-lg p-6 transform hover:scale-105 transition duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">{order.productName}</h2>
              <p className="text-lg text-gray-100">Order ID: {order.orderId}</p>
            </div>
            <p className="text-gray-100 mt-2">Payment Date: {order.paymentDate}</p>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-white">Delivery Status:</h3>
              <div className="space-y-4 mt-4">
                {order.statusHistory.map((history, index) => (
                  <div key={index} className="flex items-center space-x-4 text-white">
                    <div
                      className={`w-6 h-6 rounded-full border-4 border-white`}
                    >
                      {history.icon}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{history.status}</p>
                      <p className="text-xs text-gray-200">{history.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-right">
              <p
                className={`text-lg font-bold text-white transition duration-200`}
              >
                {order.status === 'Received' ? 'Order Delivered' : `Current Status: ${order.status}`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
