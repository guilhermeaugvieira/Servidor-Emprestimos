import { Router, Request, Response } from "express";
import { RotasUsuario } from "../Rotas/RotasUsuario";

const Rotas = Router();

Rotas.use("/api/usuario", RotasUsuario);

Rotas.get("/api", (req: Request, res: Response) => {
  res.send("API funcionando corretamente");
});

export { Rotas };