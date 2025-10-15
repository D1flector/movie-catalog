import { NavLink } from "react-router-dom";
import { useState } from 'react';
import '../styles/Header.scss';
import SearchBar from "./SearchBar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        <NavLink to='/' className="header__logo" onClick={handleLinkClick}>
          MovieCatalog
        </NavLink>

        <button
          className="header__mobile-toggle"
          onClick={toggleMenu}
          aria-label="Открыть меню"
          aria-expanded={isMenuOpen}
        >
          <div className={isMenuOpen ? "mobile-toggle__line mobile-toggle__line--open" : "mobile-toggle__line"}></div>
          <div className={isMenuOpen ? "mobile-toggle__line mobile-toggle__line--open" : "mobile-toggle__line"}></div>
          <div className={isMenuOpen ? "mobile-toggle__line mobile-toggle__line--open" : "mobile-toggle__line"}></div>
        </button>

        <nav className={isMenuOpen ? "header__nav header__nav--open" : "header__nav"}>
          <NavLink to='/' className="header__link" onClick={handleLinkClick}>Главная</NavLink>
          <NavLink to='/movies' className="header__link" onClick={handleLinkClick}>Фильмы</NavLink>
          <NavLink to='/tv' className="header__link" onClick={handleLinkClick}>Сериалы</NavLink>
          <NavLink to='/favorites' className="header__link" onClick={handleLinkClick}>Избранное</NavLink>
          <NavLink to='/scaner' className="header__link" onClick={handleLinkClick}>Сканер</NavLink>
          <SearchBar />
        </nav>
      </div>
    </header>
  );
};

export default Header;