
import React from 'react'
import Productdetails from '@/components/products/Productdetails'
import axios from 'axios'


var canReview;
async function getdata(id){
    let res = await axios.get(`${process.env.HOST_URL}/api/products/Single-product?id=${id}`)
    if(!res.data){
        throw new Error("ERROR IN FETCHING DATA")
    }
    return res.data
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
      <Productdetails product={product} />
   
  )
}

export default page
