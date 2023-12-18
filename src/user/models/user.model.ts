import { Schema, model } from 'mongoose';
import { User } from '../dto/user.dto';

let userSchema: any;
let userModel: any;

const defineMongooseSchema = () => {
  userSchema = new Schema<User>({
    name: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    rut: { type: String },
    dateOfBirth: { type: Date },
    rol: { type: String },
    status: { type: Boolean }
  }, { timestamps: true })
}

const createMongooseModel = () => {
  userModel = model<User>('User', userSchema);
}

defineMongooseSchema();
createMongooseModel();

const insert = async (userData: User) => {
  const newUser = new userModel(userData)
  const savedUser = await newUser.save()
  return savedUser
}

const list = async () => {
  const users = await userModel.find({});
  return users;
}

const listByStatus = async (status: boolean) => {
  const users = await userModel.find({ status });
  return users;
}

const getById = async (id: string) => {
  const users = await userModel.findById(id);
  return users;
}

const update = async (id: string, dataToUpdate: User) => {
  const updatedUser = await userModel.findByIdAndUpdate(id, dataToUpdate, { new: true });
  return updatedUser;
}

const updatePassword = async (id: string, dataToUpdate: Pick<User, 'password'>) => {
  const updatedUser = await userModel.findByIdAndUpdate(id, dataToUpdate, { new: true });
  return updatedUser;
}

const deleteUser = async (id: string) => {
  const deletedUser = await userModel.findByIdAndDelete(id);
  return deletedUser;
}

const getByEmail = async (email: string) => {
  const user = await userModel.find({ email }).limit(1)
  if (user.length == 0) {
      return null
  }
  return user[0]
}

export default {
  insert,
  list,
  listByStatus,
  update,
  getById,
  deleteUser,
  getByEmail
}