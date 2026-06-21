import { serverMutation } from "../core/server";

export const deleteAdminLesson = async (lessonId) => {
    return serverMutation(`/lessons/delete/${lessonId}`, {}, 'DELETE');
};

export const toggleFeaturedLesson = async (lessonId, isFeatured) => {
    return serverMutation(`/api/admin/lessons/featured/${lessonId}`, { isFeatured }, 'PATCH');
};

export const markLessonAsReviewed = async (lessonId) => {
    return serverMutation(`/api/admin/lessons/reviewed/${lessonId}`, {}, 'PATCH');
};


