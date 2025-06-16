"use client"

import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { FormEvent, useState } from "react"

const InboxItem = ({inbox}: any) => {

    const router = useRouter()

    const [note, setNote] = useState<string>('')
    const [reply, setReply] = useState<'accepted' | 'rejected' | null>(null)

    const accept = async (e: FormEvent) => {
      e.preventDefault()
      setReply('accepted')

      const supabase = createClient()

      const {error} = await supabase.from('join_requests').update({status: 'accepted', note: note}).eq('id', inbox.id)
      if (error) return
      router.push('/profile/inbox')
    }

    const reject = async (e: FormEvent) => {
      e.preventDefault()
      setReply('rejected')

      const supabase = createClient()

      const {error} = await supabase.from('join_requests').update({status: 'rejected', note: note}).eq('id', inbox.id)
      if (error) return
      router.push('/profile/inbox')
    }
    
    const deleteInbox = async (e: FormEvent) => {
      e.preventDefault()

      const supabase = createClient()
      const {error} = await supabase.from('join_requests').delete().eq('id', inbox.id)
      if (error) return
      router.push('/profile/inbox')

    }

  return (

    <div key={inbox.id} className='bg-[rgb(28,38,56)] p-6 rounded-2xl flex flex-col w-full gap-6'>
      <div>
          <div className='flex justify-between'>
              <h1 className='text-lg font-bold'>Message:</h1>
              <Link className='flex items-center font-bold underline text-indigo-400 hover:text-indigo-500' href={`/post/${inbox.idea_id}`}>See idea</Link>
          </div>
          <p>{inbox.message}</p>
      </div>
      <div>
          <h1 className='text-lg font-bold'>Skills:</h1>
          <p>{inbox.skills}</p>
      </div>
      <div>
          <h1 className='text-lg font-bold'>Contact info: {inbox.status !== 'accepted' ? <span className="text-green-300">(Accept first)</span> : ''}</h1>
          {inbox.status !== 'accepted' ? '' : <p>{inbox.contact_info}</p>}
      </div>
      {inbox.status === 'pending' 
      ? <form className="flex flex-col gap-4">
        <textarea
            className="w-full border border-gray-300 rounded-lg p-2"
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Leave a note (optional)"
            />
        <div className='flex justify-between w-full'>
            <button onClick={(e) => accept(e)} className='border-2 py-2 px-8 rounded-lg border-green-300 hover:text-green-300 active:opacity-80 font-bold transition-all duration-150'>Accept</button>
            <button onClick={(e) => reject(e)} className='border-2 py-2 px-8 rounded-lg border-red-500 hover:text-red-500 active:opacity-80 font-bold transition-all duration-150'>Reject</button>
        </div>
        </form>
        : <div className="flex justify-between">
            <div className='border-2 py-2 px-8 rounded-lg border-white font-bold text-center w-[20%]'>{inbox.status}</div>
            <button onClick={(e) => deleteInbox(e)} className='border-2 py-2 px-8 rounded-lg border-red-500 hover:text-red-500 active:opacity-80 font-bold transition-all duration-150'>Delete</button>
          </div>}
  </div>

  )
}

export default InboxItem