import React from 'react'

import axios from 'axios'
import { cookies } from 'next/headers'
import UpdateAddress from '@/components/user/UpdateAddress'

const getAddress = async(id) =>{

  let nextCookies =  cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token")


  const {data} = await axios.get(`${process.env.HOST_URL}/api/address/updateAddress?id=${id}`,{
    headers:{
      Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
    }
  })
  return data.Address
}
const page = async({params}) => {
 
  let address = await  getAddress(params?.id)
  // console.log(addresses)
  return (
    <div>
      <UpdateAddress id={params?.id} address={address}/>
    </div>
  )
}
 
export default page