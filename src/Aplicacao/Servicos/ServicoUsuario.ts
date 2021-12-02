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

    if (usuario === null ) {
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

    if (usuarioRemovido.deletedCount === 0) {
      throw new Error("Não foi encontrado usuário com esse id");
    }

    return "Usuario removido com sucesso";
  }

  async AtualizarSenha(idUsuario: string, senha: string) : Promise<any> {
      
    const dadosUsuario = await RepositorioUsuario.findById(idUsuario);

    if (dadosUsuario === null) {
      throw new Error("Usuário não encontrado");
    }

    dadosUsuario.Senha = senha;

    const dadosAtualizados = await RepositorioUsuario.updateOne(dadosUsuario);

    if (dadosAtualizados.modifiedCount === 0) {
      throw new Error("A senha deve ser diferente da anterior");
    } 

    return "Senha atualizada com sucesso" ;
  }

  async HabilitarUsuario(idUsuario: string) : Promise<any> {
    const dadosUsuario = await RepositorioUsuario.findById(idUsuario);

    if (dadosUsuario === null) {
      throw new Error("Usuário não encontrado");
    }

    if (dadosUsuario.Habilitado) {
      throw new Error("Usuário já foi habilitado");
    }

    dadosUsuario.Habilitado = true;

    await RepositorioUsuario.updateOne(dadosUsuario);

    return "Usuário habilitado com sucesso";
  }
}

export { ServicoUsuario }