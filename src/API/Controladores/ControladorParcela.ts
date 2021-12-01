import { Request, Response } from 'express';
import { container } from "tsyringe";
import { IServicoParcela } from "../../Aplicacao/Interfaces/IServicoParcela";
import { ServicoParcela } from "../../Aplicacao/Servicos/ServicoParcela";
import { ConexaoMongo } from "../../Infrastrutura/BaseDeDados/ConexaoMongo";
import { IConexaoMongo } from "../../Infrastrutura/Interfaces/IConexaoMongo";
import { RespostaErro } from '../../Negocio/Models/Comum/RespostaErro';
import { RespostaOk } from '../../Negocio/Models/Comum/RespostaOk';

class ControladorParcela {
  private _servicoParcela: IServicoParcela;
  private _conexao: IConexaoMongo;

  constructor() {
    this._servicoParcela = container.resolve(ServicoParcela);
    this._conexao = container.resolve(ConexaoMongo);
  }

  RegistrarPagamentoParcela = async (req: Request, res: Response) : Promise<Response> => {
    const  { idParcela } = req.params;
    
    try {
      await this._conexao.Conectar();

      const resposta = await this._servicoParcela.RegistrarPagamentoParcela(idParcela);

      await this._conexao.Disconectar();

      if (resposta.length === 0) return res.status(204).json();

      return res.status(200).json(new RespostaOk<Object>(resposta));
    
    } catch (error : any) {
      return res.json(new RespostaErro(error.message));
    }
  }

  ObterParcelasPorEmprestimo = async (req: Request, res: Response) : Promise<Response> => {
    const  { idEmprestimo } = req.params;
    
    try {
      await this._conexao.Conectar();

      const resposta = await this._servicoParcela.ObterParcelasPorEmprestimo(idEmprestimo);

      await this._conexao.Disconectar();

      if (resposta.length === 0) return res.status(204).json();

      return res.status(200).json(new RespostaOk<Object>(resposta));
    
    } catch (error : any) {
      return res.json(new RespostaErro(error.message));
    }
  }

  ObterParcelasPorId = async (req: Request, res: Response) : Promise<Response> => {
    const  { idParcela } = req.params;
    
    try {
      await this._conexao.Conectar();

      const resposta = await this._servicoParcela.ObterParcelaPorId(idParcela);

      await this._conexao.Disconectar();

      if (resposta.length === 0) return res.status(204).json();

      return res.status(200).json(new RespostaOk<Object>(resposta));
    
    } catch (error : any) {
      return res.json(new RespostaErro(error.message));
    }
  }

  ObterTodasParcelas = async (req: Request, res: Response) : Promise<Response> => {
    try {
      await this._conexao.Conectar();

      const resposta = await this._servicoParcela.ObterTodasParcelas();

      await this._conexao.Disconectar();

      if (resposta.length === 0) return res.status(204).json();

      return res.status(200).json(new RespostaOk<Object>(resposta));
    
    } catch (error : any) {
      return res.json(new RespostaErro(error.message));
    }
  }
}

export { ControladorParcela };