import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Access-X")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Acceso denegado. Token faltante." });
  }

  console.log();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string,  {algorithms: ["HS256"]});
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error)
    res.status(403).json({ error: "Token inválido o expirado" });
  }
};

export default authMiddleware;
