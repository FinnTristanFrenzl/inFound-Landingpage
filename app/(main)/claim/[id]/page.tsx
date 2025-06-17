import Image from 'next/image'
import bgImg from '@/public/background_Image.png'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import ClaimButton from '@/components/ClaimButton'


export const dynamicParams = true;

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params
  const supabase = await createClient()
  
    const {data: post, error} = await supabase.from('posts').select('*').eq('reddit_id', id).maybeSingle()
    if (error) {
      console.log('No post')
    }

    let claimed = false

    if (post.state) {
      claimed = true
    }

  return (
    <div className='relative min-h-screen  bg-[#0a0c0e]'>
      <div className='size-full flex flex-col justify-center gap-32 pt-12 lg:pt-48 items-center'>
        <div className='flex flex-col gap-6 justify-center items-center size-full text-white mx-2 my-4 w-[90%] lg:w-[40%] z-10'>
          {!error && post && !claimed
          ? (
            <div className='flex flex-col gap-6'>
              <div className='mx-2 flex justify-between'>
                <h1 className='text-xl font-bold underline'>Claim this Idea:</h1>
                <h1 className='text-xl font-bold '>Price: $10</h1>
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
              <div className='w-full flex justify-between gap-4 px-2'>
                <ClaimButton type='public' post_id={post.reddit_id} />
                <ClaimButton type='private' post_id={post.reddit_id} />
              </div>
            </div>
          )
          : (<div>
            <h1 className='text-4xl font-bold'>Error: Idea not found or already claimed</h1>
          </div>)}
        </div>
        <div className='text-gray-400 w-[70%] text-center'>
          <h1>NOTE: <br /> Claiming an idea publicly: Other users will still get to see the idea in the dashboard as &quot;Claimed&quot; and can send you a join request with information about them, so that you can build a team around an idea! This Request will be visible for you in your profile under the &quot;inbox&quot; tab. <br /> Claiming an idea privately: Only you can see this idea for yourself, so nobody can steal your idea. <br /> If you have inFound ELITE access you get 1 free claim, you don&apos;t have to pay once for your idea claim, it will be used automatically. <br /> All of your claimed ideas will be visible on your profile.</h1>
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

export default Page