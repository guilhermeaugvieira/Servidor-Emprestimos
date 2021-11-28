import { Schema } from 'mongoose';

const Parcela = new Schema({
  Id_Emprestimo: {type: String, required: true},
  Data_Pagamento: {type: Date, required: true},
  Data_Recebimento: {type: Date, required: true},
  Valor: {type: Number, required: true},
}, {
  collection: 'parcelas',
  versionKey: false,
});

export { Parcela };