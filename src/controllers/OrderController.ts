import { Request, Response } from "express";
import sequelize from "../config/db";
import { QueryTypes } from "sequelize";

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

export const getAllOrdenes = async (req: Request, res: Response) => {
  try {
    const ordenes = await sequelize.query(
      `SELECT * FROM vw_Ordenes`,
      { type: QueryTypes.SELECT }
    );
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener órdenes" });
  }
};

export const getOrdenById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [orden] = await sequelize.query(
      `SELECT * FROM vw_Ordenes WHERE id_orden = :id`,
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );

    if (!orden) return res.status(404).json({ error: "Orden no encontrada" });

    const detalles = await sequelize.query(
      `SELECT * FROM vw_OrdenDetalles WHERE id_orden = :id`,
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );

    if (!orden) return res.status(404).json({ error: "Orden no encontrada" });

    res.json({ orden, detalles });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la orden" });
  }
};
