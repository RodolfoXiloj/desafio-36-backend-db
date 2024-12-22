import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import User from "./User"; // Relación con Usuarios
import State from "./State"; // Relación con Estados
import Product from "./Product";

class CategoryProduct extends Model {}

CategoryProduct.init(
  {
    id_categoria_productos: {
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
      allowNull: false,
    },
    id_estados: {
      type: DataTypes.INTEGER,
      references: {
        model: State,
        key: "id_estados",
      },
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "CategoriaProductos",
    timestamps: false,
  }
);

// Relación entre CategoryProduct y User
CategoryProduct.belongsTo(User, { foreignKey: "id_usuarios" });
User.hasMany(CategoryProduct, { foreignKey: "id_usuarios" });

// Relación entre CategoryProduct y State
CategoryProduct.belongsTo(State, { foreignKey: "id_estados" });
State.hasMany(CategoryProduct, { foreignKey: "id_estados" });

// Relación entre CategoryProduct y Product
CategoryProduct.hasMany(Product, { foreignKey: "id_categoria_productos" });
Product.belongsTo(CategoryProduct, { foreignKey: "id_categoria_productos" });

export default CategoryProduct;
