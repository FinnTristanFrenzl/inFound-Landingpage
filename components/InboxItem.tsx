'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

const InboxItem = ({inbox}: {inbox: {id: string, idea_id: string, message: string, skills: string, contact_info: string, status: 'accepted' | 'pending' | 'rejected'}}) => {
  const router = useRouter()

  const [note, setNote] = useState<string>('')

  const accept = async (e: FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    const { error } = await supabase
      .from('join_requests')
      .update({ status: 'accepted', note: note })
      .eq('id', inbox.id)
    if (error) return
    router.push('/profile/inbox')
  }

  const reject = async (e: FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    const { error } = await supabase
      .from('join_requests')
      .update({ status: 'rejected', note: note, isSeen: false })
      .eq('id', inbox.id)
    if (error) return
    router.push('/profile/inbox')
  }

  const deleteInbox = async (e: FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    const { error } = await supabase
      .from('join_requests')
      .delete()
      .eq('id', inbox.id)
    if (error) return
    router.push('/profile/inbox')
  }

  return (
    <div className='bg-[rgb(28,38,56)] p-6 rounded-2xl flex flex-col w-full gap-6 shadow-md'>
      <div>
        <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
          <h1 className='text-lg font-bold'>Message:</h1>
          <Link
            className='font-bold underline text-indigo-400 hover:text-indigo-500'
            href={`/post/${inbox.idea_id}`}
          >
            See idea
          </Link>
        </div>
        <p className='mt-2'>{inbox.message}</p>
      </div>
      <div>
        <h1 className='text-lg font-bold'>Skills:</h1>
        <p className='mt-2'>{inbox.skills}</p>
      </div>
      <div>
        <h1 className='text-lg font-bold'>
          Contact info:{' '}
          {inbox.status !== 'accepted' && (
            <span className='text-green-300'>(Accept first)</span>
          )}
        </h1>
        {inbox.status === 'accepted' && (
          <p className='mt-2'>{inbox.contact_info}</p>
        )}
      </div>

      {inbox.status === 'pending' ? (
        <form className='flex flex-col gap-4'>
          <textarea
            className='w-full border border-gray-300 rounded-lg p-2'
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder='Leave a note (optional)'
          />
          <div className='flex flex-col md:flex-row gap-4'>
            <button
              onClick={accept}
              className='w-full md:w-auto border-2 py-2 px-4 rounded-lg border-green-300 hover:text-green-300 active:opacity-80 font-bold transition-all duration-150'
            >
              Accept
            </button>
            <button
              onClick={reject}
              className='w-full md:w-auto border-2 py-2 px-4 rounded-lg border-red-500 hover:text-red-500 active:opacity-80 font-bold transition-all duration-150'
            >
              Reject
            </button>
          </div>
        </form>
      ) : (
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='border-2 py-2 px-4 rounded-lg border-white font-bold text-center'>
            {inbox.status}
          </div>
          <button
            onClick={deleteInbox}
            className='w-full md:w-auto border-2 py-2 px-4 rounded-lg border-red-500 hover:text-red-500 active:opacity-80 font-bold transition-all duration-150'
          >
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default InboxItem
