import Razorpay from "razorpay";
import crypto from "crypto";
import { Payment } from "../models/Payment.model.js";
import dotenv from "dotenv";
dotenv.config();

// Razorpay Checkout (Create Order)
export const checkout = async (req, res) => {
  const { amount, cartItems, userId, userShipping } = req.body;

  if (!amount || !cartItems || !userId || !userShipping) {
    return res.status(400).json({
      success: false,
      message: "Missing required payment data",
    });
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const options = {
    amount: Math.round(amount * 100), // Amount in paise
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
    notes: {
      userId,
    },
  };

  try {
    const order = await razorpay.orders.create(options);
    if (!order || !order.id) {
      return res.status(400).json({
        success: false,
        message: "Razorpay order creation failed",
      });
    }

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount / 100,
      currency: order.currency,
      paymentStatus: "created",
      razorpayKey: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
};

// Razorpay Payment Verification
export const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;

  if (!orderId || !paymentId || !signature) {
    return res.status(400).json({
      success: false,
      message: "Missing Razorpay verification details",
    });
  }

  try {
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (generatedSignature !== signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    const savedOrder = await Payment.create({
      orderId,
      paymentId,
      signature,
      amount,
      orderItems,
      userId,
      userShipping,
      paymentStatus: "completed",
      orderDate: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Payment verified and saved",
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong during verification",
      error: error.message,
    });
  }
};

// Fetch user orders
export const userorder = async (req, res) => {
  const userId = req.user._id;
  try {
    const orders = await Payment.find({ userId }).sort({ orderDate: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user orders",
      error: error.message,
    });
  }
};

// Fetch all orders
export const allOrders = async (req, res) => {
  try {
    const orders = await Payment.find().sort({ orderDate: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch all orders",
      error: error.message,
    });
  }
};
