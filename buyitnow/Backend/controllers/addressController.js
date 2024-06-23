import { NextResponse } from "next/server";
import order from "../models/order";
import user from "../models/user";

export const Orders = async (req) => {
    try {
   
        const query = await req.nextUrl.searchParams;
        let skip = query.get("page") || 1;
        const resPerPage = 10;
        let skipped = resPerPage * (skip - 1)

        const orderCount = await order.countDocuments();

        const orders = await order.find().limit(resPerPage).skip(skipped).populate("user shippingInfo")
        // console.log(orders)
        if (!orders || orders.length < 1) {
            return NextResponse.json({ message: "No orders found", success: false })
        }

        return NextResponse.json({ orders, orderCount, resPerPage })
    } catch (error) {
        // console.log(error, "--------------------------------------------")

        return NextResponse.json({ msg: error.message, success: false }, { status: error.statusCode })
    }
}

export const Users = async (req) => {
    try {
        const query = req.nextUrl.searchParams;
        let skip = query.get("page") || 1;
        let userCount = await user.countDocuments();
        let resPerPage = 5;
        let skipped = resPerPage * (skip - 1)
        let users = await user.find().limit(resPerPage).skip(skipped);
        // console.log(users)
        if (!users) {
            return NextResponse.json({ msg: "There is no user to show ", success: false }, { status: 404 })
        }
        return NextResponse.json({ resPerPage, users, userCount })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: error.message, success: false }, { status: error.statusCode })
    }
}