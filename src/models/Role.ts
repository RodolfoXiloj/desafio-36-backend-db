import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Role extends Model {}
Role.init(
  {
    id_rol: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "Rol", tableName: "Rol", timestamps: false }
);

export default Role;
