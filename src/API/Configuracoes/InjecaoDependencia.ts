import { container, Lifecycle } from "tsyringe";

import { IServicoUsuario } from "../../Aplicacao/Interfaces/IServicoUsuario";
import { ServicoUsuario } from "../../Aplicacao/Servicos/ServicoUsuario";

import { IConexaoMongo } from "../../Infrastrutura/Interfaces/IConexaoMongo";
import { ConexaoMongo } from "../../Infrastrutura/BaseDeDados/ConexaoMongo";

container.register<IServicoUsuario>("ServicoUsuario", 
  { useClass: ServicoUsuario },
  { lifecycle: Lifecycle.Singleton });

container.register<IConexaoMongo>("ConexaoMongo", 
  { useClass: ConexaoMongo },
  { lifecycle: Lifecycle.Singleton });