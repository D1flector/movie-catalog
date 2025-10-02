import { Link } from 'react-router-dom';
import type { MovieListItem } from '../types/movie';
import '../styles/MovieCard.scss'; 

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
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="movie-card__poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
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
        <h3 className="movie-card__title">{movie.title}</h3>
        <div className={`movie-card__rating movie-card__rating--${getRatingColor(movie.vote_average)}`}>
          {movie.vote_average.toFixed(1)}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;