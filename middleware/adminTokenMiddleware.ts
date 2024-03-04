import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { secrets } from "../secrets";
import { Roles } from "../models/models";

interface RequestExtended extends Request {
  user?: any;
}

export const authenticateToken = (
  req: RequestExtended,
  res: Response,
  next: NextFunction
): void => {
  const authHead = req.headers["authorization"];
  const token = authHead && authHead.split(" ")[1];

  if (!token) res.status(404).json({ messsage: "No token found" });

  jwt.verify(token!, secrets.jwt.secretKey, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError")
        res.status(400).json({ message: "Token expired. Login again" });
      res.status(400).json({ message: "An error in verifying token: ", err });
    }
    req.user = user;
    next();
  });
};
