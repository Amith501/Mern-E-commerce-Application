import { Cart } from "../models/Cart.model.js";
import mongoose from "mongoose";
// Add to Cart
export const addToCart = async (req, res) => {
  try {
    const { productId, title, price, qty, imageSrc } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].qty += Number(qty);
    } else {
      cart.items.push({ productId, title, price, qty: Number(qty), imageSrc });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get User Cart
export const userCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "User cart retrieved", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove Product from Cart

export const removeProductFromCart = async (req, res) => {
  try {
    const { productId } = req.params; // This is actually the cart item _id
    const userId = req.user?._id;

    console.log("🟢 Received Cart Item ID:", productId);
    console.log("🟢 Received User ID:", userId);

    if (!userId) {
      console.error("❌ User ID missing in request");
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      console.error("❌ Invalid cart item ID:", productId);
      return res.status(400).json({ message: "Invalid cart item ID" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      console.error("❌ Cart not found for user:", userId);
      return res.status(404).json({ message: "Cart not found" });
    }

    console.log("🛒 Cart Items Before Deletion:", cart.items);

    const itemExists = cart.items.find(
      (item) => item._id.toString() === productId
    );

    if (!itemExists) {
      console.error("❌ Cart item not found:", productId);
      return res.status(404).json({ message: "Cart item not found" });
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== productId);
    await cart.save();

    console.log("✅ Cart item removed successfully:", productId);
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error("❌ Server Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Clear Cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Product Quantity (Increase or Decrease)

export const updateProductQty = async (req, res) => {
  try {
    console.log("📩 Received Request Body:", req.body);
    console.log("👤 User ID from Auth Middleware:", req.user?._id);

    const { productId, action } = req.body;
    const userId = req.user?._id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      console.log("❌ Cart Not Found for user:", userId);
      return res.status(404).json({ message: "Cart not found" });
    }

    console.log("🛒 Cart Items:", cart.items);
    console.log("🔍 Searching for productId:", productId);

    // Ensure comparison works correctly
    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId.toString() ||
        item._id.toString() === productId.toString()
    );

    console.log(
      "🆔 Available Product IDs in Cart:",
      cart.items.map((i) => i.productId.toString())
    );

    if (itemIndex === -1) {
      console.log("❌ Product Not Found in Cart:", productId);
      return res.status(400).json({ message: "Product not found in cart" });
    }

    console.log("✅ Found item in cart:", cart.items[itemIndex]);

    // Increase or decrease quantity
    if (action === "increase") {
      cart.items[itemIndex].qty += 1;
    } else if (action === "decrease") {
      if (cart.items[itemIndex].qty > 1) {
        cart.items[itemIndex].qty -= 1;
      } else {
        console.log("🗑 Removing item from cart:", cart.items[itemIndex]);
        cart.items.splice(itemIndex, 1);
      }
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await cart.save();
    console.log("🆕 Updated Cart:", JSON.stringify(cart, null, 2));
    res.status(200).json({ message: "Product quantity updated", cart });
  } catch (error) {
    console.error("❌ Error updating quantity:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
