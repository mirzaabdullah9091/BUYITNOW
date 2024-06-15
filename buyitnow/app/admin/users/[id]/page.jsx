import React from 'react'

import axios from 'axios'
import { cookies } from 'next/headers'
import UpdateUser from '@/components/admin/UpdateUser';



const getUser = async (id) => {

    let nextCookies = cookies();
    const nextAuthSessionToken = nextCookies.get("next-auth.session-token")


    const { data } = await axios.get(`${process.env.HOST_URL}/api/admin/users/${id}`, {
        headers: {
            Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
        }
    })
    return data
}
const page = async ({ params }) => {
    let id = params.id;
    let user = await getUser(id)
    // console.log(orders)
    return (
        <div>
            <UpdateUser user={user?.users} id={id}/>
        </div>
    )
}

export default page
