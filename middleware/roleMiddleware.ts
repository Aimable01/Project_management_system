import { Request, Response, NextFunction } from "express";
interface RequestExtended extends Request {
  user?: any;
}

export const isAdmin = (
  req: RequestExtended,
  res: Response,
  next: NextFunction
): void => {
  req.user = req.body;
  if (req.user.role === Roles.ADMIN) {
    next();
  } else {
    res.status(402).json({ message: "Not admin" });
  }
};

export const isWorker = (
  req: RequestExtended,
  res: Response,
  next: NextFunction
): void => {
  req.user = req.body;
  if (req.user.role === Roles.WORKER) {
    next();
  } else {
    res.status(402).json({ message: "Not a worker" });
  }
};
