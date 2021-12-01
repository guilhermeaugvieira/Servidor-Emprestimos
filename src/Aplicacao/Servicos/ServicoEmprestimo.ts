import { RepositorioEmprestimo } from "../../Dados/Repositorios/RepositorioEmprestimo";
import { RepositorioHistoricoEmprestimo } from "../../Dados/Repositorios/RepositorioHistoricoEmprestimo";
import { IServicoEmprestimo } from "../Interfaces/IServicoEmprestimo";
import { addMonths } from "date-fns";
import { RepositorioParcela } from "../../Dados/Repositorios/RepositorioParcela";

class ServicoEmprestimo implements IServicoEmprestimo{

  constructor() {
  }

  async SolicitarEmprestimo (idUsuario: string, montante: number, numeroPrestacoes: number) : Promise<any> {
    const novoEmprestimo = {
      Id_Usuario: idUsuario,
      Data_Solicitacao: new Date(),
      Montante: montante,
      Numero_Prestacoes: numeroPrestacoes
    };

    const emprestimo =  await RepositorioEmprestimo.create(novoEmprestimo);

    const novoHistoricoEmprestimo = {
      Id_Emprestimo : emprestimo._id,
      Aprovado : "Em análise"
    }

    const historico = await RepositorioHistoricoEmprestimo.create(novoHistoricoEmprestimo);

    return {
      emprestimo: emprestimo._doc,
      status: { 
        Aprovado: historico.Aprovado
      }
    }
  }

  async ObterTodosEmprestimos () : Promise<any> {
    const emprestimos =  await RepositorioEmprestimo.find();
    const countEmprestimos = await RepositorioEmprestimo.countDocuments();

    const historicoEmprestimos = await RepositorioHistoricoEmprestimo.find();

    let emprestimosStatus = [];

    for(let i = 0; i < countEmprestimos; i++) {
      let emprestimoAtualizado = {
        ...emprestimos[i]._doc,
        status: {
          Aprovado: historicoEmprestimos.find(historico => historico.Id_Emprestimo.toString() === emprestimos[i]._id.toString()).Aprovado
        }
      }

      if (emprestimoAtualizado.status.Aprovado === "Aprovado") {
        const parcelas = await RepositorioParcela.find({ Id_Emprestimo: emprestimos[i]._id.toString()});

        emprestimoAtualizado = { ...emprestimoAtualizado, parcelas };
      }

      emprestimosStatus.push(emprestimoAtualizado);
    }

    return emprestimosStatus;
  }

  async ObterEmprestimoPorId (idEmprestimo: string) : Promise<any> {
    const emprestimo = await RepositorioEmprestimo.findById(idEmprestimo);

    if (emprestimo === null) {
      throw new Error("Não foi possivel encontrar empréstimo com o id especificado");
    }

    const historico = await RepositorioHistoricoEmprestimo.findOne({ Id_Emprestimo: idEmprestimo});

    if (historico.Aprovado === "Aprovado") {
      const parcelas = await RepositorioParcela.find({ Id_Emprestimo: emprestimo._id.toString()});

      return {
        ...emprestimo._doc,
        status: {
          Aprovado: historico.Aprovado
        },
        parcelas
      };

    }

    return {
      ...emprestimo._doc,
      status: {
        Aprovado: historico.Aprovado
      }
    };
  }


  async ObterEmprestimosPorUsuario (idUsuario: string) : Promise<any> {
    const emprestimos = await RepositorioEmprestimo.find({ Id_Usuario: idUsuario });

    if (emprestimos.length === 0) {
      throw new Error("Não foi possivel encontrar empréstimo com o id especificado");
    }

    const countEmprestimos = await RepositorioEmprestimo.countDocuments({ Id_Usuario: idUsuario });

    const historicoEmprestimos = await RepositorioHistoricoEmprestimo.find();

    let emprestimosStatus = [];

    for(let i = 0; i < countEmprestimos; i++) {
      let emprestimoAtualizado = {
        ...emprestimos[i]._doc,
        status: {
          Aprovado: historicoEmprestimos.find(historico => historico.Id_Emprestimo.toString() === emprestimos[i]._id.toString()).Aprovado
        }
      }

      if (emprestimoAtualizado.status.Aprovado === "Aprovado") {
        const parcelas = await RepositorioParcela.find({ Id_Emprestimo: emprestimos[i]._id.toString()});

        emprestimoAtualizado = { ...emprestimoAtualizado, parcelas };
      }

      emprestimosStatus.push(emprestimoAtualizado);
    }

    return emprestimosStatus;
  }

  async AtualizarStatusEmprestimo (idEmprestimo: string, statusEmprestimo : string) : Promise<any> {
    const emprestimo = await RepositorioEmprestimo.findById(idEmprestimo);

    if (emprestimo === null) {
      throw new Error("Não foi possivel encontrar empréstimo com o id especificado");
    }

    const referenciaHistoricoEmprestimo = await RepositorioHistoricoEmprestimo.findOne({ Id_Emprestimo: idEmprestimo });

    if (referenciaHistoricoEmprestimo.Aprovado !== "Em análise") {
      throw new Error("Empréstimo já foi analisado");
    }

    referenciaHistoricoEmprestimo.Aprovado = statusEmprestimo;

    await RepositorioHistoricoEmprestimo.updateOne(referenciaHistoricoEmprestimo);

    if (statusEmprestimo === "Aprovado") {
      const valorParcela = emprestimo.Montante / emprestimo.Numero_Prestacoes;
  
      const listaParcelas = [];
  
      for(let i = 0; i < emprestimo.Numero_Prestacoes; i++) {
        const parcela = {
          Id_Emprestimo : idEmprestimo,
          Data_Pagamento : addMonths(new Date(), i+1),
          Valor: valorParcela
        }
  
        listaParcelas.push(parcela);
      }
  
      const insercaoParcelas = await RepositorioParcela.insertMany(listaParcelas);
  
      return {
        ...emprestimo._doc,
        status: {
          Aprovado: "Aprovado"
        },
        parcelas: insercaoParcelas
      };
    }

    return {
      ...emprestimo._doc,
      status: {
        Aprovado: statusEmprestimo
      },
    };
    
  }
}

export { ServicoEmprestimo };