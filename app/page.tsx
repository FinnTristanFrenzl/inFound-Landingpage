"use client"

type featureType = {
  id: UUID,
  created_at: Timestamp,
  title: string,
  description: string,
  current: number,
  goal: number
}

import React, { FormEvent, useEffect, useState } from 'react'
import bgImg from '../public/background_Image.png'
import FeatureCard from './(components)/FeatureCard'
import SuggestFeature from './(components)/SuggestFeature'
import Image from 'next/image'
import { supabase } from '@/supabaseClient/supabase'
import { UUID } from 'crypto'
import { Timestamp } from 'next/dist/server/lib/cache-handlers/types'

const App = () => {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // Optionales Feedback
  const [botcheck, setBotcheck] = useState('')
  const [features, setFeatures] = useState<featureType[]>([])

  const getFeatures = async () => {
    const {data, error} = await supabase.from('landing_features').select('*')
    if (error) {
      console.log(error)
      return
    }
    setFeatures(data)
    return
  }

  useEffect(() => {
    getFeatures()
  }, [])


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    
  
    if (!submitted) {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyKZR-U0AENToGn3WFUl6emOLzBOtAkB6LcB20Ss9y_4ee5hiZvXq-8dkHHCbHMIqc/exec', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ email, 'bot-check': botcheck }),
        });
        
        const data = await response.json()
        setSubmitted(true);
        
        if (response.ok && data.reason === 'email_registered') {
            setStatus("Thanks for signing up!");
            setEmail('');
        } else {
          // Wenn der Fehlerstatus 409 zurückkommt (bereits registrierte E-Mail)
          if (data.reason === 'email_exists') {
            setStatus('This email is already registered.');
          } else if (data.reason === 'bot_detect'){
            setStatus('Bot detected. Please try again.');
          }
        }
      } catch (err) {
          console.log(err)
          setStatus('Something went wrong...');
      } finally {
          setTimeout(() => {
            setSubmitted(false);
          }, 3000)
      }
    };
    }
  

