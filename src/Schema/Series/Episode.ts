import mongoose, { Schema, Document, Types } from "mongoose";
import { ISeason } from "./Season";

export interface IEpisode extends Document {
  _id: string;
  name: string;
  link: string;
  parent: ISeason;
}
const EpisodeSchema: Schema = new Schema({
  _id: mongoose.Types.ObjectId,
  name: { type: String, required: true },
  link: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: "Season", required: false },
});

export const Episode = mongoose.model<IEpisode>("Episode", EpisodeSchema);
