import { Request, Response } from "express";
import { pool } from "../database/db";

//  create project table
pool
  .connect()
  .then(() => {
    pool.query(`
        CREATE TABLE IF NOT EXISTS projects(
            id SERIAL PRIMARY KEY,
            title VARCHAR(50) UNIQUE NOT NULL,
            description TEXT NOT NULL,
            start_date DATE DEFAULT CURRENT_DATE,
            end_date DATE NOT NULL
        )
    `);
  })
  .catch((err) => console.log(`Error in creating projects table: ${err}`));

//  create a project
export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description, end_date } = req.body;
  try {
    await pool.query(
      `INSERT INTO projects (title, description, end_date) VALUES ($1,$2,$3)`,
      [title, description, end_date]
    );
    res.status(200).json({ message: "Project created successfully." });
  } catch (error) {
    console.log(`Error in creating project: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

//  update a project
export const updateProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const projectId = req.params.id;
  const { title, description, end_date } = req.body;
  try {
    await pool.query(
      `UPDATE projects SET title = $1, description = $2, end_date = $3 WHERE id = ${projectId}`,
      [title, description, end_date]
    );
    res.status(200).json({ message: "Updated project successfully" });
  } catch (error) {
    console.log(`Error in updating the project: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

//   delete a project
export const deleteProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const projectId = req.params.id;
  try {
    await pool.query(`DELETE FROM projects WHERE id = ${projectId}`);
    res.status(200).json({ message: "Deleted project successfully" });
  } catch (error) {
    console.log(`Error in deleting project: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
