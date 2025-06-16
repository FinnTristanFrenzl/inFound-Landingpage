"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import bgImg from '@/public/background_Image.png'
import { createClient } from '@/lib/supabase/client'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

const page = () => {

    const [posts, setPosts] = useState<Post[]>([])
    const [claimedPosts, setClaimedPosts] = useState<Post[]>([])
    const [isClaimed, setIsClaimed] = useState<boolean>(false)

    const mount = async () => {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return


        const {data: savedIdeas, error: savedError} = await supabase.from('saved_ideas').select('*').eq('user_id', user?.id)
        if (savedError || !savedIdeas) return
        const {data: claimedIdeas, error: claimedError} = await supabase.from('posts').select('*').eq('state->>userID', user.id)
        if (claimedError || !claimedIdeas) return

        setClaimedPosts(claimedIdeas)
        
        
      const ideaIds = savedIdeas.map(entry => entry.idea_id)

      if (ideaIds.length === 0) {
        setPosts([])
        return
      }

      // 2. Hol die passenden Posts
      const { data: posts, error: postError } = await supabase
        .from('posts')
        .select('*')
        .in('reddit_id', ideaIds)

      const filteredPosts: Post[] = posts?.filter(post => {
        return post?.state?.userID !== user.id
      }) ?? []

      if (!postError && posts) {
        setPosts(filteredPosts)
      }
    }

    useEffect(() => {
        mount()
    }, [])

    return (
    <div className='relative flex flex-col gap-4 items-center bg-[#0a0c0e] w-full min-h-screen'>
        <div className='absolute top-4 right-4 text-white flex gap-4'>
            <Link href={'/profile/inbox'} className='text-white font-bold bg-[rgb(28,38,56)] px-4 py-2 rounded-lg hover:opacity-80 transition-all duration-150'>Inbox</Link>
            <Link href={'/profile/requests'} className='text-white font-bold bg-[rgb(28,38,56)] px-4 py-2 rounded-lg hover:opacity-80 transition-all duration-150'>My Requests</Link>
        </div>
        <div className='w-[40%] flex gap-2 justify-between items-center z-10 h-10 mt-4'>
            <button onClick={() => setIsClaimed(!isClaimed)}
            className='text-white font-bold bg-[rgb(28,38,56)] px-4 py-2 rounded-lg hover:opacity-80 transition-all duration-150'>
                {isClaimed
                ? 'Show Saved Ideas'
                : ' Show Claimed Ideas'}
            </button>
            <h1 className='font-bold text-white'>
                {isClaimed
                ? `Claimed ideas: ${claimedPosts.length}`
                : `Saved ideas: ${posts.length}`}
            </h1>
        </div>
        {claimedPosts.length > 0 || posts.length > 0
        ? <div className='flex flex-col gap-6 justify-center items-center text-white mx-2 w-[40%] z-10 pb-4'>
            {!isClaimed
            ? posts.map(post => {
                return (
                    <PostCard isSaved={true} key={post.reddit_id} post={post}/>
                )
            })
            : claimedPosts.map(post => {
                return (
                    <PostCard isSaved={true} key={post.reddit_id} post={post}/>
                )
            })}
        </div>
        : null}
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

type Post = {
    categories: [] | null
    comments: number
    created_at: string
    post_created_at: number
    reddit_id: string
    status: 'relevant'
    score: number
    subreddit: string
    summary: string | null
    text: string | null
    title: string | null
    upvotes: number
    url: string
    state?: null | {
        type: string
        userID: string
        cofounder: Array<string>
    }
}