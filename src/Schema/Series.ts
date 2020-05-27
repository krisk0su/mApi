import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISerie extends Document {
  _id: string;
  title: string;
  plot: string;
  year: number;
  genre: string;
  actors: string[];
  poster: string;
  trailer: string;
}
const SerieSchema: Schema = new Schema({
  _id: mongoose.Types.ObjectId,
  title: { type: String, required: true },
  plot: { type: String, required: true },
  year: { type: Number, required: true },
  rating: { type: Number, required: true },
  actors: { type: [String], required: true },
  poster: { type: String, required: true },
  trailer: { type: String, required: true },
  genre: { type: [Schema.Types.ObjectId], ref: "Genre", required: true },
});

export const Serie = mongoose.model<ISerie>("Serie", SerieSchema);
