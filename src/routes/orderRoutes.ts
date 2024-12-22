import { Router } from "express";
import { createOrderWithDetails, getAllOrdenes, getOrdenById, updateOrderWithDetails } from "../controllers/OrderController";
import authMiddleware from "../middleware/auth";
import { validateOrder } from "../middleware/validateOrder";

const router = Router();

// Rutas de ordenes
router.post("/", authMiddleware, validateOrder, createOrderWithDetails); // Crear orden con detalles
router.put("/:idOrden", authMiddleware, validateOrder, updateOrderWithDetails); // Actualizar orden con detalles

router.get("/", authMiddleware, getAllOrdenes);
router.get("/:id", authMiddleware, getOrdenById);

export default router;