const LegalAndPrivacy = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="mt-8 text-sm text-[#f1f2f2] px-4 lg:px-0 w-full max-w-3xl">
      <button
        onClick={() => setVisible(!visible)}
        className="underline text-[#a2b3ce] hover:text-[#4a7ece] transition-colors"
      >
        {visible ? 'Hide Legal & Privacy Info' : 'Legal & Privacy Info'}
      </button>

      {visible && (
        <div className="mt-4 border-t border-[#4a7ece] pt-4 text-left leading-relaxed space-y-6">

          {/* Impressum */}
          <section>
            <p className="font-bold">Legal Notice (Imprint)</p>
            <p><em>According to §5 TMG (Germany)</em></p>
            <p>
              <strong>Site Owner:</strong><br />
              Finn Frenzl<br />
              Friedberger Str. 98<br />
              61231 Bad Nauheim<br />
              Germany
            </p>
            <p>
              <strong>Contact:</strong><br />
              Email: <a href="mailto:finnfrenzl14@gmail.com" className="underline text-[#a2b3ce]">finnfrenzl14@gmail.com</a>
            </p>
          </section>

          {/* Datenschutz */}
          <section>
          <p>
            This website collects personal data (email address) only when users voluntarily submit it through the waitlist form.
            The email is processed via <strong>Google Sheets</strong> using a connected script and is used solely for providing product updates.
          </p>
          <p>
            <strong>GDPR Notice:</strong><br />
            All submitted emails are stored directly in a connected Google Sheet. Please do not submit any sensitive personal data (e.g., health, financial, or identifying documents), as this method is not intended for long-term storage of such information. Collected emails are used solely for providing product updates and are processed in accordance with the GDPR.
          </p>
          <p>
            <strong>Analytics:</strong><br />
            We use Google Analytics to analyze website usage. IP anonymization is enabled. No personal data is shared.
          </p>
          <p>
            <strong>Your Rights:</strong><br />
            You may request information about your stored data at any time and ask for correction or deletion. For any concerns, contact us at the email above.
          </p>
          </section>

        </div>
      )}
    </div>
  );
};

  return (
    <div className='bg-[#0a0c0e] text-[#f1f2f2] flex flex-col items-center min-h-screen w-full relative'>
      
      {/* Navbar */}
      {/* <div className='bg-[#0e1725] w-full h-16 flex items-center px-4 lg:pl-40'>
        <h1 className='text-xl lg:text-2xl font-bold'>
          <span className='text-[#4a7ece] underline'>in</span>Found
        </h1>
      </div> */}
      

      {/* Headline Section */}
      <div className='pb-20 pt-12 w-full max-w-[80%] flex flex-col items-center z-10'>
        <h1 className='text-center text-4xl lg:text-[4.8rem] font-bold leading-tight'>
          Find{' '}
          <span className='bg-gradient-to-r to-[#4a7ece] from-[#a2b3ce] bg-clip-text text-transparent'>
            Profitable Saas
          </span>{' '}
          Ideas from Real Reddit Posts —{' '}
          <span
            className='text-transparent block lg:inline font-bold lg:text-[4.5rem]'
            style={{ WebkitTextStroke: '1.5px white' }}
          >
            in Seconds
          </span>
        </h1>

        <div className='w-full lg:w-1/2 mt-6 px-4'>
          <h2 className='text-center text-base lg:text-[1.3rem] leading-relaxed'>
            👋 Say Goodbye to hours of searching for Saas ideas.{' '}
            <span className='font-bold'>
              Discover real-world problems people are begging to solve
            </span>{' '}
            — and turn them into your next profitable SaaS business.
          </h2>
        </div>
      </div>

      {/* Form Section */}
      <div className='z-10 w-full px-4 lg:w-1/2'>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className='w-full flex flex-col lg:flex-row justify-center items-center gap-3'
      >
        <input value={botcheck} onChange={(e) => setBotcheck(e.target.value)} type="text" name="bot-check" style={{display: 'none'}} aria-hidden="true" />
        <input
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your E-mail...'
          required
          className='shadow-2xl shadow-[#0e1725] outline-none w-full lg:flex-3 pl-6 py-4 bg-[#0e1725] text-lg lg:text-4xl rounded-xl text-[#f1f2f2] font-bold focus:border-transparent appearance-none'
          style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
        />
        <button
          type='submit'
          className='w-full lg:flex-1 px-6 py-4 bg-[#a2b3ce] rounded-xl text-[#0a0c0e] text-lg lg:text-[1.5rem] font-bold hover:shadow-2xl hover:shadow-[#a2b3ce]/30 hover:-translate-y-1 transition-all duration-200'
        >
          Join Waitlist
        </button>
      </form>

      {status && <p className='mt-4 text-center text-2xl font-bold' style={{color: status === 'Thanks for signing up!' ? 'green' : ''}}>{status}</p>}

        <h3 className='text-center mt-4 text-sm'>It&apos;s free, no credit card is needed.</h3>
      </div>


      <div className='mt-14 sm:mt-18 pb-4 pt-4 sm:pt-6 w-full px-4 sm:px-0 flex flex-col items-center z-10'>
  <h1 className='text-center text-2xl sm:text-4xl lg:text-[3.8rem] font-bold leading-tight'>
    <span className='bg-gradient-to-r to-[#4a7ece] from-[#a2b3ce] bg-clip-text text-transparent'>
      Fund a Feature is here!
    </span>
  </h1>
</div>


<div className='w-full px-4 sm:px-0 max-w-4xl mx-auto'>
  <h2 className='text-center text-sm sm:text-base lg:text-[1.3rem] leading-relaxed'>
    <span className='font-bold'>
      You can now fund features that I should build! 🫶
    </span>{' '}
    So you can have the best version of inFound when it launches!
  </h2>
</div>

<div className='mt-6 mb-12 w-8/10 px-4 sm:px-0 flex flex-col md:flex-row flex-wrap justify-center gap-6'>
  {features && features.map(feature => {
    return <FeatureCard key={feature.id} goal={feature.goal / 100} current={feature.current / 100} title={feature.title} description={feature.description} feature_id={feature.id}/>
  })}
  <SuggestFeature />
</div>

  {/* ........ */}
  <div className='z-0 absolute top-90 right-40'>
    <Image src={bgImg} alt=''/>
  </div>
  <footer className='absolute bottom-2 left-2'>
    <LegalAndPrivacy />
  </footer>
</div>
    
  )
}

export default App
