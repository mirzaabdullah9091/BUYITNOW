import React from 'react'

import axios from 'axios'
import { cookies } from 'next/headers'

import Orders from '@/components/admin/Orders';

const getOrders = async (page) => {

    let nextCookies = cookies();
    const nextAuthSessionToken = nextCookies.get("next-auth.session-token")


    const { data } = await axios.get(`${process.env.HOST_URL}/api/admin/orders?page=${page}`, {
        headers: {
            Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
        }
    })
    return data
}
const page = async ({ searchParams }) => {
    let page = searchParams.page || 1
    let orders = await getOrders(page)
    // console.log(orders)
    return (
        <div>
            <Orders orders={orders} />
        </div>
    )
}

export default page
