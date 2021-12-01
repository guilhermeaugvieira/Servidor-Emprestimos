import { celebrate, errors, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ControladorUsuario } from "../Controladores/ControladorUsuario";

const RotasUsuario = Router();
const controladorUsuario = new ControladorUsuario();

RotasUsuario.get("/usuarios", 
  // #swagger.tags = ['Usuários']
  // #swagger.summary = 'Obtém todos os usuários'
  // #swagger.description = 'Retorna todos os usuários cadastrados na aplicação'

  controladorUsuario.ObterTodosUsuarios);

RotasUsuario.get("/usuarios/:idUsuario",
  // #swagger.tags = ['Usuários']
  // #swagger.summary = 'Obtém usuario por id'
  // #swagger.description = 'Realiza a busca do usuário pelo id'

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
  // #swagger.tags = ['Usuários']
  // #swagger.summary = 'Adiciona um novo usuário'
  // #swagger.description = 'Solicito o registro de um novo usuário na aplicação'

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
  // #swagger.tags = ['Usuários']
  // #swagger.summary = 'Realiza o login na aplicação'
  // #swagger.description = 'Realiza o login na aplicação se o usuário for habilitado'

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

RotasUsuario.patch("/usuarios/:idUsuario/senha",
  // #swagger.tags = ['Usuários']
  // #swagger.summary = 'Atualiza a senha do usuário'
  // #swagger.description = 'Atualiza a senha do usuário cadastrado'

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
);

RotasUsuario.patch("/usuarios/:idUsuario/habilitar",
  // #swagger.tags = ['Usuários']
  // #swagger.summary = 'Habilita um usuário para acesso na aplicação'
  // #swagger.description = 'Atualiza o status do usuário para habilitado'

  celebrate(
    {
      [Segments.PARAMS]: Joi.object().keys(
        {
          id: Joi.string().required().trim(),
        }
      ),
    }
  ), controladorUsuario.HabilitarUsuario
);

RotasUsuario.delete("/usuarios/:idUsuario",
  // #swagger.tags = ['Usuários']
  // #swagger.summary = 'Remove o usuário'
  // #swagger.description = 'Remove o usuário se não tiver empréstimos cadastrados'

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

RotasUsuario.use(errors());

export { RotasUsuario };