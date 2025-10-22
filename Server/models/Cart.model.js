import mongoose, { Schema } from "mongoose";
const cartItemSchema= new Schema({
    productId:{
        type:mongoose.Types.ObjectId,
        ref:'Product',
        required:true
    },title:{
        required:true,
        type:String
    },

    price:{
        required:true,
        type:String,
        min:0
    },quantity:{
        required:true,
        type:Number,

    },imageSrc:{
        required:true,
        type:String
    }
})

const cartSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [cartItemSchema],
      default: [], 
    }
  }, { timestamps: true });
export const Cart= mongoose.model('Cart',cartSchema)  