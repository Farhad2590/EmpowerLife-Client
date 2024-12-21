import { useState } from 'react';
// import { Plus, Upload } from 'lucide-react';
import DynamicHeader from "../../Components/SharedComponets/DynamicHeader";
import axios from 'axios';
import { FaPlus, FaUpload } from 'react-icons/fa';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    category_name: '',
    product_name: '',
    product_description: '',
    price: '',
    product_feature: [''],
    product_stock: '',
    best_seller: 'No',
    image_url: ''
  });
  // console.log(formData);
  
  
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState(['']);

  const categories = [
    'Hearing Aids',
    'Mobility Aids',
    'Vision Aids',
    'Daily Living Aids',
    'Cognitive Aids'
  ];

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
    setFormData({ ...formData, product_feature: newFeatures.filter(f => f !== '') });
  };

  const addFeatureField = () => {
    setFeatures([...features, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/products`, formData);
      // Reset form or show success message
      setFormData({
        category_name: '',
        product_name: '',
        product_description: '',
        price: '',
        product_feature: [''],
        product_stock: '',
        best_seller: 'No',
        image_url: ''
      });
      setFeatures(['']);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <DynamicHeader title="Add New Product" />
      <form 
      onSubmit={handleSubmit} 
      className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              required
              value={formData.category_name}
              onChange={(e) => setFormData({ ...formData, category_name: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#68b5c2] focus:border-transparent"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              type="text"
              required
              value={formData.product_name}
              onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#68b5c2] focus:border-transparent"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#68b5c2] focus:border-transparent"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock
            </label>
            <input
              type="number"
              required
              value={formData.product_stock}
              onChange={(e) => setFormData({ ...formData, product_stock: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#68b5c2] focus:border-transparent"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              required
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#68b5c2] focus:border-transparent"
            />
          </div>

          {/* Best Seller */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Best Seller
            </label>
            <select
              value={formData.best_seller}
              onChange={(e) => setFormData({ ...formData, best_seller: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#68b5c2] focus:border-transparent"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
        </div>

        {/* Description - Full Width */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            required
            value={formData.product_description}
            onChange={(e) => setFormData({ ...formData, product_description: e.target.value })}
            rows="4"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#68b5c2] focus:border-transparent"
          />
        </div>

        {/* Features - Full Width */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Features
          </label>
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#68b5c2] focus:border-transparent"
                placeholder="Add a feature"
              />
              {index === features.length - 1 && (
                <button
                  type="button"
                  onClick={addFeatureField}
                  className="px-4 py-2 bg-[#68b5c2] text-white rounded-md hover:bg-opacity-90"
                >
                  <FaPlus className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#68b5c2] text-white rounded-md hover:bg-opacity-90 flex items-center justify-center gap-2"
          >
            {loading ? (
              'Adding Product...'
            ) : (
              <>
                <FaUpload className="w-5 h-5" />
                Add Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;