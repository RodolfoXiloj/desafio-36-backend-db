import { Router } from "express";
import { createUser, updateUser } from "../controllers/UserController";
import authMiddleware from "../middleware/auth";
import { validateUser } from "../middleware/validateUser";

const router = Router();

// Rutas para usuarios
router.post("/", authMiddleware, validateUser, createUser); // Crear usuario
router.put("/:id_usuarios", authMiddleware, validateUser, updateUser); // Actualizar usuario

export default router;
