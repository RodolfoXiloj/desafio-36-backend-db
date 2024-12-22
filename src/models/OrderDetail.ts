import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import Order from "./Order"; // Importamos la relación con Order
import Product from "./Product"; // Importamos la relación con Product

class OrderDetail extends Model {}

OrderDetail.init(
  {
    id_orden_detalles: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_orden: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: "id_orden",
      },
      allowNull: false,
    },
    id_productos: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id_productos",
      },
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "OrdenDetalles",
    timestamps: false,
  }
);

// Relación entre OrderDetail y Product
OrderDetail.belongsTo(Product, { foreignKey: "id_productos" });
Product.hasMany(OrderDetail, { foreignKey: "id_productos" });

export default OrderDetail;
