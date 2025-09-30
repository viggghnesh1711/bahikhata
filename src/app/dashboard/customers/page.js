'use client'

import React from 'react'
import Searchbar from './Searchbar'
import CustomerList from './CustomerList'

function Page() {
  return (
    <div className="h-screen w-full flex flex-col bg-stone-200">
      <h1 className="text-2xl font-semibold p-4 text-stone-800">Customers Page</h1>

      <div className="flex-1 flex flex-col overflow-y-auto hide-scrollbar p-4 space-y-4">
        <Searchbar />
        <CustomerList />
      </div>
    </div>
  )
}

export default Page
