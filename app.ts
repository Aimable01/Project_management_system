import express, { Request, Response } from "express";
import { pool } from "./database/db";
import { authenticateToken } from "./middleware/adminTokenMiddleware";
import { adminAuthRoutes } from "./routes/adminAuthRoutes";
import { projectRouter } from "./routes/projectRoutes";
import { taskRouter } from "./routes/taskRoutes";
import { workerRoutes } from "./routes/workerAuthRoutes";
import { workerCrudRouter } from "./routes/workersCrudRoutes";

const app = express();
app.use(express.json());

//  routes
app.use("/admin/auth", adminAuthRoutes);
app.use("/projects", authenticateToken, projectRouter);
app.use("/tasks", taskRouter);
app.use("/worker/auth", workerRoutes);
app.use("/workerCrud", workerCrudRouter);

//  database connect
pool
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(`Error in connecting to the database: ${err}`));

app.listen(3000, () => console.log(`App is running on port 3000.`));
