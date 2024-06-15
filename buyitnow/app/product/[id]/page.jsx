
import React from 'react'
import Productdetails from '@/components/products/Productdetails'
import axios from 'axios'
import { cookies } from 'next/headers'

var canReview;
async function getdata(id){
    let res = await axios.get(`${process.env.HOST_URL}/api/products/Single-product?id=${id}`)
    if(!res.data){
        throw new Error("ERROR IN FETCHING DATA")
    }
    return res.data
}

async function CanReview(id){
    "use server"
    // console.log(id)
    let nextCookies =  cookies();
  const nextAuthSessionToken = nextCookies.get("next-auth.session-token")

    let res = await axios.get(`${process.env.HOST_URL}/api/orders/can_review?productId=${id}`,
    { headers:{
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      }
    })
    if(!res.data){
        throw new Error("ERROR IN FETCHING DATA")
    }
    canReview = res?.data?.canReview || false;
    return res.data?.canReview
} 

const page = async({params}) => {
    let id =  params.id
    let data = await getdata(id)
  
    let product;
    if(data.product){
        product = data.product
    }
    if(data.error)
        console.log(error)
  return (
      <Productdetails product={product} CanReview={CanReview} />
   
  )
}

export default page
