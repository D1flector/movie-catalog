import React from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetNowPlayingMoviesQuery
} from '../services/api';
import MovieCard from '../components/MovieCard'; 
import '../styles/MoviesPage.scss';

type MovieSortType = 'popular' | 'top_rated' | 'now_playing';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortType = (searchParams.get('sort') as MovieSortType) || 'popular';

  const { 
    data: popularMoviesData, 
    isLoading: isPopularLoading, 
    error: popularError 
  } = useGetPopularMoviesQuery(undefined, { skip: sortType !== 'popular' });

  const { 
    data: topRatedMoviesData, 
    isLoading: isTopRatedLoading, 
    error: topRatedError 
  } = useGetTopRatedMoviesQuery(undefined, { skip: sortType !== 'top_rated' });

  const { 
    data: nowPlayingMoviesData, 
    isLoading: isNowPlayingLoading, 
    error: nowPlayingError 
  } = useGetNowPlayingMoviesQuery(undefined, { skip: sortType !== 'now_playing' });
  
  const dataMap = {
    popular: popularMoviesData,
    top_rated: topRatedMoviesData,
    now_playing: nowPlayingMoviesData,
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
  
  if (isLoading) {
    return <div className="movies-page__loader">Загрузка...</div>;
  }

  if (error) {
    return <div className="movies-page__error">Произошла ошибка при загрузке фильмов.</div>;
  }

  const handleSortChange = (type: MovieSortType) => {
    setSearchParams({ sort: type });
  };

  return (
    <div className="movies-page">
      <div className="movies-page__header">
        <h1 className="movies-page__title">
          {sortType === 'popular' && 'Популярные фильмы'}
          {sortType === 'top_rated' && 'Фильмы с высоким рейтингом'}
          {sortType === 'now_playing' && 'Сейчас в кино'}
        </h1>
        
        <div className="movies-page__filters">
          <button 
            className={`filter-button ${sortType === 'popular' ? 'active' : ''}`}
            onClick={() => handleSortChange('popular')}
          >
            Популярные
          </button>
          <button 
            className={`filter-button ${sortType === 'top_rated' ? 'active' : ''}`}
            onClick={() => handleSortChange('top_rated')}
          >
            Топ рейтинга
          </button>
          <button 
            className={`filter-button ${sortType === 'now_playing' ? 'active' : ''}`}
            onClick={() => handleSortChange('now_playing')}
          >
            Сейчас в кино
          </button>
        </div>
      </div>

      <div className="movies-page__list">
        {data && data.results.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;