import express from "express";
import { ISerie, Serie } from "../Schema/Series/Serie";
import mongoose from "mongoose";
import { getGenre } from "../lib/universal";
import { ISerieRequest } from "../Request/ISerieRequest";
import { Season, ISeason } from "../Schema/Series/Season";
import { createServer } from "https";
export const SeriesRouter = express.Router();

try {
  SeriesRouter.post("/create", async (req, res) => {
    const serie: ISerieRequest = req.body;
    const result = await CreateSerie(serie);

    res.status(200).send(result);
  });

  SeriesRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const serie: ISerie = await Serie.findById(id).populate("seasons");
    console.log("serie", serie);
    res.status(200).send(serie);
  });
} catch (err) {
  console.log("err", err);
}
const CreateSeasons = async (seasons: number) => {
  let seasonArr: ISeason[] = [];
  for (let i = 0; i < seasons; i++) {
    const season: ISeason = new Season({
      _id: mongoose.Types.ObjectId(),
      name: `Season ${i + 1}`,
    });
    const res = await season.save();
    seasonArr.push(res);
  }
  return seasonArr;
};
const CreateSerie = async (serie: ISerieRequest) => {
  const genre: string[] = await getGenre(serie.genre);
  const seasons: ISeason[] = await CreateSeasons(serie.seasons);
  const cSerie: ISerie = new Serie({
    _id: mongoose.Types.ObjectId(),
    ...serie,
    genre,
    seasons,
  });
  const res = await cSerie.save();
  return res;
};
