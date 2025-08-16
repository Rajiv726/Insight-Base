import express from "express";
import { authUser, getUserProfile, registerUser } from "../Controllers/userController";
import { protect } from "../Middlewares/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);

export default router;
