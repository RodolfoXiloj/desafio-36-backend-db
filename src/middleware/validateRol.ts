import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (requiredRole: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.query.role > requiredRole) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    next();
  };
};
