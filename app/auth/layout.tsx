
// app/layout.tsx oder eine Server-Component
import Link from 'next/link'
import { Metadata } from 'next'
import '../globals.css'
import Image from 'next/image';
import ico from '../favicon.ico'

export const metadata: Metadata = {
  title: "inFound.app",
  description: "Find Profitable Saas Ideas from Real Reddit Posts",
};


export default async function RootLayout({ children }: { children: React.ReactNode }) {
   

  return (
    <html lang="en">
      <body>
          {/* Navbar */}
        <div className='bg-[#0e1725] w-full h-16 flex items-center justify-between px-4 lg:px-40'>
          <h1 className='text-xl lg:text-2xl font-bold text-white lg:inline-block hidden'>
            <span className='text-[#4a7ece] underline'>in</span>Found
          </h1>

          <Image className='lg:hidden inline-block' src={ico} height={40} width={40} alt='logo'/>
          
          <div className="flex lg:gap-10 gap-2 lg:text-lg text-sm">
            <Link className="lg:px-4 px-2 py-2 rounded-lg bg-[rgb(28,38,56)] hover:opacity-80 active:opacity-60 transition-all duration-150 font-bold text-white" href={'/auth/login'}>Login</Link>
            <Link className="lg:px-4 px-2 py-2 rounded-lg bg-[rgb(28,38,56)] hover:opacity-80 active:opacity-60 transition-all duration-150 font-bold text-white" href={'/'}>Home</Link>
            <Link className="lg:px-4 px-2 py-2 rounded-lg bg-[rgb(28,38,56)] hover:opacity-80 active:opacity-60 transition-all duration-150 font-bold text-white" href={'/dashboard'}>Dashboard</Link>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}


