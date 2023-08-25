import { Router } from "express";
import multer from 'multer';

import CourseController from "../controllers/CourseController";

import { verifyToken } from "../utils/jwt";
import { storage } from "../utils/upload";

const upload = multer({ storage }); 

export const courseRoutes = Router();

courseRoutes.post("/courses", verifyToken, upload.single('image'), CourseController.createCourse);
courseRoutes.put("/courses/:id", verifyToken, upload.single('image'), CourseController.updateCourse);
courseRoutes.get("/courses", verifyToken, CourseController.getAllCourses);
courseRoutes.patch("/courses/changeVisibility/:id", verifyToken, CourseController.changeVisibility);
courseRoutes.delete("/courses/:id", verifyToken, CourseController.deleteCourse);
