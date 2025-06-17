import React from 'react'
import Image from 'next/image'
import bgImg from '@/public/background_Image.png'
import { createClient } from '@/lib/supabase/server'
import InboxItem from '@/components/InboxItem'

const page = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) return

  const { data: inbox, error: inboxError } = await supabase
    .from('join_requests')
    .select('*')
    .eq('receiver_id', data.user?.id)
    .order('created_at', { ascending: false })

  if (inboxError || !inbox) return

  return (
    <div className='relative flex flex-col gap-4 items-center bg-[#0a0c0e] w-full min-h-screen p-4'>
      
      {/* Content */}
      <div className='text-white z-20 flex flex-col justify-center items-center gap-6 w-full max-w-3xl mt-20 px-4'>
        <h1 className='font-bold text-2xl text-center'>Your inbox</h1>
        {inbox.length > 0 ? (
          inbox.map((item: {id: string, idea_id: string, message: string, skills: string, contact_info: string, status: 'accepted' | 'pending' | 'rejected'}) => <InboxItem key={item.id} inbox={item} />)
        ) : (
          <h1 className='font-bold text-2xl text-center mt-12'>
            No new messages in your inbox
          </h1>
        )}
      </div>

      {/* Background Images */}
      <div className='fixed left-20 top-10 z-0 w-32 md:w-48'>
        <Image src={bgImg} alt='' />
      </div>
      <div className='fixed right-20 top-40 z-0 w-32 md:w-48'>
        <Image src={bgImg} alt='' />
      </div>
    </div>
  )
}

export default page
