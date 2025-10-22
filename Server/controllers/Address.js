import { Address } from "../models/Address.model.js";

export const addAddress = async (req, res) => {
  try {
    const { fullname, address, state, city, country, pincode, phoneNumber } =
      req.body;

    if (
      !fullname ||
      !address ||
      !state ||
      !city ||
      !country ||
      !pincode ||
      !phoneNumber
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const userAddress = await Address.create({
      userId: req.user._id,
      fullname,
      address,
      state,
      city,
      country,
      pincode,
      phoneNumber,
    });
await userAddress.save()
    res
      .status(201)
      .json({ message: "Address added", userAddress, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message, success: false });
  }
};

export const getAddress = async (req, res) => {
  try {
    let address = await Address.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    if (!address.length) {
      return res
        .status(404)
        .json({ message: "No address found", success: false });
    }

    res.status(200).json({
      message: "Address retrieved",
      userAddress: address[0],
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", error: error.message, success: false });
  }
};
