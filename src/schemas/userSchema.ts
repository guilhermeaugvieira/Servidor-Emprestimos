import { Schema } from 'mongoose';

const UserSchema = new Schema({
  username: String,
  email: String,
}, {
  collection: 'users',
  versionKey: false,
});

export { UserSchema };