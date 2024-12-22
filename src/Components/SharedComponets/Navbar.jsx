import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaProductHunt, FaBlog, FaEnvelope, FaBars, FaUserCircle, FaShoppingCart, FaBell } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

function Navbar() {
  const { logOut, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileNotifications, setShowMobileNotifications] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setShowMobileNotifications(false);
    setShowMobileCart(false);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/announcements`);
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Sample cart items - replace with your actual cart data
  const cartItems = [
    { id: 1, name: "Product 1", price: "$19.99" },
    { id: 2, name: "Product 2", price: "$29.99" },
  ];

  return (
    <nav
      className="px-2 py-2 flex items-center justify-between relative"
      style={{ backgroundColor: "#68b5c2" }}
    >
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <FaUserCircle className="text-2xl text-white" />
        <h1 className="text-xl font-bold text-white">EmpowerLife</h1>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-3">
        <Link
          to="/"
          className="flex items-center text-white hover:bg-[#2997a9] px-3 py-2 rounded"
        >
          <FaHome className="mr-1" />
          Home
        </Link>
        <Link
          to="/product"
          className="flex items-center text-white hover:bg-[#2997a9] px-3 py-2 rounded"
        >
          <FaProductHunt className="mr-1" />
          Products
        </Link>
        <Link
          to="/blogs"
          className="flex items-center text-white hover:bg-[#2997a9] px-3 py-2 rounded"
        >
          <FaBlog className="mr-1" />
          Blog
        </Link>
        <Link
          to="/contactUs"
          className="flex items-center text-white hover:bg-[#2997a9] px-3 py-2 rounded"
        >
          <FaEnvelope className="mr-1" />
          Contact Us
        </Link>

        {user?.email ? (
          <div className="relative flex items-center space-x-4">
            {/* Notifications Icon */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-white hover:text-[#86c7d2] relative"
              >
                <FaBell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications.length}
                </span>
              </button>

              {/* Desktop Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">Notifications</h3>
                  </div>
                  <div className="divide-y">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer ${!notification.isRead ? 'bg-blue-50' : ''
                          }`}
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <div className="relative">
              <Link to="/cart" className="text-white hover:text-[#86c7d2]">
                <FaShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </Link>
            </div>

            {/* Avatar and Dropdown */}
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2"
            >
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="rounded-full w-10 h-10"
              />
            </button>

            {isDropdownOpen && (
              <div
                className="absolute bg-white text-black rounded shadow-md right-0 mt-2 w-40 z-50"
                style={{ top: "100%" }}
              >
                <div className="px-4 py-2 text-black">
                  <span>{user.displayName}</span>
                </div>

                <Link
                  to="/dashboard"
                  className="px-2 py-2 hover:bg-gray-200 w-full text-left flex items-center space-x-1"
                >
                  <MdDashboard className="mr-1" />
                  <span>Dashboard</span>
                </Link>

                <button
                  onClick={logOut}
                  className="px-2 py-2 hover:bg-gray-200 w-full text-left flex items-center space-x-1"
                >
                  <AiOutlineLogout />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/signin"
            className="hover:bg-[#2997a9] text-white px-3 py-2 rounded"
          >
            Join Us
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center space-x-4">
        {user?.email && (
          <>
            {/* Mobile Notifications Icon */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowMobileNotifications(!showMobileNotifications);
                  setShowMobileCart(false);
                  setIsMobileMenuOpen(false);
                }}
                className="text-white hover:text-[#86c7d2] relative"
              >
                <FaBell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications.length}
                </span>
              </button>
            </div>

            {/* Mobile Cart Icon */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowMobileCart(!showMobileCart);
                  setShowMobileNotifications(false);
                  setIsMobileMenuOpen(false);
                }}
                className="text-white hover:text-[#86c7d2] relative"
              >
                <FaShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </button>
            </div>
          </>
        )}

        <button
          className="text-xl text-white"
          onClick={toggleMobileMenu}
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Notifications Panel */}
      {showMobileNotifications && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-50 max-h-[80vh] overflow-y-auto">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Notifications</h3>
          </div>
          <div className="divide-y">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer ${!notification.isRead ? 'bg-blue-50' : ''
                  }`}
              >
                <div className="flex justify-between">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Cart Panel */}
      {showMobileCart && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-50 max-h-[80vh] overflow-y-auto">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Shopping Cart</h3>
          </div>
          <div className="divide-y">
            {cartItems.map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">{item.name}</h4>
                  <span className="text-gray-600">{item.price}</span>
                </div>
              </div>
            ))}
            <div className="p-4">
              <Link
                to="/cart"
                className="w-full bg-[#68b5c2] text-white py-2 px-4 rounded text-center block hover:bg-[#2997a9]"
                onClick={() => setShowMobileCart(false)}
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          className="absolute top-16 left-0 w-full flex flex-col items-center space-y-3 p-4 z-50"
          style={{ backgroundColor: "#68b5c2" }}
        >
          <Link
            to="/"
            className="flex items-center text-white hover:bg-[#2997a9] px-3 py-2 rounded w-full text-center"
          >
            <FaHome className="mr-1" />
            Home
          </Link>
          <Link
            to="/product"
            className="flex items-center text-white hover:bg-[#2997a9] px-3 py-2 rounded w-full text-center"
          >
            <FaProductHunt className="mr-1" />
            Products
          </Link>
          <Link
            to="/blogs"
            className="flex items-center text-white hover:bg-[#2997a9] px-3 py-2 rounded w-full text-center"
          >
            <FaBlog className="mr-1" />
            Blog
          </Link>
          <Link
            to="/contactUs"
            className="flex items-center text-white hover:bg-[#2997a9] px-3 py-2 rounded w-full text-center"
          >
            <FaEnvelope className="mr-1" />
            Contact Us
          </Link>
          {user?.email && (
            <Link
              to="/dashboard"
              className="flex items-center text-white hover:bg-[#2997a9] px-3 py-2 rounded w-full text-center"
            >
              <MdDashboard className="mr-1" />
              Dashboard
            </Link>
          )}
        </div>
      )}

    </nav>
  );
}

export default Navbar;