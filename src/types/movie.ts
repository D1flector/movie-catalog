import type { Genre } from "./common";

export interface MovieListItem {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string | null;
  genre_ids: number[];
}

export interface MovieDetails extends Omit<MovieListItem, 'genre_ids'> {
  genres: Genre[];
}