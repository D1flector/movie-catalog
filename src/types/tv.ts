import type { Genre } from "./common";

export interface TvListItem {
  id: number;
  name: string;
  poster_path: string | null;
  vote_average: number;
  first_air_date: string;
  overview: string | null;
  genre_ids: number[];
}

export interface TvDetails extends Omit<TvListItem, 'genre_ids'> {
  genres: Genre[];
}