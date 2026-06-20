import { serverFetch } from "../core/server";

export const getLessons = async () => {
    return serverFetch();
}