import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const register = async (req, res) => {
  const { name, email, password, role = "user" } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashPassword, role });

    res
      .status(201)
      .json({ message: "User registered successfully", success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Login User
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist", success: false });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    // Generate JWT token (this should be done after validating the password)
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    // Set cookie with the token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure flag for production
      sameSite: "strict", // Prevents cross-site request forgery
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    // Send response with user data and token
    return res.status(200).json({
      message: `Welcome ${user.name}`,
      token,
      user,
      success: true,
    });
  } catch (error) {
    console.error("Authentication error:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Authentication failed", error: error.message });
  }
};

// Get All Users
export const users = async (req, res) => {
  try {
    const users = await User.find({}).sort({ _id: -1 }).select("-password");
    res
      .status(200)
      .json({ success: true, message: "Users retrieved successfully", users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({
      success: true,
      message: "logout sucesfull",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "logout failed",
    });
  }
};
// Update user role (Admin only)
const updateUserRole = async (req, res) => {
  const { userId, newRole } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.role = newRole; // Update the user role
    await user.save();
    res.json({ success: true, message: "User role updated", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete user (Admin only)
const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Profile
export const profile = async (req, res) => {
  res.status(200).json({ user: req.user });
};
