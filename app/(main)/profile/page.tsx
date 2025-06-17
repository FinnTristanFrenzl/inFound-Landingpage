"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import bgImg from '@/public/background_Image.png'
import { createClient } from '@/lib/supabase/client'
import PostCard from '@/components/PostCard'

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [claimedPosts, setClaimedPosts] = useState<Post[]>([])
  const [isClaimed, setIsClaimed] = useState<boolean>(false)

  const mount = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: savedIdeas, error: savedError } = await supabase.from('saved_ideas').select('*').eq('user_id', user?.id)
    if (savedError || !savedIdeas) return
    const { data: claimedIdeas, error: claimedError } = await supabase.from('posts').select('*').eq('state->>userID', user.id)
    if (claimedError || !claimedIdeas) return

    setClaimedPosts(claimedIdeas)

    const ideaIds = savedIdeas.map(entry => entry.idea_id)

    if (ideaIds.length === 0) {
      setPosts([])
      return
    }

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
    <div className='relative flex flex-col gap-4 items-center bg-[#0a0c0e] w-full min-h-screen px-4 sm:px-6 md:px-12'>
      <div className='w-full max-w-4xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 z-10 h-10 mt-4'>
        <button onClick={() => setIsClaimed(!isClaimed)}
          className='text-white font-bold bg-[rgb(28,38,56)] px-4 py-2 rounded-lg hover:opacity-80 transition-all duration-150 whitespace-nowrap'>
          {isClaimed ? 'Show Saved Ideas' : 'Show Claimed Ideas'}
        </button>
        <h1 className='font-bold text-white whitespace-nowrap'>
          {isClaimed
            ? `Claimed ideas: ${claimedPosts.length}`
            : `Saved ideas: ${posts.length}`}
        </h1>
      </div>

      {(claimedPosts.length > 0 || posts.length > 0) ? (
        <div className='flex flex-col gap-6 justify-center items-center text-white mx-auto w-full max-w-4xl z-10 mt-8 pb-4 px-2'>
          {!isClaimed
            ? posts.map(post => (
              <PostCard isSaved={true} key={post.reddit_id} post={post} />
            ))
            : claimedPosts.map(post => (
              <PostCard isSaved={true} key={post.reddit_id} post={post} />
            ))
          }
        </div>
      ) : (
        <p className='text-white mt-8 font-bold'>No posts found.</p>
      )}

      {/* Hintergrundbilder jetzt mit responsiven Positionen */}
      <div className='fixed left-4 top-16 z-0 opacity-20 pointer-events-none'>
        <Image src={bgImg} alt='' className='w-32 h-auto sm:w-48' />
      </div>
      <div className='fixed right-4 bottom-20 z-0 opacity-20 pointer-events-none'>
        <Image src={bgImg} alt='' className='w-32 h-auto sm:w-48' />
      </div>
    </div>
  )
}

export default Page

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
