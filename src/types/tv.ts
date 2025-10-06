import type { Genre } from "./common";

export interface TvListItem {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  first_air_date: string;
  overview: string | null;
  genre_ids: number[];
}

interface Video {
  id: string;
  key: string; 
  name: string;
  site: 'YouTube';
  type: 'Trailer' | 'Teaser' | 'Featurette';
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface Creator {
  id: number;
  name: string;
  profile_path: string | null;
}

export interface TvDetails extends Omit<TvListItem, 'genre_ids'> {
  genres: Genre[];
  created_by: Creator[];
  episode_run_time: number[];
  last_air_date: string | null;
  number_of_seasons: number;
  number_of_episodes: number;
  status: string;
  videos?: {
    results: Video[];
  };
  credits?: {
    cast: CastMember[];
  };
}