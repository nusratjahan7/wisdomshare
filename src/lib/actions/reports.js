import { protectedFetch, serverMutation } from "../core/server";

export const getAdminReports = async () => {
    return protectedFetch('/api/admin/reports');
};

export const ignoreReport = async (lessonId) => {
    return serverMutation(`/api/admin/reports/ignore/${lessonId}`, {}, 'DELETE');
};

export const deleteReportedLesson = async (lessonId) => {
    return serverMutation(`/api/admin/reports/delete-lesson/${lessonId}`, {}, 'DELETE');
};
