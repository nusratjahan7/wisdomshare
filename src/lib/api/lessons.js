import { serverFetch } from "../core/server";

export const getLessons = async (queryString) => {
    return serverFetch(`/api/lessons?${queryString}`);
}

export const getMyLessons = async (userId) => {
    if (!userId) return [];
    return serverFetch(`/my-lessons?userId=${userId}`);
};

export const getLessonDetails = async (id) => {
    return serverFetch(`/api/lessons/${id}`);
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
    return serverFetch(`/my-saved-lessons?userId=${userId}`);
};

export const getAllAdminLessons = async () => {
    return serverFetch('/api/admin/lessons');
};
export const getFeaturedLessons = async () => {
    return serverFetch('/api/lessons/featured');
};