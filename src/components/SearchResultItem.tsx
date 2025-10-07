import React from 'react';
import { Link } from 'react-router-dom';
import type { MovieListItem } from '../types/movie';
import type { TvListItem } from '../types/tv';
import '../styles/SearchResultItem.scss';

type SearchResult = (MovieListItem | TvListItem) & { media_type: 'movie' | 'tv' };

interface SearchResultItemProps {
  item: SearchResult;
  onClick: () => void;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ item, onClick }) => {
  const isMovie = item.media_type === 'movie';
  const title = isMovie ? (item as MovieListItem).title : (item as TvListItem).name;
  const releaseDate = isMovie ? (item as MovieListItem).release_date : (item as TvListItem).first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  
  const linkTo = `/${item.media_type}/${item.id}`;

  return (
    <Link to={linkTo} className="search-result-item" onClick={onClick}>
      <img
        src={item.poster_path ? `https://image.tmdb.org/t/p/w92${item.poster_path}` : 'https://via.placeholder.com/50x75'}
        alt={title}
        className="search-result-item__poster"
      />
      <div className="search-result-item__info">
        <p className="search-result-item__title">{title}</p>
        <p className="search-result-item__meta">{isMovie ? 'Фильм' : 'Сериал'}, {year}</p>
      </div>
    </Link>
  );
};

export default SearchResultItem;