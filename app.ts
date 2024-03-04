import express, { Request, Response } from "express";
import { pool } from "./database/db";

const app = express();

//  database connect
pool
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(`Error in connecting to the database: ${err}`));

app.listen(3000, () => console.log(`App is running on port 3000.`));
