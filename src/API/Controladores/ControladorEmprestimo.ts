import { Request, Response } from 'express';
import { container } from "tsyringe";
import { IServicoEmprestimo } from "../../Aplicacao/Interfaces/IServicoEmprestimo";
import { ServicoEmprestimo } from "../../Aplicacao/Servicos/ServicoEmprestimo";
import { ConexaoMongo } from "../../Infrastrutura/BaseDeDados/ConexaoMongo";
import { IConexaoMongo } from "../../Infrastrutura/Interfaces/IConexaoMongo";
import { RespostaErro } from "../../Negocio/Models/Comum/RespostaErro";
import { RespostaOk } from "../../Negocio/Models/Comum/RespostaOk";

class ControladorEmprestimo {
  private _servicoEmprestimo: IServicoEmprestimo;
  private _conexao: IConexaoMongo;
  
  constructor() {
    this._servicoEmprestimo = container.resolve(ServicoEmprestimo);
    this._conexao = container.resolve(ConexaoMongo);
  }

  ObterTodosEmprestimos = async (req: Request, res: Response) : Promise<Response> => {  
    try {
      await this._conexao.Conectar();

      const resposta = await this._servicoEmprestimo.ObterTodosEmprestimos();

      await this._conexao.Disconectar();

      if (resposta.length === 0) return res.status(204).json();

      return res.status(200).json(new RespostaOk<Object>(resposta));
    
    } catch (error : any) {
      return res.json(new RespostaErro(error.message));
    }
  }

  ObterEmprestimoPorId = async (req: Request, res: Response) : Promise<Response> => {  
    const { id: idEmprestimo} = req.params
    
    try {
      await this._conexao.Conectar();

      const resposta = await this._servicoEmprestimo.ObterEmprestimoPorId(idEmprestimo);

      await this._conexao.Disconectar();

      if (resposta.length === 0) return res.status(204).json();

      return res.status(200).json(new RespostaOk<Object>(resposta));
    
    } catch (error : any) {
      return res.json(new RespostaErro(error.message));
    }
  }

  ObterEmprestimoPorUsuario = async (req: Request, res: Response) : Promise<Response> => {  
    const { id: idUsuario} = req.params
    
    try {
      await this._conexao.Conectar();

      const resposta = await this._servicoEmprestimo.ObterEmprestimosPorUsuario(idUsuario);

      await this._conexao.Disconectar();

      if (resposta.length === 0) return res.status(204).json();

      return res.status(200).json(new RespostaOk<Object>(resposta));
    
    } catch (error : any) {
      return res.json(new RespostaErro(error.message));
    }
  }

  SolicitarEmprestimo = async (req: Request, res: Response) : Promise<Response> => {  
    const { idUsuario, montante, numeroPrestacoes } = req.body
    
    try {
      await this._conexao.Conectar();

      const resposta = await this._servicoEmprestimo.SolicitarEmprestimo(idUsuario, montante, numeroPrestacoes);

      await this._conexao.Disconectar();

      if (resposta.length === 0) return res.status(204).json();

      return res.status(200).json(new RespostaOk<Object>(resposta));
    
    } catch (error : any) {
      return res.json(new RespostaErro(error.message));
    }
  }


  AtualizarStatusEmprestimo = async (req: Request, res: Response) : Promise<Response> => {  
    const { statusEmprestimo } = req.body;
    const { id } = req.params;
    
    try {
      await this._conexao.Conectar();

      const resposta = await this._servicoEmprestimo.AtualizarStatusEmprestimo(id, statusEmprestimo);

      await this._conexao.Disconectar();

      if (resposta.length === 0) return res.status(204).json();

      return res.status(200).json(new RespostaOk<Object>(resposta));
    
    } catch (error : any) {
      return res.json(new RespostaErro(error.message));
    }
  }

}

export { ControladorEmprestimo }