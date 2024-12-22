/* --Identificador Unico para la tabla usuarios
id_usuarios INT PRIMARY KEY IDENTITY(1,1),
--Referencia a la tabla rol
id_rol INT FOREIGN KEY REFERENCES rol(idrol),
--Referencia a la tabla estados
id_estados INT FOREIGN KEY REFERENCES estados(idestados),
correo_electronico VARCHAR(45) NOT NULL UNIQUE,
nombre_completo VARCHAR(100) NOT NULL,
password VARCHAR(45) NOT NULL,
telefono VARCHAR(45),
fecha_nacimiento DATE,
fecha_creacion DATETIME DEFAULT GETDATE(),
--Referencia a la tabla Clientes
id_clientes INT FOREIGN KEY REFERENCES Clientes(idClientes) */
/* mport { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

interface UserAttributes {
  id_usuarios: number;
  id_rol: number;
  id_estados: number;
  correo_electronico: string;
  nombre_completo: string;
  password: string;
  telefono?: string;
  fecha_nacimiento?: Date;
  fecha_creacion?: Date;
  id_clientes?: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id_usuarios"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id_usuarios!: number;
  public id_rol!: number;
  public id_estados!: number;
  public correo_electronico!: string;
  public nombre_completo!: string;
  public password!: string;
  public telefono?: string;
  public fecha_nacimiento?: Date;
  public fecha_creacion?: Date;
  public id_clientes?: number;
}

User.init(
  {
    id_usuarios: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_estados: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    correo_electronico: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    nombre_completo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    id_clientes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "Usuarios",
    timestamps: false,
  }
);

/* // Relaciones
User.belongsTo(Rol, { foreignKey: "id_rol" });
User.belongsTo(Estados, { foreignKey: "id_estados" });
User.belongsTo(Clientes, { foreignKey: "id_clientes" }); 

export default User;
 */

import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Cliente from "./Customer";
import Estado from "./State";
import Rol from "./Role";

class User extends Model {}
User.init(
  {
    id_usuarios: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_rol: { type: DataTypes.INTEGER, references: { model: Rol, key: "id_rol" } },
    id_estados: { type: DataTypes.INTEGER, references: { model: Estado, key: "id_estados" } },
    correo_electronico: { type: DataTypes.STRING, unique: true, allowNull: false },
    nombre_completo: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING },
    fecha_nacimiento: { type: DataTypes.DATE },
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    id_clientes: { type: DataTypes.INTEGER, references: { model: Cliente, key: "id_clientes" } },
  },
  { sequelize, modelName: "Usuario", tableName: "Usuarios", timestamps: false }
);

export default User;
