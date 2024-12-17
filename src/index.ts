/* import express from 'express';
const app = express();

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
 */
import express from "express";
import bodyParser from "body-parser";
import productRoutes from "./routes/productRoutes";
import sequelize from "./config/db";
import categoryRoutes from "./routes/categoryRoutes";
import stateRoutes from "./routes/stateRoutes";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import clientRoutes from "./routes/clientRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API Desafio 360");
});

// Ruta Auth
app.use("/api/auth", authRoutes);

// Rutas Productos
app.use("/api/productos", productRoutes);
// Rutas de Categorias
app.use("/api/categorias", categoryRoutes);
// Rutas de Estados
app.use("/api/estados", stateRoutes);
// Rutas de Usuarios
app.use("/api/usuarios", userRoutes);
// Rutas de Ordenes
app.use("/api/ordenes", orderRoutes);
// Rutas de Clientes
app.use("/api/clientes", clientRoutes);

// Sincronizar DB
sequelize.sync().then(() => console.log("Base de datos sincronizada"));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
