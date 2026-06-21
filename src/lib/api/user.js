import { serverFetch } from "../core/server";

export const getUserStats = async (userId) => {
    if (!userId) return null;
    return serverFetch(`/user/stats/${userId}`);
};

export const getUserDashboard = async (userId) => {
    if (!userId) return null;
    return serverFetch(`/api/user-dashboard?userId=${userId}`);
};

export const topContributor = async () => {
    return serverFetch('/api/top-contributors');
};

export const getAllUsers = async () => {
    return serverFetch('/api/admin/users');
};