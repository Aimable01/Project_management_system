import { Pool } from "pg";
import { secrets } from "../secrets";

export const pool = new Pool({
  user: secrets.db.user,
  host: secrets.db.host,
  database: secrets.db.database,
  password: secrets.db.password,
  port: secrets.db.port,
});
