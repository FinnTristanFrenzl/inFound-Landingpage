"use client"

import { Suspense, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { BarLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function CheckoutPage() {
  
  return (
    <Suspense fallback={<div className='text-white'>Loading...</div>}>
      <PageContent />
    </Suspense>
  )

}

const PageContent = () => {

  const searchParams = useSearchParams()
  const feature_id = searchParams.get('id')!
  const type = searchParams.get('type')
  const access = searchParams.get('access')
  const state = searchParams.get('state');


  const router = useRouter()
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true)
   useEffect(() => {
    fetch(`/api/create-checkout-session?type=${type}&access=${access}&id=${feature_id}&state=${state}`, {
      method: 'POST',
    })
      .then(async res => {
        if (!res.ok) {
          const data = await res.json()

          // Beispielhafte Weiterleitung bei fehlender Authentifizierung:
          if (res.status === 401 || data.error === 'Not authenticated') {
            router.push('/auth/login') // oder '/login'
          }

          return
        }

        const data = await res.json()
        setClientSecret(data.clientSecret)
      })
  }, [feature_id, type, access])

  useEffect(() => {
    if (!clientSecret) return;

    // 2. Stripe laden und Embedded Checkout mounten
    async function mountCheckout() {
      const stripe = await stripePromise;
      if (!stripe) return;
      if (!clientSecret) return
      const checkout = await stripe.initEmbeddedCheckout({ clientSecret });
      setLoading(false)
      setTimeout(() => {
        checkout.mount('#stripe-checkout');
      }, 500);
    }

    mountCheckout();
  }, [clientSecret]);

  return (
    <div className='size-full h-[100vh]'>
      {loading
      ? <div className='flex justify-center items-center pt-100'><BarLoader /></div>
      : <div id="stripe-checkout" className='pt-15'></div>
      }
    </div>
  );

}
