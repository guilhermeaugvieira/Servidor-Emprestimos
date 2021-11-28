import { model } from "mongoose";
import { Parcela } from "../../Negocio/Entidades/Parcela";

const RepositorioParcela = model('parcela', Parcela, 'parcelas');

export { RepositorioParcela };