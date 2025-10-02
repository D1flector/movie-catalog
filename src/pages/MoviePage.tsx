import { useParams, useNavigate } from 'react-router-dom';
import { useGetMovieDetailsQuery } from '../services/api';
import '../styles/MoviePage.scss';

const formatRuntime = (minutes: number | null) => {
  if (!minutes) return '';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}ч ${mins}м`;
};

const MoviePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);

  const { data: movie, isLoading, error } = useGetMovieDetailsQuery(movieId, { skip: !movieId });

  if (isLoading) return <div className="movie-page-status">Загрузка...</div>;
  if (error || !movie) return <div className="movie-page-status">Не удалось загрузить информацию о фильме.</div>;

  const releaseDate = new Date(movie.release_date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
  const trailer = movie.videos?.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
  const mainActors = movie.credits?.cast.slice(0, 10);
  
  const backdropStyle = movie.backdrop_path 
    ? { backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }
    : {};

  return (
    <div className="movie-page">
      <div className="movie-page__backdrop" style={backdropStyle}>
        <div className="movie-page__backdrop-overlay"></div>
      </div>
      
      <div className="movie-page__content">
        <div className="movie-page__poster">
          {movie.poster_path ? (
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          ) : (
            <div className="movie-page__poster-placeholder">Постер недоступен</div>
          )}
        </div>
        <div className="movie-page__info">
          <h1 className="movie-page__title">{movie.title}</h1>
          {movie.tagline && <p className="movie-page__tagline">"{movie.tagline}"</p>}
          <div className="movie-page__meta">
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            <span>📅 {releaseDate}</span>
            {movie.runtime && <span>🕒 {formatRuntime(movie.runtime)}</span>}
          </div>
          <div className="movie-page__genres">
            {movie.genres.map(genre => <span key={genre.id} className="genre-tag">{genre.name}</span>)}
          </div>
          <h2 className="movie-page__section-title">Описание</h2>
          <p className="movie-page__overview-text">{movie.overview}</p>
        </div>
      </div>

      <div className="movie-page__details-wrapper">
        {trailer && (
          <div className="movie-page__section">
            <h2 className="movie-page__section-title">Трейлер</h2>
            <div className="trailer-container">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {mainActors && mainActors.length > 0 && (
          <div className="movie-page__section">
            <h2 className="movie-page__section-title">В главных ролях</h2>
            <ul className="actors-list">
              {mainActors.map(actor => (
                <li key={actor.id} className="actors-list__item">
                  <span className="actors-list__name">{actor.name}</span>
                  <span className="actors-list__character">{actor.character}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="movie-page__back-button-wrapper">
        <button onClick={() => navigate(-1)} className="movie-page__back-button">
          Назад к списку
        </button>
      </div>
    </div>
  );
};

export default MoviePage;