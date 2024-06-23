import React from 'react'

import axios from 'axios'
import { cookies } from 'next/headers'
import UpdateAddress from '@/components/user/UpdateAddress'
import { getCookieName } from '@/helpers/helper'

const getAddress = async(id) =>{

  let nextCookies = cookies();
  const cookiesname = getCookieName()
  const nextAuthSessionToken = nextCookies.get(cookiesname)


  const {data} = await axios.get(`${process.env.HOST_URL}/api/address/updateAddress?id=${id}`,{
    headers:{
      Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
    }
  })
  // console.log("------------------------------",cookiesname)
  return data.Address
}
const page = async({params}) => {
 
  let address = await  getAddress(params?.id)
  // console.log("address",address)
  return (
    <div>
      <UpdateAddress id={params?.id} address={address}/>
    </div>
  )
}
 
export default page