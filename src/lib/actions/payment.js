"use server"

import { serverMutation } from "../core/server"

export const createPayment = async (subInfo) => {
    return serverMutation('/api/payments', subInfo);
}