"use client"
import React from "react";
import Link from "next/link";
import CustomPagination from "../layouts/CustomPagination";
import { Image, Pencil, Trash } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Products = ({ data }) => {
  const router = useRouter()
    // console.log(data.resPerPage)

const delProduct = async(id) => {
    await axios.delete(`${process.env.HOST_URL}/api/admin/products/${id}`)
    .then((res) => {
        if (res.data.success) {
            router.replace("/admin/products")
        }
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
}

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">
        {data?.CountedProducts} Products
      </h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Stock
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((product) => (
            <tr key={product._id} className="bg-white">
              <td className="px-6 py-2">{product?.name}</td>
              <td className="px-6 py-2">{product?.stock}</td>
              <td className="px-6 py-2">${product?.price}</td>
              <td className="px-6 py-2">
                <div>
                  <Link
                    href={`/admin/products/${product._id}/upload_images`}
                    className="px-2 py-2 inline-block text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    <i  aria-hidden="true"><Image size={15}/></i>
                  </Link>

                  <Link
                    href={`/admin/products/${product._id}`}
                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    <i aria-hidden="true"><Pencil size={15}/></i>
                  </Link>
                  <a onClick={()=> delProduct(product._id)} className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer">
                    <i aria-hidden="true"><Trash size={15}/></i>
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-6">
        <CustomPagination
          resPerpage={data?.resPerPage}
          productCount={data?.CountedProducts}
        />
      </div>
    </div>
  );
};

export default Products;