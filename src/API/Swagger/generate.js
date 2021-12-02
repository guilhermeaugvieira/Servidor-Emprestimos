import swaggerAutogen from "swagger-autogen";

const doc = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "API Sistema de Empréstimos",
    description: "Documentação da API do Sistema de Empréstimos"
  },
  host: "localhost:3000",
  basePath: "/api",
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: "Usuarios",
      description: "Gerencia os usuários"
    },
    {
      name: "Emprestimos",
      description: "Gerencia os empréstimos"
    },
    {
      name: "Parcelas",
      description: "Gerencia as parcelas"
    }
  ],
  securityDefinitions: {
    apiKeyAuth:{
      type: "apiKey",
      in: "header",       // can be "header", "query" or "cookie"
      name: "authorization",  // name of the header, query parameter or cookie
      description: "Insira o token seguido de 'Bearer '"
    }
  },
  definitions: {
    InserirUsuario: {
      email: '',
      nome: '',
      cpf: '',
      senha: '',
    },
    LoginUsuario: {
      cpf: '',
      senha: ''
    },
    AtualizarSenhaUsuario: {
      senha: '',
    },
    AdicionarEmprestimo: {
      idUsuario: '',
      montante: 1,
      numeroPrestacoes: 1
    },
    StatusEmprestimo: {
      statusEmprestimo: 'Reprovado'
    },
    RespostaBadRequest: {
      data: false,
      erro: '',
    },
    RespostaObterUsuarios: {
      sucesso: true,
      dados: [
        {
          _id: '',
          Email: '',
          Nome: '',
          Cpf: '',
          Senha: '',
          Habilitado: false,
        }
      ]
    },
    RespostaAdicionarUsuario: {
      sucesso: true,
      dados: {
        _id: '',
        Email: '',
        Nome: '',
        Cpf: '',
        Senha: '',
        Habilitado: false,
      }
    },
    RespostaObterUsuarioId: {
      sucesso: true,
      dados: {
        _id: '',
        Email: '',
        Nome: '',
        Cpf: '',
        Senha: '',
        Habilitado: false,
      }
    },
    RespostaRemoverUsuario: {
      sucesso: true,
      dados: "Usuário removido com sucesso",
    },
    RespostaUsuarioLogin: {
      sucesso: true,
      dados: {
        Id: '',
        Email: '',
        Nome: '',
        Cpf: '',
      }
    },
    RespostaUsuarioAtualizarSenha: {
      sucesso: true,
      dados: "Senha atualizada com sucesso"
    },
    RespostaHabilitarUsuario: {
      sucesso: true,
      dados: "Usuário habilitado com sucesso"
    },
    RespostaObterEmprestimos: {
      sucesso: true,
      dados: [
        {
          _id: "",
          Id_Usuario: "",
          Data_Solicitacao: new Date(),
          Montante: 1000,
          Numero_Prestacoes: 10,
          status: "Aprovado",
          parcelas: [
            {
              _id: "",
              Id_Emprestimo: "",
              Data_Pagamento: new Date,
              Valor: 1000,
            }
          ]
        }
      ]
    },
    RespostaObterEmprestimo: {
      sucesso: true,
      dados: {
        _id: "",
        Id_Usuario: "",
        Data_Solicitacao: new Date(),
        Montante: 1000,
        Numero_Prestacoes: 10,
        status: "Aprovado",
        parcelas: [
          {
            _id: "",
            Id_Emprestimo: "",
            Data_Pagamento: new Date,
            Valor: 1000,
          }
        ]
      }
    },
    RespostaSolicitacaoEmprestimo: {
      sucesso: true,
      dados: {
        _id: "",
        Id_Usuario: "",
        Data_Solicitacao: new Date(),
        Montante: 1000,
        Numero_Prestacoes: 10,
        status: "Em análise",
      }
    },
    RespostaAprovacaoEmprestimo: {
      sucesso: true,
      dados: {
        _id: "",
        Id_Usuario: "",
        Data_Solicitacao: new Date(),
        Montante: 1000,
        Numero_Prestacoes: 10,
        status: "Aprovado",
        parcelas: [
          {
            _id: "",
            Id_Emprestimo: "",
            Data_Pagamento: new Date,
            Valor: 1000,
          }
        ]
      }
    },
    RespostaObterParcelas: {
      sucesso: true,
      dados: [
        {
          _id : '',
          Id_Emprestimo: '',
          Data_Pagamento: new Date(),
          Valor: 1000,
        }
      ],
    },
    RespostaObterParcela: {
      sucesso: true,
      dados: {
        _id : '',
        Id_Emprestimo: '',
        Data_Pagamento: new Date(),
        Valor: 1000,
      }
    },
    RespostaRegistroPagamentoParcela: {
      sucesso: true,
      dados: "Pagamento efetuado com sucesso",
    }
  }
}

const outputFile = './src/API/Swagger/swaggerDocs.json';
const endpointsFiles = ['./src/API/Rotas/*.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc);
