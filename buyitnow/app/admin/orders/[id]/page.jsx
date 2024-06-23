import React from 'react'

import axios from 'axios'
import { cookies } from 'next/headers'
import UpdateOrder from '@/components/admin/UpdateOrder';
import { getCookieName } from '@/helpers/helper';

const getOrder = async (id) => {

    let nextCookies = cookies();
    const cookiesname = getCookieName()
    const nextAuthSessionToken = nextCookies.get(cookiesname)


    const { data } = await axios.get(`${process.env.HOST_URL}/api/admin/orders/${id}`, {
        headers: {
            Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
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
