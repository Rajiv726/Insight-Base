import express from "express";
import {
  authUser,
  deleteUserProfile,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../Controllers/userController";
import { protect } from "../Middlewares/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.delete("/profile", protect, deleteUserProfile);

export default router;
