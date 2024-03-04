import express from "express";
import { adminRegister, adminLogin } from "../controllers/adminAuthControllers";

export const adminAuthRoutes = express.Router();

adminAuthRoutes.post("/register", adminRegister);
adminAuthRoutes.post("/login", adminLogin);
