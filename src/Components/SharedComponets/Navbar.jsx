import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaProductHunt, FaBlog, FaEnvelope, FaBars, FaUserCircle } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";

function Navbar() {
  const { logOut, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav
      className="px-2 py-2 flex items-center justify-between"
      style={{ backgroundColor: "#68b5c2" }} // Navbar background color
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
          <div className="relative">
            {/* Avatar and Dropdown */}
            <button
              onClick={toggleMobileMenu}
              className="flex items-center space-x-2"
            >
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="rounded-full w-10 h-10"
              />
              <span className="text-white">{user.displayName}</span>
            </button>

            {isMobileMenuOpen && (
              <div className="absolute bg-white text-black rounded shadow-md right-0 mt-2 w-40">
                <button
                  onClick={() => {
                    logOut();
                    toggleMobileMenu();
                  }}
                  className=" px-2 py-2 hover:bg-gray-200 w-full text-left flex items-center space-x-1"
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

      {/* Mobile Menu */}
      <button
        className="md:hidden text-xl text-white"
        onClick={toggleMobileMenu}
      >
        <FaBars />
      </button>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div
          className="absolute top-16 left-0 w-full flex flex-col items-center space-y-3 p-4"
          style={{ backgroundColor: "#68b5c2" }} // Mobile menu background color
        >
          <Link
            to="/"
            className="text-white hover:bg-[#2997a9] px-3 py-2 rounded"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/product"
            className="text-white hover:bg-[#2997a9] px-3 py-2 rounded"
            onClick={toggleMobileMenu}
          >
            Products
          </Link>
          <Link
            to="/blogs"
            className="text-white hover:bg-[#2997a9] px-3 py-2 rounded"
            onClick={toggleMobileMenu}
          >
            Blog
          </Link>
          <Link
            to="/contactUs"
            className="text-white hover:bg-[#2997a9] px-3 py-2 rounded"
            onClick={toggleMobileMenu}
          >
            Contact Us
          </Link>

          {user?.email ? (
            <button
              onClick={() => {
                logOut();
                toggleMobileMenu();
              }}
              className="hover:bg-[#2997a9] text-white px-3 py-2 rounded flex items-center"
            >
              <AiOutlineLogout className="mr-1" />
              Logout
            </button>
          ) : (
            <Link
              to="/signin"
              className="hover:bg-[#2997a9] text-white px-3 py-2 rounded"
            >
              Join Us
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
