import React from 'react'
import Image from 'next/image'
import bgImg from '@/public/background_Image.png'
import JoinForm from '@/components/JoinForm'
import { createClient } from '@/lib/supabase/server'
const page = async ({params}: any) => {
  const {id} = await params

  const supabase = await createClient()
  const {data, error} = await supabase.from('posts').select('*').eq('reddit_id', id).maybeSingle()

  const {data: {user}, error: userError} = await supabase.auth.getUser()

    const owner = data?.state?.userID


    return (
    <div className='relative flex flex-col gap-4 items-center justify-center bg-[#0a0c0e] w-full min-h-screen'>
        {data?.state
        ? owner === user?.id 
        ? <p className='text-white font-bold text-3xl'>You cant join your own team</p>
        : <div className='size-full z-20'>
            {<JoinForm ideaId={id} receiverId={data?.state?.userID}/>}
        </div>
        : <p className='text-white font-bold text-3xl'>You cant join an idea that is not claimed</p>}
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