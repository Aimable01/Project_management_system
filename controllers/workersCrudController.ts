import { Request, Response } from "express";
import { pool } from "../database/db";

export const deleteWorker = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id;
  try {
    await pool.query(`DELETE FROM workers WHERE id = ${id}`);
  } catch (error) {
    console.log(`Error in deleting the user: ${error}`);
    res.status(500).json({ message: "Internal server error." });
  }
};
