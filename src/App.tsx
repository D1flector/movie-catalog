import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import MoviesPage from "./pages/MoviesPage"
import FavoritesPage from "./pages/FavoritesPage"
import TvShowsPage from "./pages/TvShowsPage"
import TvShowPage from "./pages/TvShowPage"
import MoviePage from "./pages/MoviePage"
import ScanerPage from "./pages/ScanerPage"

import Header from "./components/Header"
import './styles/App.scss'

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/movies" element={ <MoviesPage /> } />
        <Route path="/movie/:id" element={ <MoviePage /> } />
        <Route path="/tv" element={ <TvShowsPage /> } />
        <Route path="/tv/:id" element={ <TvShowPage /> } />
        <Route path="/favorites" element={ <FavoritesPage /> } />
        <Route path="*" element={ <NotFoundPage /> } />
        <Route path="/scaner" element={ <ScanerPage /> } />
      </Routes>
    </>
  )
}

export default App
