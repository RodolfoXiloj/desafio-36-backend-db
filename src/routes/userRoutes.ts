import { Router } from "express";
import { createUser, getAllUsers, getUsuarioById, updateUser } from "../controllers/UserController";
import authMiddleware from "../middleware/auth";
import { validateUser } from "../middleware/validateUser";


const router = Router();

// Rutas para usuarios
router.post("/", authMiddleware, validateUser, createUser); // Crear usuario
router.put("/:id_usuarios", authMiddleware, validateUser, updateUser); // Actualizar usuario

router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUsuarioById);

export default router;
