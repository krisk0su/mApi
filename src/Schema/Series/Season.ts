import mongoose, { Schema, Document, Types } from "mongoose";
import { IEpisode } from "./Episode";
import { ISerie } from "./Serie";

export interface ISeason extends Document {
  id: string;
  name: string;
  episodes: IEpisode[];
  parent: ISerie;
  type: string
}
const SeasonSchema: Schema = new Schema({
  id: mongoose.Types.ObjectId,
  name: { type: String, required: true },
  episodes: [{ type: Schema.Types.ObjectId, ref: "Episode", required: false }],
  parent: { type: Schema.Types.ObjectId, ref: "Serie", required: false },
  type: { type: String, required: false },
});

export const Season = mongoose.model<ISeason>("Season", SeasonSchema);
