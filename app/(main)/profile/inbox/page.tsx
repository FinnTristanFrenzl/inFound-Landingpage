import React from 'react'
import Image from 'next/image'
import bgImg from '@/public/background_Image.png'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import InboxItem from '@/components/InboxItem'
const page = async () => {

    
    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.getUser();
    const {data: inbox, error: inboxError} = await supabase.from('join_requests').select('*').eq('receiver_id', data.user?.id).order('created_at', {ascending: false})

  if (inboxError || !inbox) return

    return (
    <div className='relative flex flex-col gap-4 items-center bg-[#0a0c0e] w-full min-h-screen'>
        <div className='absolute top-4 right-4 text-white flex gap-4'>
            <Link href={'/profile'} className='text-white font-bold bg-[rgb(28,38,56)] px-4 py-2 rounded-lg hover:opacity-80 transition-all duration-150'>Profile</Link>
            <Link href={'/profile/requests'} className='text-white font-bold bg-[rgb(28,38,56)] px-4 py-2 rounded-lg hover:opacity-80 transition-all duration-150'>My Requests</Link>
        </div>
        <div className='text-white z-20 flex flex-col justify-center items-center gap-6 w-[40%] mt-4'>
            <h1 className='font-bold text-2xl flex justify-center items-center'>Your inbox</h1>
            {inbox.length > 0
            ? inbox.map(inbox => {
                return (
                    <InboxItem key={inbox.id} inbox={inbox}/>
                )
            })
        : <h1 className='font-bold text-2xl flex justify-center items-center mt-12'>No new messages in your inbox</h1>}
        </div>

        <div className='fixed left-100 top-15 z-0'>
            <Image src={bgImg} alt=''/>
        </div>
        <div className='fixed right-110 top-120 z-0'>
            <Image src={bgImg} alt=''/>
        </div>
    </div>
  )
}

export default page