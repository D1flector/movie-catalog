import { Link } from 'react-router-dom';
import type { TvListItem } from '../types/tv';
import '../styles/MediaCard.scss';

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
    <Link to={`/tv/${tvShow.id}`} className="media-card">
      <div className="media-card__poster-wrapper">
        {tvShow.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
            alt={tvShow.name}
            className="media-card__poster"
            loading="lazy"
          />
        ) : (
          <div className="media-card__poster-placeholder">
            <span>Постер недоступен</span>
          </div>
        )}
      </div>

      <div className="media-card__info">
        <h3 className="media-card__title">{tvShow.name}</h3>
        <div className={`media-card__rating media-card__rating--${getRatingColor(tvShow.vote_average)}`}>
          {tvShow.vote_average.toFixed(1)}
        </div>
      </div>
    </Link>
  );
};

export default TvCard;