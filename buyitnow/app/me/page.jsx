import React from 'react'
import Profile from '@/components/auth/Profile'
import axios from 'axios'
import { cookies } from 'next/headers'

const getAddresses = async() =>{

  let nextCookies =  cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token")


  const {data} = await axios.get(`${process.env.HOST_URL}/api/address`,{
    headers:{
      Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
    }
  })
  return data.Addresses
}
const page = async() => {
  let addresses = await  getAddresses()
  // console.log(addresses)
  return (
    <div>
      <Profile addresses={addresses}/>
    </div>
  )
}
 
export default page
