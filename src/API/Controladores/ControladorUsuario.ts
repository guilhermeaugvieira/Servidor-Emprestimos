import { Request, Response } from 'express';
import { ConexaoMongo } from '../../Infrastrutura/BaseDeDados/ConexaoMongo';
import { inject, injectable } from 'tsyringe';
import { IServicoUsuario } from '../../Aplicacao/Servicos/Interfaces/IServicoUsuario';
import { IConexaoMongo } from '../../Infrastrutura/Interfaces/IConexaoMongo';
import { INotificador } from '../../Negocio/Interfaces/INotificador';

@injectable()
class ControladorUsuario {
  conexao : ConexaoMongo = null;
  
  constructor(
    @inject("ServicoUsuario") private _servicoUsuario: IServicoUsuario,
    @inject("ConexaoMongo") private _conexao: IConexaoMongo,
    @inject("Notificador") private _notificador: INotificador
  ) {
  }

  ObterTodosUsuarios = async (req: Request, res: Response) : Promise<Response> => {  
    try {
      await this._conexao.Conectar();

      const response = await this._servicoUsuario.ObterTodosUsuarios();

      await this._conexao.Disconectar();

      return res.json(response);
    
    } catch (error) {
      return res.json(error);
    }
  }

  AdicionarUsuario = async (req: Request, res: Response) : Promise<Response> => {    
    const { email, nome, cpf, senha} = req.body;
    
    try {
      await this._conexao.Conectar();

      const response = await this._servicoUsuario.AdicionarUsuario(email, nome, cpf, senha);

      await this._conexao.Disconectar();

      return res.json(response);
    } catch(error) {
      return res.json(error);
    }
  }

  RemoverUsuario = async (req: Request, res: Response) : Promise<Response> => {
    const { id } = req.params;
    
    try {
      await this._conexao.Conectar();

      const response = await this._servicoUsuario.RemoverUsuario(id);

      await this._conexao.Disconectar();

      return res.json(response);
    } catch (error) {
      return res.json(error);
    }
  }

  AtualizarSenha = async (req: Request, res: Response) : Promise<Response> => {
    try {
      await this._conexao.Conectar();



      await this._conexao.Disconectar();
    } catch (error) {
      return res.json(error);
    }
  }
}

export { ControladorUsuario };