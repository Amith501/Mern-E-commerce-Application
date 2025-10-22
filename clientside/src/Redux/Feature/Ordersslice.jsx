import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/payment";

// Fetch user-specific orders
export const userorder = createAsyncThunk(
  "orders/userorder",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/userorder`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data; // Assuming this returns an array of orders
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Fetch all orders (admin)
export const allorders = createAsyncThunk(
  "orders/allorders",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/all-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data; // Assuming this returns an array of all orders
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

// Orders Slice
const orderslice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    latestorder: null, // For user orders
    allOrders: [], // For admin to view all orders
    loadingUserOrders: false,
    loadingAllOrders: false,
    errorUserOrders: null,
    errorAllOrders: null,
  },
  reducers: {
    clearOrders: (state) => {
      state.latestorder = null;
      state.errorUserOrders = null;
      state.errorAllOrders = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userorder.pending, (state) => {
        state.loadingUserOrders = true;
        state.errorUserOrders = null;
      })
      .addCase(userorder.fulfilled, (state, action) => {
        state.loadingUserOrders = false;
        state.latestorder = action.payload;
        state.orders = action.payload;
        // You can change this if the response data has a specific structure
      })
      .addCase(userorder.rejected, (state, action) => {
        state.loadingUserOrders = false;
        state.errorUserOrders = action.error.message;
      })
      .addCase(allorders.pending, (state) => {
        state.loadingAllOrders = true;
        state.errorAllOrders = null;
      })
      .addCase(allorders.fulfilled, (state, action) => {
        state.loadingAllOrders = false;
        state.allOrders = action.payload; // All orders available for admin
      })
      .addCase(allorders.rejected, (state, action) => {
        state.loadingAllOrders = false;
        state.errorAllOrders = action.payload;
      });

      
  },
});

export const { clearOrders } = orderslice.actions;
export default orderslice.reducer;
