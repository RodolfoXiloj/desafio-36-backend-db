import { Request, Response } from "express";
import sequelize from "../config/db";

export const createOrderWithDetails = async (req: Request, res: Response) => {
  const { usuarios_idusuarios, id_estados, nombre_completo, direccion, telefono, correo_electronico, fecha_entrega, total_orden, detalles } = req.body;

  try {
    // Convertir la solicitud en un formato JSON para el procedimiento almacenado
    const jsonOrden = JSON.stringify({
      usuarios_idusuarios,
      id_estados,
      nombre_completo,
      direccion,
      telefono,
      correo_electronico,
      fecha_entrega,
      total_orden,
      detalles,
    });

    await sequelize.query(
      `EXEC sp_InsertarOrdenConDetalles @jsonOrden = :jsonOrden`,
      {
        replacements: { jsonOrden },
      }
    );

    res.status(201).json({ message: "Orden y detalles creados exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la orden con detalles" });
  }
};

export const updateOrderWithDetails = async (req: Request, res: Response) => {
  const { idOrden } = req.params;
  const { usuarios_idusuarios, id_estados, nombre_completo, direccion, telefono, correo_electronico, fecha_entrega, total_orden, detalles } = req.body;

  try {
    // Convertir la solicitud en un formato JSON para el procedimiento almacenado
    const jsonOrden = JSON.stringify({
      usuarios_idusuarios,
      id_estados,
      nombre_completo,
      direccion,
      telefono,
      correo_electronico,
      fecha_entrega,
      total_orden,
      detalles,
    });

    await sequelize.query(
      `EXEC sp_ActualizarOrdenConDetalles @idOrden = :idOrden, @jsonOrden = :jsonOrden`,
      {
        replacements: { idOrden, jsonOrden },
      }
    );

    res.status(200).json({ message: "Orden y detalles actualizados exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la orden con detalles" });
  }
};
