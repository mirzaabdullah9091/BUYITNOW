import React from 'react'

import axios from 'axios'
import { cookies } from 'next/headers'
import Users from '@/components/admin/Users';


const getUsers = async (page) => {

    let nextCookies = cookies();
    const nextAuthSessionToken = nextCookies.get("next-auth.session-token")


    const { data } = await axios.get(`${process.env.HOST_URL}/api/admin/users?page=${page}`, {
        headers: {
            Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
        }
    })
    return data
}
const page = async ({ searchParams }) => {
    let page = searchParams.page || 1
    let users = await getUsers(page)
    // console.log(orders)
    return (
        <div>
            <Users data={users} />
        </div>
    )
}

export default page
