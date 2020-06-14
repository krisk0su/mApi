import express from "express";
import { Movie, IMovie } from "../Schema/Movies";
import { createMovie } from "../Services/MoviesService";
export const MoviesRouter = express.Router();
const pageSize = 20;

try {
  MoviesRouter.post("/search", async (req, res) => {
    console.log("body", req.body);
    const { currentPage, searchPhrase } = req.body;
    const take = currentPage * pageSize;
    const skip = take - pageSize;

    const count = await Movie.find({
      title: { $regex: `${searchPhrase}`, $options: "i" },
    }).countDocuments();

    console.log("count", count);
    const totalPages = Math.ceil(count / pageSize);
    const movies: IMovie[] = await Movie.find({
      title: { $regex: `${searchPhrase}`, $options: "i" },
    })
      .skip(skip)
      .limit(pageSize);
    res.status(200).send({ movies, totalPages });
  });
  MoviesRouter.post("/genre", async (req, res) => {
    console.log("genre", req.body);
    const { currentPage, genre } = req.body;
    const take = currentPage * pageSize;
    const skip = take - pageSize;

    const count = await Movie.find({
      genre,
    }).countDocuments();

    const totalPages = Math.ceil(count / pageSize);
    const movies: IMovie[] = await Movie.find({
      genre,
    })
      .skip(skip)
      .limit(pageSize);
    res.status(200).send({ movies, totalPages });
  });
  MoviesRouter.post("/all", async (req, res) => {
    const { currentPage } = req.body;
    const take = currentPage * pageSize;
    const skip = take - pageSize;

    const count = await Movie.find().countDocuments();
    const totalPages = Math.ceil(count / pageSize);
    const movies: IMovie[] = await Movie.find().skip(skip).limit(pageSize);
    res.status(200).send({ movies, totalPages });
  });
  MoviesRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    console.log("id", id);
    const movie: IMovie = await Movie.findById(id);
    res.send(movie);
  });
  MoviesRouter.post("/create", async (req, res) => {
    const movie: IMovie = await createMovie(req.body);
    res
      .status(200)
      .json({ msg: "movie created succesfully", movieId: movie._id });
  });
} catch (err) {
  console.log(err);
}
