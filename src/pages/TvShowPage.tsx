import { useParams, useNavigate } from 'react-router-dom';
import { useGetTvShowDetailsQuery } from '../services/api';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import '../styles/MoviePage.scss';
import { TvDetails } from '../types/tv';

const formatAirDates = (tvShow: TvDetails): string => {
  if (!tvShow.first_air_date) return '';

  const firstYear = new Date(tvShow.first_air_date).getFullYear();
  
  if (tvShow.status === 'Ended' && tvShow.last_air_date) {
    const lastYear = new Date(tvShow.last_air_date).getFullYear();
    return firstYear === lastYear ? `${firstYear} г.` : `${firstYear} г. – ${lastYear} г.`;
  }

  return `${firstYear} г. – наст. время`;
};

const formatEpisodeRuntime = (minutes: number[]): string => {
  if (!minutes || minutes.length === 0 || minutes[0] === 0) return '';
  return `${minutes[0]}м/серия`;
};

const translateStatus = (status: string): string => {
  const statusMap: { [key: string]: string } = { "Returning Series": "Идет", "Ended": "Завершен", "Canceled": "Отменен", "In Production": "В производстве", "Planned": "Планируется", "Pilot": "Пилот" };
  return statusMap[status] || status;
};

const formatCount = (count: number, type: 'season' | 'episode'): string => {
  if (count === 0) return '';
  const titles = type === 'season' ? ['сезон', 'сезона', 'сезонов'] : ['серия', 'серии', 'серий'];
  const cases = [2, 0, 1, 1, 1, 2];
  const index = (count % 100 > 4 && count % 100 < 20) ? 2 : cases[(count % 10 < 5) ? count % 10 : 5];
  return `${count} ${titles[index]}`;
};

const TvShowPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const tvShowId = Number(id);

  const { data: tvShow, isLoading, error } = useGetTvShowDetailsQuery(tvShowId, { skip: !tvShowId });

  if (isLoading) return <div className="movie-page-status">Загрузка...</div>;
  if (error || !tvShow) return <div className="movie-page-status">Не удалось загрузить информацию о сериале.</div>;

  const trailer = tvShow.videos?.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
  const mainActors = tvShow.credits?.cast.slice(0, 20);
  
  const backdropStyle = tvShow.backdrop_path 
    ? { backgroundImage: `url(https://image.tmdb.org/t/p/original${tvShow.backdrop_path})` }
    : {};

  return (
    <div className="movie-page">
      <div className="movie-page__backdrop" style={backdropStyle}>
        <div className="movie-page__backdrop-overlay"></div>
      </div>
      
      <div className="movie-page__content">
        <button onClick={() => navigate(-1)} className="movie-page__back-button">
          Назад к списку
        </button>

        <div className="movie-page__poster">
          {tvShow.poster_path ? <img src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`} alt={tvShow.name} /> : <div className="movie-page__poster-placeholder">Постер недоступен</div>}
        </div>
        <div className="movie-page__info">
          <h1 className="movie-page__title">{tvShow.name}</h1>
          
          <div className="movie-page__meta">
            <span>⭐ {tvShow.vote_average.toFixed(1)}</span>
            <span>📅 {formatAirDates(tvShow)}</span>
            {tvShow.episode_run_time.length > 0 && <span>🕒 {formatEpisodeRuntime(tvShow.episode_run_time)}</span>}
          </div>

          <div className="movie-page__genres">
            {tvShow.genres.map(genre => <span key={genre.id} className="genre-tag">{genre.name}</span>)}
          </div>

          <div className="movie-page__tech-details" style={{ marginBottom: '2rem', opacity: 0.9 }}>
            <span><strong>Статус:</strong> {translateStatus(tvShow.status)}</span>
            {tvShow.number_of_seasons > 0 && <span style={{ marginLeft: '1.5rem' }}>{formatCount(tvShow.number_of_seasons, 'season')}</span>}
            {tvShow.number_of_episodes > 0 && <span style={{ marginLeft: '1.5rem' }}>{formatCount(tvShow.number_of_episodes, 'episode')}</span>}
          </div>

          <h2 className="movie-page__section-title">Описание</h2>
          <p className="movie-page__overview-text">{tvShow.overview}</p>

          {tvShow.created_by && tvShow.created_by.length > 0 && (
            <div className="movie-page__creators" style={{ marginTop: '2rem' }}>
              <h3 className="movie-page__section-title" style={{ fontSize: '1.4rem' }}>Создатели</h3>
              <p>{tvShow.created_by.map(creator => creator.name).join(', ')}</p>
            </div>
          )}
        </div>
      </div>

      <div className="movie-page__details-wrapper">
        {trailer && (
          <div className="movie-page__section">
            <h2 className="movie-page__section-title">Трейлер</h2>
            <div className="trailer-container"><iframe src={`https://www.youtube.com/embed/${trailer.key}`} title={trailer.name} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
          </div>
        )}

        {mainActors && mainActors.length > 0 && (
          <div className="movie-page__section">
            <h2 className="movie-page__section-title">В главных ролях</h2>
            <Swiper modules={[Navigation]} navigation spaceBetween={20} slidesPerView={'auto'} className="cast-slider">
              {mainActors.map(actor => (
                <SwiperSlide key={actor.id} className="actor-card">
                  <div className="actor-card__image-wrapper">{actor.profile_path ? <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} /> : <div className="actor-card__placeholder"></div>}</div>
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

export default TvShowPage;