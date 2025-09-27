'use server'
import { supabase } from "@/lib/supabase/client"
import bcrypt from "bcryptjs"
import { createToken } from "@/lib/auth"
import { cookies } from "next/headers"

export async function LoginOwner(validated) {
    try {
        const { data: owner } = await supabase
            .from('owner')
            .select()
            .eq('email', validated.email)
            .maybeSingle()

        if (!owner) {
            return { success: false, message: "Owner not found" }
        }

        const isPasswordValid = await bcrypt.compare(validated.password, owner.password_hash)
        if (!isPasswordValid) {
            return { success: false, message: "Invalid password" }
        }

        const token = await createToken({ email: validated.email })

        cookies().set({
            name: "session",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, 
            path: "/"
        })

        return { success: true, message: "Logged-In successfully" }
    } catch (err) {
        console.log("LOGINOWNER: Something went wrong", err)
        return { success: false, message: "Invalid Credentials" }
    }
}
