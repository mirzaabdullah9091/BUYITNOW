"use client"
import UserContext from '@/context/UserContext'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useLayoutEffect, useState } from 'react'
import UserAddresses from '../user/UserAddresses'

const Profile = ({addresses}) => {
    const { data: session } = useSession();
    const[user,setUser] = useState();
    useLayoutEffect(()=>{
      setUser(session?.user)
    },[session])
    // console.log(user)
    return (
        <>
      <figure className="flex items-start sm:items-center">
        <div className="relative">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src={user?.avatar ? user?.avatar?.url : "/images/default.png"}
            alt={user?.name}
          />
        </div>
        <figcaption>
          <h5 className="font-semibold text-lg">{user?.name}</h5>
          <p>
            <b>Email:</b> {user?.email} | <b>Joined On:</b>
            {user?.createdAt? user.createdAt.substring(0, 10) : "Date not found"}
          </p>
        </figcaption>
      </figure>

      <hr className="my-4" />

      <UserAddresses  addresses={addresses}/>

      <Link href="/address/new">
        <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
          <i className="mr-1 fa fa-plus"></i> Add new address
        </button>
      </Link>

      <hr className="my-4" />
    </>
    )
}


export default Profile
