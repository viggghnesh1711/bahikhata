'use client'
import { CreateCustomerSchema } from '@/lib/validation/CreateCustomerSchema';
import React, { useState } from 'react'

function page() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    totalAmount:0,
    amountPaid: 0,
    amountRemaining: "",
    createdDate: "",
    dueDate: "",
    description: "",
  });
  const [error, setError] = useState({
    name: "",
    phone: "",
    email: "",
    totalAmount: "",
    amountPaid: "",
    dueDate: "",
    description: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e)=>{
    setForm(prev =>({
      ...prev,[e.target.name]:e.target.value
    }))
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const result = CreateCustomerSchema.safeParse(form)
    if(!result.success){
      const fieldErrors = result.error.flatten().fieldErrors
       setError({
        name: fieldErrors.name?.[0] || "",
        phone: fieldErrors.phone?.[0] || "",
        email: fieldErrors.email?.[0] || "",
        totalAmount: fieldErrors.totalAmount?.[0] || "",
        amountPaid: fieldErrors.amountPaid?.[0] || "",
        dueDate: fieldErrors.dueDate?.[0] || "",
        description: fieldErrors.description?.[0] || "",
      });
      return;
    }
    console.log("data is submitted",form)
  }

  return (
    <div className='w-full p-6'>
      <h1 className='text-2xl font-bold mb-6'>New Customer</h1>

    
      <form className="space-y-4 w-full pr-20" onSubmit={handleSubmit}>
        
        <div className='py-4 space-y-2'>
        <div>
          <label className=" text-gray-700 mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-4 bg-stone-100 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Enter customer name"
          />
          {error.name && <p className="text-red-500 text-sm mt-1">{error.name}</p>}
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-gray-700 mb-1 font-medium">Phone Number</label>
            <input
              type="number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-4 bg-stone-100 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Enter phone number"
            />
            {error.phone && <p className="text-red-500 text-sm mt-1">{error.phone}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-4 bg-stone-100 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="Enter email"
            />
            {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
          </div>
        </div>
        </div>

        <div className="py-4  flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-gray-700 mb-1 font-medium">Total Amount</label>
            <input
              type="number"
              name="totalAmount"
              value={form.totalAmount}
              onChange={handleChange}
              className="w-full p-4 bg-stone-100 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="0"
            />
            {error.totalAmount && <p className="text-red-500 text-sm mt-1">{error.totalAmount}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 mb-1 font-medium">Amount Paid</label>
            <input
              type="number"
              name="amountPaid"
              value={form.amountPaid}
              onChange={handleChange}
              className="w-full p-4 bg-stone-100 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              placeholder="0"
            />
            {error.amountPaid && <p className="text-red-500 text-sm mt-1">{error.amountPaid}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 mb-1 font-medium">Amount Remaining</label>
            <input
              type="number"
              name="amountRemaining"
              value={form.totalAmount - form.amountPaid}
              readOnly
              className="w-full p-4 bg-stone-100 rounded-xl border border-gray-300 "
            />
          </div>
        </div>

        <div className="py-4  flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-gray-700 mb-1 font-medium">Created Date</label>
            <input
              type="date"
              name="createdDate"
              value={form.createdDate || today}
              onChange={handleChange}
              className="w-full p-4 bg-stone-100 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 mb-1 font-medium">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full p-4 bg-stone-100 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            {error.dueDate && <p className="text-red-500 text-sm mt-1">{error.dueDate}</p>}
          </div>
        </div>

        <div className='py-4 '>
          <label className="block text-gray-700 mb-1 font-medium">Description / Products</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-4 bg-stone-100 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Enter product details or description"
          />
          {error.description && <p className="text-red-500 text-sm mt-1">{error.description}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-2 bg-blue-600 text-stone-100 font-semibold rounded-xl transition"
        >
          Save Customer
        </button>
      </form>
    </div>
  )
}

export default page