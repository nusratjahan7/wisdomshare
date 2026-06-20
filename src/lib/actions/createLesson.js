"use server"

import { serverMutation } from "../core/server"

export const createLesson = async (newLessonData) => {
    return serverMutation('/lessons/add', newLessonData);
} 