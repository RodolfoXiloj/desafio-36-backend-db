import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import User from "./User"; // Importamos la relación con User
import State from "./State"; // Importamos la relación con State
import OrderDetail from "./OrderDetail";

class Order extends Model {}

Order.init(
  {
    id_orden: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_usuarios: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id_usuarios",
      },
    },
    id_estados: {
      type: DataTypes.INTEGER,
      references: {
        model: State,
        key: "id_estados",
      },
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    nombre_completo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(545),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    correo_electronico: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    fecha_entrega: {
      type: DataTypes.DATE,
    },
    total_orden: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Orden",
    timestamps: false,
  }
);
// Relación entre Order y User
Order.belongsTo(User, { foreignKey: "id_usuarios" });
User.hasMany(Order, { foreignKey: "id_usuarios" });

// Relación entre Order y State
Order.belongsTo(State, { foreignKey: "id_estados" });
State.hasMany(Order, { foreignKey: "id_estados" });

// Relación entre Order y OrderDetail
Order.hasMany(OrderDetail, { foreignKey: "id_orden" });
OrderDetail.belongsTo(Order, { foreignKey: "id_orden" });

export default Order;
