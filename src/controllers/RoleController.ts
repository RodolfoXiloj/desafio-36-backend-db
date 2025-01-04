import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import sequelize from "../config/db";

// Obtener todos los roles
export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await sequelize.query(
      `SELECT * FROM vw_Roles`,
      { type: QueryTypes.SELECT }
    );
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los roles" });
  }
};

// Obtener un rol por ID
export const getRoleById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [role] = await sequelize.query(
      `SELECT * FROM vw_Roles WHERE id_rol = :id`,
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );
    
    if (!role) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el rol" });
  }
};

// Crear un nuevo rol
/* export const createRole = async (req: Request, res: Response) => {
  const { nombre } = req.body;
  try {
    const role = await Role.create({ nombre });
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el rol" });
  }
}; */

// Actualizar un rol existente
/* export const updateRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }
    role.nombre = nombre;
    await role.save();
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el rol" });
  }
}; */

// Eliminar (desactivar) un rol
/* export const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const role = await Role.findByPk(id);
    if (!role) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }
    await role.destroy();
    res.json({ message: "Rol eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el rol" });
  }
};
 */