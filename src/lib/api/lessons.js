import { serverFetch } from "../core/server";

export const getLessons = async (queryString) => {
    return serverFetch(`/api/lessons?${queryString}`);
}

export const getMyLessons = async (userId) => {
    if (!userId) return [];
    return serverFetch(`/my-lessons?userId=${userId}`);
};