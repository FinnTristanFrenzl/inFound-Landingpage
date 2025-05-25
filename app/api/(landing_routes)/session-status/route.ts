import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);



export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url);
  const sessionID = searchParams.get('session_id');

    const session = await stripe.checkout.sessions.retrieve(sessionID!)
    return NextResponse.redirect(`https://www.infound.app/payment?session_id=${sessionID}&status=${session.status}`)
}