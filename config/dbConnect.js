import mongoose from "mongoose";

const connectDB = async () => {
  const connectionUrl = process.env.DATABASE_URL;
  mongoose
    .connect(connectionUrl)
    .then(() => console.log("database connection successful"))
    .catch((error) => console.log(error));
};
export default connectDB;
