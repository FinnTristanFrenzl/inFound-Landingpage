// components/Navbar.tsx
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import ProfileIcon from './ProfileIcon';
import ProfileIconSM from './ProfileIconSM';

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

  const { data: requests } = await supabase
    .from('join_requests')
    .select('*')
    .eq('sender_id', user?.id)
    .neq('status', 'pending')
    .eq('isSeen', false)

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
    <div className='bg-[#0e1725] w-full h-16 flex items-center justify-between px-4 lg:px-28'>
      <h1 className='text-xl lg:text-2xl flex justify-start font-bold text-white flex-1'>
        <span className='text-[#4a7ece] underline'>in</span>Found
      </h1>

      <div className='lg:flex hidden justify-center gap-24 flex-4'>
        <div className="flex items-center gap-32 underline">
          <Link className="hover:opacity-80 active:opacity-60 transition-all duration-150 font-bold text-white" href={'/'}>Home</Link>
          <Link className="hover:opacity-80 active:opacity-60 transition-all duration-150 font-bold text-white" href={'/dashboard'}>Dashboard</Link>
          <Link className="hover:opacity-80 active:opacity-60 transition-all duration-150 font-bold text-white" href={'/pricing'}>{rank?.type ? 'Upgrade' : 'Pricing'}</Link>
        </div>
      </div>

        <div className='lg:flex hidden gap-6 flex-1 justify-end'>
          {user ? (
            <div className='max-h-10 bg-[rgb(28,38,56)] rounded-4xl'>
              <ProfileIcon user={user} rankStyle={rankStyle} pb={pb} inbox={inbox?.length || 0} requests={requests?.length || 0}/>
            </div>
          )
          : <Link className='text-white font-bold px-4 py-1 rounded-full bg-[#4a7ece]' href={'/auth/login'}>Log in</Link>}
        </div>

        <div className='lg:hidden flex gap-6 flex-1 justify-end'>
          {user ? (
            <div className='max-h-10 bg-[rgb(28,38,56)] rounded-4xl'>
              <ProfileIconSM rankType={rank?.type} user={user} rankStyle={rankStyle} pb={pb} inbox={inbox?.length || 0} requests={requests?.length || 0}/>
            </div>
          )
          : <Link className='text-white font-bold px-4 py-1 rounded-full bg-[#4a7ece]' href={'/auth/login'}>Log in</Link>}
        </div>
    </div>
  )
}
