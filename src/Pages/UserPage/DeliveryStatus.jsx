// import React from 'react';

const DeliveryStatus = ({ order }) => {
  const calculateStatus = (orderDate) => {
    const orderDateTime = new Date(orderDate);
    const now = new Date();
    const diffTime = Math.abs(now - orderDateTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays >= 2) return "Delivered";
    if (diffDays >= 1) return "In Transit";
    return "Processing";
  };

  const status = calculateStatus(order.orderDate);

  const statusSteps = [
    {
      title: "Order Placed",
      date: new Date(order.orderDate).toLocaleDateString(),
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z" />
        </svg>
      ),
      isCompleted: true
    },
    {
      title: "Processing",
      date: new Date(order.orderDate).toLocaleDateString(),
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
        </svg>
      ),
      isCompleted: status !== "Processing"
    },
    {
      title: "In Transit",
      date: status !== "Processing" ? new Date(new Date(order.orderDate).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString() : "",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zm-9.5 8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm9 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
        </svg>
      ),
      isCompleted: status === "Delivered"
    },
    {
      title: "Delivered",
      date: status === "Delivered" ? new Date(new Date(order.orderDate).getTime() + 48 * 60 * 60 * 1000).toLocaleDateString() : "",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
      isCompleted: status === "Delivered"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Order Details Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Order ID:</p>
            <p className="font-semibold">{order._id.$oid}</p>
          </div>
          <div>
            <p className="text-gray-600">Order Date:</p>
            <p className="font-semibold">{new Date(order.orderDate).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Delivery Address:</p>
            <p className="font-semibold">{order.address}</p>
          </div>
          <div>
            <p className="text-gray-600">Total Amount:</p>
            <p className="font-semibold">৳{order.amount}</p>
          </div>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="mb-8">
        <div className="flex items-center justify-between w-full">
          {statusSteps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                step.isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {step.icon}
              </div>
              <div className="mt-2 text-center">
                <p className="font-semibold">{step.title}</p>
                <p className="text-sm text-gray-500">{step.date}</p>
              </div>
              {index < statusSteps.length - 1 && (
                <div className={`absolute top-6 left-12 w-[calc(100%-3rem)] h-1 ${
                  step.isCompleted ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Products List */}
      <div>
        <h3 className="text-xl font-bold mb-4">Order Items</h3>
        <div className="space-y-4">
          {order.products.map((product, index) => (
            <div key={index} className="flex items-center border rounded-lg p-4 gap-4">
              <img 
                src={product.productImage} 
                alt={product.productName}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{product.productName}</h4>
                <p className="text-sm text-gray-600">Quantity: {product.quantity.$numberInt}</p>
                <p className="text-sm text-gray-600">Unit Price: ৳{product.unitPrice.$numberInt}</p>
                <p className="font-semibold">Total: ৳{product.totalPrice.$numberInt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Information */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Delivery Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Customer Name:</p>
            <p className="font-semibold">{order.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Email:</p>
            <p className="font-semibold">{order.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Delivery Charge:</p>
            <p className="font-semibold">৳{order.deliveryCharge.$numberInt}</p>
          </div>
          <div>
            <p className="text-gray-600">Current Status:</p>
            <p className="font-semibold text-green-600">{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryStatus;