import { useMediaList } from '../hooks/useMediaList';
import type { MediaSortType } from '../hooks/useMediaList';
import TvCard from '../components/TvCard';
import '../styles/MoviesPage.scss';

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

  if (isLoading) {
    return <div className="movies-page__loader">Загрузка...</div>;
  }

  if (error) {
    return <div className="movies-page__error">Произошла ошибка при загрузке сериалов.</div>;
  }
  
  const onSortChange = (type: MediaSortType) => handleSortChange(type);

  return (
    <div className="movies-page">
      <div className="movies-page__header">
        <h1 className="movies-page__title">
          {sortType === 'popular' && 'Популярные сериалы'}
          {sortType === 'top_rated' && 'Сериалы с высоким рейтингом'}
          {sortType === 'on_the_air' && 'Сейчас в эфире'}
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
            className={`filter-button ${sortType === 'on_the_air' ? 'active' : ''}`}
            onClick={() => onSortChange('on_the_air')}
          >
            В эфире
          </button>
        </div>
      </div>

      <div className="movies-page__list">
        {data && data.results.map(tvShow => (
          <TvCard key={tvShow.id} tvShow={tvShow} />
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

export default TvShowsPage;