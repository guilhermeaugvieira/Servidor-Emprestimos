import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();

import "./API/Configuracoes/InjecaoDependencia";
import { Servidor } from "./Infrastrutura/Servidor/Servidor";

Servidor.listen(process.env.SERVER_PORT, () => {
  console.log(`API running at port ${process.env.SERVER_PORT}`);
});