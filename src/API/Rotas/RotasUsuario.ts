import { celebrate, errors, Joi, Segments } from "celebrate";
import { Router } from "express";
import { container } from "tsyringe";
import { ControladorUsuario } from "../Controladores/ControladorUsuario";

const RotasUsuario = Router();
const controladorUsuario = container.resolve(ControladorUsuario);

/**
 * @swagger
 *  /api/usuario:
 *   get:
 *    description: Use to request all customers
 *    responses:
 *     '200':
 *      description: A successfull response
 *    
 */
RotasUsuario.get("/", controladorUsuario.ObterTodosUsuarios);

RotasUsuario.post("/",
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

RotasUsuario.delete("/:id",
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

RotasUsuario.patch("/senha/:id",
  celebrate(
    {
      [Segments.BODY]: Joi.object().keys(
        {
          senha: Joi.string().required().trim(),
        }
      ),
    }
  ), controladorUsuario.AtualizarSenha
)

RotasUsuario.use(errors());

export { RotasUsuario };