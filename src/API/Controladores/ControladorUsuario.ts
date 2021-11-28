import { Request, Response } from 'express';
import { ConexaoMongo } from '../../Infrastrutura/BaseDeDados/ConexaoMongo';
import { RepositorioUsuario } from '../../Dados/Repositorios/RepositorioUsuario';
import { ServicoUsuario } from '../../Aplicacao/Servicos/Implementacoes/ServicoUsuario';

class ControladorUsuario {
  conexao : ConexaoMongo = null;
  servicoUsuario : ServicoUsuario;
  
  constructor() {
    this.conexao = new ConexaoMongo();
    this.servicoUsuario = new ServicoUsuario();
  }

  ObterTodosUsuarios = async (req: Request, res: Response) : Promise<Response> => {  
    try {
      await this.conexao.conectar();

      const response = await this.servicoUsuario.ObterTodosUsuarios();

      await this.conexao.disconectar();

      return res.json(response);
    
    } catch (error) {
      return res.json(error);
    }
  }

  AdicionarUsuario = async (req: Request, res: Response) : Promise<Response> => {    
    const { email, nome, cpf, senha} = req.body;
    
    try {
      await this.conexao.conectar();

      const response = await this.servicoUsuario.AdicionarUsuario(email, nome, cpf, senha);

      await this.conexao.disconectar();

      return res.json(response);
    } catch(error) {
      return res.json(error);
    }
  }

  RemoverUsuario = async (req: Request, res: Response) : Promise<Response> => {
    try {
      await this.conexao.conectar();

      const response = "Ok";

      await this.conexao.disconectar();

      return res.json(response);
    } catch (error ) {
      return res.json(error);
    }
  }

  // StatusUsuario = async (req: Request, res: Response) : Promise<Response> => {
  //   try {
  //     await this.conexao.conectar();

  //     const response;

  //     await this.conexao.disconectar();

  //     return res.json(response);
  //   } catch (error ) {
  //     return res.json(error);
  //   }
  // }
}

export { ControladorUsuario };