import { supabase } from "@/supabaseClient/supabase";

type TokenData = {
    id: string
    name: string
    token: string
    expires_at: number
}


export const fetchToken = async () => {

    const {data, error}: any = await supabase.from('tokens').select('*').eq('id', 'b15b6aa6-796b-4e71-81d9-81b43945af5f').single()

    if (error) {
        console.log('Error fetching Token from DB')
        return
    }

    if (Date.now() < data.expires_at) {
        return data
    }

    try {
        const basicAuth = Buffer.from(
        `${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`
        ).toString('base64');

        const response = await fetch('https://www.reddit.com/api/v1/access_token', {
            method: 'POST',
            headers: {
            'Authorization': `Basic ${basicAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            scope: 'read'
        }),
        })

        const data = await response.json()
        const token: string = data.access_token

        const access_token_data = {
            name: 'Reddit API Access Token',
            token: token,
            expires_at: Date.now() + (86400 * 1000)
        }

        const {error} = await supabase.from('tokens').update(access_token_data).eq('id', 'b15b6aa6-796b-4e71-81d9-81b43945af5f')

        if (error) {
            console.log('Supabase token insert error', error)
            return
        }

        return access_token_data

    } catch (error) {
        console.log(error)
    }

}

export default fetchToken