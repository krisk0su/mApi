import mongoose, { Schema, Document } from "mongoose";

export interface IGenre extends Document {
  _id: string;
  name: string;
}
const GenreSchema: Schema = new Schema({
  _id: mongoose.Types.ObjectId,
  name: { type: String, required: true },
});

export const Genre = mongoose.model<IGenre>("Genre", GenreSchema);
