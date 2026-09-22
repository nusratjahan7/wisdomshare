import { protectedFetch } from "../core/server";

export const getNotifications = async () => {
    return protectedFetch('/api/notifications');
};
