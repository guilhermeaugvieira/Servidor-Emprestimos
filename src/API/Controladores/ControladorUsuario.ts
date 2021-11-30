import { Request, Response } from 'express';
import { ConexaoMongo } from '../../Infrastrutura/BaseDeDados/ConexaoMongo';
import { container, inject, injectable } from 'tsyringe';
import { IServicoUsuario } from '../../Aplicacao/Interfaces/IServicoUsuario';
import { IConexaoMongo } from '../../Infrastrutura/Interfaces/IConexaoMongo';
import { RespostaErro } from '../../Negocio/Models/Comum/RespostaErro';
import { RespostaOk } from '../../Negocio/Models/Comum/RespostaOk';
import { ServicoUsuario } from '../../Aplicacao/Servicos/ServicoUsuario';

class ControladorUsuario {
  conexao : ConexaoMongo = null;

  private _servicoUsuario: IServicoUsuario;
  private _conexao: IConexaoMongo;
  
  constructor() {
    this._servicoUsuario = container.resolve(ServicoUsuario);
    this._conexao = container.resolve(ConexaoMongo);
  }

  ObterTodosUsuarios = async (req: Request, res: Response) : Promise<Response> => {  
    try {
      await this._conexao.Conectar();

      const resposta = await this._servicoUsuario.ObterTodosUsuarios();

      await this._conexao.Disconectar();

      if (resposta.length === 0) return res.status(204).json();

      return res.status(200).json(new RespostaOk<Object>(resposta));
    
    } catch (error : any) {
      return res.json(new RespostaErro(error.message));
    }
  }

  AdicionarUsuario = async (req: Request, res: Response) : Promise<Response> => {    
    const { email, nome, cpf, senha} = req.body;
    
    try {
      await this._conexao.Conectar();

      const resposta = await this._servicoUsuario.AdicionarUsuario(email, nome, cpf, senha);

      await this._conexao.Disconectar();

      return res.status(200).json(new RespostaOk<Object>(resposta));

    } catch(error : any) {
      return res.json(new RespostaErro(error.message));
    }
  }

  Login = async (req: Request, res: Response) : Promise<Response> => {    
    const { cpf, senha} = req.body;
    
    try {
      await this._conexao.Conectar();

      const resposta = await this._servicoUsuario.Login(cpf, senha);

      await this._conexao.Disconectar();

      return res.status(200).json(new RespostaOk<Object>(resposta));
    } catch(error : any) {
      return res.json(new RespostaErro(error.message));
    }
  }

  RemoverUsuario = async (req: Request, res: Response) : Promise<Response> => {
    const { id } = req.params;
    
    try {
      await this._conexao.Conectar();

      const resposta = await this._servicoUsuario.RemoverUsuario(id);

      await this._conexao.Disconectar();

      return res.status(200).json(new RespostaOk<Object>(resposta));
    } catch (error : any) {
      return res.json(new RespostaErro(error.message));
    }
  }

  AtualizarSenha = async (req: Request, res: Response) : Promise<Response> => {
    const { senha } = req.body;
    const { id: idUsuario} = req.params
    
    try {
      await this._conexao.Conectar();

      const resposta = await this._servicoUsuario.AtualizarSenha(idUsuario, senha);

      await this._conexao.Disconectar();

      return res.status(200).json(new RespostaOk<Object>(resposta));
    } catch (error : any) {
      return res.json(new RespostaErro(error.message));
    }
  }


  HabilitarUsuario = async (req: Request, res: Response) : Promise<Response> => {
    const { id: idUsuario} = req.params
    
    try {
      await this._conexao.Conectar();

      const resposta = await this._servicoUsuario.HabilitarUsuario(idUsuario);

      await this._conexao.Disconectar();

      return res.status(200).json(new RespostaOk<Object>(resposta));
    } catch (error : any) {
      return res.json(new RespostaErro(error.message));
    }
  }
}

export { ControladorUsuario };