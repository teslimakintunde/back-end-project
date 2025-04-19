import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import connectDB from "./config/dbConnect.js";
import serverless from "serverless-http";

import router from "./routes/employee.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/employees", router);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Employee API" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Catch-all 404
app.use((req, res) => {
  console.error(`404: Route not found - ${req.method} ${req.url}`);
  res.status(404).json({ error: "Not Found" });
});

// MongoDB connection management
let cachedConnection = null;

const connectWithRetry = async () => {
  // Already connected
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  // Use cached connection if available
  if (cachedConnection) return cachedConnection;

  try {
    cachedConnection = await connectDB();
    return cachedConnection;
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err;
  }
};

// Vercel serverless handler
const handler = serverless(app);

export default async (req, res) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  try {
    await connectWithRetry();
    return handler(req, res);
  } catch (err) {
    console.error("Vercel handler error:", err);
    return res.status(500).json({ error: "Database connection failed" });
  }
};

// Local development server
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3500;
  connectWithRetry()
    .then(() => {
      app.listen(PORT, () => console.log(`App running on port ${PORT}`));
    })
    .catch((err) => {
      console.error("Failed to start server:", err);
      process.exit(1);
    });
}
