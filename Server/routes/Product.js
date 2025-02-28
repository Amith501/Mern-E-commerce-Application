import express from "express";
import {
  addProduct,
  deleteById,
  getProducts,
  getProductsById,
  updateById,
} from "../controllers/Product.js";

const router = express.Router();

router
  .post("/add", addProduct)
  .get("/all", getProducts)
  .get("/:id", getProductsById);
router.put("/:id", updateById).delete("/:id", deleteById);
export default router;
