import { Schema } from 'mongoose';

const Emprestimo = new Schema({
  Id_Usuario: {type: String, required: true},
  Data_Solicitacao: {type: Date, required: true},
  Montante: {type: Number, required: true},
  Numero_Prestacoes: {type: Number, required: true},
}, {
  collection: 'emprestimos',
  versionKey: false,
});

export { Emprestimo };