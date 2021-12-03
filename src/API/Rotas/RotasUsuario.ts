import { celebrate, errors, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ControladorUsuario } from "../Controladores/ControladorUsuario";

const RotasUsuario = Router();
const controladorUsuario = new ControladorUsuario();

RotasUsuario.get("/usuarios", 
  /*
    #swagger.tags = ['Usuarios']
    #swagger.summary = 'Obtém todos os usuários'
    #swagger.description = 'Retorna todos os usuários cadastrados na aplicação'
    #swagger.responses[204] = {
      description: 'No Content',
    }
    #swagger.responses[200] = {
      description: 'Ok',
      schema: {
        $ref: '#/definitions/RespostaObterUsuarios'
      }
    }
  */

  controladorUsuario.ObterTodosUsuarios);

RotasUsuario.get("/usuarios/:idUsuario",
  /* 
    #swagger.tags = ['Usuarios']
    #swagger.summary = 'Obtém usuario por id'
    #swagger.description = 'Realiza a busca do usuário pelo id' 
    #swagger.responses[400] = {
      description: 'Bad Request',
      schema: {
        $ref: '#/definitions/RespostaBadRequest'
      }
    }
    #swagger.responses[200] = {
      description: 'Ok',
      schema: {
        $ref: '#/definitions/RespostaObterUsuarioId'
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
  ), controladorUsuario.ObterUsuarioPorId
);

RotasUsuario.post("/usuarios",
  /*
    #swagger.tags = ['Usuarios']
    #swagger.summary = 'Adiciona um novo usuário'
    #swagger.description = 'Solicito o registro de um novo usuário na aplicação'
    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description' : 'Novo usuário',
      'required' : 'true',
      'schema' : {
        '$ref' : '#/definitions/InserirUsuario'
      }
    }
    #swagger.responses[400] = {
      description: 'Bad Request',
      schema: {
        $ref: '#/definitions/RespostaBadRequest'
      }
    }
    #swagger.responses[200] = {
      description: 'Ok',
      schema: {
        $ref: '#/definitions/RespostaAdicionarUsuario'
      }
    }
  */

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
  /*
    #swagger.tags = ['Usuarios']
    #swagger.summary = 'Realiza o login na aplicação'
    #swagger.description = 'Realiza o login na aplicação se o usuário for habilitado'
    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description' : 'Login usuário',
      'required' : 'true',
      'schema' : {
        '$ref' : '#/definitions/LoginUsuario'
      }
    }
    #swagger.responses[400] = {
      description: 'Bad Request',
      schema: {
        $ref: '#/definitions/RespostaBadRequest'
      }
    }
    #swagger.responses[200] = {
      description: 'Ok',
      schema: {
        $ref: '#/definitions/RespostaUsuarioLogin'
      }
    }
  */

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
  /*
    #swagger.tags = ['Usuarios']
    #swagger.summary = 'Atualiza a senha do usuário'
    #swagger.description = 'Atualiza a senha do usuário cadastrado'
    #swagger.parameters['body'] = {
      'in': 'body',
      'name': 'body',
      'description' : 'Senha usuário',
      'required' : 'true',
      'schema' : {
        '$ref' : '#/definitions/AtualizarSenhaUsuario'
      }
    }
    #swagger.responses[400] = {
      description: 'Bad Request',
      schema: {
        $ref: '#/definitions/RespostaBadRequest'
      }
    }
    #swagger.responses[200] = {
      description: 'Ok',
      schema: {
        $ref: '#/definitions/RespostaUsuarioAtualizarSenha'
      }
    }
  */

  celebrate(
    {
      [Segments.BODY]: Joi.object().keys(
        {
          senha: Joi.string().required().trim(),
        }
      ),
      [Segments.PARAMS]: Joi.object().keys(
        {
          idUsuario: Joi.string().required().trim(),
        }
      ),
    }
  ), controladorUsuario.AtualizarSenha
);

RotasUsuario.patch("/usuarios/:idUsuario/habilitar",
  /*
    #swagger.tags = ['Usuarios']
    #swagger.summary = 'Habilita um usuário para acesso na aplicação'
    #swagger.description = 'Atualiza o status do usuário para habilitado'
    #swagger.responses[400] = {
      description: 'Bad Request',
      schema: {
        $ref: '#/definitions/RespostaBadRequest'
      }
    }
    #swagger.responses[200] = {
      description: 'Ok',
      schema: {
        $ref: '#/definitions/RespostaHabilitarUsuario'
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
  ), controladorUsuario.HabilitarUsuario
);

RotasUsuario.delete("/usuarios/:idUsuario",
  /*
    #swagger.tags = ['Usuarios']
    #swagger.summary = 'Remove o usuário'
    #swagger.description = 'Remove o usuário se não tiver empréstimos cadastrados'
    #swagger.responses[400] = {
      description: 'Bad Request',
      schema: {
        $ref: '#/definitions/RespostaBadRequest'
      }
    }
    #swagger.responses[200] = {
      description: 'Ok',
      schema: {
        $ref: '#/definitions/RespostaRemoverUsuario'
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
  ), controladorUsuario.RemoverUsuario
);

RotasUsuario.use(errors());

export { RotasUsuario };