import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { supabase } from '@/supabaseClient/supabase';
import { createClient } from '@/lib/supabase/server';

import Stripe from 'stripe';
import { redirect } from 'next/navigation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type')
  const access = searchParams.get('access')
  const id = searchParams.get('id');

  if (type === 'feature') {
    const {data, error} = await supabase.from('landing_features').select('*').eq('id', id).single()
  
    if (error) {
      return NextResponse.json(
        { error: error }
      );
    }
    try {
      const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: [
          {
            price: data.price_id,
            quantity: 1,
          },
        ],
        mode: 'payment',
        return_url: `https://www.infound.app/api/session-status?session_id={CHECKOUT_SESSION_ID}`,
        automatic_tax: { enabled: true },
        metadata: {
          type: 'feature',
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
  } else if (type === 'software') {

    const supabaseClient = await createClient()
    const {data: user, error: userError} = await supabaseClient.auth.getUser()
    if (!user.user || userError) {
      return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
    }

    const {data, error} = await supabase.from('plans').select('*').eq('id', id).single()
  
    if (error) {
      return NextResponse.json(
        { error: error }
      );
    }

    try {
        const session = await stripe.checkout.sessions.create({
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
            type: 'software',
            plan_id: data.id,
            user: user.user.id
          }
        });
        return NextResponse.json({ clientSecret: session.client_secret});
      } catch (error) {
        console.log(error)
        return NextResponse.json(
          { error: `Stripe session creation failed: ${error}` },
          { status: 500 }
        );
      }
  }else if (type === 'idea') {

    const state = searchParams.get('state');
    const {data: idea, error: ideaError} = await supabase.from('posts').select('state').eq('reddit_id', id).maybeSingle()

    if (idea?.state !== null || ideaError) {
       return NextResponse.json(
      { error: 'Already claimed' },
      { status: 500 }
    );
    }

    if (!state || state === '') {
      return NextResponse.json(
      { error: 'No state' },
      { status: 500 }
    );
    }


    const supabaseClient = await createClient()
    const {data: user, error: userError} = await supabaseClient.auth.getUser()
    if (!user.user || userError) {
      return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
    }

    const {data, error} = await supabase.from('posts').select('*').eq('reddit_id', id).maybeSingle()
  
    if (error || !data) {
      return NextResponse.json(
        { error: error }
      );
    }

    try {
        const session = await stripe.checkout.sessions.create({
          ui_mode: 'embedded',
          line_items: [
            {
              price: 'price_1RaKtKKtd9sgArFcnlr6GmBC'/*'price_1RXqkNKtd9sgArFcfLUCnpcR'*/,
              quantity: 1,
            },
          ],
          mode: 'payment',
          return_url: `http://localhost:3000/api/session-status?session_id={CHECKOUT_SESSION_ID}`,
          automatic_tax: { enabled: true },
          metadata: {
            type: 'idea',
            idea_id: data.reddit_id,
            state: state,
            user: user.user.id
          }
        });
        return NextResponse.json({ clientSecret: session.client_secret});
      } catch (error) {
        console.log(error)
        return NextResponse.json(
          { error: `Stripe session creation failed: ${error}` },
          { status: 500 }
        );
      }
  }

}