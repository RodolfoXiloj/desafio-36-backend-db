import { Request, Response } from "express";
import sequelize from "../config/db";
import { QueryTypes } from "sequelize";

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

export const getAllCategorias = async (req: Request, res: Response) => {
  try {
    const categorias = await sequelize.query(
      `SELECT * FROM vw_CategoriaProductos`,
      { type: QueryTypes.SELECT }
    );
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener categorías" });
  }
};

export const getCategoriaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [categoria] = await sequelize.query(
      `SELECT * FROM vw_CategoriaProductos WHERE id_categoria_productos = :id`,
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );

    if (!categoria) return res.status(404).json({ error: "Categoría no encontrada" });

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar categoría" });
  }
};
