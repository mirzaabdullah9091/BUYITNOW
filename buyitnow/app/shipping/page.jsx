import React from 'react'
import Shipping from '@/components/cart/Shipping'
import axios from 'axios'
import { cookies } from 'next/headers'
import { getCookieName } from '@/helpers/helper'

const getAddresses = async() =>{

  let nextCookies = cookies();
  const cookiesname = getCookieName()
  const nextAuthSessionToken = nextCookies.get(cookiesname)
  const {data} = await axios.get(`${process.env.HOST_URL}/api/address`,{
    headers:{
      Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
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