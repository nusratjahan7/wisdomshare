import { serverMutation } from "../core/server";

export const updateUserRole = async (userId, role) => {
    return serverMutation(`/api/admin/users/update-role/${userId}`, { role }, 'PATCH');
};

export const deleteUserAccount = async (userId) => {
    return serverMutation(`/api/admin/users/delete/${userId}`, {}, 'DELETE');
};