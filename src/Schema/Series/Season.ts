import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISeason extends Document {
  id: string;
  episodes: string[];
}
const SeasonSchema: Schema = new Schema({
  id: mongoose.Types.ObjectId,
  episodes: { type: [Schema.Types.ObjectId], ref: "Episode", required: false },
});

export const Season = mongoose.model<ISeason>("Season", SeasonSchema);
