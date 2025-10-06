import { Link } from 'react-router-dom';
import type { MovieListItem } from '../types/movie';
import '../styles/MediaCard.scss'; 

interface MovieCardProps {
  movie: MovieListItem;
}

const getRatingColor = (rating: number): string => {
  if (rating >= 7) return 'green';
  if (rating >= 5) return 'orange';
  return 'red';
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="media-card">
      <div className="media-card__poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
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
        <h3 className="media-card__title">{movie.title}</h3>
        <div className={`media-card__rating media-card__rating--${getRatingColor(movie.vote_average)}`}>
          {movie.vote_average.toFixed(1)}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;