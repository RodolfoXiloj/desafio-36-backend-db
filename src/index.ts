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
import clientRoutes from "./routes/customerRoutes";
import authRoutes from "./routes/authRoutes";
import rolesRoutes from "./routes/roleRoutes";
import cors from "cors";

const app = express();

// Configurar middleware de CORS
const corsOptions = {
  origin: ["https://9000-idx-front-desafio360-1735935942824.cluster-fnjdffmttjhy2qqdugh3yehhs2.cloudworkstations.dev"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};
/* app.use(cors(corsOptions)); */
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 

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
// Ruta de Roles
app.use("/api/roles", rolesRoutes)

// Sincronizar DB
sequelize.sync().then(() => console.log("Base de datos sincronizada"));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
