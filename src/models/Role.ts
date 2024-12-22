import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import User from "./User";

class Role extends Model {}
Role.init(
  {
    id_rol: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "Rol", tableName: "Rol", timestamps: false }
);

// Relación entre Role y User
Role.hasMany(User, { foreignKey: "id_rol" });
User.belongsTo(Role, { foreignKey: "id_rol" });

export default Role;
