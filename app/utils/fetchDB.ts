import { supabase } from "@/supabaseClient/supabase"

const fetchDB = async () => {
    const {data, error} = await supabase.from('posts').select('*').eq('status', 'relevant')

    if (error) {
        console.log(error)
        return
    }

    return data
}

export default fetchDB