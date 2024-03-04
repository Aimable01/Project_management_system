import express from "express";
import {
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskControllers";

export const taskRouter = express();

taskRouter.post("/new", createTask);
taskRouter.patch("/:id", updateTask);
taskRouter.delete("/:id", deleteTask);
