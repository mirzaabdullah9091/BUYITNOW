import mongoose from "mongoose";
import product from "./product";


const orderSchema = mongoose.Schema({
    shippingInfo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Address"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderItems: [
        {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product"
        },
        name:{
            type: String,
            required: true,
        },
        quantity:{
            type: String,
            required: true,
        },
        image:{
            type: String,
            required: true,
        },
        price:{
            type: String,
            required: true,
        },

    }],
    paymentInfo:{
        id:{
            type:String,
        },
        status:{
            type:String,
        },
        taxPaid:{
            type:Number,
            required:true
        },
        amountPaid:{
            type:Number,
            required:true
        },
    },
    orderStatus:{
        type:String,
      default:"processing"
    }

},{timestamps:true})

export default mongoose.models.Order || mongoose.model("Order", orderSchema)