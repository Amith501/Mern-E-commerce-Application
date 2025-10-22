import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/address";

// Add Address (POST)
export const checkout = createAsyncThunk(
  "address/add",
  async ({ addressData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/add`, addressData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Get Address (GET)
export const gettaddress = createAsyncThunk(
  "address/get",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/get`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch address");
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    address: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //  Handle checkout (POST)
      .addCase(checkout.pending, (state) => {
        state.status = "pending";
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.status = "success";
        state.address = action.payload;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //  Handle gettaddress (GET)
      .addCase(gettaddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(gettaddress.fulfilled, (state, action) => {
        state.status = "success";
        state.address = action.payload.userAddress;
      })
      .addCase(gettaddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default checkoutSlice.reducer;
