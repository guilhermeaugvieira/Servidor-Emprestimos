import express from "express";
import cors from 'cors';
import { Rotas } from "../../API/Configuracoes/Rotas";

const Servidor = express();

Servidor.use(express.json());
Servidor.use(express.urlencoded({ extended: true}));
Servidor.use(cors());
Servidor.use(Rotas);

export { Servidor };