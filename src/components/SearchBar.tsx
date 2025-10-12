import React, { useState, useEffect, useRef } from 'react';
import { useGetSearchResultsQuery } from '../services/api';
import { useDebounce } from '../hooks/useDebounce';
import SearchResultItem from './SearchResultItem'; 
import '../styles/SearchBar.scss';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  
  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading } = useGetSearchResultsQuery(
    { query: debouncedQuery, page: 1 },
    { skip: debouncedQuery.length < 2 }
  );
  
  const searchBarRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
        if (debouncedQuery.length > 1 && data) {
      console.log(`Результаты для запроса: "${debouncedQuery}"`, data);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [data, debouncedQuery]);
  
  const handleResultClick = () => {
    setIsFocused(false);
    setQuery('');
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }

  return (
    <form className="search-bar" ref={searchBarRef} onSubmit={handleSubmit}>
      <input
        className="search-bar__input"
        type="text"
        placeholder="Фильмы, сериалы..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
      />
      <button type="button" className="search-bar__button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"/>
        </svg>
      </button>

      {isFocused && query.length > 1 && (
        <div className="search-results">
          {isLoading && <div className="search-results__loader">Идет поиск...</div>}
          
          {data && data.results.length > 0 && (
            <ul>
              {data.results.slice(0, 7).map(item => (
                <li key={item.id}>
                  <SearchResultItem item={item} onClick={handleResultClick} />
                </li>
              ))}
            </ul>
          )}

          {data && data.results.length === 0 && !isLoading && (
            <div className="search-results__no-results">Ничего не найдено</div>
          )}
        </div>
      )}
    </form>
  )
}

export default SearchBar;