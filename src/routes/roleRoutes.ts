import { Router } from "express";
import {
  getAllRoles,
  getRoleById,
/*   createRole,
  deleteRole, */
} from "../controllers/RoleController";
import authMiddleware from "../middleware/auth";
import { roleMiddleware } from "../middleware/validateRol";

const router = Router();

// Rutas para roles
router.get("/", authMiddleware, roleMiddleware(1), getAllRoles); // Obtener todos los roles
router.get("/:id", authMiddleware, roleMiddleware(1), getRoleById); // Obtener un rol por ID
/* router.post("/", createRole); // Crear un nuevo rol
/* router.put("/:id", updateRole); // Actualizar un rol
router.delete("/:id", deleteRole); // Eliminar un rol */

export default router;
