

import { FaCalendar } from "react-icons/fa";
import { FaMailchimp, FaShield } from "react-icons/fa6";
import { CiSettings } from "react-icons/ci";
import { FiBell, FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";


const Profile = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  console.log(users);
  

  useEffect(() => {
    if (user?.email) {
      fetchUsers(user.email);
    }
  }, [user?.email]);

  const fetchUsers = async (email) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/${email}`);
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users by email:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header Background */}
      <div className="h-32 bg-[#68b5c2]" />

      {/* Profile Content */}
      <div className="relative px-6 pb-6">
        {/* Profile Image */}
        <div className="absolute -top-36 left-1/2 transform -translate-x-1/2">
          <img
            src={users.photo}
            alt="Farhad Hossen"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-800">{users.name}</h2>
          <p className="text-[#68b5c2] font-medium">{users.role}</p>
        </div>

        {/* Stats
        <div className="mt-6 flex justify-center space-x-8">
          <div className="text-center">
            <p className="text-xl font-bold text-gray-800">245</p>
            <p className="text-sm text-gray-500">Projects</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-800">12k</p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-800">8k</p>
            <p className="text-sm text-gray-500">Following</p>
          </div>
        </div> */}

        {/* Contact Info */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center text-gray-600">
            <FaMailchimp className="w-5 h-5 text-[#68b5c2]" />
            <span className="ml-3">{users.email}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FaCalendar className="w-5 h-5 text-[#68b5c2]" />
            <span className="ml-3">{users.createdAt}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button className="p-2 rounded-full bg-[#68b5c2] text-white hover:bg-opacity-90">
            <CiSettings className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full bg-[#68b5c2] text-white hover:bg-opacity-90">
            <FiBell className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full bg-[#68b5c2] text-white hover:bg-opacity-90">
            <FaShield className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full bg-[#68b5c2] text-white hover:bg-opacity-90">
            <FiLogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;