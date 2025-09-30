'use client'
import { FetchOrders } from '@/app/actions/FetchOrders'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"

function Page() {
  const params = useParams()
  const id = params.id 
  const [orders, setOrders] = useState([])
  const [customer, setCustomer] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)


  useEffect(() => {
    const fetchDetails = async () => {
      const response = await FetchOrders(params.id)
      if (!response.success) {
        console.log(response.message)
      } else {
        setOrders(response.orders)
        setCustomer(response.customers[0]) // your API returns array
      }
    }
    fetchDetails()
  }, [params.id])

  if (!customer) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-stone-200 p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-stone-800">{customer.name}</h1>
        <p className="text-stone-600">{customer.phone}</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-stone-500 text-sm">Total Orders</p>
          <h2 className="text-xl font-bold">{customer.order_count}</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-stone-500 text-sm">Total Amount</p>
          <h2 className="text-xl font-bold">₹{customer.total_amount}</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-stone-500 text-sm">Amount Paid</p>
          <h2 className="text-xl font-bold text-green-600">₹{customer.total_paid_amount}</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-stone-500 text-sm">Remaining</p>
          <h2 className="text-xl font-bold text-red-600">₹{customer.total_remaining_amount}</h2>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Button className="bg-stone-700 hover:bg-stone-800 text-white">Generate PDF</Button>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">New Order</Button>
        <Button className="bg-red-500 hover:bg-red-600 text-white">Delete Customer</Button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-stone-800 mb-2">Orders</h2>
        {orders.length === 0 ? (
          <p className="text-stone-600">No orders found.</p>
        ) : (
         orders.map(order => (
      <div 
        key={order.id} 
        onClick={() => setSelectedOrder(order)}
        className="bg-white p-4 rounded-xl shadow border cursor-pointer hover:bg-stone-50 transition"
      >
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg text-stone-700">{order.description}</h3>
          <span className="text-sm text-stone-500">
            {new Date(order.created_at).toLocaleDateString()}
          </span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
          <p>Total: <span className="font-semibold">₹{order.total_amount}</span></p>
          <p>Paid: <span className="font-semibold text-green-600">₹{order.amount_paid}</span></p>
          <p>Remaining: <span className="font-semibold text-red-600">₹{order.amount_remaining}</span></p>
        </div>
      </div>
      
))
        )}
      </div>
    </div>
  )
}

export default Page
