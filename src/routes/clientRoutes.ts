import { Router } from "express";
import { createClient, updateClient } from "../controllers/ClientController";
import authMiddleware from "../middleware/auth";

const router = Router();

// Rutas de clientes
router.post("/", authMiddleware, createClient); // Crear cliente
router.put("/:idClientes", authMiddleware, updateClient); // Actualizar cliente

export default router;
