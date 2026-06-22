import { protectedFetch, serverFetch } from "../core/server";

export const getLessons = async (queryString) => {
    return serverFetch(`/api/lessons?${queryString}`);
}

export const getMyLessons = async (userId) => {
    if (!userId) return [];
    return protectedFetch(`/my-lessons?userId=${userId}`);
};

export const getLessonDetails = async (id) => {
    return protectedFetch(`/api/lessons/${id}`);
};

export const checkSaveStatus = async (lessonId, userId) => {
    return serverFetch(`/api/lessons/save-status?lessonId=${lessonId}&userId=${userId}`);
};

export const getComments = async (lessonId) => {
    return serverFetch(`/api/comments/${lessonId}`);
};

export const getRelatedLessons = async (category, currentId) => {
    return serverFetch(`/api/lessons/related/${category}?currentId=${currentId}`);
};

export const getSavedLessons = async (userId) => {
    return protectedFetch(`/my-saved-lessons?userId=${userId}`);
};

export const getAllAdminLessons = async () => {
    return protectedFetch('/api/admin/lessons');
};
export const getFeaturedLessons = async () => {
    return serverFetch('/api/lessons/featured');
};

export const getAdminAnalytics = async () => {
    return protectedFetch('/api/admin/analytics-overview');
};
