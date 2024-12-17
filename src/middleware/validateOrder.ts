import { Request, Response, NextFunction } from "express";

export const validateOrder = (req: Request, res: Response, next: NextFunction) => {
  const { usuarios_idusuarios, nombre_completo, direccion, telefono, detalles } = req.body;

  if (!usuarios_idusuarios || !nombre_completo || !direccion || !telefono) {
    return res
      .status(400)
      .json({ error: "Los campos 'usuarios_idusuarios', 'nombre_completo', 'direccion' y 'telefono' son obligatorios" });
  }

  if (!Array.isArray(detalles) || detalles.length === 0) {
    return res.status(400).json({ error: "La orden debe incluir al menos un detalle" });
  }

  next();
};
