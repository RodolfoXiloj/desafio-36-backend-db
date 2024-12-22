import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Estate extends Model {}
Estate.init(
  {
    id_estados: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "Estado", tableName: "Estados", timestamps: false }
);

export default Estate;
