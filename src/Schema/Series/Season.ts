import mongoose, { Schema, Document, Types } from "mongoose";
import { IEpisode } from "./Episode";

export interface ISeason extends Document {
  id: string;
  name: string;
  episodes: IEpisode[];
}
const SeasonSchema: Schema = new Schema({
  id: mongoose.Types.ObjectId,
  name: { type: String, required: true },
  episodes: [
    { type: [Schema.Types.ObjectId], ref: "Episode", required: false },
  ],
});

export const Season = mongoose.model<ISeason>("Season", SeasonSchema);
