import { Request, Response } from "express";
import sequelize from "../config/db";
import { QueryTypes } from "sequelize";

export const getAllStates = async (req: Request, res: Response) => {
  try {
    const states = await sequelize.query(
      `SELECT * FROM vw_Estados`,
      {
        type: QueryTypes.SELECT, // Define el tipo de consulta
      }
    );
    

    if (!states) return res.status(404).json({ error: "No se encontraron Estados" });

    res.json(states);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar Estados" });
  }
};

// Crear Estado
export const createState = async (req: Request, res: Response) => {
  const { nombre } = req.body;

  try {
    await sequelize.query(
      `EXEC sp_InsertarEstado 
        @nombre = :nombre`,
      {
        replacements: { nombre },
      }
    );
    res.status(201).json({ message: "Estado creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al insertar el estado" });
  }
};

// Actualizar Estado
export const updateState = async (req: Request, res: Response) => {
  const { idestados } = req.params;
  const { nombre } = req.body;

  try {
    await sequelize.query(
      `EXEC sp_ActualizarEstado 
        @idestados = :idestados,
        @nombre = :nombre`,
      {
        replacements: { idestados, nombre },
      }
    );
    res.status(200).json({ message: "Estado actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el estado" });
  }
};

