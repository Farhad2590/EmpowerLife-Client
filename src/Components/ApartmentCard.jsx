import { FaBath, FaBed, FaDollarSign, FaMapPin, FaSquare } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { MdOutlinePets } from "react-icons/md";
import { Link } from "react-router-dom";

const ApartmentCard = ({ apartment }) => {
    return (
        <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-48 overflow-hidden">
                <img src={apartment.image || '/default-image.jpg'} alt={apartment.category || 'Apartment'} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    {apartment.category}
                </div>
            </div>

            <div className="p-5">
                <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                        {apartment.blockName} - {apartment.apartmentNo}
                    </h3>
                    <p className="text-gray-600">{apartment.floorNo}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                        <FaSquare className="w-4 h-4" />
                        <span>{apartment.size || 'N/A'} sq ft</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <FaBath className="w-4 h-4" />
                        <span>{apartment.rooms?.bathrooms || 'N/A'} Bath</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <FaBed className="w-4 h-4" />
                        <span>{apartment.rooms?.bedrooms || 'N/A'} Bed</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <MdOutlinePets className="w-4 h-4" />
                        <span>{apartment.petPolicy?.split(' ')[0] || 'Unknown'}</span>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {apartment.facilities?.map((facility, index) => (
                            <span key={index} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">
                                {facility}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                        <FaDollarSign className="w-5 h-5 text-green-600" />
                        <span className="text-xl font-bold text-green-600">{apartment.rentPerMonth || 'N/A'}</span>
                        <span className="text-gray-500">/month</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                        <FiTarget className="w-4 h-4" />
                        <span>{apartment.availabilityStatus || 'Unknown'}</span>
                    </div>
                </div>

                <Link
                    to={`/product/${apartment.id}`}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2">
                    <FaMapPin className="w-4 h-4" />
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ApartmentCard;
