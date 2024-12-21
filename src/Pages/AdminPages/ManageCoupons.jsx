import { useEffect, useState } from "react";
import axios from "axios";
// import DashboardSharedTitle from "../../components/Shared/DashboardSharedTitle";
import { FaPlusCircle } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import DynamicHeader from "../../Components/SharedComponets/DynamicHeader";

const ManageCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCoupon, setNewCoupon] = useState({
        code: "",
        discountPercentage: "",
        description: ""
    });

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchAllCoupons();
    }, []);

    const fetchAllCoupons = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/cupons`);
            setCoupons(data);
        } catch (error) {
            console.error("Failed to fetch coupons:", error);
        }
    };


    // Handle adding a new coupon
    const handleSubmit = (e) => {
        e.preventDefault();

        const couponToAdd = {
            code: newCoupon.code,
            discountPercentage: parseInt(newCoupon.discountPercentage, 10),
            description: newCoupon.description
        };

        axios
            .post(`${API_URL}/newCupons`, couponToAdd)
            .then((response) => {
                setCoupons([...coupons, response.data]);
                setIsModalOpen(false);
                setNewCoupon({ code: "", discountPercentage: "", description: "" });
            })
            .catch((error) => console.error("Failed to add coupon:", error));
    };

    return (
        <div className="relative">
            <DynamicHeader title="Manage Coupons" />

            {/* Add Coupon Button */}
            <div className="mb-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#68b5c2] text-white rounded-md hover:bg-[#5899a3] transition-colors duration-200"
                >
                    <FaPlusCircle className="w-5 h-5" />
                    Add New Coupon
                </button>
            </div>

            {/* Coupons Table */}
            <div className="w-full overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-[#68b5c2] text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">#</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Code</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Discount %</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Description</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {coupons.map((coupon, index) => (
                            <tr key={coupon._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm">{index + 1}</td>
                                <td className="px-6 py-4 text-sm font-medium">{coupon.code}</td>
                                <td className="px-6 py-4 text-sm">{coupon.discountPercentage}%</td>
                                <td className="px-6 py-4 text-sm">{coupon.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Coupon Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Add New Coupon</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FiX className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Coupon Code
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#68b5c2]"
                                    value={newCoupon.code}
                                    onChange={(e) =>
                                        setNewCoupon({ ...newCoupon, code: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Discount Percentage
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    max="100"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#68b5c2]"
                                    value={newCoupon.discountPercentage}
                                    onChange={(e) =>
                                        setNewCoupon({ ...newCoupon, discountPercentage: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#68b5c2]"
                                    rows="3"
                                    value={newCoupon.description}
                                    onChange={(e) =>
                                        setNewCoupon({ ...newCoupon, description: e.target.value })
                                    }
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#68b5c2] text-white py-2 px-4 rounded-md hover:bg-[#5899a3] transition-colors duration-200"
                            >
                                Add Coupon
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCoupons;
