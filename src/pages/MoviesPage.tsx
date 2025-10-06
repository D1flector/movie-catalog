import{ useMediaList } from '../hooks/useMediaList';
import type { MediaSortType } from '../hooks/useMediaList';
import MovieCard from '../components/MovieCard'; 
import '../styles/MoviesPage.scss';

const MoviesPage = () => {
  const {
    data,
    isLoading,
    error,
    sortType,
    currentPage,
    handlePageChange,
    handleSortChange,
  } = useMediaList();

  if (isLoading) {
    return <div className="movies-page__loader">Загрузка...</div>;
  }

  if (error) {
    return <div className="movies-page__error">Произошла ошибка при загрузке фильмов.</div>;
  }
  
  const onSortChange = (type: MediaSortType) => handleSortChange(type);

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

      <div className="movies-page__list">
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