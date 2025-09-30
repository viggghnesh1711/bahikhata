'use server'

import { supabase } from "@/lib/supabase/client"

export async function FetchOrders(id){
    try{
        const {data:orders,error:orderserror} = await supabase
        .from('orders')
        .select(`
            id,
           total_amount,
            amount_paid,
            amount_remaining,
            due_date,
            description,
            created_at,
            transactions (
            id,
            order_id,
            amount,
            created_at
            )
        `)
        .eq('customer_id',id)

         const { data:customers, error:customerserror } = await supabase
        .from('customers')
        .select(`
            id,
            name,
            phone,
            orders (
            id,
            total_amount,
            amount_paid,
            amount_remaining
            )
        `)
        .eq('id',id)

            if(customerserror){
            console.log("Fetching error",customerserror)
            return{ success:false, message:'Something went wrong'}
        }

        const customerSummary = customers.map(c => {
            const totalAmount = c.orders.reduce((sum, o) => sum + o.total_amount, 0);
            const totalPaid = c.orders.reduce((sum, o) => sum + o.amount_paid, 0);
            const totalRemaining = c.orders.reduce((sum, o) => sum + o.amount_remaining, 0);

            return {
                id: c.id,
                name: c.name,
                phone: c.phone,
                order_count: c.orders.length,
                total_amount: totalAmount,
                total_paid_amount: totalPaid,
                total_remaining_amount: totalRemaining
            };
            });

        return{ success:true, orders:orders,customers:customerSummary}

    }
    catch(error){
        console.log("FETCHORDER :server error",error)
        return{ success:false, message:'Something went wrong'}
    }
}