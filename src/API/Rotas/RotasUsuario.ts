import { celebrate, errors, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ControladorUsuario } from "../Controladores/ControladorUsuario";

const RotasUsuario = Router();
const controladorUsuario = new ControladorUsuario();

RotasUsuario.get("/usuarios", controladorUsuario.ObterTodosUsuarios);

RotasUsuario.get("/usuarios/:id",
  celebrate(
    {
      [Segments.PARAMS]: Joi.object().keys(
        {
          id: Joi.string().required().trim(),
        }
      ),
    }
  ), controladorUsuario.ObterUsuarioPorId
);

RotasUsuario.post("/usuarios",
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

RotasUsuario.post("/usuarios/login",
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

RotasUsuario.delete("/usuarios/:id",
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

RotasUsuario.patch("/usuarios/:id/senha",
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

RotasUsuario.patch("/usuarios/:id/habilitar",
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