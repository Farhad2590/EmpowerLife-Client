import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../authProvider/AuthProvider";
import { useLoaderData } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RoomInfo = () => {
    const { user } = useContext(AuthContext);
    const data = useLoaderData();
    const [room, setRoom] = useState(data);
    const [startDate, setStartDate] = useState(new Date());
    const [review, setReview] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios(`${import.meta.env.VITE_API_URL}/review`);
                setReview(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setRoom(data);
    }, [data]);

    const filteredReview = review.filter(reviews => reviews.room_title === room.title);
    const { _id, title, banner_image, room_description, room_images, price_per_night, room_size, features_paragraph, availability, special_offers, max_guests, beds } = room;

    const handleBooking = async (e) => {
        e.preventDefault();

        const bookingData = {
            deadline: startDate,
            availability: 'unAvailable',
            email: user?.email,
            name: user?.displayName,
            photourl: user?.photoURL,
            bookingId: _id,
            title,
            banner_image,
            room_description,
            price_per_night,
            room_size,
            room_images,
            special_offers,
            max_guests,
            beds,
            features_paragraph,
        };

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/booking`, bookingData);
            await axios.put(`${import.meta.env.VITE_API_URL}/rooms/${_id}`);
            const updatedRoomData = await axios.get(`${import.meta.env.VITE_API_URL}/rooms/${_id}`);
            setRoom(updatedRoomData.data);

            Swal.fire({
                icon: 'success',
                title: 'Booking successful',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error('Booking error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-sky-50 to-emerald-100">
            <div className="flex flex-col md:flex-row justify-around gap-5 items-center md:max-w-screen-xl mx-auto py-10">
                <div className="max-w-2xl bg-white rounded-lg shadow-md overflow-hidden">
                    <img className="object-cover w-full h-64" src={banner_image} alt="Room" />
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold text-[#158260]">{title}</h2>
                        <p className="mt-2 text-xl text-[#2ccb99]">{room_description}</p>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <span className="text-xl font-semibold text-[#158260]">Availability: <span className="text-[#2ccb99]">{availability}</span></span>
                                <span className="text-xl font-semibold text-[#158260]">Price: <span className="text-[#2ccb99]">${price_per_night}</span></span>
                            </div>
                            <div className="mt-2">
                                <span className="text-xl font-semibold text-[#158260]">Room Size: <span className="text-[#2ccb99]">{room_size}</span></span>
                            </div>
                            <div className="mt-2">
                                <span className="text-xl font-semibold text-[#158260]">Special Offers: <span className="text-[#2ccb99]">{special_offers}</span></span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-xl font-bold text-[#158260]">Reviews:</h3>
                            {filteredReview.length > 0 ? (
                                filteredReview.map((rev, index) => (
                                    <div key={index} className="text-gray-600">{rev.comment_text}</div>
                                ))
                            ) : (
                                <div className="text-[#2ccb99]">No reviews available for this room.</div>
                            )}
                        </div>
                    </div>

                    <div className="p-6">
                        <h3 className="text-xl font-bold text-[#158260]">Room Images</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                            {room_images.map((image, index) => (
                                <img key={index} className="object-cover w-full h-48 rounded-lg" src={image} alt={`Room Image ${index}`} />
                            ))}
                        </div>
                    </div>

                    <div className="p-6">
                        {availability === 'unAvailable' ? (
                            <button disabled className="w-full bg-gray-500 text-white py-2 rounded-md">Room Booked</button>
                        ) : (
                            <button onClick={() => setIsOpen(true)} className="w-full bg-[#158260] text-white py-2 rounded-md">Confirm Booking</button>
                        )}
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h2 className="text-[#2ccb99]">{title}</h2>
                        <div className="mt-2">
                            <p className="text-sm text-gray-600">Max Guests: <span className="text-[#2ccb99]">{max_guests}</span></p>
                            <p className="text-sm text-gray-600">Beds: <span className="text-[#2ccb99]">{beds}</span></p>
                        </div>
                        <div className="mt-4">
                            <label className="text-gray-700">Select Date</label>
                            <DatePicker selected={startDate} onChange={setStartDate} className="border p-2 w-full rounded-md" />
                        </div>

                        <div className="mt-4 flex justify-between">
                            <button onClick={handleBooking} className="bg-[#158260] text-white px-4 py-2 rounded-md">Book Now</button>
                            <button onClick={() => setIsOpen(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomInfo;
