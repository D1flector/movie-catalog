import type { Genre } from "./common";

export interface MovieListItem {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string | null;
  genre_ids: number[];
}

interface Video {
  id: string;
  key: string; 
  name: string;
  site: 'YouTube';
  type: 'Trailer' | 'Teaser';
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface MovieDetails extends Omit<MovieListItem, 'genre_ids'> {
  genres: Genre[];
  tagline: string | null;
  runtime: number | null;
  videos?: {
    results: Video[];
  };
  credits?: {
    cast: CastMember[];
  };
}