require("dotenv").config();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const express = require("express");
const connectToDB = require("./config/dbConnect");
const mongoose = require("mongoose");

// connectToDB();
// const app = express();

// app.use(cors(corsOptions));
// //Middlewares
// app.use(express.json());

// const PORT = process.env.PORT || 3000;

// app.use("/employees", require("./routes/employee"));
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to the Employee API" });
// });

// mongoose.connection.once("open", () => {
//   console.log("connect to db");
//   app.listen(PORT, () => console.log(`app running on port ${PORT}`));
// });

console.log(
  "Environment variables loaded:",
  process.env.PORT ? "PORT found" : "PORT missing"
);

// Verify CORS options
try {
  const corsOptions = require("./config/corsOptions");
  console.log("CORS options loaded successfully");
} catch (err) {
  console.error("Failed to load CORS options:", err);
  process.exit(1);
}

// Verify DB connection
try {
  const connectToDB = require("./config/dbConnect");
  console.log("DB connection module loaded");
  connectToDB();
} catch (err) {
  console.error("DB connection failed:", err);
}

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

// Verify routes
try {
  const employeeRoutes = require("./routes/employee");
  app.use("/employees", employeeRoutes);
  console.log("Employee routes loaded");
} catch (err) {
  console.error("Failed to load employee routes:", err);
}

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Employee API" });
});

// Database connection events
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
