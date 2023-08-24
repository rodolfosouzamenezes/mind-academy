import { Router } from "express";

import AuthController from "../controllers/AuthController";

import { verifyToken } from "../utils/jwt";

export const authRoutes = Router();

authRoutes.get("/users", AuthController.getAllUsers);
authRoutes.post("/signUp", AuthController.signUp);
authRoutes.get("/login", AuthController.login);

// Revela os dados do User no token
authRoutes.get("/me", verifyToken, AuthController.me);