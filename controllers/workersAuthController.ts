import express, { Request, Response } from "express";
import { pool } from "../database/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secrets } from "../secrets";

//  create admins table
pool
  .connect()
  .then(() => {
    pool.query(`
        CREATE TABLE IF NOT EXISTS workers(
            id SERIAL PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(200) NOT NULL,
            role VARCHAR(10) DEFAULT 'worker',
            task_id INT DEFAULT NULL,
            FOREIGN KEY (task_id) REFERENCES tasks(id)
        )
    `);
  })
  .catch((err) => {
    console.log(`Error in creating workers table: ${err}`);
  });

//  register
export const workerRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password, task_id } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO workers (name, email, password, task_id) VALUES ($1,$2,$3,$4)`,
      [name, email, hashedPassword, task_id]
    );
    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.log(`Error in worker register: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

//  login
export const workerLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    const user = await pool.query(`SELECT * FROM workers WHERE email = $1`, [
      email,
    ]);
    if (!user) res.status(404).json({ message: "No worker found" });

    const currentUser = user.rows[0];
    const userPassword = currentUser.password;
    const passwordMatch = await bcrypt.compare(password, userPassword);
    if (!passwordMatch)
      res.status(400).json({ message: "The passwords do not match" });

    const token = jwt.sign({ id: currentUser.id }, secrets.jwt.secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    console.log(`Error in logging in: ${error}`);
  }
};
