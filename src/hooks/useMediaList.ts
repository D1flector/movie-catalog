import { useSearchParams } from 'react-router-dom';
import {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetPopularTvShowsQuery,
  useGetTopRatedTvShowsQuery,
  useGetOnTheAirTvShowsQuery,
} from '../services/api';
import type { PaginatedResponse } from '../types/api';
import type { MovieListItem } from '../types/movie';
import type { TvListItem } from '../types/tv';

export type MediaSortType = 'popular' | 'top_rated' | 'now_playing' | 'on_the_air';
export type MediaType = 'movie' | 'tv';

export const useMediaList = (mediaType: MediaType) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortType = (searchParams.get('sort') as MediaSortType) || 'popular';
  const pageFromUrl = searchParams.get('page');
  const currentPage = Number(pageFromUrl) || 1;

  const { 
    data: popularMovies, 
    isLoading: isPopularMoviesLoading, 
    error: popularMoviesError 
  } = useGetPopularMoviesQuery(currentPage, { skip: mediaType !== 'movie' || sortType !== 'popular' });

  const { 
    data: topRatedMovies, 
    isLoading: isTopRatedMoviesLoading, 
    error: topRatedMoviesError 
  } = useGetTopRatedMoviesQuery(currentPage, { skip: mediaType !== 'movie' || sortType !== 'top_rated' });

  const { 
    data: nowPlayingMovies, 
    isLoading: isNowPlayingMoviesLoading, 
    error: nowPlayingMoviesError 
  } = useGetNowPlayingMoviesQuery(currentPage, { skip: mediaType !== 'movie' || sortType !== 'now_playing' });
  
  const { 
    data: popularTv, 
    isLoading: isPopularTvLoading, 
    error: popularTvError 
  } = useGetPopularTvShowsQuery(currentPage, { skip: mediaType !== 'tv' || sortType !== 'popular' });

  const { 
    data: topRatedTv, 
    isLoading: isTopRatedTvLoading, 
    error: topRatedTvError 
  } = useGetTopRatedTvShowsQuery(currentPage, { skip: mediaType !== 'tv' || sortType !== 'top_rated' });

  const { 
    data: onTheAirTv, 
    isLoading: isOnTheAirTvLoading, 
    error: onTheAirTvError 
  } = useGetOnTheAirTvShowsQuery(currentPage, { skip: mediaType !== 'tv' || sortType !== 'on_the_air' });

  const movieDataMap = {
    popular: popularMovies,
    top_rated: topRatedMovies,
    now_playing: nowPlayingMovies,
  };

  const movieIsLoadingMap = {
    popular: isPopularMoviesLoading,
    top_rated: isTopRatedMoviesLoading,
    now_playing: isNowPlayingMoviesLoading,
  };

  const movieErrorMap = {
    popular: popularMoviesError,
    top_rated: topRatedMoviesError,
    now_playing: nowPlayingMoviesError,
  };

  const tvDataMap = {
    popular: popularTv,
    top_rated: topRatedTv,
    on_the_air: onTheAirTv,
  };

  const tvIsLoadingMap = {
    popular: isPopularTvLoading,
    top_rated: isTopRatedTvLoading,
    on_the_air: isOnTheAirTvLoading,
  };
  
  const tvErrorMap = {
    popular: popularTvError,
    top_rated: topRatedTvError,
    on_the_air: onTheAirTvError,
  };

  const data = mediaType === 'movie' 
    ? movieDataMap[sortType as keyof typeof movieDataMap] 
    : tvDataMap[sortType as keyof typeof tvDataMap];

  const isLoading = mediaType === 'movie'
    ? movieIsLoadingMap[sortType as keyof typeof movieIsLoadingMap]
    : tvIsLoadingMap[sortType as keyof typeof tvIsLoadingMap];
    
  const error = mediaType === 'movie'
    ? movieErrorMap[sortType as keyof typeof movieErrorMap]
    : tvErrorMap[sortType as keyof typeof tvErrorMap];

  const handlePageChange = (newPage: number) => {
    const params = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...params, page: String(newPage) });
  };  

  const handleSortChange = (type: MediaSortType) => {
    setSearchParams({ sort: type, page: '1' });
  };

  return {
    data: data as PaginatedResponse<MovieListItem | TvListItem> | undefined,
    isLoading: !!isLoading,
    error,
    sortType,
    currentPage,
    handlePageChange,
    handleSortChange,
  };
};