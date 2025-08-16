import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Config/db";
import userRoutes from "./Routes/userRoutes";
import documentRoutes from "./Routes/documentRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/documents", documentRoutes);

// Global Error Handler
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
);

app.get("/", (_req, res) => {
  res.send("API is working!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
