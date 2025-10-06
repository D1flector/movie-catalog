import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { MovieListItem, MovieDetails } from "../types/movie";
import type { TvListItem, TvDetails } from "../types/tv";
import type { PaginatedResponse } from "../types/api";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    getPopularMovies: build.query<PaginatedResponse<MovieListItem>, number | void>({
      query: (page = 1) => `/movie/popular?api_key=${API_KEY}&language=ru-RU&page=${page}`,
    }),
    getTopRatedMovies: build.query<PaginatedResponse<MovieListItem>, number | void>({
      query: (page = 1) => `/movie/top_rated?api_key=${API_KEY}&language=ru-RU&page=${page}`,
    }),
    getNowPlayingMovies: build.query<PaginatedResponse<MovieListItem>, number | void>({
      query: (page = 1) => `/movie/now_playing?api_key=${API_KEY}&language=ru-RU&page=${page}`,
    }),    
    getMovieDetails: build.query<MovieDetails, number>({
      query: (id) => `/movie/${id}?api_key=${API_KEY}&language=ru-RU&append_to_response=videos,credits`,
    }),
    getPopularTvShows: build.query<PaginatedResponse<TvListItem>, number | void>({
      query: (page = 1) => `/tv/popular?api_key=${API_KEY}&language=ru-RU&page=${page}`,
    }),
    getTopRatedTvShows: build.query<PaginatedResponse<TvListItem>, number | void>({
      query: (page = 1) => `/tv/top_rated?api_key=${API_KEY}&language=ru-RU&page=${page}`,
    }),
    getOnTheAirTvShows: build.query<PaginatedResponse<TvListItem>, number | void>({
      query: (page = 1) => `/tv/on_the_air?api_key=${API_KEY}&language=ru-RU&page=${page}`,
    }), 
    getTvShowDetails: build.query<TvDetails, number>({
      query: (id) => `/tv/${id}?api_key=${API_KEY}&language=ru-RU&append_to_response=videos,credits`,
    }),

  })
})

export const {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetMovieDetailsQuery,
  useGetPopularTvShowsQuery,
  useGetTopRatedTvShowsQuery,
  useGetOnTheAirTvShowsQuery,
  useGetTvShowDetailsQuery,
} = api;