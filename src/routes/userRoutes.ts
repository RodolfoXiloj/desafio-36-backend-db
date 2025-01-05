import { Router } from "express";
import { createUser, getUsuarioById, updateUser } from "../controllers/UserController";
import authMiddleware from "../middleware/auth";
import { validateUser } from "../middleware/validateUser";


const router = Router();

// Rutas para usuarios
router.post("/", authMiddleware, validateUser, createUser); // Crear usuario
router.put("/:id_usuarios", authMiddleware, validateUser, updateUser); // Actualizar usuario
/* 
router.get("/", authMiddleware, getUs); */
router.get("/:id", authMiddleware, getUsuarioById);

export default router;
