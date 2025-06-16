import Demo from '@/components/Demo'
import FeatureSection from '@/components/FeatureSection'
import bgImg from '@/public/background_Image.png'
import Image from 'next/image'

import Link from 'next/link'
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'
const App = () => {

  

  return (
    <div className='bg-[#0a0c0e] text-[#f1f2f2] flex flex-col items-center min-h-screen w-full relative'>
      {/* Navbar */}
      {/* <div className='bg-[#0e1725] w-full h-16 flex items-center px-4 lg:pl-40'>
        <h1 className='text-xl lg:text-2xl font-bold'>
          <span className='text-[#4a7ece] underline'>in</span>Found
        </h1>
      </div> */}
      

      {/* Headline Section */}
      <div className='lg:pb-20 pb-14 pt-8 lg:pt-12 lg:max-w-[80%] w-[90%] flex flex-col items-center z-10'>
        <h1 className='text-center text-[2.1rem] lg:text-[4.8rem] font-bold leading-tight'>
          Find{' '}
          <span className='bg-gradient-to-r to-[#4a7ece] from-[#a2b3ce] bg-clip-text text-transparent'>
            Profitable Saas
          </span>{' '}
          Ideas from Real Reddit Posts
          
        </h1>

        <div className='max-w-[90%] lg:w-1/2 lg:mt-6 lg:px-4 mt-4'>
          <h2 className='text-center text-[1.1rem] text-base lg:text-[1.3rem] leading-relaxed'>
            👋 Say Goodbye to hours of searching for Saas ideas.{' '}
            <span className='font-bold'>
              Discover real-world problems people are begging to solve
            </span>{' '}
            — and turn them into your next profitable SaaS business.
          </h2>
        </div>
      </div>

      <div className='z-10 w-full px-4 lg:w-1/2'>
        <div className='flex gap-3'>
          <div className='text-center shadow-2xl shadow-[#0e1725] outline-none w-full lg:flex-1 py-4 bg-[#0e1725] text-lg lg:text-[1.9rem] rounded-xl text-[#a2b3ce] font-bold appearance-none border-2 border-[#a2b3ce]'> 
            <h1>Sounds interesting?</h1>
          </div>
            <Link className='flex justify-center items-center text-center w-full lg:flex-1 px-6 py-4 bg-[#a2b3ce] rounded-xl text-[#0a0c0e] text-lg lg:text-[1.9rem] font-bold hover:shadow-2xl hover:shadow-[#a2b3ce]/30 hover:-translate-y-1 transition-all duration-200' href={'/dashboard'}
          >
            Find ideas!</Link>
        </div>
      </div>

      <div className='border-4 relative rounded-2xl border-[#a2b3ce] py-48 mt-24 w-[65%] flex flex-col justify-center items-center'>
        <h1 className='absolute top-10 text-[4rem] font-bold text-[#a2b3ce]'>DEMO</h1>
        <div className='z-10 w-[65%] flex justify-center items-center '>
          <Demo />
        </div>
      </div>


      <div className='lg:mt-14 mt-11 sm:mt-18 pb-4 pt-4 sm:pt-6 w-full px-4 sm:px-0 flex flex-col items-center z-10'>
  <h1 className='text-center text-3xl lg:text-[3.8rem] font-bold leading-tight'>
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
  <FeatureSection />
</div>

  {/* ........ */}
  <div className='z-0 absolute top-120 right-44 lg:top-86'>
    <Image src={bgImg} alt=''/>
  </div>
  <footer className='absolute bottom-2 left-2'>
  </footer>
</div>
    
  )
}

export default App
