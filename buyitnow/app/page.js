// import Image from "next/image";
import Listproducts from "@/components/products/Listproducts";
import axios from "axios";
import React from "react";

const getProducts = async()=> {
  const {data} = await axios.get(`${process.env.HOST_URL}/api/products`)
  return data
}
export default async function Home() {

  const productData = await getProducts()
   return (
  <>
  <Listproducts data={productData}/>
  
  </>
  );
}
