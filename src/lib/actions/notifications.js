"use server"

import { serverMutation } from "../core/server"

export const markNotificationRead = async (id) => {
    return serverMutation(`/api/notifications/${id}/read`, {}, 'PATCH');
};

export const markAllNotificationsRead = async () => {
    return serverMutation('/api/notifications/mark-all-read', {}, 'PATCH');
};
