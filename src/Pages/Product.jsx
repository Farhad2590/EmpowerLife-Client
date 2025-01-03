import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import DynamicHeader from '../Components/SharedComponets/DynamicHeader';
import { FaCheckCircle, FaMapPin, FaSearch, FaTrash } from 'react-icons/fa';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import UseAdmin from '../hooks/useAdmin';

const Product = () => {
    const [isAdmin] = UseAdmin();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('price-asc');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/product`);
            setProducts(data);
            setFilteredProducts(data);
            setIsLoading(false);
        };
        getData();
    }, []);

    useEffect(() => {
        let filtered = [...products];
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(product => product.category_name === selectedCategory);
        }
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (sortBy === 'price-asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            filtered.sort((a, b) => b.price - a.price);
        }
        setFilteredProducts(filtered);
    }, [products, selectedCategory, sortBy, searchTerm]);

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/product/${productId}`);
            const updatedProducts = products.filter(product => product._id !== productId);
            setProducts(updatedProducts);
            setFilteredProducts(updatedProducts);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const categories = ['All', ...new Set(products.map(product => product.category_name))];

    return (
        <div>
            <DynamicHeader title="All Products" />
            <div className="flex justify-between items-center mb-6 p-4 rounded-lg shadow-md bg-white">
                <div className="flex items-center gap-6">
                    <div className="min-w-[150px]">
                        <label className="block font-semibold text-gray-600">Category</label>
                        <select
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="min-w-[150px]">
                        <label className="block font-semibold text-gray-600">Sort By</label>
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="price-asc">Price (Low to High)</option>
                            <option value="price-desc">Price (High to Low)</option>
                        </select>
                    </div>
                </div>

                <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full p-2 pl-8 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <FaSearch />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {isLoading ? (
                    <div className="col-span-full flex justify-center items-center">
                        <CircularProgress />
                    </div>
                ) : (
                    filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="max-w-[360px] rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 relative p-4"
                        >
                            <div className="relative">
                                <div
                                    className="w-full h-[200px] bg-cover bg-center rounded-lg mb-4"
                                    style={{ backgroundImage: `url(${product.image_url})` }}
                                />
                                {isAdmin && (
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="absolute top-2 left-2 bg-red-500 bg-opacity-90 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200 group"
                                    >
                                        <FaTrash className="w-4 h-4" />
                                        <span className="absolute left-full ml-2 bg-red-500 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            Delete Product
                                        </span>
                                    </button>
                                )}
                                {product.best_seller === 'Yes' && (
                                    <div className="absolute top-2 right-2 bg-[#86c7d2] text-white px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1">
                                        <FaCheckCircle />
                                        Best Seller
                                    </div>
                                )}
                            </div>
                            <div>
                                <h5 className="text-xl font-semibold text-gray-800 mb-2">{product.product_name}</h5>
                                <p className="text-sm text-gray-600 mb-4">{product.product_description}</p>
                                <div className="border-b border-gray-300 mb-4" />
                                <div className="space-y-1">
                                    {product.product_feature.map((feature, index) => (
                                        <div key={index} className="flex items-center text-sm text-gray-600">
                                            <FaCheckCircle className="text-[#86c7d2] mr-2" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-2 py-3">
                                <p className="text-lg font-bold text-gray-800">${product.price}</p>
                                <Link
                                    to={`/product/${product._id}`}
                                    className="flex items-center gap-2 bg-[#86c7d2] text-white px-4 py-2 rounded-full hover:bg-[#1c6b79] transition"
                                >
                                    <FaMapPin className="w-4 h-4" />
                                    View Details
                                </Link>
                            </div>
                            <p className="text-xs text-gray-500 text-right p-2">{product.product_stock} in stock</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Product;