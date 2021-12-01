import { celebrate, errors, Joi, Segments } from "celebrate";
import { Router } from "express";
import { ControladorParcela } from "../Controladores/ControladorParcela";

const RotasParcela = Router();
const controladorParcela = new ControladorParcela();

RotasParcela.patch("/parcelas/:idParcela/pagamento",
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

RotasParcela.get("/parcelas/emprestimo/:idEmprestimo",
  celebrate(
    {
      [Segments.PARAMS]: Joi.object().keys(
        {
          idEmprestimo: Joi.string().required().trim(),
        }
      ),
    }
  ), controladorParcela.ObterParcelasPorEmprestimo
)

RotasParcela.get("/parcelas/:idParcela",
  celebrate(
    {
      [Segments.PARAMS]: Joi.object().keys(
        {
          idParcela: Joi.string().required().trim(),
        }
      ),
    }
  ), controladorParcela.ObterParcelasPorId
)

RotasParcela.get("/parcelas", controladorParcela.ObterTodasParcelas);

export { RotasParcela };