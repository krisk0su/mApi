import { ISerie, Serie } from "../Schema/Series/Serie";
import { getGenre } from "../lib/universal";
import { ISerieRequest } from "../Request/ISerieRequest";
import { Season, ISeason } from "../Schema/Series/Season";

import express from "express";
import mongoose from "mongoose";
import { IEpisode, Episode } from "../Schema/Series/Episode";

export const SeriesRouter = express.Router();
const pageSize = 20;

try {
  SeriesRouter.post("/create", async (req, res) => {
    const serie: ISerieRequest = req.body;
    const result = await CreateSerie(serie);

    res.status(200).send(result);
  });

  SeriesRouter.get("/:id", async (req, res) => {
    console.log("req", req.params);
    const id = req.params.id;
    const serie: ISerie = await Serie.findById(id).populate("seasons");
    console.log("serie", serie);
    res.status(200).send(serie);
  });

  SeriesRouter.post("/all", async (req, res) => {
    console.log("body", req.body);
    const { currentPage } = req.body;

    const take = currentPage * pageSize;
    const skip = take - pageSize;

    const count = await Serie.find().countDocuments();
    const totalPages = Math.ceil(count / pageSize);
    const series: ISerie[] = await Serie.find().skip(skip).limit(pageSize);
    res.status(200).send({ series, totalPages });
  });

  SeriesRouter.post("/episode", async (req, res) => {
    const reqEpisode = req.body;
    const episode: IEpisode = new Episode({
      _id: mongoose.Types.ObjectId(),
      name: reqEpisode.name,
      link: reqEpisode.link,
    });
    const savedEpisode = await episode.save();
    console.log("savedEpisode", savedEpisode);
    const currentSeason = await Season.findById(reqEpisode.seasonId);
    console.log("currentSeason", currentSeason);
    currentSeason.episodes.push(savedEpisode);
    const savedSeason = await currentSeason.save();
    console.log("savedSeason", savedSeason);
    res.status(200).send(true);
  });
  SeriesRouter.get("/season/:id", async (req, res) => {
    const id = req.params.id;

    const season: ISeason = await Season.findById(id).populate("episodes");
    console.log("season", season);
    res.status(200).send(season);
  });
} catch (err) {
  console.log("err", err);
}
/**
 *
 * @param serie
 * while creating serie seasons are automatically generated
 */
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
//seasons creation
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
