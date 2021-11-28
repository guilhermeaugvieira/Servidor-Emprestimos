import { model } from "mongoose";
import { Emprestimo } from "../../Negocio/Entidades/Emprestimo";

const RepositorioEmprestimo = model('emprestimo', Emprestimo, 'emprestimos');

export { RepositorioEmprestimo };