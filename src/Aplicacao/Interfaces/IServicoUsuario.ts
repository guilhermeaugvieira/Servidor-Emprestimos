import { LeanDocument } from "mongoose";

interface IServicoUsuario{
  ObterTodosUsuarios(): Promise<LeanDocument<any>[] | null>;

  AdicionarUsuario(email: string, nome: string, cpf: string, senha: string): Promise<any>;

  RemoverUsuario(idUsuario: string) : Promise<any>;

  AtualizarSenha(idUsuario: string, senha: string) : Promise<any>;

  HabilitarUsuario(idUsuario: string) : Promise<Response>;

  Login(cpf: string, senha: string): Promise<any>;
}

export { IServicoUsuario };