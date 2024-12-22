import { Router } from "express";
import {
  getAllRoles,
  getRoleById,
  createRole,
  deleteRole,
} from "../controllers/RoleController";

const router = Router();

// Rutas para roles
router.get("/", getAllRoles); // Obtener todos los roles
router.get("/:id", getRoleById); // Obtener un rol por ID
router.post("/", createRole); // Crear un nuevo rol
/* router.put("/:id", updateRole); // Actualizar un rol */
router.delete("/:id", deleteRole); // Eliminar un rol

export default router;
