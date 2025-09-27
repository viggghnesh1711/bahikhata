'use server'

import { supabase } from "@/lib/supabase/client"
import { success } from "zod"

export async function FetchCustomers(){
    try{
        const {data:customers, error:customerserror}= await supabase.from('customers').select()
        if(customerserror){
            console.log("Fetching error")
            return{ success:false, message:'Something went wrong'}
        }
        return {success:true,customers:customers}
    }
    catch(error){
        console.log("CUSTOMERSLIST :server error",error)
        return{ success:false, message:'Something went wrong'}
    }
}