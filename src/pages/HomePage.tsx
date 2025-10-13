import { Link } from 'react-router-dom';
import { useGetPopularMoviesQuery } from '../services/api';
import '../styles/HomePage.scss';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage = () => {
  const { data: popularMovies, isLoading } = useGetPopularMoviesQuery(1);

  const backgroundStyle = popularMovies?.results[0]?.backdrop_path
    ? { backgroundImage: `url(https://image.tmdb.org/t/p/original${popularMovies.results[0].backdrop_path})` }
    : {};

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="home-page" style={backgroundStyle}>
      <div className="home-page__shape-overlay"></div>
      <div className="home-page__backdrop-overlay"></div>

      <div className="home-page__content">
        <h1 className="home-page__title">
          Ваш гид в мире кино
        </h1>
        <p className="home-page__subtitle">
          Находите, исследуйте и открывайте для себя тысячи фильмов и сериалов. Ваш следующий любимый фильм уже ждет вас.
        </p>

        <div className="home-page__actions">
          <Link to="/movies" className="home-page__button home-page__button--primary">
            К фильмам
          </Link>
          <Link to="/tv" className="home-page__button home-page__button--secondary">
            К сериалам
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;