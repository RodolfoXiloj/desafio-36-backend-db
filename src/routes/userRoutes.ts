import { Router } from "express";
import { createUser, getUsuarioById, updateUser } from "../controllers/UserController";
import authMiddleware from "../middleware/auth";
import { validateUser } from "../middleware/validateUser";
import { getActiveProducts } from "../controllers/ProductController";

const router = Router();

// Rutas para usuarios
router.post("/", authMiddleware, validateUser, createUser); // Crear usuario
router.put("/:id_usuarios", authMiddleware, validateUser, updateUser); // Actualizar usuario

router.get("/", authMiddleware, getActiveProducts);
router.get("/:id", authMiddleware, getUsuarioById);

export default router;
