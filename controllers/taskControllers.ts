import { Request, Response } from "express";
import { pool } from "../database/db";

//  create project table
pool
  .connect()
  .then(() => {
    pool.query(`
        CREATE TABLE IF NOT EXISTS tasks(
            id SERIAL PRIMARY KEY,
            title VARCHAR(50) UNIQUE NOT NULL,
            deadline DATE NOT NULL,
            project_id INT,
            FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
        )
    `);
  })
  .catch((err) => console.log(`Error in creating tasks table: ${err}`));

//  create a project
export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, deadline, project_id } = req.body;
  try {
    await pool.query(
      `INSERT INTO tasks (title, deadline, project_id) VALUES ($1,$2,$3)`,
      [title, deadline, project_id]
    );
    res.status(200).json({ message: "Task created successfully." });
  } catch (error) {
    console.log(`Error in creating task: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

//  update a project
export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const taskId = req.params.id;
  const { title, deadline, project_id } = req.body;
  try {
    await pool.query(
      `UPDATE tasks SET title = $1, deadline = $2, project_id = $3 WHERE id = ${taskId}`,
      [title, deadline, project_id]
    );
    res.status(200).json({ message: "Updated project successfully" });
  } catch (error) {
    console.log(`Error in updating the task: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

//   delete a project
export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const taskId = req.params.id;
  try {
    await pool.query(`DELETE FROM tasks WHERE id = ${taskId}`);
    res.status(200).json({ message: "Deleted project successfully" });
  } catch (error) {
    console.log(`Error in deleting task: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
