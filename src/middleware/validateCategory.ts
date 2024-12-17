import { Request, Response, NextFunction } from "express";

export const validateCategory = (req: Request, res: Response, next: NextFunction) => {
  const { usuarios_idusuarios, id_estados, nombre } = req.body;

  if (!usuarios_idusuarios || !id_estados || !nombre) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  next();
};
