import { LeanDocument } from "mongoose";
import { RepositorioUsuario } from "../../../Dados/Repositorios/RepositorioUsuario";

class ServicoUsuario{
  async ObterTodosUsuarios(): Promise<LeanDocument<any>[] | null> { 
    try {
      const todosUsuarios = await RepositorioUsuario.find({}).lean().exec();

      return todosUsuarios;

    } catch(error) {      
      console.log(error);
      
      return null;
    }
  }
  
  async AdicionarUsuario(email: string, nome: string, cpf: string, senha: string): Promise<any> {
    const usuarioAdicionado = {
      Email: email,
      Nome: nome,
      Cpf: cpf,
      Senha: senha,
      Habilitado: false,
    }

    try {
      const contadorEmail = await (await RepositorioUsuario.find({ Email: email})).length;
      
      if (contadorEmail > 0 ) return "Email já cadastrado";

      const contadorCpf = await (await RepositorioUsuario.find({ Cpf: cpf})).length;

      if (contadorCpf > 0) return "Cpf já cadastrado";
      
      const novoUsuario = await RepositorioUsuario.create(usuarioAdicionado);

      return novoUsuario;

    } catch (error) {
      console.log(error);
      
      return null;
    }
  }
}

export { ServicoUsuario }