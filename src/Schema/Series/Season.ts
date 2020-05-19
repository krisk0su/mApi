import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISeason extends Document {
  _id: string;
  episodes: string[];
}
const SeasonSchema: Schema = new Schema({
  _id: mongoose.Types.ObjectId,
  episodes: { type: [Schema.Types.ObjectId], ref: "Episode", required: false },
});

export const Season = mongoose.model<ISeason>("Season", SeasonSchema);
