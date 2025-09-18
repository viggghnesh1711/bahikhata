'use client'
import React from 'react'
import { LogoutOwner } from '@/app/actions/LogoutOwner'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

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
        className="px-4 py-2 bg-red-500 text-white rounded-lg">
        Logout
      </button>

  )
}

export default Logoutbutton