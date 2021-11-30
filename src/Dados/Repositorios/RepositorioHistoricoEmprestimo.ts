import { model } from "mongoose";
import { HistoricoEmprestimo } from "../../Negocio/Entidades/HistoricoEmprestimo";

const RepositorioHistoricoEmprestimo = model('historico_emprestimo', HistoricoEmprestimo, 'historico_emprestimo');

export { RepositorioHistoricoEmprestimo };