import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const ProductDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showAlert, setShowAlert] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/product/${id}`);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleAddToCart = async () => {
        if (!product) return;

        setIsAddingToCart(true);

        const totalPrice = quantity * product.price;


        const cartData = {
            productId: id,
            productName: product.product_name,
            productImage : product.image_url,
            productCategory: product.category_name,
            quantity: quantity,
            unitPrice: product.price,
            totalPrice: totalPrice,
            totalQuantity: quantity,
            userName: user.displayName,
            userEmail: user.email
        };

        // Post to cart endpoint
        await axios.post(`${import.meta.env.VITE_API_URL}/cart`, cartData);

        // Show success alert
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);

    };

    return (
        <div className="container mx-auto p-6 min-h-screen">
            <button
                onClick={() => navigate("/")}
                className="mb-6 flex items-center gap-2 text-[#68b5c2] hover:text-blue-700 font-semibold transition-all"
            >
                <FaArrowLeft className="w-4 h-4" /> Back to Products
            </button>

            {/* Product Details */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                {/* Product Image and Badges */}
                <div className="relative">
                    <img
                        src={product?.image_url}
                        alt={product?.product_name}
                        className="w-full h-96 object-cover"
                    />
                    {product?.best_seller === "Yes" && (
                        <div className="absolute top-4 right-4 bg-[#68b5c2] text-white px-4 py-2 rounded-full text-sm shadow-lg flex items-center gap-2">
                            <FaCheckCircle /> Best Seller
                        </div>
                    )}
                    <div className="absolute top-4 left-4 bg-[#68b5c2] text-white px-4 py-1 rounded-full text-sm shadow-lg">
                        {product?.category_name}
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        {product?.product_name}
                    </h1>
                    <p className="text-2xl text-green-600 font-semibold mb-6">
                        ${product?.price}
                    </p>

                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        {product?.product_description}
                    </p>

                    {/* Features */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                            Key Features
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {product?.product_feature?.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg"
                                >
                                    <FaCheckCircle className="text-[#68b5c2] w-5 h-5" />
                                    <span className="text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stock and Purchase Section */}
                    <div className="border-t pt-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="text-gray-700">
                                <span className="font-semibold">Availability: </span>
                                <span className="text-green-600">
                                    {product?.product_stock} in stock
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                {/* Quantity Controller */}
                                <div className="flex items-center border rounded-lg">
                                    <button
                                        className="px-4 py-2 hover:bg-gray-100"
                                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-2 border-x">{quantity}</span>
                                    <button
                                        className="px-4 py-2 hover:bg-gray-100"
                                        onClick={() =>
                                            quantity < parseInt(product?.product_stock) &&
                                            setQuantity(quantity + 1)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                                {/* Add to Cart Button */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAddingToCart}
                                    className="flex items-center gap-2 bg-[#68b5c2] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all disabled:bg-gray-400"
                                >
                                    <FaShoppingCart className="w-5 h-5" />
                                    {isAddingToCart ? "Adding..." : "Add to Cart"}
                                </button>
                            </div>
                        </div>
                        {/* Total Price Display */}
                        {product && (
                            <div className="mt-4 text-right text-gray-700">
                                <span className="font-semibold">Total Price: </span>
                                <span className="text-green-600">
                                    ${(quantity * product.price).toFixed(2)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Success Alert */}
            {showAlert && (
                <div className="fixed bottom-4 right-4 bg-green-100 border border-green-500 text-green-700 px-4 py-3 rounded-lg shadow-lg">
                    Product successfully added to cart!
                </div>
            )}
        </div>
    );
};

export default ProductDetails;