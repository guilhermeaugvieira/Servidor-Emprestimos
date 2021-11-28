import "reflect-metadata";
import dotenv from "dotenv";
import { Servidor } from "./Infrastrutura/Servidor/Servidor";

dotenv.config({
  path: "./src/API/Configuracoes/.env",
});

Servidor.listen(process.env.SERVER_PORT, () => {
  console.log(`API running at port ${process.env.SERVER_PORT}`);
});