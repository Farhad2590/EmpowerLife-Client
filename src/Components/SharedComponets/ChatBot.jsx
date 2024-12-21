import { useState } from 'react';
import { ImCross } from "react-icons/im";
import { IoSendOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your virtual assistant. How can I help you today?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Predefined responses based on keywords
  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! How can I assist you today?";
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "Our pricing plans start from $10/month. Would you like to know more about our pricing packages?";
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('support')) {
      return "You can reach our support team at support@example.com or call us at +1-234-567-8900";
    }
    
    if (lowerMessage.includes('location') || lowerMessage.includes('address')) {
      return "We are located at 123 Business Street, Tech City, TC 12345";
    }
    
    if (lowerMessage.includes('booking') || lowerMessage.includes('appointment')) {
      return "You can book an appointment through our website's booking section or call our office directly.";
    }
    
    if (lowerMessage.includes('hours') || lowerMessage.includes('open')) {
      return "We are open Monday to Friday, 9:00 AM to 6:00 PM EST.";
    }
    
    if (lowerMessage.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    }
    
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return "Thank you for chatting with us! Have a great day!";
    }

    return "I understand you're asking about " + message + ". Let me connect you with our support team for more detailed information. Meanwhile, you can check our FAQ section on our website.";
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

  // Rest of your component code remains the same
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          {/* Chat Header */}
          <div className="bg-[#68b5c2] text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat Support</h3>
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
                  {message.text}
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