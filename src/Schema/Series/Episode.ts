import mongoose, { Schema, Document, Types } from "mongoose";

export interface IEpisode extends Document {
  _id: string;
  link1: string;
}
const EpisodeSchema: Schema = new Schema({
  _id: mongoose.Types.ObjectId,
  link1: { type: String, required: true },
});

export const Episode = mongoose.model<IEpisode>("Episode", EpisodeSchema);
