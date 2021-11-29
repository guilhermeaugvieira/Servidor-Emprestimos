import { model } from "mongoose";
import { HistoricoEmprestimo } from "../../Negocio/Entidades/HistoricoEmprestimo";

const RepositorioEmprestimo = model('historico_emprestimo', HistoricoEmprestimo, 'historico_emprestimo');

export { RepositorioEmprestimo };