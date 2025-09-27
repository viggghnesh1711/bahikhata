import React from 'react'
import Searchbar from './Searchbar'
import CustomerList from './CustomerList'

function page() {
  return (
    <div className='h-screen w-full'>
        <h1 className='text-xl font-semibold'>Customers page</h1>
        <div className='py-4 space-y-4'>
          <Searchbar/>
          <CustomerList/>
        </div>
        
        </div>
  )
}

export default page