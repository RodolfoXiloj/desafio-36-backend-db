import { Router } from "express";
import { createCategory, getAllCategorias, getCategoriaById, updateCategory } from "../controllers/CategoryController";
import authMiddleware from "../middleware/auth";
import { validateCategory } from "../middleware/validateCategory";

const router = Router();

// Rutas para categorías de productos
router.post("/", authMiddleware, validateCategory, createCategory); // Crear categoría
router.put("/:idCategoriaProductos", authMiddleware, validateCategory, updateCategory); // Actualizar categoría

router.get("/", authMiddleware, getAllCategorias);
router.get("/:id", authMiddleware, getCategoriaById);

export default router;
