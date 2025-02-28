import mongoose, { Schema } from "mongoose";

const productsSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  category: {},
  quantity: {
    type: String,
    required: [true, "Quantity is required"],
  },
  imageSrc: {
    type: String,
    required: [true, "Image source is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Products = mongoose.model("Product", productsSchema);
