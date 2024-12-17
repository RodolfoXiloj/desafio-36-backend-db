import { Request, Response } from "express";
import sequelize from "../config/db";

export const createClient = async (req: Request, res: Response) => {
  const { razon_social, nombre_comercial, direccion_entrega, telefono, email } = req.body;

  try {
    await sequelize.query(
      `EXEC sp_InsertarCliente 
        @razon_social = :razon_social,
        @nombre_comercial = :nombre_comercial,
        @direccion_entrega = :direccion_entrega,
        @telefono = :telefono,
        @email = :email`,
      {
        replacements: {
          razon_social,
          nombre_comercial,
          direccion_entrega,
          telefono,
          email,
        },
      }
    );

    res.status(201).json({ message: "Cliente creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el cliente" });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  const { idClientes } = req.params;
  const { razon_social, nombre_comercial, direccion_entrega, telefono, email } = req.body;

  try {
    await sequelize.query(
      `EXEC sp_ActualizarCliente 
        @idClientes = :idClientes,
        @razon_social = :razon_social,
        @nombre_comercial = :nombre_comercial,
        @direccion_entrega = :direccion_entrega,
        @telefono = :telefono,
        @email = :email`,
      {
        replacements: {
          idClientes,
          razon_social,
          nombre_comercial,
          direccion_entrega,
          telefono,
          email,
        },
      }
    );

    res.status(200).json({ message: "Cliente actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el cliente" });
  }
};
