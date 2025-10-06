import { useSearchParams } from 'react-router-dom';
import {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetNowPlayingMoviesQuery,
} from '../services/api';

export type MediaSortType = 'popular' | 'top_rated' | 'now_playing';

export const useMediaList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortType = (searchParams.get('sort') as MediaSortType) || 'popular';
  const pageFromUrl = searchParams.get('page');
  const currentPage = Number(pageFromUrl) || 1;

  const { 
    data: popularData, 
    isLoading: isPopularLoading, 
    error: popularError 
  } = useGetPopularMoviesQuery(currentPage, { skip: sortType !== 'popular' });

  const { 
    data: topRatedData, 
    isLoading: isTopRatedLoading, 
    error: topRatedError 
  } = useGetTopRatedMoviesQuery(currentPage, { skip: sortType !== 'top_rated' });

  const { 
    data: nowPlayingData, 
    isLoading: isNowPlayingLoading, 
    error: nowPlayingError 
  } = useGetNowPlayingMoviesQuery(currentPage, { skip: sortType !== 'now_playing' });
  
  const dataMap = {
    popular: popularData,
    top_rated: topRatedData,
    now_playing: nowPlayingData,
  };
  const isLoadingMap = {
    popular: isPopularLoading,
    top_rated: isTopRatedLoading,
    now_playing: isNowPlayingLoading,
  };
  const errorMap = {
    popular: popularError,
    top_rated: topRatedError,
    now_playing: nowPlayingError,
  };

  const data = dataMap[sortType];
  const isLoading = isLoadingMap[sortType];
  const error = errorMap[sortType];

  const handlePageChange = (newPage: number) => {
    const params = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...params, page: String(newPage) });
  };  

  const handleSortChange = (type: MediaSortType) => {
    setSearchParams({ sort: type, page: '1' });
  };

  return {
    data,
    isLoading,
    error,
    sortType,
    currentPage,
    handlePageChange,
    handleSortChange,
  };
};