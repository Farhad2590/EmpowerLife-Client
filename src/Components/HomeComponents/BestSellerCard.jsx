import { useEffect, useState } from 'react';
import { FaShoppingCart, FaCheckCircle, FaStar } from 'react-icons/fa';
import DynamicHeader from '../SharedComponets/DynamicHeader';
import axios from 'axios';

const BestSellerCard = () => {
    const [bestSellers, setBestSellers] = useState([]);
     useEffect(() => {
            const getData = async () => {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/product`);
                const bestSellingProducts = data.filter((item) => item.best_seller === "Yes");
                setBestSellers(bestSellingProducts);
            };
            getData();
        }, []);


    return (
        <div>
            <DynamicHeader title="Best Seller" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {bestSellers.map((product) => (
                    <div
                        key={product.id}
                        className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-4 shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105"
                    >
                        {/* Star Icon Badge */}
                        <div className="absolute top-4 left-4 bg-[#86c7d2] text-white p-2 rounded-full">
                            <FaStar className="text-lg" />
                        </div>

                        {/* Product Image */}
                        <div
                            className="w-full h-48 bg-cover bg-center rounded-lg mb-4"
                            style={{ backgroundImage: `url(${product.image_url})` }}
                        ></div>

                        {/* Best Seller Badge */}
                        <div className="absolute top-4 right-4 bg-[#86c7d2] text-white px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1">
                            <FaCheckCircle />
                            Best Seller
                        </div>

                        {/* Product Info */}
                        <div className="space-y-2">
                            <h3 className="text-lg font-bold text-[#68b5c2]">{product.product_name}</h3>
                            <p className="text-sm text-gray-600">{product.product_description}</p>
                            <div className="border-t border-gray-300 my-2"></div>
                            <ul className="space-y-1">
                                {product.product_feature.map((feature, index) => (
                                    <li key={index} className="text-sm text-gray-500 flex items-center gap-2">
                                        <FaCheckCircle className="text-[#86c7d2]" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-lg font-bold text-[#68b5c2]">${product.price}</span>
                            <button className="flex items-center gap-2 bg-[#86c7d2] text-white px-4 py-2 rounded-full hover:bg-[#1c6b79] transition">
                                <FaShoppingCart />
                                Buy Now
                            </button>
                        </div>

                        {/* Stock Info */}
                        <p className="text-xs text-gray-500 text-right mt-2">{product.product_stock} in stock</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestSellerCard;
