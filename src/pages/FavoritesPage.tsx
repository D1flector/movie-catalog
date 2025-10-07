import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetMovieDetailsQuery, useGetTvShowDetailsQuery } from '../services/api';
import type { FavouriteItem } from '../store/slices/favouriteSlice';

import '../styles/FavouritePage.scss';

const FavouritePage = () => {
  const navigate = useNavigate();
  const favouriteItems = useSelector((state: { favourite: { items: FavouriteItem[] } }) => state.favourite.items);

  return (
    <div className="favourite-page">
      <h1 className="favourite-page__title">Избранное</h1>

      {favouriteItems.length === 0 ? (
        <p className="favourite-page__empty">Вы ещё не добавили фильмы или сериалы в избранное.</p>
      ) : (
        <div className="favourite-page__list">
          {favouriteItems.map(item => (
            <FavouriteCard
              key={`${item.type}-${item.id}`}
              item={item}
              onClick={() => navigate(`/${item.type}/${item.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FavouriteCard = ({ item, onClick }: { item: FavouriteItem, onClick: () => void }) => {
  const { data: movieData } = useGetMovieDetailsQuery(item.id, { skip: item.type !== 'movie' });
  const { data: tvData } = useGetTvShowDetailsQuery(item.id, { skip: item.type !== 'tv' });

  const data = item.type === 'movie' ? movieData : tvData;

  if (!data) return null;

  const title = item.type === 'movie' ? data.title : data.name;
  const poster = data.poster_path;
  const rating = data.vote_average?.toFixed(1);
  const genres = data.genres?.slice(0, 2).map(g => g.name).join(', ');

  return (
    <div className="favourite-card" onClick={onClick}>
      <div className="favourite-card__image-wrapper">
        {poster ? (
          <img
            className="favourite-card__image"
            src={`https://image.tmdb.org/t/p/w500${poster}`}
            alt={title}
          />
        ) : (
          <div className="favourite-card__no-image">Постер недоступен</div>
        )}
        <div className="favourite-card__overlay">
          <div className="favourite-card__play">👁 Смотреть</div>
        </div>
      </div>
      <div className="favourite-card__info">
        <h3 className="favourite-card__title">{title}</h3>
        <p className="favourite-card__meta">
          <span>⭐ {rating}</span>
          {genres && <span>• {genres}</span>}
        </p>
        <p className="favourite-card__type">{item.type === 'movie' ? 'Фильм' : 'Сериал'}</p>
      </div>
    </div>
  );
};

export default FavouritePage;