import React from 'react'
import Image from 'next/image'
import bgImg from '@/public/background_Image.png'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const page = async () => {
    
    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.getUser();
    const {data: requests, error: requestsError} = await supabase.from('join_requests').select('*').eq('sender_id', data.user?.id).order('created_at', {ascending: false})

  if (requestsError || !requests) return

    const isSeen = async (request: any) => {
        const {error} = await supabase.from('join_requests').update({isSeen: true}).eq('id', request.id)
        if (error) {
            console.log(error)
        }
    }

    return (
    <div className='relative flex flex-col gap-4 items-center bg-[#0a0c0e] w-full min-h-screen'>
        <div className='absolute top-4 right-4 text-white flex gap-4'>
            <Link href={'/profile'} className='text-white font-bold bg-[rgb(28,38,56)] px-4 py-2 rounded-lg hover:opacity-80 transition-all duration-150'>Profile</Link>
            <Link href={'/profile/inbox'} className='text-white font-bold bg-[rgb(28,38,56)] px-4 py-2 rounded-lg hover:opacity-80 transition-all duration-150'>Inbox</Link>
        </div>
        <div className='text-white z-20 flex flex-col justify-center items-center gap-6 w-[40%] mt-4'>
            <h1 className='font-bold text-2xl flex justify-center items-center'>Your requests</h1>

            {requests.length > 0
            ? requests.map(request => {
                {isSeen(request)}
                return (
                    <div key={request.id} className='bg-[rgb(28,38,56)] p-6 rounded-2xl flex flex-col w-full gap-6 mb-6'>
                        <div className='flex justify-between'>
                            <p className='font-bold'>Status: <span className='underline' style={{color: request.status === 'pending' && 'orange' || request.status === 'accepted' && 'green' || request.status === 'rejected' && 'red' || 'white'}}>{request.status}</span></p>
                            <Link className='flex items-center font-bold underline text-indigo-400 hover:text-indigo-500' href={`/post/${request.idea_id}`}>See idea</Link>
                        </div>
                        <div >
                            <h1 className='text-lg font-bold'>Message:</h1>
                            <p>{request.message}</p>
                        </div>
                        <div>
                            <h1 className='text-lg font-bold'>Skills:</h1>
                            <p>{request.skills}</p>
                        </div>
                        <div>
                            <h1 className='text-lg font-bold'>Contact info:</h1>
                            <p>{request.contact_info}</p>
                        </div>
                        {request.status !== 'pending'
                        && <div>
                            <h1 className='text-lg font-bold'>Owner's note:</h1>
                            <p>{(request.note !== '' && request.note)
                            ? request.note
                            : '-'}</p>
                        </div>}
                    </div>
                )
            })
        : <h1 className='font-bold text-2xl flex justify-center items-center mt-12'>You currently have no requests</h1>}
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