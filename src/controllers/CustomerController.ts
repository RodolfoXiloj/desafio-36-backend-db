import { Request, Response } from "express";
import sequelize from "../config/db";
import { QueryTypes } from "sequelize";

export const createClient = async (req: Request, res: Response) => {
  const { razon_social, nombre_comercial, direccion_entrega, telefono, email } = req.body;

  try {
    const result = await sequelize.query(
      `DECLARE @id_cliente INT;
       EXEC sp_InsertarCliente 
         @razon_social = :razon_social,
         @nombre_comercial = :nombre_comercial,
         @direccion_entrega = :direccion_entrega,
         @telefono = :telefono,
         @email = :email,
         @id_cliente = @id_cliente OUTPUT;
       SELECT @id_cliente AS id_cliente;`,
      {
        replacements: {
          razon_social,
          nombre_comercial,
          direccion_entrega,
          telefono,
          email,
        },
        type: QueryTypes.SELECT,
      }
    );

    // Obtener el id_cliente de la respuesta
    const id_cliente = result[0]["id_cliente"]; // El id devuelto por el procedimiento
    console.log(id_cliente)
    if (!id_cliente) {
      return res.status(400).json({ error: "No se pudo obtener el ID del cliente creado" });
    }

    res.json({
      message: "Cliente creado exitosamente",
      id_cliente: id_cliente,  // Retorna el id_cliente en la respuesta
    });
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
    const clientes = await sequelize.query(
      `SELECT * FROM vw_Clientes`,
      { type: QueryTypes.SELECT }
    );
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener clientes" });
  }
};

export const getClienteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [cliente] = await sequelize.query(
      `SELECT * FROM vw_Clientes WHERE id_clientes = :id`,
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );
    
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
