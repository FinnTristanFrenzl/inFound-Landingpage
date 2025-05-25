import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSRKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseSRKey) {
    throw new Error('Supabase data missing')
}

const supabase = createClient(supabaseUrl, supabaseSRKey)

export const config = {
  api: {
    bodyParser: false,
  },
};


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,  {
  apiVersion: '2025-04-30.basil',
});

export async function POST(req: Request) {

    let event: Stripe.Event;
    
    try {
      const body = await req.text()
      const headerList = await headers()
      const signature = headerList.get('stripe-signature')
  
    if (!signature) {
      return new Response('Missing Stripe signature', { status: 400 });
    }
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error) {
    return new NextResponse(`Webhook Error: ${error}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object as Stripe.Checkout.Session;

    const featureID = session.metadata?.feature_id
    const amount = session.amount_total!;
    const email = session.customer_details?.email

    if (!featureID) {
      return new NextResponse('Missing feature_id', { status: 400 });
    }

    const { error } = await supabase.from('landing_funds').insert(
      {
        value: amount,
        email: email,
        feature_id: featureID,
      },
    )

    if (error) {
      return new NextResponse('DB Error', { status: 500 });
    }
  }
  return new NextResponse('OK', { status: 200 });
}
