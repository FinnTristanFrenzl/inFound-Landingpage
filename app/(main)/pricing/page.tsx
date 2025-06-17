import React from 'react'
import Image from 'next/image'
import bgImg from '@/public/background_Image.png'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

const page = async () => {

  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();


  const {data: rank, error: rankError} = await supabase.from('software_access').select('type').eq('user_id', data.user?.id).single()

  
  let userState = rank?.type;

  if (!rank?.type || rankError) {
    userState = 'FREE'
  }

  return (
    <div className='relative min-h-screen flex flex-col justify-center items-center gap-24 bg-[#0a0c0e]'>
        <div className='text-white flex justify-center items-center text-2xl font-bold w-[60%] text-center md:mt-8 sm:mt-10'>
          inFound is currently in a beta phase. Once the initial version launches, prices will increase. If you buy now, you will keep the current price even when prices will increase!
        </div>
      <div className='size-full flex flex-col lg:flex-row justify-center items-center text-white gap-24 pb-6'>
        <div style={{opacity: ['LITE', 'PRO', 'ELITE'].includes(userState) ? 0.5 : 1, pointerEvents: ['LITE', 'PRO', 'ELITE'].includes(userState) ? 'none' : 'all'}} className='py-12 border-2 rounded-2xl border-white bg-[#0e1725] z-100 max-w-110 w-full'>
          <h1 className='px-16 text-4xl font-bold text-white text-center'>
            <span className='text-[#4a7ece] underline'>in</span>Found {' '}
            <span className='bg-gradient-to-r to-[#4a7ece] from-[#a2b3ce] bg-clip-text text-transparent'>LITE</span>
          </h1>
          <div className='px-12'>
            <div className='border-t-1 mt-8 py-5 text-lg lg:text-xl font-bold'>
                <ul className='mt-8 flex flex-col gap-4'>
                    <li>✅ Unlimited Startup Ideas</li>
                    <li>✅ Send unlimited join requests</li>
                </ul>
            </div>
            <div className='mt-12 flex justify-between'>
                <h1 className='font-bold text-3xl'>$49 <span className='text-sm'>(one time)</span></h1>
                <Link href={'/checkout?type=software&access=LITE&id=b289407c-0e60-4f0a-84f9-26a12b81b6d8'} className='bg-white shadow-lg shadow-[#0e1725]/40 text-black font-bold py-2 px-4 w-full sm:w-[60%] md:w-[40%] rounded-2xl hover:bg-[#063d75] hover:text-white active:opacity-80 transition-all duration-150 text-center' >Get LITE!</Link>
            </div>
          </div>
        </div>
        <div style={{opacity: ['PRO', 'ELITE'].includes(userState) ? 0.5 : 1, pointerEvents: ['PRO', 'ELITE'].includes(userState) ? 'none' : 'all'}} className='py-12 border-2 rounded-2xl border-white bg-[#0e1725] z-100 max-w-110 w-full'>
          <h1 className='px-16 text-4xl font-bold text-white text-center'>
            <span className='text-[#4a7ece] underline'>in</span>Found {' '}
            <span className='bg-gradient-to-r to-[#f58549] from-[#ffff87] bg-clip-text text-transparent'>PRO</span>
          </h1>
          <div className='px-12'>
            <div className='border-t-1 mt-8 py-5 text-lg lg:text-xl font-bold'>
                <ul className='mt-8 flex flex-col gap-4'>
                    <li>✅ inFound LITE</li>
                    <li>✅ Will include upcoming features*</li>
                </ul>
            </div>
            <div className='mt-12 flex justify-between'>
                <h1 className='font-bold text-3xl'>$109 <span className='text-sm'>(one time)</span></h1>
                <Link href={'/checkout?type=software&access=PRO&id=9411ccec-a656-4abb-a9a6-17b7a8ea381b'} className='bg-white shadow-lg shadow-[#0e1725]/40 text-black font-bold py-2 px-4 w-full sm:w-[60%] md:w-[40%] rounded-2xl hover:bg-[#063d75] hover:text-white active:opacity-80 transition-all duration-150 text-center' >
                Get PRO!</Link>
            </div>
          </div>
        </div>
        <div style={{opacity: ['ELITE'].includes(userState) ? 0.5 : 1, pointerEvents: ['ELITE'].includes(userState) ? 'none' : 'all'}} className='py-12 border-2 rounded-2xl border-white bg-[#0e1725] z-100 max-w-110 w-full'>
          <h1 className='px-16 text-4xl font-bold text-white text-center'>
            <span className='text-[#4a7ece] underline'>in</span>Found {' '}
            <span className='bg-gradient-to-r to-[#992d89] from-[#ff7977] bg-clip-text text-transparent'>ELITE</span>
          </h1>
          <div className='px-12'>
            <div className='border-t-1 mt-8 py-5 text-lg lg:text-xl font-bold'>
                <ul className='mt-8 flex flex-col gap-4'>
                    <li>✅ inFound PRO</li>
                    <li>✅ 1 Free Claim</li>
                    <li>✅ Support Me! 🤗💞</li>
                </ul>
            </div>
            <div className='mt-12 flex justify-between'>
                <h1 className='font-bold text-3xl'>$149 <span className='text-sm'>(one time)</span></h1>
                <Link href={'/checkout?type=software&access=ELITE&id=d885dfc9-4115-47c9-8257-fbc8fd215935'} className='bg-white shadow-lg shadow-[#0e1725]/40 text-black font-bold py-2 px-4 w-full sm:w-[60%] md:w-[40%] rounded-2xl hover:bg-[#063d75] hover:text-white active:opacity-80 transition-all duration-150 text-center' >
                Get ELITE!</Link>
            </div>
          </div>
        </div>
      </div>
      <div className='text-gray-400 flex justify-center items-center text-md w-[60%] text-center'>
          *You can see the upcoming features on the homepage under the Fund-A-Feature-section
        </div>
      <div className='fixed left-100 top-15 z-0'>
        <Image src={bgImg} alt='' />
      </div>
      <div className='fixed right-110 top-120 z-0'>
        <Image src={bgImg} alt='' />
      </div>
    </div>
  )
}

export default page