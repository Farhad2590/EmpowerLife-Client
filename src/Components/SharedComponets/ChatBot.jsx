import { useState, useEffect } from 'react';
import { ImCross } from "react-icons/im";
import { IoSendOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import axios from 'axios';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Welcome to AssistiveCare Support! I can help you find information about our assistive equipment categories and available discounts. How may I assist you today?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllCoupons();
  }, []);

  const fetchAllCoupons = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cupons`);
      setCoupons(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch coupons:", error);
      setLoading(false);
    }
  };

  // Function to format coupon list
  const formatCouponsMessage = () => {
    if (loading) return "Loading available coupons...";
    if (coupons.length === 0) return "No active coupons at the moment. Please check back later!";

    const couponList = coupons.map(coupon => 
      `- ${coupon.code}: ${coupon.discount}% off ${coupon.category === 'all' ? 'all items' : coupon.category} aids`
    ).join('\n');

    return `Current Active Offers:\n\n${couponList}\n\nWould you like details about any specific coupon?`;
  };

  // Function to find specific coupon details
  const findCouponDetails = (code) => {
    return coupons.find(coupon => 
      coupon.code.toLowerCase() === code.toLowerCase()
    );
  };

  // Predefined responses based on categories and keywords
  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // General greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I can provide information about our assistive equipment categories and current discounts. What would you like to know?";
    }

    // Coupon and discount related responses
    if (lowerMessage.includes('coupon') || lowerMessage.includes('discount') || lowerMessage.includes('offer')) {
      return formatCouponsMessage();
    }

    // Check for specific coupon code inquiries
    const mentionedCoupon = coupons.find(coupon => 
      lowerMessage.includes(coupon.code.toLowerCase())
    );

    if (mentionedCoupon) {
      return `${mentionedCoupon.code} offers ${mentionedCoupon.discount}% off on ${mentionedCoupon.category === 'all' ? 'all products' : mentionedCoupon.category} aids!\n\nDetails:\n- Discount: ${mentionedCoupon.discount}%\n- Category: ${mentionedCoupon.category}\n- Valid until: ${new Date(mentionedCoupon.validUntil).toLocaleDateString()}\n${mentionedCoupon.description}\n\nWould you like to start shopping with this coupon?`;
    }

    // Category specific responses
    if (lowerMessage.includes('cognitive')) {
      return "Our Cognitive Aids include:\n- Memory assistance devices\n- Task organizers\n- Medication reminders\n- Time management tools\n- Educational support devices\nWould you like specific information about any of these items?";
    }

    if (lowerMessage.includes('daily') || lowerMessage.includes('living')) {
      return "Our Daily Living Aids include:\n- Kitchen assistance tools\n- Bathroom safety equipment\n- Dressing aids\n- Eating and drinking aids\n- Home organization solutions\nWhich area would you like to know more about?";
    }

    if (lowerMessage.includes('vision')) {
      return "Our Vision Aids include:\n- Magnifiers\n- Reading aids\n- Navigation assistance\n- Screen readers\n- Braille equipment\nI can provide more details about any of these products.";
    }

    if (lowerMessage.includes('hearing')) {
      return "Our Hearing Aids include:\n- Digital hearing devices\n- Amplification systems\n- Visual alert systems\n- TV listening devices\n- Phone amplifiers\nWould you like to learn more about specific hearing solutions?";
    }

    if (lowerMessage.includes('mobility')) {
      return "Our Mobility Aids include:\n- Wheelchairs\n- Walkers\n- Canes\n- Transfer aids\n- Mobility scooters\nI can provide detailed information about any of these mobility solutions.";
    }

    // Bulk purchase inquiries
    if (lowerMessage.includes('bulk') || lowerMessage.includes('wholesale')) {
      return "We offer special discounts for bulk purchases and institutional buyers. Our bulk purchase program includes:\n- Volume-based discounts\n- Custom pricing\n- Priority shipping\nWould you like to speak with our bulk sales specialist?";
    }

    // Seasonal offers
    if (lowerMessage.includes('seasonal') || lowerMessage.includes('holiday')) {
      const seasonalCoupons = coupons.filter(coupon => coupon.type === 'seasonal');
      if (seasonalCoupons.length > 0) {
        const seasonalList = seasonalCoupons.map(coupon => 
          `- ${coupon.code}: ${coupon.discount}% off ${coupon.category === 'all' ? 'all items' : coupon.category}`
        ).join('\n');
        return `Current Seasonal Offers:\n\n${seasonalList}\n\nWould you like details about any of these offers?`;
      }
      return "Stay tuned for our upcoming seasonal promotions! Would you like to join our mailing list for updates?";
    }

    // Default response
    return "I understand you're asking about " + message + ". For the most accurate information about our assistive equipment and current discounts, I'd be happy to connect you with one of our specialists. Would you like me to arrange that?";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputMessage, isBot: false }]);

    // Get bot response after a short delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      setMessages(prev => [...prev, {
        text: botResponse,
        isBot: true
      }]);
    }, 1000);

    setInputMessage('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-96 h-[32rem] flex flex-col">
          {/* Chat Header */}
          <div className="bg-[#68b5c2] text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">AssistiveCare Support</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <ImCross size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`rounded-lg p-2 max-w-[80%] ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-[#68b5c2] text-white'
                  }`}
                >
                  {message.text.split('\n').map((line, i) => (
                    <p key={i} className={i > 0 ? 'mt-1' : ''}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#68b5c2]"
              />
              <button
                type="submit"
                className="bg-[#68b5c2] text-white p-2 rounded-md hover:bg-[#5aa3af] transition-colors"
              >
                <IoSendOutline size={20} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#68b5c2] text-white p-4 rounded-full shadow-lg hover:bg-[#5aa3af] transition-colors"
        >
          <FiMessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatBot;