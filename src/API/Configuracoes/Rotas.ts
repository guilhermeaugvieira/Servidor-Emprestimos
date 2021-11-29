import { Router, Request, Response } from "express";
import { RotasUsuario } from "../Rotas/RotasUsuario";
import { RotaSwagger } from "./Swagger";

const Rotas = Router();

Rotas.use("/api/usuario", RotasUsuario);
Rotas.use("/api/swagger", RotaSwagger);

Rotas.get("/api", (req: Request, res: Response) => {
  res.send("API funcionando corretamente");
});

export { Rotas };