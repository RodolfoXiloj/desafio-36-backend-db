import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Customer extends Model {}
Customer.init(
  {
    id_clientes: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    razon_social: { type: DataTypes.STRING },
    nombre_comercial: { type: DataTypes.STRING },
    direccion_entrega: { type: DataTypes.STRING },
    telefono: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "Cliente", tableName: "Clientes", timestamps: false }
);

export default Customer;
