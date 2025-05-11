import express from "express";
import {
  addToCart,
  clearCart,
  removeProductFromCart,
  userCart,
  updateProductQty, // Unified function for increasing & decreasing quantity
} from "../controllers/Cart.js";

import Authenticated from "../middleware/auth.js";

const router = express.Router();

// Add to Cart
router.post("/add", Authenticated, addToCart);

// Get User Cart
router.get("/getCart", Authenticated, userCart);

// Update Product Quantity (Increase/Decrease)
router.patch("/update-qty", Authenticated, updateProductQty);

// Remove Product from Cart
router.delete("/remove/:productId", Authenticated, removeProductFromCart);

// Clear Cart
router.delete("/clear", Authenticated, clearCart);

export default router;
