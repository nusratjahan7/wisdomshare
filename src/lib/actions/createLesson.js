"use server"

import { serverMutation } from "../core/server"

export const createLesson = async (newLessonData) => {
    return serverMutation('/lessons/add', newLessonData);
}

export const toggleLikeLesson = async (id, userId) => {
    return serverMutation(`/api/lessons/${id}/like`, { userId });
};

export const saveLesson = async (lessonId, userId, userPlan) => {
    return serverMutation(`/api/lessons/save`, { lessonId, userId, userPlan });
};

export const submitReport = async (reportData) => {
    return serverMutation(`/api/reports/add`, reportData);
};
export const postComment = async (commentData) => {
    return serverMutation(`/api/comments/add`, commentData);
};