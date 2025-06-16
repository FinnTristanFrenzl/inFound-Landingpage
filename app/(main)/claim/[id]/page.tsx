import Image from 'next/image'
import bgImg from '@/public/background_Image.png'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import ClaimButton from '@/components/ClaimButton'


const page = async ({params}: any) => {
  const {id} = await params

  const supabase = createClient()
  
    const {data: post, error} = await supabase.from('posts').select('*').eq('reddit_id', id).maybeSingle()
    if (error) {
      console.log('No post')
    }

    let claimed = false

    if (post.state) {
      claimed = true
    }

  return (
    <div className='relative h-[100vh] bg-[#0a0c0e]'>
      <div className='size-full flex justify-center items-center'>
        <div className='flex flex-col gap-6 justify-center items-center size-full text-white mx-2 my-4 w-[40%] z-10'>
          {!error && post && !claimed
          ? (
            <div className='flex flex-col gap-6'>
              <div className='mx-2 flex justify-between'>
                <h1 className='text-xl font-bold underline'>Claim this Idea:</h1>
                <h1 className='text-xl font-bold underline'>Price: $10 or 1 Free Claim</h1>
              </div>
              <div key={post.reddit_id} className='bg-[#0e1725] rounded-2xl w-full p-5 relative text-white'>
                <p className='font-bold text-lg z-10'>From <Link href={post.url} className='underline text-indigo-400 hover:text-indigo-500'>{post.subreddit}</Link></p>
                <div className='mt-6 text-lg'>
                    {post.summary}
                </div>
                <div className='mt-6 flex justify-end'>
                  <div className='flex justify-center items-center gap-8'>
                    <p className='font-bold bg-[rgb(28,38,56)] px-4 py-2 rounded-lg'>{new Date(post.created_at).toISOString().split("T")[0]}</p>
                  </div>
                </div>
              </div>
              <div className='w-full flex justify-between px-2'>
                <ClaimButton type='public' post_id={post.reddit_id} />
                <ClaimButton type='private' post_id={post.reddit_id} />
              </div>
            </div>
          )
          : (<div>
            <h1 className='text-4xl font-bold'>Error: Idea not found or already claimed</h1>
          </div>)}
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

export default page