import { Request, Response } from "express";
import sequelize from "../config/db";
import Customer from "../models/Customer";

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

export const getAllClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await Customer.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener clientes" });
  }
};

export const getClienteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cliente = await Customer.findByPk(id);

    if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });

    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar cliente" });
  }
};

/* export const disableCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cliente = await Customer.findByPk(id);

    if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });

    cliente.id_estados = 2; // 2 = Inactivo
    await cliente.save();

    res.json({ message: "Cliente inhabilitado correctamente", cliente });
  } catch (error) {
    res.status(500).json({ error: "Error al inhabilitar cliente" });
  }
}; */
