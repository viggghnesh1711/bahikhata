import {createClient}  from "@supabase/supabase-js"

const supabaseurl = process.env.NEXT_PUBLIC_SUPABSE_URL
const supabasekey = process.env.NEXT_PUBLIC_SUPABSE_ANON_KEY

export const supabase = createClient(supabaseurl,supabasekey);