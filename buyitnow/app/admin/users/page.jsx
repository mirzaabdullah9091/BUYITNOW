import React from 'react'

import axios from 'axios'
import { cookies } from 'next/headers'
import Users from '@/components/admin/Users';
import { getCookieName } from '@/helpers/helper';


const getUsers = async (page) => {

    let nextCookies = cookies();
    const cookiesname = getCookieName()
    const nextAuthSessionToken = nextCookies.get(cookiesname)


    const { data } = await axios.get(`${process.env.HOST_URL}/api/admin/users?page=${page}`, {
        headers: {
            Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
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
