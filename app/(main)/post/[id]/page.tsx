import React from 'react'
import Image from 'next/image'
import bgImg from '@/public/background_Image.png'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const ReadPostPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params

  const supabase = await createClient()

  const { data: post, error: postError } = await supabase
    .from('posts')
    .select('*')
    .eq('state->>type', 'public')
    .eq('reddit_id', id)
    .maybeSingle()

  return (
    <div className="relative flex flex-col items-center justify-center bg-[#0a0c0e] w-full min-h-screen px-4 py-10 text-white overflow-hidden">
      <div className="z-20 w-full max-w-2xl bg-[#0e1725] rounded-2xl p-6 border border-gray-700">
        {!post || postError ? (
          <p className="text-2xl sm:text-3xl font-bold text-center">
            You can&apos;t see this post!
          </p>
        ) : (
          <>
            <p className="font-bold text-lg mb-4">
              From{' '}
              <Link
                href={post.url}
                className="underline text-indigo-400 hover:text-indigo-500"
                target="_blank"
              >
                {post.subreddit}
              </Link>
            </p>
            <div className="text-lg leading-relaxed whitespace-pre-wrap">
              {post.summary}
            </div>
            <p className="mt-6 font-bold bg-[rgb(28,38,56)] px-4 py-2 rounded-lg inline-block">
              {new Date(post.created_at).toISOString().split('T')[0]}
            </p>
          </>
        )}
      </div>

      {/* Hintergrundbilder */}
      <div className="absolute top-20 left-20 w-80 h-80 opacity-40 z-0">
        <Image src={bgImg} alt="background" fill className="object-cover" />
      </div>
      <div className="absolute bottom-20 right-20 w-80 h-80 opacity-40 z-0">
        <Image src={bgImg} alt="background" fill className="object-cover" />
      </div>
    </div>
  )
}

export default ReadPostPage
