const { default: mongoose, Mongoose } = require("mongoose");


const addressSchema = new mongoose.Schema({
     street:{
        type:String,
        required:true
     },
     city:{
        type:String,
        required:true
     },
    state:{
        type:String,
        required:true
     },
     phoneNo:{
        type:Number,
        required:true
     },
     zipCode:{
        type:Number,
        required:true
     },
     country:{
        type:String,
        required:true
     },
     user:{
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"User"
     }
},{timestamps:true})


export default mongoose.models.Address || mongoose.model("Address", addressSchema)