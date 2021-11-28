import { Schema } from 'mongoose';

const Emprestimo = new Schema({
  Cpf: {type: String, required: true},
  Data_Contratada: {type: Date, required: true},
  Montante: {type: Number, required: true}
}, {
  collection: 'emprestimos',
  versionKey: false,
});

export { Emprestimo };