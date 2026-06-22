import { protectedFetch, serverFetch } from "../core/server";

export const getUserStats = async (userId) => {
    if (!userId) return null;
    return protectedFetch(`/user/stats/${userId}`);
};

export const getUserDashboard = async (userId) => {
    if (!userId) return null;
    return protectedFetch(`/api/user-dashboard?userId=${userId}`);
};

export const topContributor = async () => {
    return serverFetch('/api/top-contributors');
};

export const getAllUsers = async () => {
    return protectedFetch('/api/admin/users');
};