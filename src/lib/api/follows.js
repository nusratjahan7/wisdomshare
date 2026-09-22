import { protectedFetch, serverFetch } from "../core/server";

export const getFollowStatus = async (authorId) => {
    return protectedFetch(`/api/follows/status/${authorId}`);
};

export const getFollowCounts = async (authorId) => {
    return serverFetch(`/api/follows/counts/${authorId}`);
};

export const getFollowingIds = async () => {
    return protectedFetch('/api/follows/following-ids');
};

export const getPublicUser = async (id) => {
    return serverFetch(`/api/users/${id}/public`);
};

export const getMyFollowers = async () => {
    return protectedFetch('/api/follows/followers');
};

export const getMyFollowing = async () => {
    return protectedFetch('/api/follows/following');
};
