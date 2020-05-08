import mongoose, { Schema, Document } from "mongoose";

export interface IMovie extends Document {
  _id: string;
  title: string;
  plot: string;
  year: number;
  genre: string[];
  actors: string[];
  poster: string;
  link1: string;
  link2?: string;
  link3?: string;
}
const MovieSchema: Schema = new Schema({
  _id: mongoose.Types.ObjectId,
  title: { type: String, required: true },
  plot: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: [String], required: true },
  actors: { type: [String], required: true },
  poster: { type: String, required: true },
  link1: { type: String, required: true },
  link2: { type: String, required: false },
  link3: { type: String, required: false },
});

export const Movie = mongoose.model<IMovie>("Movie", MovieSchema);
