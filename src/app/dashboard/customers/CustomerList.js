'use client'
import React, { useEffect, useState } from 'react'
import { FetchCustomers } from '@/app/actions/FetchCustomers'

function CustomerList() {
    const [data,setData]= useState([]) ;

    useEffect(()=>{
        const fetchdetails = async ()=>{
            const response = await FetchCustomers()
            if(!response.success){
                console.log(response.message)
            }
            setData(response.customers)
        }
        fetchdetails()
    },[])

    useEffect(()=>{
        console.log("we got the data",data)
    },[data])

  return (
    <div className='border-2 '>CustomerList</div>
  )
}

export default CustomerList