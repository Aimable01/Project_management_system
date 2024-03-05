import express from "express";
import {
  workerRegister,
  workerLogin,
} from "../controllers/workersAuthController";

export const workerRoutes = express.Router();

workerRoutes.post("/register", workerRegister);
workerRoutes.post("/login", workerLogin);
