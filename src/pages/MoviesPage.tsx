import React, { useState } from 'react';
import { useGetPopularMoviesQuery,useGetTopRatedMoviesQuery } from '../services/api';
import '../styles/MoviesPage.scss';

type MovieSortType = 'popular' | 'top_rated';

const getRatingColor = (rating: number): string => {
  if (rating >= 7) return 'green';
  if (rating >= 5) return 'orange';
  return 'red';
};

const MoviesPage = () => {
  const [sortType, setSortType] = useState<MovieSortType>('popular');

  const { 
    data: popularMoviesData, 
    isLoading: isPopularLoading, 
    error: popularError 
  } = useGetPopularMoviesQuery(undefined, {
    skip: sortType !== 'popular',
  });

  const { 
    data: topRatedMoviesData, 
    isLoading: isTopRatedLoading, 
    error: topRatedError 
  } = useGetTopRatedMoviesQuery(undefined, {
    skip: sortType !== 'top_rated',
  });
  
  const data = sortType === 'popular' ? popularMoviesData : topRatedMoviesData;
  const isLoading = isPopularLoading || isTopRatedLoading;
  const error = popularError || topRatedError;

  if (isLoading) {
    return <div className="movies-page__loader">Загрузка...</div>;
  }

  if (error) {
    return <div className="movies-page__error">Произошла ошибка при загрузке фильмов.</div>;
  }

  return (
    <div className="movies-page">
      <div className="movies-page__header">
        <h1 className="movies-page__title">
          {sortType === 'popular' ? 'Популярные фильмы' : 'Фильмы с высоким рейтингом'}
        </h1>
        
        <div className="movies-page__filters">
          <button 
            className={`filter-button ${sortType === 'popular' ? 'active' : ''}`}
            onClick={() => setSortType('popular')}
          >
            Популярные
          </button>
          <button 
            className={`filter-button ${sortType === 'top_rated' ? 'active' : ''}`}
            onClick={() => setSortType('top_rated')}
          >
            Топ рейтинга
          </button>
        </div>
      </div>

      <div className="movies-page__list">
        {data && data.results.map(movie => (
          <div key={movie.id} className="movie-card">
            <div className="movie-card__poster-wrapper">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-card__poster"
                  loading="lazy"
                />
              ) : (
                <div className="movie-card__poster-placeholder">
                  <span>Постер недоступен</span>
                </div>
              )}
            </div>

            <div className="movie-card__info">
              <h3 className="movie-card__title">{movie.title}</h3>
              <div className={`movie-card__rating movie-card__rating--${getRatingColor(movie.vote_average)}`}>
                {movie.vote_average.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;