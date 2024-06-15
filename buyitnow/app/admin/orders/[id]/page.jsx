import React from 'react'

import axios from 'axios'
import { cookies } from 'next/headers'

import Orders from '@/components/admin/Orders';
import UpdateOrder from '@/components/admin/UpdateOrder';

const getOrder = async (id) => {

    let nextCookies = cookies();
    const nextAuthSessionToken = nextCookies.get("next-auth.session-token")


    const { data } = await axios.get(`${process.env.HOST_URL}/api/admin/orders/${id}`, {
        headers: {
            Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
        }
    })
    return data
}
const page = async ({ params }) => {
    let id = params.id;
    let order = await getOrder(id)
    // console.log(orders)
    return (
        <div>
            <UpdateOrder order={order?.orders} id={id}/>
        </div>
    )
}

export default page
