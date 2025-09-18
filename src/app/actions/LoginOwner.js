'use server'
import { supabase } from "@/lib/supabase/client"
import { success } from "zod"
import bcrypt from "bcryptjs"
import { createToken } from "@/lib/auth"
import { cookies } from "next/headers"

export async function LoginOwner(validated) {
    try {
        const { data: owner, error } = await supabase.from('owner').select().eq('email', validated.email).maybeSingle()
        const result = await bcrypt.compare(validated.password,owner.password_hash)
        
        if(!result){
            return {success:false , message:"Invalid password"}
        }
        else{
            const token = await createToken({
                email:validated.email,
            })
            cookies().set("session",token,{
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 60 * 60 * 24 * 7, 
                    path: "/"
            })
            return {success:true , message:"Logged-In successfully"}
        }

    }
    catch (error) {
        console.log("LOGINOWNER :Something went wrong", error)
        return { success: false, message: "Invalid Credentials " }
    }
}