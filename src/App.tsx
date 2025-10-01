import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NotFoundPage from "./pages/NotFoundPage"
import MoviesPage from "./pages/MoviesPage"
import FavoritesPage from "./pages/FavoritesPage"
import TvPage from "./pages/TvPage"

import Header from "./components/Header"

function App() {


  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/movies" element={ <MoviesPage /> } />
        <Route path="/tv" element={ <TvPage /> } />
        <Route path="/favorites" element={ <FavoritesPage /> } />
        <Route path="*" element={ <NotFoundPage /> } />
      </Routes>
    </>
  )
}

export default App
