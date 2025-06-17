// Function executed in POST /api/fetch
// Fetches Posts from Reddit API and stores them in Posts table in Supabase

import fetchToken from "./fetchToken"

export const fetchPosts = async (subreddits: string[], sort: 'new' | 'top?t=day') => {
    try {

        const postsToPush: Array<{reddit_id: string, title: string, url: string, text: string, upvotes: number, post_created_at: string, comments: number, status: string, score: number, subreddit: 'string'}> = [] 

        const tokenData = await fetchToken()
        const access_token = tokenData.token

        for (const subreddit of subreddits) {
            const response = await fetch(`https://oauth.reddit.com/r/${subreddit}/${sort}?limit=20`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'User-Agent': 'inFound mvp by finnfrenzl'
                }
            })

            const data = await response.json()
    
            const posts: Array<{data: {id: string, title: string, url: string, selftext: string, ups: number, created_utc: string, num_comments: number, subreddit_name_prefixed: 'string'}}> = data.data.children
  
            posts!.forEach(postData => {
                const post = {
                    reddit_id: postData.data.id,
                    title: postData.data.title,
                    url: postData.data.url,
                    text: postData.data.selftext,
                    upvotes: postData.data.ups,
                    post_created_at: postData.data.created_utc,
                    comments: postData.data.num_comments,
                    status: 'unprocessed',
                    score: 0,
                    subreddit: postData.data.subreddit_name_prefixed,
                }
                postsToPush.push(post)
            })
            
        }
        return postsToPush
    } catch (error) {
        console.log(error)
    }
    
}
