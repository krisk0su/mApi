import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
}
const UserSchema: Schema = new Schema({
  _id: mongoose.Types.ObjectId,
  username: { Type: String, required: true, unique: true },
  email: { Type: String, required: true, unique: true },
  password: { Type: String, required: true },
});

export const User = mongoose.model<IUser>("User", UserSchema);
