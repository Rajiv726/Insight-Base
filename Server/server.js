import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an Express application

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Route setup
app.get("/", (req, res) => {
  res.send("API is running on port 5000");
});

// Connect to MongoDB
const port = process.env.PORT || 5000; // Use PORT from environment or default to 5000
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://bumblee:mu$ic005@cluster0.dnfnsmv.mongodb.net/"; // Use MONGO_URI from environment or default to local MongoDB

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((error) => console.error("Error starting the server:", error));
