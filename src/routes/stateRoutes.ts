import { Router } from "express";
import { createState, getAllStates, updateState } from "../controllers/StateController";
import authMiddleware from "../middleware/auth";
import { validateState } from "../middleware/validateState";

const router = Router();

// Rutas para estados
router.post("/", authMiddleware, validateState, createState); // Crear estado
router.put("/:idestados", authMiddleware, validateState, updateState); // Actualizar estado

router.get("/", authMiddleware, getAllStates);

export default router;
