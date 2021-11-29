import { Schema } from 'mongoose';

const Usuario = new Schema({
  Email: {type: String, required: true, unique: true},
  Nome: {type: String, required: true},
  Cpf: {type: String, required: true, unique: true},
  Senha: {type: String, required: true},
  Habilitado: {type: String, required: true},
}, {
  collection: 'usuarios',
  versionKey: false,
});

export { Usuario };