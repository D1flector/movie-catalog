import React, { useState, useCallback } from 'react';
import { useMediaList } from '../hooks/useMediaList';
import type { MediaSortType } from '../hooks/useMediaList';
import TvCard from '../components/TvCard';
import '../styles/MediaListPage.scss';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';

const TvShowsPage = () => {
  const {
    data,
    isLoading,
    error,
    sortType,
    currentPage,
    handlePageChange,
    handleSortChange,
  } = useMediaList('tv');
  
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


  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="media-list-page__error">Произошла ошибка при загрузке сериалов.</div>;
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
          {sortType === 'popular' && 'Популярные сериалы'}
          {sortType === 'top_rated' && 'Сериалы с высоким рейтингом'}
          {sortType === 'on_the_air' && 'Сейчас в эфире'}
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
            className={`filter-button ${sortType === 'on_the_air' ? 'active' : ''}`}
            onClick={() => onSortChange('on_the_air')}
            disabled={isClickBlocked || isLoading}
          >
            В эфире
          </button>
        </div>
      </div>

      <div className="media-list-page__list">
        {data && data.results.map(tvShow => (
          <TvCard key={tvShow.id} tvShow={tvShow} />
        ))}
      </div>

      {data && data.results.length > 0 && (
        <Pagination
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

export default TvShowsPage;