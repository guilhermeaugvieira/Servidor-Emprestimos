import { RepositorioEmprestimo } from "../../Dados/Repositorios/RepositorioEmprestimo";
import { RepositorioParcela } from "../../Dados/Repositorios/RepositorioParcela";
import { IServicoParcela } from "../Interfaces/IServicoParcela";

class ServicoParcela implements IServicoParcela{

  constructor(){
  }

  async RegistrarPagamentoParcela(idParcela: string) : Promise<any> {
    const parcela = await RepositorioParcela.findById(idParcela);

    if (parcela === null) {
      throw new Error("Não existe parcela com esse id");
    }

    const pagamentoParcela = await RepositorioParcela.updateOne({_id: idParcela}, { Data_Recebimento: new Date()});

    if (pagamentoParcela.modifiedCount === 0) {
      throw new Error("Esta parcela já foi paga");
    }

    return "Pagamento efetuado com sucesso";
  }

  async ObterParcelasPorEmprestimo(idEmprestimo: string) : Promise<any> {
    const verificacaoEmprestimo = RepositorioEmprestimo.findById(idEmprestimo);

    if (verificacaoEmprestimo === null) {
      throw new Error("Não há emprestimo com esse id");
    }
    
    const parcelas = await RepositorioParcela.find({ Id_Emprestimo : idEmprestimo });

    return parcelas;
  }

  async ObterParcelaPorId(idParcela: string) : Promise<any> {
    const parcela = RepositorioParcela.findById(idParcela);

    if (parcela === null) {
      throw new Error("Não há parcela com esse id");
    }

    return parcela;
  }

  async ObterTodasParcelas() : Promise<any> {
    const parcelas = RepositorioParcela.find();

    return parcelas;
  }
}

export { ServicoParcela }