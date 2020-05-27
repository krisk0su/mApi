import express from "express";
import { ISerie, Serie } from "../Schema/Series/Serie";
import mongoose from "mongoose";
import { getGenre } from "../lib/universal";
import { ISerieRequest } from "../Request/ISerieRequest";
import { Season, ISeason } from "../Schema/Series/Season";
export const SeriesRouter = express.Router();

try {
  SeriesRouter.post("/create", async (req, res) => {
    const serie: ISerieRequest = req.body;
    const result = await CreateSerie(serie);
  });

  SeriesRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const serie: ISerie = await Serie.findById(id);
    res.send(serie);
  });
} catch (err) {
  console.log("err", err);
}
const createSeason = async () => {
  const season = await Season.create({
    _id: mongoose.Types.ObjectId(),
  });
  console.log("season", season);
  return season;
};
const CreateSeasons = async (seasons: number) => {
  let seasonArr: ISeason[] = [];
  for (let i = 0; i < seasons; i++) {
    const season: ISeason = await Season.create({
      _id: mongoose.Types.ObjectId(),
    });
    seasonArr.push(season);
  }
  return seasonArr;
};
const CreateSerie = async (serie: ISerieRequest) => {
  const genre: string[] = await getGenre(serie.genre);
  const seasons: ISeason[] = await CreateSeasons(serie.seasons);
  const cSerie: ISerie = await Serie.create({
    _id: mongoose.Types.ObjectId(),
    ...serie,
    genre,
    seasons,
  });
  console.log("serie", cSerie);
};
