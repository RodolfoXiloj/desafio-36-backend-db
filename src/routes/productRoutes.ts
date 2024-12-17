import { Router } from "express";
import { createProduct, updateProduct } from "../controllers/ProductController";
import authMiddleware from "../middleware/auth";
import { validateProduct } from "../middleware/validateProduct";

const router = Router();

// Rutas para productos
router.post("/", authMiddleware, validateProduct, createProduct); // Crear producto
router.put("/:idProductos", authMiddleware, validateProduct, updateProduct); // Actualizar producto

export default router;
