import { createClient } from "@/lib/supabase/client"
import { redirect } from "next/navigation"
import confirmClaim from "./confirmClaim"


const claim = async (type: 'public' | 'private', post_id: string) => {
    const supabase = createClient()
    const {data: user, error: userError} = await supabase.auth.getUser()
    if (userError) return {userError: true}
    const UID = user.user.id

    const {data, error} = await supabase.from('software_access').select('credit').eq('user_id', UID).maybeSingle()
    if (error) return {accessError: true}

    
    if (data?.credit === true) {
        confirmClaim(UID, post_id, type)
        redirect('/profile')
    } else {
        redirect(`/checkout?type=idea&id=${post_id}&state=${type}`)
    }

}

export default claim