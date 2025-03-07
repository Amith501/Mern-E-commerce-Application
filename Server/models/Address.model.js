import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
  {
    userId: {
      ref: "User",
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },

    fullname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Address = mongoose.model("Address", addressSchema);
