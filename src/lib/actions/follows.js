"use server"

import { serverMutation } from "../core/server"

export const followAuthor = async (authorId) => {
    return serverMutation(`/api/follows/${authorId}`, {});
};

export const unfollowAuthor = async (authorId) => {
    return serverMutation(`/api/follows/${authorId}`, {}, 'DELETE');
};
