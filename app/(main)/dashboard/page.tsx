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
  })

  return (
    <div className="relative min-h-screen bg-[#0a0c0e] w-full overflow-x-hidden">
      {/* Hintergrundbilder */}
      <Image
        src={bgImg}
        alt=""
        className="absolute -left-20 top-10 w-40 opacity-20 md:w-60 lg:w-80"
      />
      <Image
        src={bgImg}
        alt=""
        className="absolute -right-20 top-40 w-40 opacity-20 md:w-60 lg:w-80"
      />

      {/* Inhalt */}
      <div className="relative flex justify-center px-4 py-8">
        <div className="w-full max-w-4xl flex flex-col gap-6 items-center z-10">
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
  )
}

export default DashboardPage
