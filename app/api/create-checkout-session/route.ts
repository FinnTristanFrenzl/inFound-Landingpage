import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { supabase } from '@/supabaseClient/supabase';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');


  const {data, error} = await supabase.from('landing_features').select('*').eq('id', id).single()

  if (error) {
    return NextResponse.json(
      { error: error }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'sepa_debit', 'sofort', 'paypal'],
      ui_mode: 'embedded',
      line_items: [
        {
          price: data.price_id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `http://localhost:3000/api/session-status?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: true },
      metadata: {
        feature_id: data.id
      }
    });
    return NextResponse.json({ clientSecret: session.client_secret});
  } catch (error) {
    return NextResponse.json(
      { error: `Stripe session creation failed: ${error}` },
      { status: 500 }
    );
  }
}