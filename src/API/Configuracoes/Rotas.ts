import { Router, Request, Response } from "express";
import { RotasEmprestimo } from "../Rotas/RotasEmprestimo";
import { RotasParcela } from "../Rotas/RotasParcela";
import { RotasUsuario } from "../Rotas/RotasUsuario";
import { RotaSwagger } from "./Swagger";

const Rotas = Router();

Rotas.use("/api", RotasUsuario);
Rotas.use("/api", RotasEmprestimo);
Rotas.use("/api", RotasParcela);
Rotas.use("/api/swagger", RotaSwagger);

Rotas.get("/api", (req: Request, res: Response) => {
  res.send("API funcionando corretamente");
});

export { Rotas };