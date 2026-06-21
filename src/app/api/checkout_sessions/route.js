import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe, PLAN_PRICE_ID } from '../../../lib/stripe'
import { getUserSession } from '@/lib/core/session'


export async function POST(request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')


        const formData = await request.formData();
        const planId = formData.get('plan_id');
        const priceID = PLAN_PRICE_ID[planId];

        if (!priceID) {
            return NextResponse.json({ error: "Invalid Plan ID provided" }, { status: 400 });
        }

        const user = await getUserSession();

        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,
            line_items: [
                {
                    price: priceID,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            metadata: { planId },
            success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
        });

        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}