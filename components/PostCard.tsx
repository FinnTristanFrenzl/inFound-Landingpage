"use client"

import React, { useState, useEffect } from 'react'
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import getUserData from '@/app/utils/getUserData';
import { User } from '@supabase/supabase-js';
import { RiAccountCircleFill } from "react-icons/ri";


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

const PostCard = ({post, isSaved = false}: {post: Post, isSaved?: boolean}) => {

    const [postTypeText, setPostTypeText] = useState<'Switch to private' | 'Switch to public'>(post.state?.type === 'public' ? 'Switch to private' : 'Switch to public')
    const [user, setUser] = useState<User | null>(null)
    const [userData, setUserData] = useState<{id: string, email: string, display_name: string, avatar_url: string, updated_at: string} | null>(null)

    const fetchUserData = async () => {
        if (post.state?.userID) {
            const userInfo = await getUserData(post.state.userID);
            setUserData(userInfo);
        }
    }

    const [isLiked, setIsLiked] = useState<boolean>(isSaved)
    //const [userData, setUserData] = useState<null | any>(null)
    
    
    useEffect(() => {
        setIsLiked(isSaved)
        getUser()
    }, [isSaved])

    useEffect(() => {
        if(post.state) {
            fetchUserData()
        }
    }, [])



    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        if (!user) return
    }

    const toggleSave = async () => {

        if (isLiked) {
            // DELETE
            const { error } = await supabase
                .from('saved_ideas')
                .delete()
                .eq('user_id', user?.id)
                .eq('idea_id', post.reddit_id)

            if (!error) setIsLiked(false)
                
        } else {
            // INSERT
            const { error } = await supabase
                .from('saved_ideas')
                .insert({ user_id: user?.id, idea_id: post.reddit_id })

            if (!error) setIsLiked(true)
        }
    }

    const changeTypeFunction = async () => {

        const changetype: any = postTypeText === 'Switch to private' ? 'private' : 'public'
        console.log(changetype)

        const newState: any = {
            ...post.state,
            type: changetype
        }

        setPostTypeText(postTypeText === 'Switch to private' ? 'Switch to public' : 'Switch to private')
        const {error} = await supabase.from('posts').update({state: newState}).eq('reddit_id', post.reddit_id)
        if (error) console.log(error)
    }

    return (
    <div id={post.reddit_id} key={post.reddit_id} className='bg-[#0e1725] rounded-2xl w-full p-5 relative' style={{border: post.state ? '2px solid #7bf1a8' : ''}}>
        <p className='font-bold text-lg z-10'>From <Link href={post.url} className='underline text-indigo-400 hover:text-indigo-500'>{post.subreddit}</Link></p>
        <div className='mt-6 text-lg'>
            {post.summary}
        </div>
        <div className='mt-6 flex justify-between'>
            <button onClick={() => toggleSave()}>
                {isLiked
                ? <IoBookmark color='rgb(232,93,93)' size={24}/>
                : <IoBookmarkOutline size={24}/>}
            </button>
            <div className='flex justify-center items-center gap-8'>
                {post.state === null 
                ? <Link href={`/claim/${post.reddit_id}`} className='text-green-300 flex gap-2 font-bold bg-[rgb(28,38,56)] px-4 py-2 rounded-lg hover:text-green-600 hover:bg-green-300 transition-all duration-150'>Claim</Link>
                : (<div className='flex gap-4'>
                    {post.state?.userID === user?.id
                    ? <button onClick={() => changeTypeFunction()} className='font-bold bg-[rgb(28,38,56)] text-red-400 px-4 py-2 rounded-lg hover:opacity-80'>{postTypeText}</button>
                    : <div className='flex items-center justify-center gap-4'>
                        <Link href={`/join/${post.reddit_id}`} className='px-4 py-2 rounded-lg bg-[rgb(28,38,56)] hover:opacity-80 active:opacity-60 transition-all duration-150 font-bold text-white'>Join</Link>
                        <div className='rounded-full max-h-10 max-w-10'>
                            {userData?.avatar_url
                            ? <img src={userData?.avatar_url} alt="" className='size-full rounded-full'/>
                            : <RiAccountCircleFill className='h-10 w-10' color='white'/>}
                        </div>    
                    </div>}
                    <div className='flex gap-2 font-bold px-4 py-2 rounded-lg text-green-600 bg-green-300 justify-center items-center'>Claimed</div>
                  </div>)}
                <p className='font-bold bg-[rgb(28,38,56)] px-4 py-2 rounded-lg'>{new Date(post.created_at).toISOString().split("T")[0]}</p>
            </div>
        </div>
        
    </div>
  )
}

export default PostCard