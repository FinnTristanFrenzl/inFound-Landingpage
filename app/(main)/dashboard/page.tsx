"use client"

import React, { useEffect, useState } from 'react'
import fetchDB from '@/app/utils/fetchDB'
import PostCard from '@/components/PostCard';
import bgImg from '../../../public/background_Image.png'
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

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
}



const DashboardPage = () => {
  const [currentPosts, setCurrentPosts] = useState<Post[]>([])
  const [savedIds, setSavedIds] = useState<string[]>([])

  const supabase = createClient()


  const fetchData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const posts: Post[] = await fetchDB(user.id) as Post[]
    setCurrentPosts(posts)


    const { data: savedIdeas, error } = await supabase
      .from('saved_ideas')
      .select('idea_id')
      .eq('user_id', user.id)

    if (error) return
    const ids = savedIdeas.map(item => item.idea_id)
    setSavedIds(ids)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='relative h-[100vh] bg-[#0a0c0e]'>
      <div className='flex bg-[#0a0c0e] justify-center'>
        <div className='flex flex-col bg-[#0a0c0e] items-center'>
          <div className='flex flex-col gap-6 justify-center items-center size-full text-white mx-2 my-4 w-[40%] z-10'>
            {currentPosts.map(post => (
              <PostCard
                key={post.reddit_id}
                post={post}
                isSaved={savedIds.includes(post.reddit_id)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='fixed left-100 top-15 z-0'>
        <Image src={bgImg} alt='' />
      </div>
      <div className='fixed right-110 top-120 z-0'>
        <Image src={bgImg} alt='' />
      </div>
    </div>
  )
}

export default DashboardPage
