import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetMovieDetailsQuery } from '../services/api';

const MoviePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: movie, error, isLoading } = useGetMovieDetailsQuery(Number(id));

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (error || !movie) {
    return <div>Ошибка при загрузке данных о фильме</div>
  }

  return (
    <div>
      <h1>{movie.title}</h1>
    </div>
  )
}

export default MoviePage