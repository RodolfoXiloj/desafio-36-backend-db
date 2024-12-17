import { Request, Response } from "express";
import sequelize from "../config/db";

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
