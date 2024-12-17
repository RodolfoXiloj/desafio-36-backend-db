import { Request, Response, NextFunction } from "express";

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  const {
    CategoriaProductos_idCategoriaProductos,
    usuarios_idusuarios,
    nombre,
    marca,
    codigo,
    stock,
    id_estados,
    precio,
    foto,
  } = req.body;

  if (
    !CategoriaProductos_idCategoriaProductos ||
    !usuarios_idusuarios ||
    !nombre ||
    !marca ||
    !codigo ||
    stock === undefined ||
    !id_estados ||
    precio === undefined
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  next();
};