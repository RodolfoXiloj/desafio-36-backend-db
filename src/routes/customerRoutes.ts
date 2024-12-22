import { Router } from "express";
import { createClient, getAllClientes, getClienteById, updateClient } from "../controllers/CustomerController";
import authMiddleware from "../middleware/auth";

const router = Router();

// Rutas de clientes
router.post("/", authMiddleware, createClient); // Crear cliente
router.put("/:idClientes", authMiddleware, updateClient); // Actualizar cliente

router.get("/", authMiddleware, getAllClientes);
router.get("/:id", authMiddleware, getClienteById);

export default router;
