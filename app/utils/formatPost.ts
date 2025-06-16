// utils/formatPost.ts
export async function formatPost(post: any) {
  const API_KEY = process.env.GEMINI_API_KEY

const prompt = `You are assisting in identifying actionable user needs from Reddit posts for research and product development.

Rephrase the following Reddit post into a structured and objective sentence such as:
- "A user is looking for a tool that [...]", 
- "Someone is seeking a solution to [...]", 
- "There is a request for help with [...]"

Output exactly one sentence of around 30–40 words, staying close to the user's original intent but using neutral and simple language.

Reddit Post: "${post.text}"
`



  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        contents: [{parts: [{text: prompt}]}]
    })
  })

  const data = await response.json()
  return {post_id: post.reddit_id, text: data.candidates[0].content.parts[0].text}
}
