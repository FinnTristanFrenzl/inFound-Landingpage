import React, { useState } from 'react'
import bgImg from '../src/assets/background_Image.png'

const App = () => {


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
            <p className="font-bold">Privacy Policy</p>
            <p>
              This website collects personal data (email address) only when users voluntarily submit it through the waitlist form.
              The email is processed by <strong>Getform</strong> and used solely for the purpose of providing product updates.
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
    <div className='bg-[#0a0c0e] text-[#f1f2f2] flex flex-col items-center min-h-screen min-w-full relative'>
      
      {/* Navbar */}
      <div className='bg-[#0e1725] w-full h-16 flex items-center px-4 lg:pl-40'>
        <h1 className='text-xl lg:text-2xl font-bold'>
          <span className='text-[#4a7ece] underline'>in</span>Found
        </h1>
      </div>

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
          action='https://getform.io/f/ajjmneya'
          method='POST'
          className='w-full flex flex-col lg:flex-row justify-center items-center gap-3'
        >
          <input
            type='email'
            name='email'
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
        <h3 className='text-center mt-4 text-sm'>It's free, no credit card is needed.</h3>
      </div>
      <div className='z-0 absolute bottom-20 right-40'>
        <img src={bgImg} alt=""/>
      </div>
      <div className='absolute bottom-4 left-2'>
        <LegalAndPrivacy />
      </div>
    </div>
    
  )
}

export default App
