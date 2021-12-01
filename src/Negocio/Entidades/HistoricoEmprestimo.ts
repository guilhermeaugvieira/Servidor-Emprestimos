import { Schema } from 'mongoose';

const HistoricoEmprestimo = new Schema({
  Id_Emprestimo: {type: String, required: true},
  Aprovado: {type: String, required: true }
}, {
  collection: 'historico_emprestimo',
  versionKey: false,
});

export { HistoricoEmprestimo };