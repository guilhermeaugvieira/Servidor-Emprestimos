import express from "express";
import cors from 'cors';
import { routes } from "./configurations/routes";

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true}));
server.use(cors());
server.use(routes);

export { server };