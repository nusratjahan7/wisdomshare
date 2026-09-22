"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { getNotifications } from "@/lib/api/notifications";
import { markAllNotificationsRead, markNotificationRead } from "@/lib/actions/notifications";

const POLL_INTERVAL_MS = 30000;

const NotificationBell = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const dropdownRef = useRef(null);

    const fetchNotifications = async () => {
        try {
            const res = await getNotifications();
            setNotifications(res?.notifications || []);
            setUnreadCount(res?.unreadCount || 0);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, POLL_INTERVAL_MS);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNotificationClick = async (notification) => {
        setIsOpen(false);
        if (!notification.read) {
            setNotifications((prev) =>
                prev.map((n) => (n._id === notification._id ? { ...n, read: true } : n))
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));
            try {
                await markNotificationRead(notification._id);
            } catch (error) {
                console.error("Error marking notification read:", error);
            }
        }
        if (notification.link) router.push(notification.link);
    };

    const handleMarkAllRead = async () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        setUnreadCount(0);
        try {
            await markAllNotificationsRead();
        } catch (error) {
            console.error("Error marking all notifications read:", error);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Notifications"
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 origin-top-right max-h-96 overflow-y-auto">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-50 mb-1">
                        <p className="text-sm font-bold text-gray-800">Notifications</p>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                className="text-xs font-semibold text-purple-600 hover:text-purple-700"
                            >
                                Mark all read
                            </button>
                        )}
                    </div>

                    {notifications.length === 0 ? (
                        <p className="px-4 py-6 text-sm text-gray-400 text-center">No notifications yet.</p>
                    ) : (
                        notifications.map((notification) => (
                            <button
                                key={notification._id}
                                onClick={() => handleNotificationClick(notification)}
                                className={`w-full text-left px-4 py-3 text-sm transition-colors flex gap-3 items-start ${notification.read ? "text-gray-500" : "bg-purple-50/60 text-gray-800 font-medium"
                                    } hover:bg-purple-50`}
                            >
                                {notification.meta?.actorImage ? (
                                    <img
                                        src={notification.meta.actorImage}
                                        alt={notification.meta.actorName || ""}
                                        className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5"
                                    />
                                ) : null}
                                <div className="min-w-0">
                                    <p className="leading-snug">{notification.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {notification.createdAt ? new Date(notification.createdAt).toLocaleString() : ""}
                                    </p>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
