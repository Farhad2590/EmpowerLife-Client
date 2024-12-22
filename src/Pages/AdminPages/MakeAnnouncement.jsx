import { useState, useEffect } from "react";
import { LuBellRing, LuCalendar, LuClock, LuSend, LuPackage } from "react-icons/lu";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import axios from "axios";
import toast from "react-hot-toast";
import DynamicHeader from "../../Components/SharedComponets/DynamicHeader";

const MakeAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    type: "general", // general, order, promotion, maintenance
    priority: "normal", // normal, urgent
    isRead: false
  });

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch Announcements
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/announcements`);
      setAnnouncements(data);
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
      toast.error("Failed to load announcements");
    }
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement(prev => ({ ...prev, [name]: value }));
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const announcementDetails = {
      ...newAnnouncement,
      time: new Date().toLocaleString(),
      createdAt: new Date().toISOString(),
    };

    try {
      const { data } = await axios.post(`${API_URL}/newAnnouncement`, announcementDetails);
      if (data.insertedId) {
        setAnnouncements(prev => [announcementDetails, ...prev]);
        toast.success("Announcement published successfully!");
        setNewAnnouncement({
          title: "",
          message: "",
          type: "general",
          priority: "normal",
          isRead: false
        });
      }
    } catch (error) {
      console.error("Failed to publish announcement:", error);
      toast.error("Failed to publish announcement");
    }
  };

  // Get announcement type icon
  const getAnnouncementIcon = (type) => {
    switch (type) {
      case 'order':
        return <LuPackage className="w-5 h-5" />;
      default:
        return <LuBellRing className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <DynamicHeader title="Make Announcement" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Announcement Form */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <LuBellRing className="w-6 h-6 text-[#68b5c2]" />
            <h2 className="text-xl font-semibold">Create New Announcement</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={newAnnouncement.title}
                onChange={handleInputChange}
                placeholder="Enter announcement title"
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#68b5c2] focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={newAnnouncement.message}
                onChange={handleInputChange}
                placeholder="Enter announcement message"
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#68b5c2] focus:border-transparent transition-all h-32"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={newAnnouncement.type}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#68b5c2] focus:border-transparent transition-all"
                >
                  <option value="general">General</option>
                  <option value="order">Order Update</option>
                  <option value="promotion">Promotion</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  value={newAnnouncement.priority}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#68b5c2] focus:border-transparent transition-all"
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#68b5c2] text-white p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#56a3b0] transition-colors duration-200"
            >
              <LuSend className="w-5 h-5" />
              <span>Publish Announcement</span>
            </button>
          </form>
        </div>

        {/* Announcements List */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <LuClock className="w-6 h-6 text-[#68b5c2]" />
            Recent Announcements
          </h3>

          {announcements.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No announcements yet</p>
          ) : (
            <Swiper
              modules={[Pagination]}
              slidesPerView={1}
              pagination={{ clickable: true }}
              spaceBetween={20}
              className="max-h-[600px] overflow-hidden"
            >
              {announcements.map((announcement, index) => (
                <SwiperSlide key={index}>
                  <div className={`bg-gray-50 p-4 rounded-lg border ${
                    announcement.priority === 'urgent' ? 'border-red-300' : 'border-gray-100'
                  } hover:border-[#68b5c2] transition-colors duration-200`}>
                    <div className="flex items-center gap-2 mb-2">
                      {getAnnouncementIcon(announcement.type)}
                      <span className="text-sm font-medium text-gray-500 capitalize">
                        {announcement.type}
                      </span>
                      {announcement.priority === 'urgent' && (
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                          Urgent
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-lg text-[#68b5c2] mb-2">
                      {announcement.title}
                    </h4>
                    <p className="text-gray-600 mb-3">{announcement.message}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <LuCalendar className="w-4 h-4" />
                      <span>{announcement.time}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
};

export default MakeAnnouncement;