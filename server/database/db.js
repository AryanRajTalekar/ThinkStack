import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

// we will config dotenv file in index.js
//  file only so we dont have to do it here
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

export default connectDB;
