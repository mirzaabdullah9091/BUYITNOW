import React from 'react'

import axios from 'axios'
import { cookies } from 'next/headers'
import ListOrders from '@/components/orders/ListOrders';
import { getCookieName } from '@/helpers/helper';

const getOrders = async (page) => {

    let nextCookies = cookies();
    const cookiesname = getCookieName()
    const nextAuthSessionToken = nextCookies.get(cookiesname)

    const { data } = await axios.get(`${process.env.HOST_URL}/api/orders/myorders?page=${page}`, {
        headers: {
            Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
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
            <ListOrders orders={orders} />
        </div>
    )
}

export default page
