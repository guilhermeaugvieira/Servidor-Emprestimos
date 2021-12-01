import { LeanDocument } from "mongoose";
import { RepositorioEmprestimo } from "../../Dados/Repositorios/RepositorioEmprestimo";
import { RepositorioUsuario } from "../../Dados/Repositorios/RepositorioUsuario";
import { IServicoUsuario } from "../Interfaces/IServicoUsuario";

class ServicoUsuario implements IServicoUsuario{

  constructor(){}
  
  async ObterTodosUsuarios(): Promise<LeanDocument<any>[] | null> {
    return await RepositorioUsuario.find({});
  }

  async ObterUsuarioPorId(id: string): Promise<LeanDocument<any>[] | null> {
    const usuario = await RepositorioUsuario.findById(id);

    if (usuario === null) {
      throw new Error("Não foi possivel encontrar o usuario com o id informado");
    }

    return usuario;
  }
  
  async AdicionarUsuario(email: string, nome: string, cpf: string, senha: string): Promise<any> {
    const usuarioAdicionado = {
      Email: email,
      Nome: nome,
      Cpf: cpf,
      Senha: senha,
      Habilitado: false,
    }

    const contador = await RepositorioUsuario.countDocuments({ Nome: nome, Cpf: cpf});

    if (contador > 0) {
      throw new Error("Usuário já cadastrado")
    }
    
    const novoUsuario = await RepositorioUsuario.create(usuarioAdicionado);

    return novoUsuario;
  }

  async Login(cpf: string, senha: string): Promise<any> {
    
    const usuario = await RepositorioUsuario.findOne({ Cpf: cpf, Senha: senha });

    if (usuario.length === 0 ) {
      throw new Error("CPF ou Senha inválido");
    }

    if (usuario.Habilitado === false) {
      throw new Error("Usuário desabilitado");
    }

    const { Cpf, Nome, Email, _id} = usuario;

    return {
      Id: _id,
      Cpf,
      Nome,
      Email
    };
  }

  async RemoverUsuario(idUsuario: string) : Promise<any> {
    const contadorEmprestimos = await RepositorioEmprestimo.countDocuments({ Id_Usuario: idUsuario});
    
    if (contadorEmprestimos > 0) {
      throw new Error("Usuário possui emprestimos");
    
    }

    const usuarioRemovido = await RepositorioUsuario.deleteOne({_id: idUsuario});

    return usuarioRemovido.deletedCount === 1 ? "Usuario removido com sucesso" : "Não foi encontrado usuário com esse id";
  }

  async AtualizarSenha(idUsuario: string, senha: string) : Promise<any> {
      
    const dadosUsuario = await RepositorioUsuario.findById(idUsuario);

    if (dadosUsuario === null) {
      throw new Error("Usuário não encontrado");
    }

    dadosUsuario.Senha = senha;

    const dadosAtualizados = await RepositorioUsuario.updateOne(dadosUsuario);

    return dadosAtualizados.modifiedCount > 0;
  }

  async HabilitarUsuario(idUsuario: string) : Promise<any> {
    const dadosUsuario = await RepositorioUsuario.findById(idUsuario);

    if (dadosUsuario === null) {
      throw new Error("Usuário não encontrado");
    }

    dadosUsuario.Habilitado = true;

    const dadosAtualizados = await RepositorioUsuario.updateOne(dadosUsuario);

    return dadosAtualizados.modifiedCount > 0;
  }
}

export { ServicoUsuario }