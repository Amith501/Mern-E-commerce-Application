import { Products } from "../models/Product.model.js";

// Add Product
export const addProduct = async (req, res) => {
  const { title, description, price, category, quantity, imageSrc } = req.body;
  try {
    const product = await Products.create({
      title,
      description,
      price,
      category,
      quantity,
      imageSrc,
    });
    return res.status(201).json({
      message: "Product created successfully",
      product,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to create product",
      success: false,
      error: error.message,
    });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Products.find().sort({ createdAt: -1 });
    return res.status(200).json({
      products,
      success: true,
      message: "All Products",
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to fetch products",
      success: false,
      error: error.message,
    });
  }
};

// Get Product By ID
export const getProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ message: "Product not found", success: false });

    res.json({ message: "Product found", product, success: true });
  } catch (error) {
    res.status(400).json({
      message: "Invalid ID",
      success: false,
      error: error.message,
    });
  }
};

// Update Product By ID
export const updateById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Products.findByIdAndUpdate(id, req.body, {
      new: true, // Return updated product
      runValidators: true, // Ensures updates follow schema rules
    });

    if (!updatedProduct)
      return res
        .status(404)
        .json({ message: "Product not found", success: false });

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "Unable to update product",
      success: false,
      error: error.message,
    });
  }
};

// Delete Product By ID (Fixed)
export const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Products.findByIdAndDelete(id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Invalid ID", success: false });

    res.json({
      message: "Product deleted successfully",
      product: deletedProduct,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
