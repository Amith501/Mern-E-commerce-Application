import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, "passowrd is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
export const User = mongoose.model("USER", userSchema);
