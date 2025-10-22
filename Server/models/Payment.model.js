import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    orderDate: {
      type: Date,
      default: Date.now(),
    },
    paymentstatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true, strict: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
