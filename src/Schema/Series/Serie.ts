import mongoose, { Schema, Document, Types } from "mongoose";
import { ISeason } from "./Season";

export interface ISerie extends Document {
  _id: string;
  title: string;
  plot: string;
  year: number;
  genre: string[];
  actors: string[];
  poster: string;
  seasons: ISeason[];
  rating: number;
}
const SerieSchema: Schema = new Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  title: { type: String, required: true },
  plot: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: [Schema.Types.ObjectId], ref: "Genre", required: true },
  rating: { type: Number, required: true },
  actors: { type: [String], required: true },
  poster: { type: String, required: true },
  seasons: [{ type: Schema.Types.ObjectId, ref: "Season", required: false }],
});

export const Serie = mongoose.model<ISerie>("Serie", SerieSchema);
