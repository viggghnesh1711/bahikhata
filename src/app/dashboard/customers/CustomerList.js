'use client'

import React, { useEffect, useState } from 'react'
import { FetchCustomers } from '@/app/actions/FetchCustomers'
import Link from 'next/link'

function CustomerList() {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await FetchCustomers()
            if (!response.success) {
                console.log(response.message)
            }
            setData(response.customers)
        }
        fetchDetails()
    }, [])

    return (
        <div className="flex flex-col space-y-4">
            {data.length === 0 ? (
                <p className="text-center text-stone-500">Loading customers...</p>
            ) : (
                data.map((customer, index) => (
                    <Link
                        key={index}
                        href={`/dashboard/customers/${customer.id}`}
                        className="flex justify-between items-center p-4 bg-stone-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                        {/* Left section */}
                        <div>
                            <h2 className="text-lg font-semibold text-stone-800">{customer.name}</h2>
                            <p className="text-stone-600">{customer.phone}</p>
                        </div>

                        {/* Right section */}
                        <div className="flex space-x-6 text-stone-700">
                            <div>
                                <p className="text-sm font-medium">Orders</p>
                                <p>{customer.order_count}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Total</p>
                                <p>₹{customer.total_amount}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Paid</p>
                                <p>₹{customer.total_paid_amount}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Remaining</p>
                                <p>₹{customer.total_remaining_amount}</p>
                            </div>
                        </div>
                    </Link>
                ))
            )}
        </div>
    )
}

export default CustomerList
