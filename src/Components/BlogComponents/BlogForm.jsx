import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const BlogForm = ({ onSubmit }) => {
    const CATEGORIES = [
        "Hearing Aids",
        "Mobility Aids",
        "Vision Aids",
        "Daily Living Aids",
        "Cognitive Aids"
      ];
    const { user } = useAuth();
    const [formData, setFormData] = useState({
      title: '',
      category: CATEGORIES[0],
      image: '',
      content: '',
    });
    
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = () => {
      if (!formData.title || !formData.category || !formData.image || !formData.content) {
        alert('All fields are required!');
        return;
      }
      onSubmit(formData);
      setFormData({
        title: '',
        category: CATEGORIES[0],
        image: '',
        content: '',
      });
    };
  
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#68b5c2]"
            placeholder="Enter blog title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#68b5c2] bg-white"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#68b5c2]"
            placeholder="Enter image URL"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#68b5c2] h-32"
            placeholder="Enter blog content"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-[#68b5c2] text-white font-semibold rounded hover:bg-[#5ca9b1] transition"
        >
          Add Post
        </button>
      </div>
    );
  };

export default BlogForm;