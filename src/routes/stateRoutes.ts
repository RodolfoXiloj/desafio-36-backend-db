import { Router } from "express";
import { createState, updateState } from "../controllers/StateController";
import authMiddleware from "../middleware/auth";
import { validateState } from "../middleware/validateState";

const router = Router();

// Rutas para estados
router.post("/", authMiddleware, validateState, createState); // Crear estado
router.put("/:idestados", authMiddleware, validateState, updateState); // Actualizar estado

export default router;
