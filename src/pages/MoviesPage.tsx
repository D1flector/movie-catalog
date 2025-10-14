import React, { useState, useCallback } from 'react';
import { useMediaList } from '../hooks/useMediaList';
import type { MediaSortType } from '../hooks/useMediaList';
import MovieCard from '../components/MovieCard'; 
import '../styles/MediaListPage.scss';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagintaion from '../components/Pagination';

const MoviesPage = () => {
  const {
    data,
    isLoading,
    error,
    sortType,
    currentPage,
    handlePageChange,
    handleSortChange,
  } = useMediaList('movie');
  
  const [isClickBlocked, setIsClickBlocked] = useState(false);
  const BLOCK_DURATION_MS = 500;

  const blockAndPerformAction = useCallback((action: () => void) => {
    if (isClickBlocked || isLoading) {
      return;
    }
    
    setIsClickBlocked(true);
    action();
    
    const timer = setTimeout(() => {
      setIsClickBlocked(false);
    }, BLOCK_DURATION_MS);

    return () => clearTimeout(timer);
    
  }, [isClickBlocked, isLoading]); 


  if (isLoading && currentPage === 1 && (sortType === 'popular' || sortType === 'top_rated' || sortType === 'now_playing')) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="media-list-page__error">Произошла ошибка при загрузке фильмов.</div>;
  }
  
  const onSortChange = (type: MediaSortType) => {
    blockAndPerformAction(() => handleSortChange(type));
  };
  
  const onPageChange = (page: number) => {
    blockAndPerformAction(() => {
      handlePageChange(page);
      
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };


  return (
    <div className="media-list-page">
      <div className="media-list-page__header">
        <h1 className="media-list-page__title">
          {sortType === 'popular' && 'Популярные фильмы'}
          {sortType === 'top_rated' && 'Фильмы с высоким рейтингом'}
          {sortType === 'now_playing' && 'Сейчас в кино'}
        </h1>
        
        <div className="media-list-page__filters">
          <button 
            className={`filter-button ${sortType === 'popular' ? 'active' : ''}`}
            onClick={() => onSortChange('popular')}
            disabled={isClickBlocked || isLoading}
          >
            Популярные
          </button>
          <button 
            className={`filter-button ${sortType === 'top_rated' ? 'active' : ''}`}
            onClick={() => onSortChange('top_rated')}
            disabled={isClickBlocked || isLoading}
          >
            Топ рейтинга
          </button>
          <button 
            className={`filter-button ${sortType === 'now_playing' ? 'active' : ''}`}
            onClick={() => onSortChange('now_playing')}
            disabled={isClickBlocked || isLoading}
          >
            Сейчас в кино
          </button>
        </div>
      </div>

      <div className="media-list-page__list">
        {data && data.results.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {data && data.results.length > 0 && (
        <Pagintaion
          currentPage={currentPage}
          totalPages={data.total_pages}
          onPageChange={onPageChange}
          isLoading={isLoading}
          isClickBlocked={isClickBlocked}
        />
      )}
    </div>
  );
};

export default MoviesPage;