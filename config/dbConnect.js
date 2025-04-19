// import mongoose from "mongoose";

// const connectDB = async () => {
//   const connectionUrl = process.env.DATABASE_URL;
//   mongoose
//     .connect(connectionUrl)
//     .then(() => console.log("database connection successful"))
//     .catch((error) => console.log(error));
// };
// export default connectDB;

// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const connectionUrl = process.env.MONGODB_URL; // Use MONGODB_URL
//     await mongoose.connect(connectionUrl, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000,
//       bufferCommands: false,
//     });
//     console.log("Database connection successful");
//   } catch (error) {
//     console.error("Database connection error:", error);
//     throw error; // Propagate error
//   }
// };

// export default connectDB;

// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const connectionUrl = process.env.MONGODB_URL;
//     if (!connectionUrl) {
//       throw new Error("MONGODB_URL is not defined in environment variables");
//     }
//     await mongoose.connect(connectionUrl, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000,
//       bufferCommands: false,
//     });
//     console.log("Database connection successful");
//   } catch (error) {
//     console.error("Database connection error:", error);
//     throw error;
//   }
// };

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionUrl = process.env.MONGODB_URL;
    if (!connectionUrl) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }

    await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
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
