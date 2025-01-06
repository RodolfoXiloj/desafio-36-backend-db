import bcrypt  from "bcryptjs";
import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
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

//Obtener todos los usuarios
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const usuarios = await sequelize.query(
      `SELECT * FROM vw_Usuarios`,
      {
        type: QueryTypes.SELECT, // Define el tipo de consulta
      }
    );
    

    if (!usuarios) return res.status(404).json({ error: "No se encontraron Usuarios" });

    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar usuario" });
  }
};
//

export const getUsuarioById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuario = await sequelize.query(
      `SELECT * FROM vw_Usuarios WHERE id_usuarios = :id`,
      {
        replacements: { id }, // Parámetro pasado de forma segura
        type: QueryTypes.SELECT, // Define el tipo de consulta
      }
    );
    

    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar usuario" });
  }
};

/* export const disableUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    usuario.id_estados = 2; // 2 = Inactivo
    await usuario.save();

    res.json({ message: "Usuario inhabilitado correctamente", usuario });
  } catch (error) {
    res.status(500).json({ error: "Error al inhabilitar usuario" });
  }
}; */


