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
        CREATE TABLE IF NOT EXISTS admins(
            id SERIAL PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(200) NOT NULL,
            role VARCHAR(10) DEFAULT 'admin'
        )
    `);
  })
  .catch((err) => {
    console.log(`Error in creating admins table: ${err}`);
  });

//  register
export const adminRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO admins (name, email, password) VALUES ($1,$2,$3)`,
      [name, email, hashedPassword]
    );
    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.log(`Error in admin register: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

//  login
export const adminLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password } = req.body;
  try {
    const user = await pool.query(`SELECT * FROM admins WHERE email = $1`, [
      email,
    ]);
    if (!user) res.status(404).json({ message: "No user found" });

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
