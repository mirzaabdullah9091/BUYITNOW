// import Image from "next/image";

import Products from "@/components/admin/Products";
import axios from "axios";

import React from "react";

const getProducts = async (limit, page) => {
  try {
    let res = await axios.get(`${process.env.HOST_URL}/api/products?limit=${limit}&page=${page}`);
    if (!res) {
      throw new Error("Failed to fetch data");
    }
    return res.data;
  } catch (error) {
    // console.error("Error fetching data:", error);
    throw error; // Re-throw the error to be caught elsewhere if needed
  }
}
export default async function Home({ searchParams }) {
 
    const page = searchParams.page || 1
    const limit = 10;
    const data = await getProducts(limit,page)
  // console.log(searchQuery)
  
  return (
    <>
      <Products data={data} limit={limit}  />

    </>
  );
}
