"use server"

import { serverMutation } from "../core/server"

export const suggestMetadata = async (content, currentTitle) => {
    return serverMutation('/api/ai/suggest-metadata', { content, currentTitle });
};

export const tightenProse = async (content) => {
    return serverMutation('/api/ai/tighten-prose', { content });
};
