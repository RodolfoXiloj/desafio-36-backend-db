import { Request, Response, NextFunction } from "express";

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { correo_electronico, password, nombre_completo } = req.body;

  if (!correo_electronico || !password || !nombre_completo) {
    return res
      .status(400)
      .json({ error: "Los campos 'correo_electronico', 'password' y 'nombre_completo' son obligatorios" });
  }

  if (!correo_electronico.includes("@")) {
    return res.status(400).json({ error: "El correo electrónico no es válido" });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres" });
  }

  next();
};
