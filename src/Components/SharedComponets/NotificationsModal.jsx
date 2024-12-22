// import React from 'react';
// import { Bell } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const NotificationsModal = ({ isOpen, setIsOpen }) => {
  // Sample notifications data - replace with your actual notifications
  const notifications = [
    {
      id: 1,
      title: "New Product Available",
      message: "Check out our latest health supplement!",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: 2,
      title: "Order Shipped",
      message: "Your order #1234 has been shipped",
      time: "1 day ago",
      isRead: true,
    },
    {
      id: 3,
      title: "Special Offer",
      message: "Get 20% off on all products this weekend",
      time: "2 days ago",
      isRead: true,
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg ${
                notification.isRead ? 'bg-gray-50' : 'bg-blue-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-sm">{notification.title}</h3>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsModal;