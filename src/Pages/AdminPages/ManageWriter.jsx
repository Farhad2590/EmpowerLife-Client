import { useEffect, useState } from "react";
// import { UserMinus } from 'lucide-react';
import DynamicHeader from "../../Components/SharedComponets/DynamicHeader";
import axios from "axios";
import { FaUserMinus } from "react-icons/fa";

const ManageWriter = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      const writers = data.filter((user) => user.role === 'writer');
      setMembers(writers);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching writers:', error);
      setError(error);
      setIsLoading(false);
    }
  };

  const handleRemoveMember = async (member) => {
    if (window.confirm('Are you sure you want to remove this writer?')) {
      try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/users/${member._id}/role`, {
          role: 'user'
        });
        fetchAllUsers(); // Refresh the list
      } catch (error) {
        console.error('Error removing writer:', error);
      }
    }
  };

  return (
    <div>
      <DynamicHeader title="Manage Writers" />
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
                {/* <th className="px-6 py-4 text-left text-sm font-semibold">Role</th> */}
                <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {members.map((member, index) => (
                <tr key={member._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{index + 1}</td>
                  <td className="px-6 py-4 text-sm">{member.name}</td>
                  <td className="px-6 py-4 text-sm">{member.email}</td>
                  
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleRemoveMember(member)}
                      className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#68b5c2] bg-opacity-10 text-[#68b5c2] hover:bg-opacity-20 transition-colors duration-200"
                    >
                      <FaUserMinus className="w-4 h-4" />
                      <span>Remove Writer</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {members.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No writers found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageWriter;