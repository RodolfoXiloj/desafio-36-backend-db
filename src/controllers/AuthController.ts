import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { QueryTypes } from "sequelize";

import sequelize from "../config/db";

interface User {
  id_usuarios: number;
  correo_electronico: string;
  nombre_completo: string;
  password: string;
  id_rol: number;
}

export const login = async (req: Request, res: Response) => {
  try {
    const { correo_electronico, password } = req.body;

    // Verificar si el usuario existe
    const [user] = await sequelize.query<User>(
      `SELECT id_usuarios, correo_electronico, nombre_completo, password, id_rol, id_estados, telefono, fecha_nacimiento, id_clientes
       FROM vw_Usuarios 
       WHERE correo_electronico = :correo_electronico`,
      {
        replacements: { correo_electronico },
        type: QueryTypes.SELECT,
      }
    );

    // Si el usuario no existe, devolver error
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Verificar la contraseña
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generar JWT con expiración de 24 horas
    const token = jwt.sign(
      { id_usuarios: user.id_usuarios, correo_electronico: user.correo_electronico, id_rol: user.id_rol },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h", algorithm: "HS256" }
    );

    // Enviar respuesta exitosa
    res.status(200).json({ token, message: "Inicio de sesión exitoso", user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el login" });
  }
};