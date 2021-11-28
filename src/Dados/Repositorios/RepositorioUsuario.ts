import { model } from "mongoose";
import { Usuario } from "../../Negocio/Entidades/Usuario";

const RepositorioUsuario = model('usuario', Usuario, 'usuarios');

export { RepositorioUsuario };