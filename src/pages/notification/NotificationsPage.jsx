import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNotificationsByUserId,
  selectUnreadNotificationsByUserId,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../../store/slices/slices.js";
import { Bell, CheckCircle2, X, CheckCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useParams } from "react-router-dom";

const NotificationPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const currentUserId = parseInt(id);
  // Select notifications for current user
  const notifications = useSelector((state) =>
    selectNotificationsByUserId(state, currentUserId)
  );
  const unreadNotifications = useSelector((state) =>
    selectUnreadNotificationsByUserId(state, currentUserId)
  );

  const handleMarkAsRead = (notificationId) => {
    dispatch(markAsRead(notificationId));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const handleDelete = (notificationId) => {
    dispatch(deleteNotification(notificationId));
  };

  // Format timestamp
  const formatTime = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "Just now";
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Bell className="text-indigo-600 w-8 h-8" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-500">
              You have{" "}
              <span className="font-semibold text-indigo-600">
                {unreadNotifications.length}
              </span>{" "}
              unread notification{unreadNotifications.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Mark All as Read Button */}
        {unreadNotifications.length > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md"
          >
            <CheckCircle className="w-4 h-4" />
            Mark All as Read
          </button>
        )}
      </div>

      {/* Notification List */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
            <Bell className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-xl font-medium text-gray-600">No notifications yet</p>
            <p className="text-gray-500 mt-2">We'll notify you when something important happens.</p>
          </div>
        ) : (
          notifications
            .sort((a, b) => new Date(b.sent_on) - new Date(a.sent_on)) // Latest first
            .map((n) => (
              <div
                key={n.notification_id}
                className={`
                  group relative flex justify-between items-start p-6 rounded-2xl shadow-md border transition-all duration-300
                  hover:shadow-xl hover:-translate-y-1
                  ${n.is_read
                    ? "bg-white border-gray-200"
                    : "bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-indigo-300 shadow-lg"
                  }
                `}
              >
                <div className="flex gap-4 flex-1">
                  {/* Unread Dot Indicator */}
                  {!n.is_read && (
                    <div className="flex flex-col items-center">
                      <span className="w-3 h-3 rounded-full bg-indigo-600 animate-pulse"></span>
                    </div>
                  )}

                  <div className="flex-1">
                    {/* Type Badge */}
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${n.type === "payment_received"
                          ? "bg-green-100 text-green-800"
                          : n.type === "job_application_status"
                            ? "bg-blue-100 text-blue-800"
                            : n.type === "feedback_received"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                      >
                        {n.type.replace(/_/g, " ").charAt(0).toUpperCase() +
                          n.type.replace(/_/g, " ").slice(1)}
                      </span>
                    </div>

                    <p className={`font-medium ${n.is_read ? "text-gray-700" : "text-gray-900"}`}>
                      {n.message}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatTime(n.sent_on)}
                    </p>

                    {/* Action: Mark as Read */}
                    {!n.is_read && (
                      <button
                        onClick={() => handleMarkAsRead(n.notification_id)}
                        className="mt-3 flex items-center gap-1 text-indigo-600 text-sm font-medium hover:underline"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(n.notification_id)}
                  className="opacity-0 group-hover:opacity-100 transition ml-4 text-gray-400 hover:text-red-600"
                  title="Delete notification"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default NotificationPage;