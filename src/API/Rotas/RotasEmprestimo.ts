import { celebrate, errors, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ControladorEmprestimo } from "../Controladores/ControladorEmprestimo";

const RotasEmprestimo = Router();
const controladorEmprestimo = new ControladorEmprestimo();

RotasEmprestimo.get("/emprestimos", 
  // #swagger.tags = ['Emprestimos']
  // #swagger.summary = 'Obtém todos os empréstimos'
  // #swagger.description = 'Retorna todos os empréstimos cadastrados na aplicação'

  controladorEmprestimo.ObterTodosEmprestimos);

RotasEmprestimo.get("/emprestimos/:idEmprestimo",
  // #swagger.tags = ['Emprestimos']
  // #swagger.summary = 'Obtém empréstimo por id'
  // #swagger.description = 'Realiza a busca do empréstimo pelo id e retorna os dados do empréstimo'

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
  // #swagger.tags = ['Emprestimos']
  // #swagger.summary = 'Obtém todos os empréstimo de um usuário'
  // #swagger.description = 'Retorna os dados de todos os empréstimos realizado pelo usuário'

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
  // #swagger.tags = ['Emprestimos']
  // #swagger.summary = 'Solicita um novo empréstimo'
  // #swagger.description = 'Registra uma solicitação de empréstimo'

  celebrate(
    {
      [Segments.BODY]: Joi.object().keys(
        {
          idUsuario: Joi.string().required().trim(),
          montante: Joi.number().required(),
          numeroPrestacoes: Joi.number().required(),
        }
      ),
    }
  ), controladorEmprestimo.SolicitarEmprestimo
);

RotasEmprestimo.patch("/emprestimos/:idEmprestimo/status",
  // #swagger.tags = ['Emprestimos']
  // #swagger.summary = 'Atualiza o status de aprovação do empréstimo'
  // #swagger.description = 'Atualiza o status de empréstimos em fase de análise'

  celebrate(
    {
      [Segments.BODY]: Joi.object().keys(
        {
          statusEmprestimo: Joi.string().required(),
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