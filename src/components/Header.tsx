import { NavLink } from "react-router-dom"
import '../styles/Header.scss'
import SearchBar from "./SearchBar"

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <NavLink to='/' className="header__link">Главная</NavLink>
        <NavLink to='/movies' className="header__link">Фильмы</NavLink>
        <NavLink to='/tv' className="header__link">Сериалы</NavLink>
        <NavLink to='/favorites' className="header__link">Избранное</NavLink>
        <SearchBar />
      </nav>
    </header>
  )
}

export default Header