import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:3000/api/cart";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (token) => {
  console.log("Fetching Cart with Token:", token);
  try {
    const response = await axios.get(`${url}/getCart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    console.log("Cart Response:", response.data); // 🛠 Debugging
    return response.data.cart; // Returning full cart object
  } catch (error) {
    console.error("Error Fetching Cart:", error);
    throw error;
  }
});

// Add to Cart
export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ productId, title, price, qty, imageSrc, token }) => {
    console.log("Sending Token:", token);
    const response = await axios.post(
      `${url}/add`,
      { productId, title, price, qty, imageSrc },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.cart;
  }
);

// Update Quantity (Increase/Decrease)
export const updateCartQty = createAsyncThunk(
  "cart/updateCartQty",
  async ({ productId, action, token }, { rejectWithValue }) => {
    try {
      console.log("🔄 Sending request with:", { productId, action, token });

      const response = await axios.patch(
        "http://localhost:3000/api/cart/update-qty",
        { productId, action },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cart = response.data.cart;

      console.log("✅ Response from server:", cart);

      return {
        items: cart.items,
        totalQuantity: cart.totalQuantity,
        totalPrice: cart.totalPrice,
      };
    } catch (error) {
      console.error("❌ Error updating cart:", error.response?.data);
      return rejectWithValue(error.response?.data);
    }
  }
);

// Remove Item from Cart
export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async ({ productId, token }) => {
    const response = await axios.delete(`${url}/remove/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    console.log("🛒 Remove API Response:", response.data); // Debugging

    return {
      items: response.data.cart.items,
      totalQuantity: response.data.cart.totalQuantity,
      totalPrice: response.data.cart.totalPrice,
    };
  }
);

// Clear Cart
export const clearCart = createAsyncThunk("cart/clear", async (token) => {
  const response = await axios.delete(`${url}/clear`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data.cart;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        console.log("Fetched Cart Data:", action.payload);
        state.status = "succeeded";
        state.cartItems = action.payload?.items || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        console.error("Error Fetching Cart:", action.error.message);
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(updateCartQty.fulfilled, (state, action) => {
        console.log("🛒 Updated cart response:", action.payload); // Debugging
        if (action.payload && action.payload.items) {
          state.cartItems = action.payload.items;
          //total quantity
          state.totalQuantity = state.cartItems.reduce(
            (total, item) => total + item.qty,
            0
          );

          //  Update Total Price
          state.totalPrice = state.cartItems.reduce(
            (total, item) => total + item.qty * item.price,

            0
          );
          console.log("🛍 Total Quantity:", state.totalQuantity);
          console.log("💰 Total Price:", state.totalPrice);
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity; // Updating total quantity
        state.totalPrice = action.payload.totalPrice; //  Updating total price
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.items || [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
      });
  },
});

export default cartSlice.reducer;

export const { resetCart } = cartSlice.reducer;
