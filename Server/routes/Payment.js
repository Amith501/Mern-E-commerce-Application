import express from "express";
import {
  allOrders,
  checkout,
  userorder,
  verify,
} from "../controllers/Payment.js";
import Authenticated from "../middleware/auth.js";

const router = express.Router();
//checkout route
router.post("/checkout", checkout);
//ordercomnfirm
router.post("/verify-payment", verify);

//find order specific by users and userid
router.get("/userorder", Authenticated, userorder);

//find all the orders
router.get("/all-orders", allOrders);

export default router;
