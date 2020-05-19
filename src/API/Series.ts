import express from "express";
import { ISerie, Serie } from "../Schema/Series/Serie";
import mongoose from "mongoose";
import { getGenre } from "./lib/universal";
export const SeriesRouter = express.Router();

try {
  SeriesRouter.post("/create", async (req, res) => {
    try {
      const serie = await CreateSerie(req.body);
      res.status(200).json({ msg: "serie created succesfully" });
    } catch (err) {
      console.log("err", err);
      res.status(400).send(`error -> ${err}`);
    }
  });
} catch (err) {
  console.log(err);
}
SeriesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const serie: ISerie = await Serie.findById(id);
  res.send(serie);
});

const CreateSerie = async (serie: ISerie) => {
  const genre: string[] = await getGenre(serie.genre);
  const cSerie: ISerie = await new Serie({
    _id: mongoose.Types.ObjectId(),
    ...serie,
    year: +serie.year,
    genre,
  });
  const res = await cSerie.save();
};
