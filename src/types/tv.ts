import type { Genre } from "./common";

export interface Tv {
  id: number;
  name: string;
  poster_path: string | null;
  vote_average: number;
  first_air_date: string;
  overview: string | null;
  genres: Genre[];
}