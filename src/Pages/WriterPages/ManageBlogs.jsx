import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import DynamicHeader from "../../Components/SharedComponets/DynamicHeader";
import { FaTrash } from "react-icons/fa";

const ManageBlogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const fetchAllBlogs = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/personalBlogs/${user.email}`);
      setBlogPosts(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/deleteBlogs/${blogId}`);
      setBlogPosts(blogPosts.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div>
      <DynamicHeader title="Manage Blogs" />
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
                <th className="px-6 py-4 text-left text-sm font-semibold">Writer Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Content</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {blogPosts.map((blog, index) => (
                <tr key={blog._id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{index + 1}</td>
                  <td className="px-6 py-4 text-sm">{blog.writerName}</td>
                  <td className="px-6 py-4 text-sm">{blog.title}</td>
                  <td className="px-6 py-4 text-sm">{blog.content}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleDeleteBlog(blog._id)}
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

export default ManageBlogs;
