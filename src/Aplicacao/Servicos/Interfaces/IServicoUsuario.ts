import { LeanDocument } from "mongoose";

interface IServicoUsuario{
  ObterTodosUsuarios(): Promise<LeanDocument<any>[] | null>;

  AdicionarUsuario(email: string, nome: string, cpf: string, senha: string): Promise<any>;

  RemoverUsuario(idUsuario: string) : Promise<any>;
}

export { IServicoUsuario };