import { LeanDocument } from "mongoose";
import { inject, injectable, Lifecycle, scoped } from "tsyringe";
import { RepositorioEmprestimo } from "../../../Dados/Repositorios/RepositorioEmprestimo";
import { RepositorioUsuario } from "../../../Dados/Repositorios/RepositorioUsuario";
import { INotificador } from "../../../Negocio/Interfaces/INotificador";
import { IServicoUsuario } from "../Interfaces/IServicoUsuario";

@scoped(Lifecycle.ContainerScoped)
@injectable()
class ServicoUsuario implements IServicoUsuario{
  constructor(
    @inject("Notificador") private _notificador: INotificador
  ){}
  
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
      const contadorEmail = (await RepositorioUsuario.find({ Email: email})).length;
      
      if (contadorEmail > 0 ) {
        this._notificador.AdicionarNotificacao("Email já cadastrado");

        return null;
      }

      const contadorCpf = await (await RepositorioUsuario.find({ Cpf: cpf})).length;

      if (contadorCpf > 0) {
        this._notificador.AdicionarNotificacao("Cpf já cadastrado");

        return null;
      }
      
      const novoUsuario = await RepositorioUsuario.create(usuarioAdicionado);

      return novoUsuario;

    } catch (error) {
      console.log(error);
      
      return null;
    }
  }

  async RemoverUsuario(idUsuario: string) : Promise<any> {
    try {
      const contadorEmprestimos = (await RepositorioEmprestimo.find({ Id_Usuario: idUsuario}).exec()).length;
      
      if (contadorEmprestimos > 0) {
        this._notificador.AdicionarNotificacao("Usuário possui empréstimos cadastrados");
      
        return null;
      }

      const usuarioRemovido = await RepositorioUsuario.deleteOne({_id: idUsuario}).exec();

      return usuarioRemovido.deletedCount === 1;
    } catch(error) {
      console.log(error);

      return null;
    }
  }
}

export { ServicoUsuario }