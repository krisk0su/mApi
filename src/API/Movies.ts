import express from "express";
import { Movie, IMovie } from "../Schema/Movies";
import { createMovie } from "../Services/MoviesService";
export const router = express.Router();

router.get("/all", async (req, res) => {
  console.log("body", req.body)
  const movies: IMovie[] = await Movie.find().where("");
  //{ genre: "5ebd224cb19a5613f0d9659a" }
  //.skip(0).limit(10);
  res.send(movies);
});
router.post("/all", async (req, res) => {
  const movies: IMovie[] = await Movie.find();
  //{ genre: "5ebd224cb19a5613f0d9659a" }
  //.skip(0).limit(10);
  res.send(movies);
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
