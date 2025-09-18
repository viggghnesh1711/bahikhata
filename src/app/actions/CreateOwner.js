'use server'

import { supabase } from "@/lib/supabase/client"
import bcrypt from "bcryptjs";

export async function CreateOwner(){
    try{
        const password = process.env.PASSWORD;  
        const hash = await bcrypt.hash(password, 10);

        const {error} = await supabase.from('owner').insert({
            email:"sunnykachare602@gmail.com",
            password_hash:hash,
            created_at:new Date().toISOString()
        })
        
        console.log("owner created")
        return {succcess:true ,message:"Owner created"}
    }
    catch(error){
        console.log("CREATEOWNER : Something went wrong")
        return { succcess:true ,message:"Owner creation Error"}
    }
}