// components/Navbar.tsx

import Link from 'next/link'
import LogOutButton from '@/components/LogOutButton'
import { createClient } from '@/lib/supabase/server'
import { RiAccountCircleFill } from "react-icons/ri";
import Image from 'next/image'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: rank } = await supabase
    .from('software_access')
    .select('type')
    .eq('user_id', user?.id)
    .single()

  const { data: inbox } = await supabase
    .from('join_requests')
    .select('*')
    .eq('receiver_id', user?.id)
    .eq('status', 'pending')

  const pb = user?.user_metadata?.avatar_url

  let rankStyle = 'text-white'
  if (rank?.type === 'LITE') {
    rankStyle = 'bg-gradient-to-r to-[#4a7ece] from-[#a2b3ce] bg-clip-text text-transparent'
  } else if (rank?.type === 'PRO') {
    rankStyle = 'bg-gradient-to-r to-[#f58549] from-[#ffff87] bg-clip-text text-transparent'
  } else if (rank?.type === 'ELITE') {
    rankStyle = 'bg-gradient-to-r to-[#992d89] from-[#ff7977] bg-clip-text text-transparent'
  }

  return (
    <div className='bg-[#0e1725] w-full h-16 flex items-center justify-between px-4 lg:px-40'>
      <h1 className='text-xl lg:text-2xl font-bold text-white'>
        <span className='text-[#4a7ece] underline'>in</span>Found
      </h1>

      <div className='flex gap-24'>
        <div className="flex gap-6">
          <Link className="px-4 py-2 rounded-lg bg-[rgb(28,38,56)] hover:opacity-80 active:opacity-60 transition-all duration-150 font-bold text-white" href={'/'}>Home</Link>
          <Link className="px-4 py-2 rounded-lg bg-[rgb(28,38,56)] hover:opacity-80 active:opacity-60 transition-all duration-150 font-bold text-white" href={'/dashboard'}>Dashboard</Link>
          <Link className="px-4 py-2 rounded-lg bg-[rgb(28,38,56)] hover:opacity-80 active:opacity-60 transition-all duration-150 font-bold text-white" href={'/pricing'}>{rank?.type ? 'Upgrade' : 'Pricing'}</Link>
          {!user
            ? <Link className="px-4 py-2 rounded-lg bg-[rgb(28,38,56)] text-white font-bold" href={'/auth/login'}>Login</Link>
            : <LogOutButton />}
        </div>

        <div className='flex gap-6'>
          {user && (
            <div className='max-h-10 bg-[rgb(28,38,56)] pl-4 rounded-4xl'>
              <Link href={'/profile'} className='flex font-bold items-center gap-3 text-white max-h-10 relative'>
                {user.user_metadata.user_name || user.user_metadata.display_name || user.user_metadata.name}
                {!pb
                  ? <RiAccountCircleFill className='h-10 w-10' color='white'/>
                  : <Image src={pb} height={40} width={40} alt='/' className='rounded-4xl max-h-10' />}
                {inbox && inbox.length > 0 && (
                  <div className='h-5 w-5 flex justify-center items-center rounded-full text-sm bg-red-500 absolute bottom-0 right-0 text-white'>
                    {inbox.length}
                  </div>
                )}
              </Link>
            </div>
          )}
          <div className='text-lg font-bold flex justify-center items-center px-2 py-1 rounded-lg bg-[rgb(28,38,56)]'>
            {rank?.type
              ? <p className={rankStyle}>{rank.type}</p>
              : <p className='text-white'>FREE</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
