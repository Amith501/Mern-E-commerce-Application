import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("sucesfully database is connected");
  } catch (error) {
    console.log("failed to connect db");
    process.exit(1);
  }
};

export default connectDb;
