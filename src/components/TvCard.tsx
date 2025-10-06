import { Link } from 'react-router-dom';
import type { TvListItem } from '../types/tv';
import '../styles/MovieCard.scss';

interface TvCardProps {
  tvShow: TvListItem;
}

const getRatingColor = (rating: number): string => {
  if (rating >= 7) return 'green';
  if (rating >= 5) return 'orange';
  return 'red';
};

const TvCard: React.FC<TvCardProps> = ({ tvShow }) => {
  return (
    <Link to={`/tv/${tvShow.id}`} className="movie-card">
      <div className="movie-card__poster-wrapper">
        {tvShow.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
            alt={tvShow.name}
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
        <h3 className="movie-card__title">{tvShow.name}</h3>
        <div className={`movie-card__rating movie-card__rating--${getRatingColor(tvShow.vote_average)}`}>
          {tvShow.vote_average.toFixed(1)}
        </div>
      </div>
    </Link>
  );
};

export default TvCard;