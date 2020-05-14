import { Genre } from "../Schema/Genre";

export const getAllGenres = async () => {
    const genres = await Genre.find();
    return genres;
}