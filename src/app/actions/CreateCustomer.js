'use server'

import { supabase } from "@/lib/supabase/client"
import { createClient } from "@supabase/supabase-js"

export async function CreateCustomer(form){
    try{

        const {error} = await supabase.from('customers').insert({
            name: form.name,
            phone: form.phone,
            email: form.email || null,
            total_amount:form.totalAmount,
            amount_paid: form.amountPaid,
            amount_remaining: form.totalAmount - form.amountPaid,
            created_date: new Date().toISOString(),
            due_date:form.dueDate,
            description: form.description,
        })
        if(error){
            console.log("something went wrong",error)
            return {success:false,message:"Something went wrong"}
        }
        return {success:true,message:"Customer added successfully  "}
    }
    catch(error){
        console.log("CREATECUSTOMER :Server error", error)
        return {success:false,message:"Something went wrong"}
    }
}