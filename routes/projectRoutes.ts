import express from "express";
import {
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectControllers";

export const projectRouter = express.Router();

projectRouter.post("/new", createProject);
projectRouter.patch("/:id", updateProject);
projectRouter.delete("/:id", deleteProject);
