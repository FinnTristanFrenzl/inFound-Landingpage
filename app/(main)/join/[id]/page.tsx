import React from 'react'
import Image from 'next/image'
import bgImg from '@/public/background_Image.png'
import JoinForm from '@/components/JoinForm'
import { createClient } from '@/lib/supabase/server'

const JoinPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('reddit_id', id)
    .maybeSingle()

  if (error) return {error: 'Error fetching post'}

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError) return {error: 'Error fetching user'}

  const owner = data?.state?.userID

  return (
    <div className="relative flex flex-col items-center justify-center bg-[#0a0c0e] w-full min-h-screen px-4 text-center overflow-hidden">
      {data?.state ? (
        owner === user?.id ? (
          <p className="text-white font-bold text-2xl sm:text-3xl">
            You can&apos;t join your own team
          </p>
        ) : (
          <div className="w-full max-w-md z-20">
            <JoinForm ideaId={id} receiverId={owner} />
          </div>
        )
      ) : (
        <p className="text-white font-bold text-2xl sm:text-3xl">
          You can&apos;t join an idea that is not claimed
        </p>
      )}

      {/* Background Images */}
      <div className="absolute -top-20 -left-20 w-80 h-80 opacity-20 z-0">
        <Image src={bgImg} alt="background" fill className="object-cover" />
      </div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 opacity-20 z-0">
        <Image src={bgImg} alt="background" fill className="object-cover" />
      </div>
    </div>
  )
}

export default JoinPage
