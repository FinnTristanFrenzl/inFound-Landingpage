// Route that will be executed by Vercel Cron job either evey 60 min (new) Posts or every 12h (top) Posts
// Executes the fetchPosts.ts function 

import { fetchPosts } from "@/app/utils/fetchPosts"
import filterPosts from "@/app/utils/filterPosts"
import { formatPost } from "@/app/utils/formatPost"
import { supabase } from "@/supabaseClient/supabase"
import { unauthorized } from "next/navigation";
import { NextResponse } from "next/server";


export async function POST(req: Request, res: NextResponse) {

  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({status: 401, text: 'unauthorized'})
  } 

    const newPosts = await fetchPosts([
    'entrepreneur',
    'entrepreneurridealong',
    'freelance',
    'growmybusiness',
    'solopreneurs',
    'startupsavant',
    'Saas',
    'Business_Ideas',
    'microsaas',
    'indiebiz',
    'sideproject',
    'startupideas',
    'startups',
    'small_business_ideas',
    'smallbusiness',
  ], 'new')

  if (!newPosts) return Response.json({Error: 'No new posts'})

  const filteredPosts = await filterPosts(newPosts)
  const {error: error1} = await supabase.from('posts').upsert(filteredPosts, {onConflict: 'title', ignoreDuplicates: true})

  if (error1) {
    console.log(error1)
    return Response.json({error: 'Error upserting new posts'})
  }

  const {data, error} = await supabase.from('posts').select('*').eq('status', 'relevant').is('summary', null);

  if (error) {
    return Response.json({error: error})
  }

  if (data.length === 0) {
    return Response.json({msg: 'No posts are relevant'})

  }

  data.forEach(async post => {
    const response = await formatPost(post)
    const {post_id, text} = response
    const {error} = await supabase.from('posts').update({...post, summary: text}).eq('reddit_id', post_id)
    if (error) {
      console.log(error)
      return
    }
  })

  return Response.json({status: 'OK', code: 200})
}