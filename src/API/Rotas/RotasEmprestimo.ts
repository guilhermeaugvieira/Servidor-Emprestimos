import { celebrate, errors, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ControladorEmprestimo } from "../Controladores/ControladorEmprestimo";

const RotasEmprestimo = Router();
const controladorEmprestimo = new ControladorEmprestimo();

RotasEmprestimo.get("/emprestimos", 
  /*
    #swagger.tags = ['Emprestimos']
    #swagger.summary = 'Obtém todos os empréstimos'
    #swagger.description = 'Retorna todos os empréstimos cadastrados na aplicação'
    #swagger.responses[204] = {
      'description': 'No Content',
    }
  */

  controladorEmprestimo.ObterTodosEmprestimos);

RotasEmprestimo.get("/emprestimos/:idEmprestimo",
  /*
    #swagger.tags = ['Emprestimos']
    #swagger.summary = 'Obtém empréstimo por id'
    #swagger.description = 'Realiza a busca do empréstimo pelo id e retorna os dados do empréstimo'
    #swagger.responses[400] = {
      description: 'Bad Request',
      schema: {
        $ref: '#/definitions/RespostaBadRequest'
      }
    }
  */

  celebrate(
    {
      [Segments.PARAMS]: Joi.object().keys(
        {
          idEmprestimo: Joi.string().required().trim(),
        }
      ),
    }
  ), controladorEmprestimo.ObterEmprestimoPorId
);

RotasEmprestimo.get("/emprestimos/usuario/:idUsuario",
  /*
    #swagger.tags = ['Emprestimos']
    #swagger.summary = 'Obtém todos os empréstimo de um usuário'
    #swagger.description = 'Retorna os dados de todos os empréstimos realizado pelo usuário']
    #swagger.responses[400] = {
      description: 'Bad Request',
      schema: {
        $ref: '#/definitions/RespostaBadRequest'
      }
    }
  */

  celebrate(
    {
      [Segments.PARAMS]: Joi.object().keys(
        {
          idUsuario: Joi.string().required().trim(),
        }
      ),
    }
  ), controladorEmprestimo.ObterEmprestimoPorUsuario
);

RotasEmprestimo.post("/emprestimos",
  /*
    #swagger.tags = ['Emprestimos']
    #swagger.summary = 'Solicita um novo empréstimo'
    #swagger.description = 'Registra uma solicitação de empréstimo'
    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description' : 'Novo empréstimo',
      'required' : 'true',
      'schema' : {
        '$ref' : '#/definitions/AdicionarEmprestimo'
      }
    }
    #swagger.responses[400] = {
      description: 'Bad Request',
      schema: {
        $ref: '#/definitions/RespostaBadRequest'
      }
    }
  */

  celebrate(
    {
      [Segments.BODY]: Joi.object().keys(
        {
          idUsuario: Joi.string().required().trim(),
          montante: Joi.number().required().min(1),
          numeroPrestacoes: Joi.number().required().min(1),
        }
      ),
    }
  ), controladorEmprestimo.SolicitarEmprestimo
);

RotasEmprestimo.patch("/emprestimos/:idEmprestimo/status",
  /*
    #swagger.tags = ['Emprestimos']
    #swagger.summary = 'Atualiza o status de aprovação do empréstimo'
    #swagger.description = 'Atualiza o status de empréstimos em fase de análise'
    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description' : 'Status empréstimo',
      'required' : 'true',
      'schema' : {
        '$ref' : '#/definitions/StatusEmprestimo'
      }
    }
    #swagger.responses[400] = {
      description: 'Bad Request',
      schema: {
        $ref: '#/definitions/RespostaBadRequest'
      }
    }
  */

  celebrate(
    {
      [Segments.BODY]: Joi.object().keys(
        {
          statusEmprestimo: Joi.string().required().valid('Aprovado', 'Reprovado'),
        }
      ),
      [Segments.PARAMS]: Joi.object().keys(
        {
          idEmprestimo: Joi.string().required().trim(),
        }
      ),
    }
  ), controladorEmprestimo.AtualizarStatusEmprestimo
);

RotasEmprestimo.use(errors());

export { RotasEmprestimo };