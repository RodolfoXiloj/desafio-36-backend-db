import express from "express";
import { login } from "../controllers/AuthController";

const router = express.Router();

// Ruta de inicio de sesión
router.post("/login", login);


export default router;
