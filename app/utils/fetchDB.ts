import { createClient } from "@/lib/supabase/client"

const fetchDB = async (UID: string) => {

    let limit = 1000

    const supabase = createClient()

    const {data: access, error: accessError} = await supabase.from('software_access').select('*').eq('user_id', UID).maybeSingle()

    if (!access || access === null || accessError) {
        limit = 3
    }

    const {data, error} = await supabase.from('posts').select('*').eq('status', 'relevant').or('state.is.null,state->>type.eq.public').order('created_at', {ascending: limit === 3 ? true : false}).limit(limit)
    if (error) {
        console.log(error)
        return
    }

    const filteredData = data?.filter(entry => {
        return entry?.state?.userID !== UID
    })


    return {filteredData, access: access ? true : false}
}

export default fetchDB