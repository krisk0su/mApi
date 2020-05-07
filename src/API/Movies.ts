import express from "express";
import { Movie } from "../Schema/Movies";
import { createMovie } from "../Services/MoviesService";
export const router = express.Router();

router.get("/all", async (req, res) => {
  const movies = await Movie.find({}, (err, movies) => {
    console.log("movies", movies);
  });
  res.send("hello from movies");
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Movie.findById(id);
  res.send(result);
});
router.post("/create", async (req, res) => {
  const asd = await createMovie(req.body);
  console.log("asd", asd);
  res.send(asd);
});
