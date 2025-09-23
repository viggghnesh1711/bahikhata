"use client"
import { LoginOwner } from '@/app/actions/LoginOwner'
import { CreateOwnerSchema } from '@/lib/validation/CreateOwnerSchema'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation";

function LoginForm() {

    const router = useRouter();   

    const [form,setForm] = useState({
        email:'',
        password:''
    })
    const [error,setError] = useState({
        email:'',
        password:''
    })

    const handleChange = (e) =>{
        setForm(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    const handleSubmit = async (e) =>{
         e.preventDefault();
        const result = CreateOwnerSchema.safeParse(form)
        if(!result.success){
            const fieldErrors = result.error.flatten().fieldErrors
            setError({
                email: fieldErrors.email?.[0] || '',
                password: fieldErrors.password?.[0] || ''
            })
            return 
        }
        else{
            setError({email:'', password:''})
            const validated = result.data;
            const res = await LoginOwner(validated)
            if(res.success){
              toast.success(res.message)
              router.push('/dashboard')
            }
            else{
              toast.error(res.message)
            }
        }
    } 

  return (
     <div className="w-80 p-6 bg-white rounded-md shadow-md border border-gray-300">
        <h1 className="text-xl font-bold text-center mb-4">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email */}
            <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                {error.email && (
                    <p className="text-red-500 text-sm mt-1">{error.email}</p>
                )}
            </div>

            {/* Password */}
            <div>
                <label className="block text-sm text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                {error.password && (
                    <p className="text-red-500 text-sm mt-1">{error.password}</p>
                )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition"
            >
              Login
            </button>
        </form>
    </div>
  )
}

export default LoginForm
