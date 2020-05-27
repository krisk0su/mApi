import { IMovie, Movie } from "../Schema/Movies";
import mongoose from "mongoose";
import { getGenre } from "../lib/universal";
import { Season } from "../Schema/Series/Season";

export const createMovie = async (movie: any) => {
  const genre: string[] = await getGenre(movie.genre);
  const cMovie = new Movie({
    _id: mongoose.Types.ObjectId(),
    ...movie,
    genre,
  });

  //try catch
  const res = await cMovie.save();
  console.log("res movie", res);
  return res;
};
