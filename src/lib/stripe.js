import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'user_premium': 'price_1TkQXC1LKVULHkFOxP0Tnxbq',
}