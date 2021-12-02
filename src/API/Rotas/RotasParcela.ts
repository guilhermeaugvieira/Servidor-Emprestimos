import { celebrate, errors, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ControladorParcela } from "../Controladores/ControladorParcela";

const RotasParcela = Router();
const controladorParcela = new ControladorParcela();

RotasParcela.get("/parcelas", 
  /*
    #swagger.tags = ['Parcelas']
    #swagger.summary = 'Obtém todas as parcelas'
    #swagger.description = 'Obtém todas as parcelas cadastradas na aplicação'
    #swagger.responses[204] = {
      'description': 'No Content',
    }
  */

  controladorParcela.ObterTodasParcelas);

RotasParcela.get("/parcelas/:idParcela",
  /*
    #swagger.tags = ['Parcelas']
    #swagger.summary = 'Obtém parcela por Id'
    #swagger.description = 'Realiza a busca da parcela e retorna seus dados'
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
          idParcela: Joi.string().required().trim(),
        }
      ),
    }
  ), controladorParcela.ObterParcelasPorId
);

RotasParcela.get("/parcelas/emprestimo/:idEmprestimo",
  /*
    #swagger.tags = ['Parcelas']
    #swagger.summary = 'Obtém todas as parcelas de um empréstimo'
    #swagger.description = 'Realiza a busca de todas as parcelas relacionadas ao empréstimo'
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
  ), controladorParcela.ObterParcelasPorEmprestimo
);

RotasParcela.patch("/parcelas/:idParcela/pagamento",
  /*
    #swagger.tags = ['Parcelas']
    #swagger.summary = 'Registra o pagamento de uma parcela'
    #swagger.description = 'Adiciona a data do pagamento nos dados da parcela'
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
          idParcela: Joi.string().required().trim(),
        }
      ),
    }
  ), controladorParcela.RegistrarPagamentoParcela
)

export { RotasParcela };