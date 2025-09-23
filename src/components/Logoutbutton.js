'use client'
import React from 'react'
import { LogoutOwner } from '@/app/actions/LogoutOwner'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { LogOut } from 'lucide-react';

function Logoutbutton() {
    const router = useRouter()

    async function handleLogout() {
    const res = await LogoutOwner();

    if (res.success) {
      toast.success("Logged out successfully 🚀");
      router.push("/")
    } else {
      toast.error("Logout failed 😬");
    }
  }

  return (
      <button
        onClick={handleLogout}
        className="px-4 py-2  text-red-500 font-semibold">
          <div className='flex items-center gap-1 '>
            <LogOut/>
            <h1 className='text-xl'>Logout</h1>
          </div>
      </button>

  )
}

export default Logoutbutton