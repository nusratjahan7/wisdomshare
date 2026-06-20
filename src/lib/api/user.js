import { serverFetch } from "../core/server";

export const getUserStats = async (userId) => {
    if (!userId) return null;
    return serverFetch(`/user/stats/${userId}`);
};