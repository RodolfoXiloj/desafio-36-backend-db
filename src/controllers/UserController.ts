import bcrypt  from "bcryptjs";
import { Request, Response } from "express";
import sequelize from "../config/db";

// Crear Usuario
export const createUser = async (req: Request, res: Response) => {
  const {
    id_rol,
    id_estados,
    correo_electronico,
    nombre_completo,
    password,
    telefono,
    fecha_nacimiento,
    id_clientes,
  } = req.body;

  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    await sequelize.query(
      `EXEC sp_InsertarUsuario 
        @id_rol = :id_rol,
        @id_estados = :id_estados,
        @correo_electronico = :correo_electronico,
        @nombre_completo = :nombre_completo,
        @password = :password,
        @telefono = :telefono,
        @fecha_nacimiento = :fecha_nacimiento,
        @id_clientes = :id_clientes`,
      {
        replacements: {
          id_rol,
          id_estados,
          correo_electronico,
          nombre_completo,
          password: hashedPassword,
          telefono,
          fecha_nacimiento,
          id_clientes,
        },
      }
    );

    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al insertar el usuario" });
  }
};

// Actualizar Usuario
export const updateUser = async (req: Request, res: Response) => {
  const { id_usuarios } = req.params;
  const {
    id_rol,
    id_estados,
    correo_electronico,
    nombre_completo,
    password,
    telefono,
    fecha_nacimiento,
    id_clientes,
  } = req.body;

  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    await sequelize.query(
      `EXEC sp_ActualizarUsuario 
        @id_usuarios = :id_usuarios,
        @id_rol = :id_rol,
        @id_estados = :id_estados,
        @correo_electronico = :correo_electronico,
        @nombre_completo = :nombre_completo,
        @password = :password,
        @telefono = :telefono,
        @fecha_nacimiento = :fecha_nacimiento,
        @id_clientes = :id_clientes`,
      {
        replacements: {
          id_usuarios,
          id_rol,
          id_estados,
          correo_electronico,
          nombre_completo,
          password: hashedPassword,
          telefono,
          fecha_nacimiento,
          id_clientes,
        },
      }
    );

    res.status(200).json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};
