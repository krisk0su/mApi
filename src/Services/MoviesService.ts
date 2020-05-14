import { IMovie, Movie } from "../Schema/Movies";
import mongoose from "mongoose";
import { Genre, IGenre } from "../Schema/Genre";
export const createMovie = async (movie: IMovie) => {
  const genre: string[] = await getGenre(movie.genre);

  const cMovie = new Movie({
    _id: mongoose.Types.ObjectId(),
    ...movie,
    genre,
  });

  //try catch
  const res = await cMovie.save();
  return res;
};

export const getGenre = async (genre: string) => {
  //getting all genres by splitting ,
  const genres: string[] = genre
    .split(",")
    .map((genre: string) => genre.trim());

  const genreIds: string[] = await Promise.all(
    genres.map(async (name: string) => {
      const genre = await getOrCreateGenre(name);
      return genre;
    })
  );

  return genreIds;
};

const getOrCreateGenre = async (name: string) => {
  const res: IGenre = await Genre.findOne({ name });
  //if res is null create it
  if (!res) {
    const genre: IGenre = await Genre.create({
      _id: mongoose.Types.ObjectId(),
      name,
    });
    return genre._id;
  }

  return res._id;
};
