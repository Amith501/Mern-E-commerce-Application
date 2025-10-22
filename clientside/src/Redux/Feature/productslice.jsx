import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify"; // Importing toast for notifications

const API_URL = "http://localhost:3000/api/product";

// Create Product
export const createProduct = createAsyncThunk(
  "product/create",
  async (data, { rejectWithValue }) => {
    try {
      const { token, ...productData } = data;
      const res = await axios.post(`${API_URL}/add`, productData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return res.data.product;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error?.message || "Create failed"
      );
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, data, token }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return res.data.product;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error?.message || "Update failed"
      );
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      toast.success("Product deleted successfully");
      return { id }; // Returning an object with 'id'
    } catch (error) {
      toast.error("Delete failed");
      return rejectWithValue(
        error?.response?.data || error?.message || "Delete failed"
      );
    }
  }
);

// Fetch All Products
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/all`, {
        withCredentials: true,
      });
      return response.data.products;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error?.message || "Failed to fetch products"
      );
    }
  }
);

// Fetch Product by ID
export const fetchProductById = createAsyncThunk(
  "product/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return response.data.product;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error?.message || "Failed to fetch product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: null, // Added to store single product details
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (p) => p._id !== action.payload.id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
