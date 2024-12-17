import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (requiredRole: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    
    if (!user) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    if (user.role > requiredRole) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    next();
  };
};
