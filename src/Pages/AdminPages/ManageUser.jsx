import { useState, useEffect } from "react";
import DynamicHeader from "../../Components/SharedComponets/DynamicHeader";
// import { Trash2, Edit } from 'lucide-react';
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error);
      setIsLoading(false);
    }
  };

  const handleMakeWriter = async (userId) => {
    console.log(userId);
    
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/updateUserRole/${userId}`, {
        role: 'writer'
      });
      fetchAllUsers(); // Refresh the list
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/users/${userId}`);
        fetchAllUsers(); // Refresh the list
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div>
      <DynamicHeader title="All Users" />
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
                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Make Writer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Delete User</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user._id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{index + 1}</td>
                  <td className="px-6 py-4 text-sm">{user.name}</td>
                  <td className="px-6 py-4 text-sm">{user.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 text-sm rounded-full bg-[#68b5c2] bg-opacity-20 text-[#68b5c2]">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleMakeWriter(user.email)}
                      disabled={user.role === 'writer'}
                      className={`px-4 py-2 rounded-md text-white ${
                        user.role === 'writer'
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-[#68b5c2] hover:bg-opacity-80'
                      }`}
                    >
                      <FaEdit className="w-4 h-4 inline-block mr-1" />
                      Make Writer
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                    >
                      <FaTrash className="w-4 h-4 inline-block mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUser;