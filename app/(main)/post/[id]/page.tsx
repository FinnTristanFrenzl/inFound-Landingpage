import React from 'react'
import Image from 'next/image'
import bgImg from '@/public/background_Image.png'
import { createClient } from '@/lib/supabase/server'
import PostCard from '@/components/PostCard'
import Link from 'next/link'


const page = async ({params}: any) => {
    
    const {id} = await params

    const supabase = await createClient()

    const {data: {user}, error: userError} = await supabase.auth.getUser()

    const {data: post, error: postError} = await supabase.from('posts').select('*').eq('state->>type', 'public').eq('reddit_id', id).maybeSingle()


    return (
    <div className='relative flex flex-col gap-4 items-center bg-[#0a0c0e] w-full min-h-screen'>
        
        <div className='text-white z-20 flex flex-col justify-center items-center w-[40%] mt-6'>
            {!post || postError
            ? <p className='text-3xl font-bold'>You can't see this post!</p>
            : <div id={post.reddit_id} key={post.reddit_id} className='bg-[#0e1725] rounded-2xl w-full p-5 relative' style={{border: post.state ? '2px solid #7bf1a8' : ''}}>
                <p className='font-bold text-lg z-10'>From <Link href={post.url} className='underline text-indigo-400 hover:text-indigo-500'>{post.subreddit}</Link></p>
                <div className='mt-6 text-lg'>
                    {post.summary}
                </div>
                <div className='mt-6 flex justify-between'>
                    <div className='flex justify-end items-center w-full gap-8'>
                        <p className='font-bold bg-[rgb(28,38,56)] px-4 py-2 rounded-lg'>{new Date(post.created_at).toISOString().split("T")[0]}</p>
                    </div>
                </div>
            </div>}
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