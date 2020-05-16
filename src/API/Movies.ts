import express from "express";
import { Movie, IMovie } from "../Schema/Movies";
import { createMovie } from "../Services/MoviesService";
export const router = express.Router();
const pageSize = 20;

try {
  router.get("/all", async (req, res) => {
    console.log("body", req.body);
    const movies: IMovie[] = await Movie.find().where("");
    const count = await Movie.find().count();
    //{ genre: "5ebd224cb19a5613f0d9659a" }
    //.skip(0).limit(10);
    res.send({ movies, count });
  });
  router.post("/all", async (req, res) => {
    const { current, sType } = req.body;
    const take = current * pageSize;
    const skip = take - pageSize;
    if (sType === "search") {
      res.status(200).send({ movies: [], totalPages: 0 });
    } else if (sType === "genre") {
      const { genre } = req.body;
      const count = await Movie.find({ genre }).countDocuments();
      const totalPages = Math.ceil(count / pageSize);
      const movies: IMovie[] = await Movie.find({ genre })
        .skip(skip)
        .limit(pageSize);
      res.status(200).send({ movies, totalPages });
    } else if (sType === "normal") {
      const count = await Movie.find().countDocuments();
      const totalPages = Math.ceil(count / pageSize);
      const movies: IMovie[] = await Movie.find().skip(skip).limit(pageSize);
      res.status(200).send({ movies, totalPages });
    } else {
      res.status(200).send({ movies: [], totalPages: 0 });
    }
  });
  router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const movie: IMovie = await Movie.findById(id);
    res.send(movie);
  });
  router.post("/create", async (req, res) => {
    try {
      //console.log("req", req.body);
      const movie: IMovie = await createMovie(req.body);
      // console.log("movie", movie);
      res
        .status(200)
        .json({ msg: "movie created succesfully", movieId: movie._id });
    } catch (err) {
      console.log("err", err);
      res.status(400).send(`error -> ${err}`);
    }
  });
} catch (err) {
  console.log(err);
}
