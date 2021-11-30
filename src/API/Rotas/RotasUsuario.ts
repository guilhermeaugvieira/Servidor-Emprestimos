import { celebrate, errors, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ControladorUsuario } from "../Controladores/ControladorUsuario";

const RotasUsuario = Router();
const controladorUsuario = new ControladorUsuario();

RotasUsuario.get("/usuario", controladorUsuario.ObterTodosUsuarios);

RotasUsuario.post("/usuario",
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys(
        {
          email: Joi.string().required().trim(),
          nome: Joi.string().required().trim(),
          cpf: Joi.string().required().trim(),
          senha: Joi.string().required().trim(),
        }
      ),
    }
  ), controladorUsuario.AdicionarUsuario
);

RotasUsuario.post("/usuario/login",
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys(
        {
          cpf: Joi.string().required().trim(),
          senha: Joi.string().required().trim(),
        }
      ),
    }
  ), controladorUsuario.Login
);

RotasUsuario.delete("/usuario/:id",
  celebrate(
    {
      [Segments.PARAMS]: Joi.object().keys(
        {
          id: Joi.string().required().trim(),
        }
      ),
    }
  ), controladorUsuario.RemoverUsuario
);

RotasUsuario.patch("/usuario/:id/senha",
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys(
        {
          senha: Joi.string().required().trim(),
        }
      ),
      [Segments.PARAMS]: Joi.object().keys(
        {
          id: Joi.string().required().trim(),
        }
      ),
    }
  ), controladorUsuario.AtualizarSenha
)

RotasUsuario.patch("/usuario/:id/habilitar",
  celebrate(
    {
      [Segments.PARAMS]: Joi.object().keys(
        {
          id: Joi.string().required().trim(),
        }
      ),
    }
  ), controladorUsuario.HabilitarUsuario
)

RotasUsuario.use(errors());

export { RotasUsuario };