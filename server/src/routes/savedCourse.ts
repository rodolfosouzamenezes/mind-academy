import { Router } from "express";

import SavedCourseController from "../controllers/SavedCourseController";

import { verifyToken } from "../utils/jwt";

export const savedCourseRoutes = Router();

savedCourseRoutes.post("/courses/save/:id", verifyToken, SavedCourseController.addToSavedList);
savedCourseRoutes.delete("/courses/save/:id", verifyToken, SavedCourseController.removeToSavedList);
