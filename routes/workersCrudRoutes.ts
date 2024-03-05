import express from "express";
import { deleteWorker } from "../controllers/workersCrudController";

export const workerCrudRouter = express.Router();

workerCrudRouter.delete("/:id", deleteWorker);
