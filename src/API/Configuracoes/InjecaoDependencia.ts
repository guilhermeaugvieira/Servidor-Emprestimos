import { container, Lifecycle } from "tsyringe";

import { IServicoUsuario } from "../../Aplicacao/Interfaces/IServicoUsuario";
import { ServicoUsuario } from "../../Aplicacao/Servicos/ServicoUsuario";

import { IConexaoMongo } from "../../Infrastrutura/Interfaces/IConexaoMongo";
import { ConexaoMongo } from "../../Infrastrutura/BaseDeDados/ConexaoMongo";

import { IServicoEmprestimo } from "../../Aplicacao/Interfaces/IServicoEmprestimo";
import { ServicoEmprestimo } from "../../Aplicacao/Servicos/ServicoEmprestimo";

import { IServicoParcela } from "../../Aplicacao/Interfaces/IServicoParcela";
import { ServicoParcela } from "../../Aplicacao/Servicos/ServicoParcela";

container.register<IServicoUsuario>("ServicoUsuario", 
  { useClass: ServicoUsuario },
  { lifecycle: Lifecycle.ResolutionScoped });

  container.register<IServicoEmprestimo>("ServicoEmprestimo", 
  { useClass: ServicoEmprestimo },
  { lifecycle: Lifecycle.ResolutionScoped });

  container.register<IServicoParcela>("ServicoParcela", 
  { useClass: ServicoParcela },
  { lifecycle: Lifecycle.ResolutionScoped });

container.register<IConexaoMongo>("ConexaoMongo", 
  { useClass: ConexaoMongo },
  { lifecycle: Lifecycle.ResolutionScoped });