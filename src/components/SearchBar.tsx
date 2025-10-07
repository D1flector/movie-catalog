import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../services/searchSlice";
import '../styles/SearchBar.scss';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [localQuery, setLocalQuery] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(setSearchQuery(localQuery.trim()));
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="search-bar__input"
        type="text"
        placeholder="Фильмы, сериалы..."
        value={localQuery}
        onChange={e => setLocalQuery(e.target.value)}
      />
      <button type="submit" className="search-bar__button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"/>
        </svg>
      </button>
    </form>
  )
}

export default SearchBar;