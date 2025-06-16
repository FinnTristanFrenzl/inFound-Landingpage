import { createClient } from "@/lib/supabase/client"

const confirmClaim = async (user: string, post_id: string, type: 'public' | 'private') => {
    const supabase = createClient()
    
    let cofoundersObj = null

    if (type === 'public') {
        cofoundersObj = []
    }

    const {error: updateError} = await supabase.from('posts').update({state: {userID: user, type: type, cofounders: cofoundersObj}}).eq('reddit_id', post_id)
    if (updateError) return {updateError: true}

    const {error: userUpdateError} = await supabase.from('software_access').update({credit: false}).eq('user_id', user)
    if (userUpdateError) return {userUpdateError: true}

}

export default confirmClaim