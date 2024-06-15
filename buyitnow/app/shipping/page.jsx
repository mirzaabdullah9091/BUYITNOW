import React from 'react'
import Shipping from '@/components/cart/Shipping'
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
  return data?.Addresses
}
const page = async() => {
  let addresses = await  getAddresses()
  // console.log(addresses)
  return (
    <div>
      <Shipping addresses={addresses}/>
    </div>
  )
}
 
export default page