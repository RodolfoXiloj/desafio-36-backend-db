import { Request, Response, NextFunction } from "express";

export const validateClient = (req: Request, res: Response, next: NextFunction) => {
  const { razon_social, nombre_comercial, direccion_entrega, telefono, email } = req.body;

  if (!razon_social || !nombre_comercial || !direccion_entrega || !telefono || !email) {
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios: razon_social, nombre_comercial, direccion_entrega, telefono, email" });
  }

  next();
};
