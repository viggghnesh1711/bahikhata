"use client"
import { CreateOwner } from '@/app/actions/CreateOwner'
import { LoginOwner } from '@/app/actions/LoginOwner'
import { CreateOwnerSchema } from '@/lib/validation/CreateOwnerSchema'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation";

function LoginForm() {

    const router = useRouter();   

    const [form,setform] = useState({
        email:'',
        password:''
    })
    const [error,seterror] = useState({
        email:'',
        password:''
    })

    const handleChange = (e) =>{
        setform(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    const handleSubmit = async (e) =>{
         e.preventDefault();
        const result = CreateOwnerSchema.safeParse(form)
        if(!result.success){
            const fielderrors = result.error.flatten().fieldErrors
            seterror({
                email:fielderrors.email?.[0] || '',
                password:fielderrors.password?.[0] || ''
            })
            return 
        }
        else{
            seterror({email:'',password:''})
            const validated = result.data;
            const res = await LoginOwner(validated)
            if(res.success){
              toast.success(res.message)
              console.log("redeirecting ...")
              router.push('/dashboard')
            }
            else{
              toast.error(res.message)
            }
        }
    } 

  return (
     <div className="w-80 bg-stone-200 rounded-2xl p-6 shadow-md">
      <h1 className="text-xl font-semibold text-stone-700 text-center mb-4">
        Login Form
      </h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm text-stone-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="p-2 rounded-xl w-full border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          {error.email && (
            <p className="text-red-500 text-sm mt-1">{error.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-stone-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="p-2 rounded-xl w-full border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          {error.password && (
            <p className="text-red-500 text-sm mt-1">{error.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-stone-700 text-white py-2 rounded-xl hover:bg-stone-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  )

 }
export default LoginForm