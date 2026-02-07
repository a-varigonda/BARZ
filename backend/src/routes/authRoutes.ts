// backend/src/routes/auth.ts
console.log("LOADING routes/auth.ts");

import express, { Response } from "express";
import { signup, login } from "../controllers/authController";
import { authenticateToken, AuthRequest } from "../middleware/auth";

console.log("🚀 AUTH ROUTES FILE LOADED");

const router = express.Router();

// Simple health / ping route
router.get("/ping", (_req, res: Response) => {
  res.status(200).json({ message: "auth service ok" });
});

// Signup route
router.post("/signup", async (req: AuthRequest, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const result = await signup(username, email, password);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Login route
router.post("/login", async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    const result = await login(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

// Protected route example
router.get(
  "/profile",
  authenticateToken,
  (req: AuthRequest, res: Response) => {
    res.json({ message: `Hello ${req.user?.email}` });
  }
);

export default router;





