"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5'

const Demo = () => {

  const [isLiked, setIsLiked] = useState<boolean>(false)

  return (
    <div className='bg-[#0e1725] rounded-2xl w-full p-5 relative ' >
        <div className='flex justify-between items-center'>
            <p className='font-bold text-lg z-10'>From <Link href={'https://www.reddit.com/r/productivity/comments/1kngoia/how_to_deal_with_whatsapp_overflow/'} className='underline text-indigo-400 hover:text-indigo-500'>r/productivity</Link></p>
            <p className='font-bold bg-[rgb(28,38,56)] px-4 py-2 rounded-lg'>{new Date('2025-05-15 21:07:21.934649+00').toISOString().split("T")[0]}</p>
        </div>
        <div className='mt-6 text-lg'>
            Someone is looking for a solution to manage and remember to respond to important WhatsApp messages within an existing productivity system, as they often forget and messages pile up, and is requesting tips and tricks from other users on how they handle this issue effectively.
        </div>
        <div className='mt-6 flex justify-between'>
            <button onClick={() => setIsLiked(!isLiked)}>
                {isLiked
                ? <IoBookmark color='rgb(232,93,93)' size={24}/>
                : <IoBookmarkOutline size={24}/>}
            </button>
            <div className='flex justify-center items-center gap-8'>
                <button className='text-green-300 flex gap-2 font-bold bg-[rgb(28,38,56)] px-4 py-2 rounded-lg hover:text-green-600 hover:bg-green-300 transition-all duration-150 active:opacity-80'>Claim</button>
                
                
            </div>
        </div>
      </div>
  )
}

export default Demo