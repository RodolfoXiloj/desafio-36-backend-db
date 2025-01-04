import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { QueryTypes } from "sequelize";

import sequelize from "../config/db";

export const login = async (req: Request, res: Response) => {
  try {
    const { correo_electronico, password } = req.body;
    

    // Verificar si el usuario existe
    const [user] = await sequelize.query(
      `SELECT id_usuarios, correo_electronico, password, nombre_completo 
       FROM vw_Usuarios 
       WHERE correo_electronico = :correo_electronico`,
      {
        replacements: { correo_electronico },
        type: QueryTypes.SELECT,
      }
    );
    console.log(user)
    //const hashedPassword = await hash(password, 10);
    /* if (!user || !(await compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    } */

    // Generar JWT con expiración de 24 horas
    const token = ""/* jwt.sign(
      { id_usuarios: user.id_usuarios, correo_electronico: user.correo_electronico, id_rol: user.id_rol },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h", algorithms: ["HS256"]}
    ); */

    res.status(200).json({ token, message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el login" });
  }
};
