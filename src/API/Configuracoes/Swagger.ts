import { Router } from "express";
import { serve, setup } from "swagger-ui-express"
import swaggerDocs from "../Swagger/swaggerDocs.json";

const RotaSwagger = Router();

RotaSwagger.use("/", serve);
RotaSwagger.get("/", setup(swaggerDocs));

export { RotaSwagger }