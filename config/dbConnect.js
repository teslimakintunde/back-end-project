import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionUrl = process.env.MONGODB_URL;
    if (!connectionUrl) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }

    await mongoose.connect(connectionUrl, {
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false,
    });

    console.log("Database connection successful");
    return mongoose.connection;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default connectDB;
