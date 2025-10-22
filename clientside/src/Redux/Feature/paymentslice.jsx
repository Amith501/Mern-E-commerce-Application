import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
// Define API URL
const API_URL = "http://localhost:3000/api/payment/";

// Create Payment
export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (
    { amount, qty, cartItems, userAddress, userId },
    { rejectWithValue }
  ) => {
    try {
      // Sending request to backend API
      const response = await axios.post(`${API_URL}checkout`, {
        amount,
        qty,
        cartItems,
        userShipping: userAddress,
        userId,
      });

      // Return the response data (ensure it has the expected structure)
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create payment"
      );
    }
  }
);

// Verify Payment
export const verifypayment = createAsyncThunk(
  "payment/verify",
  async (
    { paymentId, orderId, signature, amount, orderItems, userId, userShipping },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}verify-payment`, {
        paymentId,
        orderId,
        signature,
        amount,
        orderItems,
        userId,
        userShipping,
      });

      // Clear cart if verification successful
      toast.success("✅ Payment Verified and Order Placed!");
      return response.data;
    } catch (error) {
      toast.error("❌ Payment verification failed");
      return rejectWithValue(
        error.response?.data?.message || "Payment verification failed"
      );
    }
  }
);
// const getuserOrder= createAsyncThunk("get/userorder",({})=>{
//   const response= await axios.get(`${API_URL/userorder}`)
// })
const paymentslice = createSlice({
  name: "payments",
  initialState: {
    loading: false,
    success: false,
    orderId: null,
    amount: null,
    error: null,
    latestorder: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.amount = action.payload.amount;
        state.orderId = action.payload.orderId;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifypayment.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(verifypayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.latestorder = action.payload.order;
        localStorage.setItem(
          "latestorder",
          JSON.stringify(action.payload.order)
        );
        toast.success("✅ Payment Verified Successfully!");
      })
      .addCase(verifypayment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default paymentslice.reducer;
