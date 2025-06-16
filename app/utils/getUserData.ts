import { createClient } from "@/lib/supabase/client"

const getUserData = async (uid: string) => {
    const supabase = createClient()

    const {data: user, error} = await supabase.from('profiles').select('*').eq('id', uid).maybeSingle()
    if (error) return {error: 'error fetching userdata'}
    return await user
}

export default getUserData