import { Request, Response } from "express";
import sequelize from "../config/db";
import Product from "../models/Product";

// Crear Producto
export const createProduct = async (req: Request, res: Response) => {
  const {
    id_productos,
    usuarios_idusuarios,
    nombre,
    marca,
    codigo,
    stock,
    id_estados,
    precio,
    foto,
  } = req.body;

  try {
    await sequelize.query(
      `EXEC sp_InsertarProducto 
        @CategoriaProductos_idCategoriaProductos = :CategoriaProductos_idCategoriaProductos,
        @usuarios_idusuarios = :usuarios_idusuarios,
        @nombre = :nombre,
        @marca = :marca,
        @codigo = :codigo,
        @stock = :stock,
        @id_estados = :id_estados,
        @precio = :precio,
        @foto = :foto`,
      {
        replacements: {
          id_productos,
          usuarios_idusuarios,
          nombre,
          marca,
          codigo,
          stock,
          id_estados,
          precio,
          foto,
        },
      }
    );
    res.status(201).json({ message: "Producto creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al insertar producto" });
  }
};

// Actualizar Producto
export const updateProduct = async (req: Request, res: Response) => {
  const { idProductos } = req.params;
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

  try {
    await sequelize.query(
      `EXEC sp_ActualizarProducto 
        @idProductos = :idProductos,
        @CategoriaProductos_idCategoriaProductos = :CategoriaProductos_idCategoriaProductos,
        @usuarios_idusuarios = :usuarios_idusuarios,
        @nombre = :nombre,
        @marca = :marca,
        @codigo = :codigo,
        @stock = :stock,
        @id_estados = :id_estados,
        @precio = :precio,
        @foto = :foto`,
      {
        replacements: {
          idProductos,
          CategoriaProductos_idCategoriaProductos,
          usuarios_idusuarios,
          nombre,
          marca,
          codigo,
          stock,
          id_estados,
          precio,
          foto,
        },
      }
    );
    res.status(200).json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

export const getActiveProducts = async (req: Request, res: Response) => {
  try {
    const productos = await Product.findAll({ where: { id_estados: 1 } }); // 1 = Activo
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos activos" });
  }
};
