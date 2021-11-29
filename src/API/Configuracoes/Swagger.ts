import { Router } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express"

const RotaSwagger = Router();

const options = {
  definition: {
    openapi: '3.0.0.0',
    info: {
      title: "API Sistema de Empréstimos",
      description: "Documentação da API",
      contact: {
        name: "Guilherme Augusto Vieira",
        email: "guilhermeaugvieira@gmail.com",
      },
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      version: '1.0.0.0'
    },
  },
  apis: ['src/API/Rotas/*.ts']
}

RotaSwagger.use("/", serve);
RotaSwagger.get("/", setup(swaggerJSDoc(options)));

export { RotaSwagger }