'use server'

import { supabase } from "@/lib/supabase/client"
import { createClient } from "@supabase/supabase-js"

export async function CreateCustomer(form){
    try{

        const {data: customerData, error: customerError} = await supabase
        .from('customers')
        .insert({
            name: form.name,
            phone: form.phone,
            email: form.email || null,
            created_at: new Date().toISOString(),
        })
        .select('id')
        .single()
        if(customerError){
            console.log("something went wrong",customerError)
            return {success:false,message:"Something went wrong"}
        }

        const customerId = customerData.id
        const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
            customer_id: customerId,
            total_amount:form.totalAmount || 0,
            amount_paid: form.amountPaid || 0,
            due_date:form.dueDate,
            description: form.description,
            created_at: new Date().toISOString(),
        })
        .select('id')
        .single()
        if(orderError){
            console.log("something went wrong order",orderError)
            return {success:false,message:"Something went wrong"}
        }

        const orderId = orderData.id
        const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
            order_id: orderId,
            amount: form.amountPaid || 0 ,
        })
        if(transactionError){
            console.log("something went wrong",transactionError)
            return {success:false,message:"Something went wrong"}
        }

        return {success:true,message:"Customer added successfully  "}
    }
    catch(error){
        console.log("CREATECUSTOMER :Server error", error)
        return {success:false,message:"Something went wrong"}
    }
}