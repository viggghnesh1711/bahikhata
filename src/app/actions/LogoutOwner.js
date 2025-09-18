'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function LogoutOwner(){
    try{
      cookies().delete("session");
         return { success: true };
    }
    catch{
        console.log("Server Session delete error");;
        return { success: false };
    }
}