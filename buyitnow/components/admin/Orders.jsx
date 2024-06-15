"use client"
import Link from "next/link";
import React from "react";
import CustomPagination from "../layouts/CustomPagination";
import { Pencil, Trash } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Orders = ({ orders }) => {
const router = useRouter()
  const deleteOrder = async(id) => {
    await axios.delete(`${process.env.HOST_URL}/api/admin/orders/${id}`)
    .then((res)=>{
      if(res.data){
        router.refresh()
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-3xl my-5 ml-4 font-bold">
        {orders?.orderCount} Orders
      </h1>
      <table className="w-full text-sm text-left">
        <thead className="text-l text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Amount Paid
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.orders?.map((order) => (
            <tr key={order._id} className="bg-white">
              <td className="px-6 py-2">{order?._id}</td>
              <td className="px-6 py-2">${order?.paymentInfo?.amountPaid}</td>
              <td className="px-6 py-2">{order?.orderStatus}</td>
              <td className="px-6 py-2">
                <div>
                  <Link
                    href={`/admin/orders/${order?._id}`}
                    className="px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2"
                  >
                    <i  aria-hidden="true"><Pencil size={15}/></i>
                  </Link>
                  <a 
                  onClick={()=>deleteOrder(order._id)}
                  className="px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer">
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
          resPerpage={orders?.resPerPage}
          productCount={orders?.orderCount}
        />
      </div>
    </div>
  );
};

export default Orders;