import { model } from "mongoose";
import { UserSchema } from "../schemas/userSchema";

const UserRepository = model('users', UserSchema, 'users');

export { UserRepository };