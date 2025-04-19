import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import router from "./routes/api/Employee.js";
import connectDB from "./config/dbConnect.js";
import mongoose from "mongoose";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3500;

connectDB();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));

app.use("/employees", router);

// app.use(PORT, () => console.log(`App running on port ${PORT}`));
mongoose.connection.once("open", () => {
  console.log("connect to db");
  app.listen(PORT, () => console.log(`app running on port ${PORT}`));
});
