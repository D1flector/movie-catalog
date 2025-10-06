import { useParams, useNavigate } from 'react-router-dom';
import { useGetMovieDetailsQuery } from '../services/api';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import '../styles/MediaPage.scss';

const formatRuntime = (minutes: number | null): string => {
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

  if (isLoading) return <div className="media-page-status">Загрузка...</div>;
  if (error || !movie) return <div className="media-page-status">Не удалось загрузить информацию о фильме.</div>;

  const releaseDate = new Date(movie.release_date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
  const trailer = movie.videos?.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
  const mainActors = movie.credits?.cast.slice(0, 20);
  
  const backdropStyle = movie.backdrop_path 
    ? { backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }
    : {};

  return (
    <div className="media-page">
      <div className="media-page__backdrop" style={backdropStyle}>
        <div className="media-page__backdrop-overlay"></div>
      </div>
      
      <div className="media-page__content">
        <button onClick={() => navigate(-1)} className="media-page__back-button">
          Назад к списку
        </button>

        <div className="media-page__poster">
          {movie.poster_path ? (
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          ) : (
            <div className="media-page__poster-placeholder">Постер недоступен</div>
          )}
        </div>
        <div className="media-page__info">
          <h1 className="media-page__title">{movie.title}</h1>
          {movie.tagline && <p className="media-page__tagline">"{movie.tagline}"</p>}
          <div className="media-page__meta">
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            <span>📅 {releaseDate}</span>
            {movie.runtime && <span>🕒 {formatRuntime(movie.runtime)}</span>}
          </div>
          <div className="media-page__genres">
            {movie.genres.map(genre => <span key={genre.id} className="genre-tag">{genre.name}</span>)}
          </div>
          <h2 className="media-page__section-title">Описание</h2>
          <p className="media-page__overview-text">{movie.overview}</p>
        </div>
      </div>

      <div className="media-page__details-wrapper">
        {trailer && (
          <div className="media-page__section">
            <h2 className="media-page__section-title">Трейлер</h2>
            <div className="trailer-container">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {mainActors && mainActors.length > 0 && (
          <div className="media-page__section">
            <h2 className="media-page__section-title">В главных ролях</h2>
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={20}
              slidesPerView={'auto'}
              className="cast-slider"
            >
              {mainActors.map(actor => (
                <SwiperSlide key={actor.id} className="actor-card">
                  <div className="actor-card__image-wrapper">
                    {actor.profile_path ? (
                      <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
                    ) : (
                      <div className="actor-card__placeholder"></div>
                    )}
                  </div>
                  <p className="actor-card__name">{actor.name}</p>
                  <p className="actor-card__character">{actor.character}</p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviePage;