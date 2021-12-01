import { celebrate, errors, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ControladorEmprestimo } from "../Controladores/ControladorEmprestimo";

const RotasEmprestimo = Router();
const controladorEmprestimo = new ControladorEmprestimo();

RotasEmprestimo.get("/emprestimos", controladorEmprestimo.ObterTodosEmprestimos);

RotasEmprestimo.get("/emprestimos/:id",
  celebrate(
    {
      [Segments.PARAMS]: Joi.object().keys(
        {
          id: Joi.string().required().trim(),
        }
      ),
    }
  ), controladorEmprestimo.ObterEmprestimoPorId
);

RotasEmprestimo.get("/emprestimos/usuario/:id",
  celebrate(
    {
      [Segments.PARAMS]: Joi.object().keys(
        {
          id: Joi.string().required().trim(),
        }
      ),
    }
  ), controladorEmprestimo.ObterEmprestimoPorUsuario
);

RotasEmprestimo.post("/emprestimos",
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

RotasEmprestimo.patch("/emprestimos/:id/status",
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys(
        {
          statusEmprestimo: Joi.string().required(),
        }
      ),
      [Segments.PARAMS]: Joi.object().keys(
        {
          id: Joi.string().required().trim(),
        }
      ),
    }
  ), controladorEmprestimo.AtualizarStatusEmprestimo
);

RotasEmprestimo.use(errors());

export { RotasEmprestimo };