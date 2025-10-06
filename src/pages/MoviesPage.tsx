import{ useMediaList } from '../hooks/useMediaList';
import type { MediaSortType } from '../hooks/useMediaList';
import MovieCard from '../components/MovieCard'; 
import '../styles/MediaListPage.scss';

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

  if (isLoading) {
    return <div className="media-list-page__loader">Загрузка...</div>;
  }

  if (error) {
    return <div className="media-list-page__error">Произошла ошибка при загрузке фильмов.</div>;
  }
  
  const onSortChange = (type: MediaSortType) => handleSortChange(type);

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
          >
            Популярные
          </button>
          <button 
            className={`filter-button ${sortType === 'top_rated' ? 'active' : ''}`}
            onClick={() => onSortChange('top_rated')}
          >
            Топ рейтинга
          </button>
          <button 
            className={`filter-button ${sortType === 'now_playing' ? 'active' : ''}`}
            onClick={() => onSortChange('now_playing')}
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
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination__button"
          >
            Назад
          </button>
          <span className="pagination__info">
            Страница {currentPage} из {data.total_pages > 500 ? 500 : data.total_pages}
          </span>
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= (data.total_pages > 500 ? 500 : data.total_pages)}
            className="pagination__button"
          >
            Вперед
          </button>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;