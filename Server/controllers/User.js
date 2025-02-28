import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "user Already Exist", sucess: false });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashPassword });
    res
      .status(201)
      .json({ message: "user Registered sucessfully ", sucess: true });
  } catch (error) {
    res.status(400).json({ sucess: false, error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "user Doesnot Exist", sucess: false });
    }

    const token = jwt.sign(userIduser._id, process.env.SECRET_KEY, {
      expiresIn: "3d",
    });
    res
      .json(200)
      .json({ message: `welcome to ${user.name}`, token, sucess: true });
  } catch (error) {
    res.status(401).json({ error, message: "no token provided" });
  }
};

//get all users

export const users = async (req, res) => {
  try {
    const users = User.find({}).sort({ created: -1 }).select("-password");
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

//profile

export const profile = async (req, res) => {
  res.json({ user: req.user });
};
