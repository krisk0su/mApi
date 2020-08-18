import mongoose, { Schema, Document, Types } from "mongoose";

export interface IEpisode extends Document {
  _id: string;
  name: string;
  link: string;
}
const EpisodeSchema: Schema = new Schema({
  _id: mongoose.Types.ObjectId,
  name: { type: String, required: true },
  link: { type: String, required: true },
});

export const Episode = mongoose.model<IEpisode>("Episode", EpisodeSchema);
