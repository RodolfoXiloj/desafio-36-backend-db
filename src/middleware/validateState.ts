import { Request, Response, NextFunction } from "express";

export const validateState = (req: Request, res: Response, next: NextFunction) => {
  const { nombre } = req.body;

  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    return res.status(400).json({ error: "El campo 'nombre' es obligatorio y debe ser una cadena válida" });
  }

  next();
};
