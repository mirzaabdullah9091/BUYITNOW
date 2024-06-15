import React from "react";
import axios from "axios";

import UpdateProduct from "@/components/admin/UpdateProduct";

const getProduct = async (id) => {
    try {
        const { data } = await axios.get(`${process.env.HOST_URL}/api/admin/products/${id}`);
        return data;
      } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        throw error;
      }
};

const HomePage = async ({ params }) => {
    const id = params.id
    // console.log(id)
  const data = await getProduct(id);
// console.log(data)
  return <UpdateProduct data={data} id={id} />;
};

export default HomePage;