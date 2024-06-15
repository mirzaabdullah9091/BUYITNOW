// import Image from "next/image";
import Listproducts from "@/components/products/Listproducts";
import axios from "axios";
import React from "react";

const getProducts = async (filters, limit, page) => {
  try {
    let res = await axios.get(`${process.env.HOST_URL}/api/products?filters=${filters}&limit=${limit}&page=${page}`);
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
  let urlParams;
  if(searchParams.keyword){
    urlParams = {
      keyword: searchParams.keyword
    }
  }
  let json_keyword = JSON.stringify(urlParams)
  let page = searchParams.page || 1
  let EncodedFilters;
  let Filters = searchParams.filters || "";
  EncodedFilters = encodeURIComponent(Filters) || json_keyword || "";
    let limit = 1;
  const productData = await getProducts(EncodedFilters, limit, page)
  // console.log(skip)
  let pages = Math.ceil(productData.CountedProducts / limit);
 
  // console.log(searchQuery)
  
  return (
    <>
      <Listproducts data={productData} limit={limit}  />

    </>
  );
}
