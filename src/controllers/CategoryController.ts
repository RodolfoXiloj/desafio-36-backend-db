import { Request, Response } from "express";
import sequelize from "../config/db";

// Crear Categoría de Producto
export const createCategory = async (req: Request, res: Response) => {
  const { usuarios_idusuarios, id_estados, nombre } = req.body;

  try {
    await sequelize.query(
      `EXEC sp_InsertarCategoriaProducto 
        @usuarios_idusuarios = :usuarios_idusuarios,
        @id_estados = :id_estados,
        @nombre = :nombre`,
      {
        replacements: {
          usuarios_idusuarios,
          id_estados,
          nombre,
        },
      }
    );
    res.status(201).json({ message: "Categoría creada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al insertar categoría" });
  }
};

// Actualizar Categoría de Producto
export const updateCategory = async (req: Request, res: Response) => {
  const { idCategoriaProductos } = req.params;
  const { usuarios_idusuarios, id_estados, nombre } = req.body;

  try {
    await sequelize.query(
      `EXEC sp_ActualizarCategoriaProducto 
        @idCategoriaProductos = :idCategoriaProductos,
        @usuarios_idusuarios = :usuarios_idusuarios,
        @id_estados = :id_estados,
        @nombre = :nombre`,
      {
        replacements: {
          idCategoriaProductos,
          usuarios_idusuarios,
          id_estados,
          nombre,
        },
      }
    );
    res.status(200).json({ message: "Categoría actualizada exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar categoría" });
  }
};
