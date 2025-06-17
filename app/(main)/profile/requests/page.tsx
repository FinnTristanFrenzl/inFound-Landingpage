import React from 'react'
import Image from 'next/image'
import bgImg from '@/public/background_Image.png'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const page = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) return

  const { data: requests, error: requestsError } = await supabase
    .from('join_requests')
    .select('*')
    .eq('sender_id', data.user?.id)
    .order('created_at', { ascending: false })

  if (requestsError || !requests) return

  // Optional: Alle als gesehen markieren (aber lieber woanders!)
  for (const request of requests) {
    await supabase
      .from('join_requests')
      .update({ isSeen: true })
      .eq('id', request.id)
  }

  return (
    <div className='relative flex flex-col gap-4 items-center bg-[#0a0c0e] w-full min-h-screen p-4'>
      {/* Top-Right Links */}
      
      {/* Content */}
      <div className='text-white z-20 flex flex-col justify-center items-center gap-6 w-full max-w-3xl mt-20 px-4'>
        <h1 className='font-bold text-2xl text-center'>Your requests</h1>

        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request.id}
              className='bg-[rgb(28,38,56)] p-6 rounded-2xl flex flex-col w-full gap-6 shadow-md'
            >
              <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
                <p className='font-bold'>
                  Status:{' '}
                  <span
                    className='underline'
                    style={{
                      color:
                        request.status === 'pending'
                          ? 'orange'
                          : request.status === 'accepted'
                          ? 'green'
                          : request.status === 'rejected'
                          ? 'red'
                          : 'white',
                    }}
                  >
                    {request.status}
                  </span>
                </p>
                <Link
                  className='font-bold underline text-indigo-400 hover:text-indigo-500'
                  href={`/post/${request.idea_id}`}
                >
                  See idea
                </Link>
              </div>

              <div>
                <h1 className='text-lg font-bold'>Message:</h1>
                <p className='mt-2'>{request.message}</p>
              </div>

              <div>
                <h1 className='text-lg font-bold'>Skills:</h1>
                <p className='mt-2'>{request.skills}</p>
              </div>

              <div>
                <h1 className='text-lg font-bold'>Contact info:</h1>
                <p className='mt-2'>{request.contact_info}</p>
              </div>

              {request.status !== 'pending' && (
                <div>
                  <h1 className='text-lg font-bold'>Owner&apos;s note:</h1>
                  <p className='mt-2'>{request.note ? request.note : '-'}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <h1 className='font-bold text-2xl text-center mt-12'>
            You currently have no requests
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
