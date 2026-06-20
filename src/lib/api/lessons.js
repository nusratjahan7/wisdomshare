import { serverFetch } from "../core/server";


export const getMyLessons = async (userId) => {
    if (!userId) return [];
    return serverFetch(`/my-lessons?userId=${userId}`);
};