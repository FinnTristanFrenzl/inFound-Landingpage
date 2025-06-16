import { supabase } from "@/supabaseClient/supabase"

const fetchDB = async (UID: string) => {


    const {data, error} = await supabase.from('posts').select('*').eq('status', 'relevant').or('state.is.null,state->>type.eq.public').order('created_at', {ascending: false})
    if (error) {
        console.log(error)
        return
    }

    const filteredData = data?.filter(entry => {
        return entry?.state?.userID !== UID
    })


    return filteredData
}

export default fetchDB