import type { Genre } from "./common";

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string | null;
  genres: Genre[];
}