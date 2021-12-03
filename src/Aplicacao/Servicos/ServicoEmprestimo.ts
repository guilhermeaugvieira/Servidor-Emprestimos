import { RepositorioEmprestimo } from "../../Dados/Repositorios/RepositorioEmprestimo";
import { RepositorioHistoricoEmprestimo } from "../../Dados/Repositorios/RepositorioHistoricoEmprestimo";
import { IServicoEmprestimo } from "../Interfaces/IServicoEmprestimo";
import { addMonths } from "date-fns";
import { RepositorioParcela } from "../../Dados/Repositorios/RepositorioParcela";
import { loadSync } from "@grpc/proto-loader";
import grpc from "grpc";

const grpcScore = grpc.loadPackageDefinition(
  loadSync("src/Aplicacao/Protos/score.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  })
);

// @ts-ignore
let scoreClient = new grpcScore.verificaScore.Greeter(
  process.env.SCORE_URL,
  grpc.credentials.createInsecure(),
  {
    "grpc.min_reconnect_backoff_ms": 1000,
    "grpc.max_reconnect_backoff_ms": 10000,
    "grpc.keepalive_time_ms": 15000,
    "grpc.keepalive_timeout_ms": 20000,
    "grpc.keepalive_permit_without_calls": 1,
    "grpc.http2.max_pings_without_data": 0,
  }
);

class ServicoEmprestimo implements IServicoEmprestimo{

  constructor() {
  }

  async SolicitarEmprestimo (idUsuario: string, montante: number, numeroPrestacoes: number) : Promise<any> {

    // Verifica score suficiente
    const scoreResult: number = await new Promise((resolve, reject) => {
      scoreClient.SearchScore({ cpf: '12312312312', mes: '1' }, (err: any, response: any) => {
        resolve(parseInt(response.score, 10));
      });
    });

    if (scoreResult < 60) {
      throw new Error("Score não é suficiente para empréstimo");
    }

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
      ...emprestimo._doc,
      status: historico.Aprovado
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
        status: historicoEmprestimos.find(historico => historico.Id_Emprestimo.toString() === emprestimos[i]._id.toString()).Aprovado,
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
        status: historico.Aprovado,
        parcelas
      };

    }

    return {
      ...emprestimo._doc,
      status: historico.Aprovado,
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
        status: historicoEmprestimos.find(historico => historico.Id_Emprestimo.toString() === emprestimos[i]._id.toString()).Aprovado,
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

    const historicoEmprestimoAtualizado = {
      Id_Emprestimo: referenciaHistoricoEmprestimo.Id_Emprestimo,
      Aprovado: statusEmprestimo,
    };    

    await RepositorioHistoricoEmprestimo.updateOne({ _id: referenciaHistoricoEmprestimo._id } , historicoEmprestimoAtualizado);

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
        status: "Aprovado",
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