import { IMovie, Movie } from "../Schema/Movies";
import mongoose from "mongoose";
export const createMovie = async (movie: IMovie) => {
  const cMovie = new Movie({
    _id: mongoose.Types.ObjectId(),
    ...movie,
  });

  //try catch
  const res = await cMovie.save();
  return res;
};
