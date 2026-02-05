"use client";

import { useState } from "react";
import {
  Bell,
  CheckCheck,
  Clock,
  ChevronLeft,
  ChevronRight,
  Utensils,
  Info,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button"; // Assuming shadcn or standard button
import { Badge } from "@/components/ui/badge"; // Assuming shadcn or standard badge
import {
  useGetNotificationQuery,
  useMarkNotificationReadMutation,
} from "@/redux/api/notificationApi";

const NotificationsPage = () => {
  // --- State ---
  const [page, setPage] = useState(1);
  const limit = 15;

  // --- RTK Query ---
  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetNotificationQuery({
    page,
    limit,
  });

  const [markRead] = useMarkNotificationReadMutation();

  const notifications = response?.data.notifications || [];

  // Pagination Logic (Fallback if backend doesn't send meta)
  const meta = response?.data.pagination;
  console.log(meta);
  const totalPages = meta?.totalPages || 1;
  const hasNextPage = meta ? page < totalPages : notifications.length === limit;
  const hasPrevPage = page > 1;

  // --- Handlers ---
  const handleMarkAsRead = async (id: string) => {
    try {
      await markRead(id).unwrap();
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const getIconByType = (type: string) => {
    switch (type.toLowerCase()) {
      case "catering":
        return <Utensils className="h-5 w-5 text-orange-500" />;
      case "system":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="md:min-w-7xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Notifications
            <Badge
              variant="secondary"
              className="ml-2 bg-blue-50 text-blue-700 hover:bg-blue-100"
            >
              {notifications?.filter((n: any) => !n.isRead).length} New
            </Badge>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Stay updated with your latest bookings and alerts.
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-4">
        {isLoading ? (
          // Loading Skeleton
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-24 w-full bg-gray-100 rounded-lg animate-pulse"
            />
          ))
        ) : notifications.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <Bell className="h-12 w-12 text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No notifications yet.</p>
            <p className="text-sm text-gray-400">
              We&apos;ll let you know when something arrives.
            </p>
          </div>
        ) : (
          // List
          notifications?.map((notification: any) => (
            <div
              onClick={() => handleMarkAsRead(notification._id)}
              key={notification._id}
              className={`relative group flex gap-4 p-5 rounded-xl border transition-all duration-200 ${
                notification.isRead
                  ? "bg-white border-gray-100 opacity-75 hover:opacity-100"
                  : "bg-blue-50/30 border-blue-100 shadow-sm"
              }`}
            >
              {/* Icon Box */}
              <div
                className={`shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${
                  notification.isRead
                    ? "bg-gray-100"
                    : "bg-white shadow-sm ring-1 ring-gray-100"
                }`}
              >
                {getIconByType(notification.type)}
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3
                    className={`text-base truncate pr-4 ${notification.isRead ? "font-medium text-gray-700" : "font-bold text-gray-900"}`}
                  >
                    {notification.title}
                  </h3>
                  <span className="flex items-center text-xs text-gray-400 whitespace-nowrap">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDistanceToNow(new Date(notification.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {notification.message}
                </p>

                {/* Actions Row */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                    {notification.type}
                  </span>

                  {!notification.isRead && (
                    <button className="text-xs flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
                      <CheckCheck className="h-3 w-3 mr-1" /> Mark as read
                    </button>
                  )}
                </div>
              </div>

              {/* Unread Indicator Dot */}
              {!notification.isRead && (
                <span className="absolute top-5 right-5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white"></span>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {notifications.length > 0 && (
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Page <span className="font-medium text-gray-900">{page}</span>
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!hasPrevPage || isFetching}
              className="flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNextPage || isFetching}
              className="flex items-center"
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
