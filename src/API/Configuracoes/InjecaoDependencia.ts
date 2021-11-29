import { container } from "tsyringe";

import { INotificador } from "../../Negocio/Interfaces/INotificador";
import { Notificador } from "../../Negocio/Implementacoes/Notificador";

import { IServicoUsuario } from "../../Aplicacao/Servicos/Interfaces/IServicoUsuario";
import { ServicoUsuario } from "../../Aplicacao/Servicos/Implementacoes/ServicoUsuario";

import { IConexaoMongo } from "../../Infrastrutura/Interfaces/IConexaoMongo";
import { ConexaoMongo } from "../../Infrastrutura/BaseDeDados/ConexaoMongo";

container.register<INotificador>("Notificador", {
  useClass: Notificador
});

container.register<IServicoUsuario>("ServicoUsuario", {
  useClass: ServicoUsuario
});

container.register<IConexaoMongo>("ConexaoMongo", {
  useClass: ConexaoMongo
})