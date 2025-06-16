const filterPosts = async (posts: any[]) => {
  
const relevancePatterns = [
  { pattern: /\b(is|are|was|were) there (a|any) (way|tool|method) to\b/i, weight: 3 },
  { pattern: /\bdoes anyone know how (to|I can)\b/i, weight: 2 },
  { pattern: /\bhow (do|did|would|can) (you|people|others) (handle|deal with|manage)\b/i, weight: 3 },
  { pattern: /\b(struggling with|frustrated by|annoyed with|tired of)\b/i, weight: 4 },
  { pattern: /\b(can’t|cannot|can't) (find|figure out|get)\b/i, weight: 4 },
  { pattern: /\btakes too long\b/i, weight: 4 },
  { pattern: /\bmy biggest (problem|issue|pain point|blocker) is\b/i, weight: 5 },
  { pattern: /\bwhat do you use to\b/i, weight: 2 },
  { pattern: /\bhow do (you|people) typically\b/i, weight: 2 },
  { pattern: /\bI wish there was (a|an) (easier|better|faster) way\b/i, weight: 4 },
  { pattern: /\bkeep (track|control) of\b/i, weight: 3 },
  { pattern: /\b(juggling|managing) multiple\b/i, weight: 4 },
  { pattern: /\b(too many|a lot of) moving parts\b/i, weight: 4 },
  { pattern: /\btime[- ]?consuming\b/i, weight: 4 },
  { pattern: /\bit’s a hassle to\b/i, weight: 4 },
  { pattern: /\bmanually (doing|track|organize|handle)\b/i, weight: 4 },
  { pattern: /\b(inefficient|frustrating|painful) process\b/i, weight: 5 },
  { pattern: /\brecurring issue\b/i, weight: 5 },
  { pattern: /\bspend (too much|a lot of) time on\b/i, weight: 4 },
  { pattern: /\btakes me forever to\b/i, weight: 4 },
  { pattern: /\bwhy is it so hard to\b/i, weight: 4 },
  { pattern: /\bI keep forgetting to\b/i, weight: 3 },
  { pattern: /\boverwhelmed by\b/i, weight: 4 },
  { pattern: /\bany tools that help with\b/i, weight: 3 },
  { pattern: /\bhate (doing|having to do|managing)\b/i, weight: 4 },
  { pattern: /\bthis part always slows me down\b/i, weight: 5 },
  { pattern: /\bhow do you stay on top of\b/i, weight: 3 },
  { pattern: /\btried everything to\b/i, weight: 4 },
  { pattern: /\bcan’t keep up with\b/i, weight: 4 },
  { pattern: /\bmanaging this is a nightmare\b/i, weight: 5 },
  { pattern: /\bthis keeps breaking\b/i, weight: 3 },
  { pattern: /\bfeels repetitive\b/i, weight: 3 },
  { pattern: /\blost track of\b/i, weight: 3 },
  { pattern: /\bany solution for\b/i, weight: 3 },
  { pattern: /\bI’m looking for a better way to\b/i, weight: 4 },
  { pattern: /\bthe workflow is too (complicated|manual|inefficient)\b/i, weight: 5 },
  { pattern: /\bcan’t organize\b/i, weight: 4 },
  { pattern: /\bdon’t know where to start with\b/i, weight: 4 },
  { pattern: /\bwish someone built a tool for\b/i, weight: 3 },
  { pattern: /\bthe current tools don’t help with\b/i, weight: 5 },
]

const returnedPosts: any[] = []
posts.forEach(post => {
  let score = 0
  let last
  let text

  if (!post.text || post.text === '') {
    text = post.title
  } else {
    text = post.text
  }
  
  relevancePatterns.forEach(({pattern, weight}) => {
    if(pattern.test(text.toLowerCase())) {
      score += weight
    }
  })
    if (score < 3) {
    post.status = 'irrelevant'
  } else if (score < 8) {
    post.status = 'manually'
  } else if (score < 12) {
    post.status = 'relevant'
  } else {
    post.status = 'highly_relevant'
  }
  post.score = score
  returnedPosts.push(post)
})
return returnedPosts
}

export default filterPosts