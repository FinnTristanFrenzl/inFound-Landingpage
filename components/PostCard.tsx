"use client"

import React, { useState, useEffect } from 'react'
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

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

const supabase = createClient()

const PostCard = ({ post, isSaved = false }: { post: Post, isSaved?: boolean }) => {
  const [postTypeText, setPostTypeText] = useState<'Switch to private' | 'Switch to public'>(
    post.state?.type === 'public' ? 'Switch to private' : 'Switch to public'
  )
  const [user, setUser] = useState<User | null>(null)

  const [isLiked, setIsLiked] = useState<boolean>(isSaved)

  

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    setIsLiked(isSaved)
  }, [isSaved])

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const toggleSave = async () => {
    if (isLiked) {
      const { error } = await supabase
        .from('saved_ideas')
        .delete()
        .eq('user_id', user?.id)
        .eq('idea_id', post.reddit_id)
      if (!error) setIsLiked(false)
    } else {
      const { error } = await supabase
        .from('saved_ideas')
        .insert({ user_id: user?.id, idea_id: post.reddit_id })
      if (!error) setIsLiked(true)
    }
  }

  const changeTypeFunction = async () => {
    const changetype = postTypeText === 'Switch to private' ? 'private' : 'public'
    const newState = { ...post.state, type: changetype }
    setPostTypeText(postTypeText === 'Switch to private' ? 'Switch to public' : 'Switch to private')
    const { error } = await supabase
      .from('posts')
      .update({ state: newState })
      .eq('reddit_id', post.reddit_id)
    if (error) console.log(error)
  }

  return (
    <div
      id={post.reddit_id}
      key={post.reddit_id}
      className={`bg-[#0e1725] rounded-2xl w-full p-5 relative border-2 ${post.state ? 'border-green-400' : 'border-transparent'} text-white`}
    >
      <div className='flex justify-between items-center'>
        <p className='font-bold text-lg sm:text-base'>
        From <Link href={post.url} className='underline text-indigo-400 hover:text-indigo-500'>{post.subreddit}</Link>
      </p>
        <p className='font-bold bg-[rgb(28,38,56)] px-3 py-1 rounded-lg text-md sm:text-sm'>
            {new Date(post.created_at).toISOString().split("T")[0]}
        </p>
      </div>

      <div className='mt-4 sm:mt-3 text-lg sm:text-base'>
        {post.summary}
      </div>

      <div className='mt-6 sm:mt-4 flex flex-col sm:flex-col gap-4 sm:gap-3'>
        <div className='flex justify-between items-center'>
          <button onClick={toggleSave}>
            {isLiked
              ? <IoBookmark color='rgb(232,93,93)' size={24} />
              : <IoBookmarkOutline size={24} />
            }
          </button>

        <div className='flex flex-wrap gap-3 sm:gap-2 justify-between items-center'>
          {post.state === null ? (
            <Link href={`/claim/${post.reddit_id}`}
              className='text-green-300 font-bold bg-[rgb(28,38,56)] px-4 py-2 sm:px-3 sm:py-1 rounded-lg hover:text-green-600 hover:bg-green-300 transition'>
              Claim
            </Link>
          ) : (
            <div className='flex flex-wrap gap-3 items-center'>
              {post.state?.userID === user?.id ? (
                <button
                  onClick={changeTypeFunction}
                  className='font-bold bg-[rgb(28,38,56)] text-red-400 px-4 py-2 sm:px-3 sm:py-1 rounded-lg hover:opacity-80'
                >
                  {postTypeText}
                </button>
              ) : (
                <div className='flex items-center gap-3'>
                  <Link href={`/join/${post.reddit_id}`}
                    className='px-4 py-2 sm:px-3 sm:py-1 rounded-lg bg-[rgb(28,38,56)] hover:opacity-80 font-bold text-white'>
                    Join
                  </Link>
                  
                </div>
              )}
              <div className='font-bold px-4 py-2 sm:px-3 sm:py-1 rounded-lg text-green-600 bg-green-300'>
                Claimed
              </div>
            </div>
          )}
        </div>
          
        </div>

      </div>
    </div>
  )
}

export default PostCard
